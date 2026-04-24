export const env = {
  buildHash: import.meta.env.VITE_BUILD_HASH || 'dev',
  // Added in Phase 1:
  // supabaseUrl: requireEnv('VITE_SUPABASE_URL'),
  // supabaseAnonKey: requireEnv('VITE_SUPABASE_ANON_KEY'),
  // googleClientId: requireEnv('VITE_GOOGLE_CLIENT_ID'),
} as const;
