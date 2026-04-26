function requireEnv(key: string): string {
  const v = import.meta.env[key];
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v as string;
}

export const env = {
  buildHash:       import.meta.env.VITE_BUILD_HASH || 'dev',
  supabaseUrl:     requireEnv('VITE_SUPABASE_URL'),
  supabaseAnonKey: requireEnv('VITE_SUPABASE_ANON_KEY'),
} as const;
