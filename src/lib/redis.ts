// lib/redis.ts
import { Redis } from '@upstash/redis';

// Create Redis client with proper error handling for missing environment variables
const getRedisClient = () => {
  const url = process.env.REDIS_URL;
  const token = process.env.REDIS_TOKEN;

  if (!url || !token) {
    console.warn('Redis credentials missing. Caching will be disabled.');
    return null;
  }

  return new Redis({ url, token });
};

// Initialize Redis client
export const redis = getRedisClient();

// Helper function to get cached data
export async function getCached<T>(key: string): Promise<T | null> {
  if (!redis) return null;

  try {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData as string) : null;
  } catch (error) {
    console.error(`Redis cache error while getting key "${key}":`, error);
    return null;
  }
}

// Helper function to set cached data with expiration
export async function setCached<T>(key: string, data: T, expirySeconds = 3600): Promise<boolean> {
  if (!redis) return false;

  try {
    await redis.set(key, JSON.stringify(data), { ex: expirySeconds });
    return true;
  } catch (error) {
    console.error(`Redis cache error while setting key "${key}":`, error);
    return false;
  }
}

// Helper to invalidate cache
export async function invalidateCache(key: string): Promise<boolean> {
  if (!redis) return false;

  try {
    await redis.del(key);
    return true;
  } catch (error) {
    console.error(`Redis cache error while invalidating key "${key}":`, error);
    return false;
  }
}

// Helper to invalidate multiple cache keys matching a pattern
export async function invalidateCachePattern(pattern: string): Promise<boolean> {
  if (!redis) return false;

  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return true;
  } catch (error) {
    console.error(`Redis cache error while invalidating pattern "${pattern}":`, error);
    return false;
  }
}
