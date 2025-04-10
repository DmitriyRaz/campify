// domains/auth/functions/profile.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { UserProfileService } from '../services/userProfileService';

// Get the user's profile
export async function GET(_request: NextRequest) {
  try {
    // Create supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the current user from the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get user profile with our optimized service
    const profile = await UserProfileService.getProfile(userId);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error getting profile:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Update the user's profile
export async function PATCH(request: NextRequest) {
  try {
    // Create supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the current user from the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    // Get the profile update data from the request
    const updateData = await request.json();

    // Update profile with our optimized service
    const updatedProfile = await UserProfileService.updateProfile(userId, updateData);

    if (!updatedProfile) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 400 });
    }

    return NextResponse.json({ profile: updatedProfile });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
