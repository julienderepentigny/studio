import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/db';
import { env } from './env';

export const supabase = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
