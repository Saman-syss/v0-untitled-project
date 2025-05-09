import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

export type Subject = Database["public"]["Tables"]["subjects"]["Row"]

export async function getSubjects() {
  const supabase = createClient()

  const { data, error } = await supabase.from("subjects").select("*").order("name")

  if (error) {
    console.error("Error fetching subjects:", error)
    throw error
  }

  return data as Subject[]
}

export async function getSubjectBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("subjects").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Error fetching subject with slug ${slug}:`, error)
    throw error
  }

  return data as Subject
}

export async function createSubject(subject: Database["public"]["Tables"]["subjects"]["Insert"]) {
  const supabase = createClient()

  const { data, error } = await supabase.from("subjects").insert(subject).select().single()

  if (error) {
    console.error("Error creating subject:", error)
    throw error
  }

  return data as Subject
}

export async function updateSubject(id: string, updates: Database["public"]["Tables"]["subjects"]["Update"]) {
  const supabase = createClient()

  const { data, error } = await supabase.from("subjects").update(updates).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating subject with id ${id}:`, error)
    throw error
  }

  return data as Subject
}

export async function deleteSubject(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("subjects").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting subject with id ${id}:`, error)
    throw error
  }

  return true
}
