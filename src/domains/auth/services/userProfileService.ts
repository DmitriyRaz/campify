// domains/auth/services/userProfileService.ts
import { withSupabase } from '../../../lib/supabase';
import { getCached, setCached, invalidateCache } from '../../../lib/redis';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export class UserProfileService {
  // Cache key prefix for user profiles
  private static CACHE_KEY_PREFIX = 'profile:';

  // Cache time in seconds (1 hour)
  private static CACHE_DURATION = 3600;

  // Generate cache key for a user profile
  private static getCacheKey(userId: string): string {
    return `${this.CACHE_KEY_PREFIX}${userId}`;
  }

  // Get a user profile by ID with caching
  static async getProfile(userId: string): Promise<UserProfile | null> {
    // Try to get from cache first
    const cacheKey = this.getCacheKey(userId);
    const cachedProfile = await getCached<UserProfile>(cacheKey);

    if (cachedProfile) {
      console.log('Cache hit for user profile:', userId);
      return cachedProfile;
    }

    console.log('Cache miss for user profile:', userId);

    // If not in cache, get from database
    return await withSupabase(async (supabase) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      // Cache the result for future requests
      await setCached<UserProfile>(cacheKey, data, this.CACHE_DURATION);

      return data as UserProfile;
    });
  }

  // Update a user profile
  static async updateProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    // Validate the user can only update their own profile
    if (profileData.id && profileData.id !== userId) {
      throw new Error("Cannot update another user's profile");
    }

    // Remove any fields that shouldn't be directly updated
    const {
      id: _id,
      created_at: _created_at,
      ...updateData
    } = profileData as {
      id?: string;
      created_at?: string;
      [key: string]: unknown;
    };

    // Add updated_at timestamp
    const dataToUpdate = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    return await withSupabase(async (supabase) => {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(dataToUpdate)
        .eq('id', userId)
        .select('*')
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return null;
      }

      // Invalidate the cache after update
      await invalidateCache(this.getCacheKey(userId));

      return data as UserProfile;
    });
  }

  // Get multiple user profiles by IDs with batched query
  static async getProfiles(userIds: string[]): Promise<UserProfile[]> {
    if (userIds.length === 0) return [];

    // Try to get profiles from cache first
    const cachePromises = userIds.map((userId) => getCached<UserProfile>(this.getCacheKey(userId)));
    const cachedProfiles = await Promise.all(cachePromises);

    // Find which IDs we need to fetch from database
    const missingIds = userIds.filter((_id, index) => !cachedProfiles[index]);

    if (missingIds.length === 0) {
      // All profiles were in cache
      return cachedProfiles.filter(Boolean) as UserProfile[];
    }

    // Fetch missing profiles in a single query
    const fetchedProfiles = await withSupabase(async (supabase) => {
      const { data, error } = await supabase.from('user_profiles').select('*').in('id', missingIds);

      if (error) {
        console.error('Error fetching user profiles:', error);
        return [];
      }

      // Cache each fetched profile
      await Promise.all(
        data.map((profile) =>
          setCached<UserProfile>(this.getCacheKey(profile.id), profile, this.CACHE_DURATION)
        )
      );

      return data as UserProfile[];
    });

    // Combine cached and fetched profiles
    const profileMap = new Map<string, UserProfile>();

    // Add cached profiles to the map
    cachedProfiles.forEach((profile, _index) => {
      if (profile) {
        profileMap.set(profile.id, profile);
      }
    });

    // Add fetched profiles to the map
    fetchedProfiles.forEach((profile) => {
      profileMap.set(profile.id, profile);
    });

    // Return profiles in the same order as requested
    return userIds.map((id) => profileMap.get(id)).filter(Boolean) as UserProfile[];
  }
}
