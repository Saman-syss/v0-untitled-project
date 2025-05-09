"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

// Check if user is admin
async function isAdmin() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return false
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  return profile?.role === "admin" || profile?.role === "super_admin"
}

// Create a new subject
export async function createSubject(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin")
  }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-")

  const supabase = createClient()

  const { error } = await supabase.from("subjects").insert({
    name,
    description,
    icon,
    slug,
  })

  if (error) {
    console.error("Error creating subject:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/subjects")
  revalidatePath("/admin/subjects")

  return { success: true }
}

// Update a subject
export async function updateSubject(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin")
  }

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const icon = formData.get("icon") as string
  const slug = formData.get("slug") as string

  const supabase = createClient()

  const { error } = await supabase
    .from("subjects")
    .update({
      name,
      description,
      icon,
      slug,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating subject:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/subjects")
  revalidatePath(`/subjects/${slug}`)
  revalidatePath("/admin/subjects")

  return { success: true }
}

// Delete a subject
export async function deleteSubject(id: string) {
  if (!(await isAdmin())) {
    redirect("/admin")
  }

  const supabase = createClient()

  const { error } = await supabase.from("subjects").delete().eq("id", id)

  if (error) {
    console.error("Error deleting subject:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/subjects")
  revalidatePath("/admin/subjects")

  return { success: true }
}

// Create a new topic
export async function createTopic(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin")
  }

  const subjectId = formData.get("subject_id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const orderNumber = Number.parseInt(formData.get("order_number") as string)

  const supabase = createClient()

  const { error } = await supabase.from("topics").insert({
    subject_id: subjectId,
    name,
    description,
    order_number: orderNumber,
  })

  if (error) {
    console.error("Error creating topic:", error)
    return { success: false, error: error.message }
  }

  // Get subject slug for revalidation
  const { data: subject } = await supabase.from("subjects").select("slug").eq("id", subjectId).single()

  revalidatePath(`/subjects/${subject?.slug}`)
  revalidatePath("/admin/topics")

  return { success: true }
}

// Create a new resource
export async function createResource(formData: FormData) {
  const supabase = createClient()

  // Check if user is authenticated and has permission
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (!profile || (profile.role !== "admin" && profile.role !== "super_admin" && profile.role !== "teacher")) {
    redirect("/dashboard")
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const type = formData.get("type") as "note" | "video" | "practice"
  const topicId = formData.get("topic_id") as string
  const contentUrl = formData.get("content_url") as string
  const thumbnailUrl = (formData.get("thumbnail_url") as string) || null
  const fileType = (formData.get("file_type") as string) || null
  const fileSize = formData.get("file_size") ? Number.parseInt(formData.get("file_size") as string) : null
  const duration = formData.get("duration") ? Number.parseInt(formData.get("duration") as string) : null

  const { error: insertError } = await supabase.from("resources").insert({
    title,
    description,
    type,
    topic_id: topicId,
    content_url: contentUrl,
    thumbnail_url: thumbnailUrl,
    file_type: fileType,
    file_size: fileSize,
    duration,
    created_by: session.user.id,
  })

  if (insertError) {
    console.error("Error creating resource:", insertError)
    return { success: false, error: insertError.message }
  }

  // Get topic and subject info for revalidation
  const { data: topic } = await supabase.from("topics").select("subject_id").eq("id", topicId).single()

  if (topic) {
    const { data: subject } = await supabase.from("subjects").select("slug").eq("id", topic.subject_id).single()

    if (subject) {
      revalidatePath(`/subjects/${subject.slug}`)
    }
  }

  revalidatePath("/resources")
  revalidatePath("/admin/resources")

  return { success: true }
}
