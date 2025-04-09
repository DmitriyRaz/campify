// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { createPool, Pool } from 'generic-pool';

// Define types for our database schema
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      onboarding_responses: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          response_value: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          response_value?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          question_id?: string;
          response_value?: any;
          created_at?: string;
        };
      };
      sessions: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          expires_at: string;
          metadata: any;
          last_activity: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          expires_at: string;
          metadata?: any;
          last_activity?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          expires_at?: string;
          metadata?: any;
          last_activity?: string;
        };
      };
      // Add other tables as needed...
    };
  };
};

// Supabase client type
type SupabaseClient = ReturnType<typeof createClient<Database>>;

// Define a singleton pool to be reused across requests
let supabasePool: Pool<SupabaseClient> | null = null;

// Create and get the pool
function getPool(): Pool<SupabaseClient> {
  if (supabasePool) return supabasePool;

  // Create factory for Supabase clients
  const factory = {
    create: async (): Promise<SupabaseClient> => {
      return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            persistSession: false,
          },
        }
      );
    },
    destroy: async (client: SupabaseClient): Promise<void> => {
      // No explicit destruction needed for Supabase client
    },
  };

  // Create the pool
  supabasePool = createPool(factory, {
    max: 10, // Maximum connections in the pool
    min: 2, // Minimum connections to keep ready
    idleTimeoutMillis: 30000, // How long a resource can stay idle before being removed
    acquireTimeoutMillis: 5000, // Max time to wait when acquiring a resource
    evictionRunIntervalMillis: 60000, // How frequently to check for idle resources
  });

  return supabasePool;
}

// Get a client from the pool
export async function getSupabaseClient(): Promise<SupabaseClient> {
  const pool = getPool();
  return await pool.acquire();
}

// Release a client back to the pool
export async function releaseSupabaseClient(client: SupabaseClient): Promise<void> {
  const pool = getPool();
  await pool.release(client);
}

// Function to use a client for an operation and automatically release it
export async function withSupabase<T>(
  callback: (client: SupabaseClient) => Promise<T>
): Promise<T> {
  const client = await getSupabaseClient();
  try {
    return await callback(client);
  } finally {
    await releaseSupabaseClient(client);
  }
}

// Create a client for edge functions (no pooling needed)
export function createEdgeClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Create a service client for server-side operations (no pooling)
export function createServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
