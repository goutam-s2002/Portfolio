import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey))
}

export const supabasePublic = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const getSupabaseAdmin = () => {
  if (!isSupabaseConfigured()) return null
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
