// lib/redis.ts
import { Redis } from '@upstash/redis';

// Create Redis client
export const redis = new Redis({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
});

// Helper function to get cached data
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData as string) : null;
  } catch (error) {
    console.error('Redis cache error:', error);
    return null;
  }
}

// Helper function to set cached data with expiration
export async function setCached(key: string, data: any, expirySeconds = 3600): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(data), { ex: expirySeconds });
  } catch (error) {
    console.error('Redis cache error:', error);
  }
}

// Helper to invalidate cache
export async function invalidateCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error('Redis cache error:', error);
  }
}
