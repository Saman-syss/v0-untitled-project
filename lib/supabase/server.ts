import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

// Create a supabase client for server-side usage
export const createClient = () => {
  return createServerComponentClient<Database>({ cookies })
}
