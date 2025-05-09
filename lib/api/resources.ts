import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

export type Resource = Database["public"]["Tables"]["resources"]["Row"]

export async function getResources(limit = 100, offset = 0, type?: "note" | "video" | "practice") {
  const supabase = createClient()

  let query = supabase
    .from("resources")
    .select("*, topics!inner(*), profiles!inner(full_name)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (type) {
    query = query.eq("type", type)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching resources:", error)
    throw error
  }

  return data
}

export async function getResourcesByTopic(topicId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resources")
    .select("*, profiles!inner(full_name)")
    .eq("topic_id", topicId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching resources for topic ${topicId}:`, error)
    throw error
  }

  return data
}

export async function getResourceById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resources")
    .select("*, topics!inner(*, subjects!inner(*)), profiles!inner(full_name)")
    .eq("id", id)
    .single()

  if (error) {
    console.error(`Error fetching resource with id ${id}:`, error)
    throw error
  }

  return data
}

export async function createResource(resource: Database["public"]["Tables"]["resources"]["Insert"]) {
  const supabase = createClient()

  const { data, error } = await supabase.from("resources").insert(resource).select().single()

  if (error) {
    console.error("Error creating resource:", error)
    throw error
  }

  return data as Resource
}

export async function updateResource(id: string, updates: Database["public"]["Tables"]["resources"]["Update"]) {
  const supabase = createClient()

  const { data, error } = await supabase.from("resources").update(updates).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating resource with id ${id}:`, error)
    throw error
  }

  return data as Resource
}

export async function deleteResource(id: string) {
  const supabase = createClient()

  const { error } = await supabase.from("resources").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting resource with id ${id}:`, error)
    throw error
  }

  return true
}

export async function incrementViewCount(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resources")
    .update({ view_count: supabase.rpc("increment", { x: 1, row_id: id, column_name: "view_count" }) })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error incrementing view count for resource ${id}:`, error)
    throw error
  }

  return data as Resource
}

export async function incrementDownloadCount(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("resources")
    .update({ download_count: supabase.rpc("increment", { x: 1, row_id: id, column_name: "download_count" }) })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error incrementing download count for resource ${id}:`, error)
    throw error
  }

  return data as Resource
}
