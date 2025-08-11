import { createClient } from "@supabase/supabase-js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createServerClient = cache(() => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      from: () => ({
        select: () => ({
          eq: () => ({ data: [], error: { message: "Supabase not configured" } }),
          order: () => ({ data: [], error: { message: "Supabase not configured" } }),
          limit: () => ({ data: [], error: { message: "Supabase not configured" } }),
          single: () => ({ data: null, error: { message: "Supabase not configured" } }),
        }),
      }),
    }
  }

  try {
    const cookieStore = cookies()
    return createServerComponentClient({ cookies: () => cookieStore })
  } catch (error) {
    console.error("Error creating server client:", error)
    // Fallback to basic client
    return createClient(supabaseUrl, supabaseAnonKey)
  }
})
