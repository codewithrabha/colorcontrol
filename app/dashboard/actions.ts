"use server";

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const baseColor = formData.get('baseColor') as string || '#4f46e5'

  // Server-side validation
  if (!name || name.trim() === '') {
    return { error: 'Project name is required' }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([
      { 
        user_id: user.id, 
        name: name,
        base_color: baseColor,
        theme_json: {} // empty initially
      }
    ])
    .select()

  if (error) {
    console.error('Error creating project:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  
  // Return the newly created project ID to redirect the client
  if (data && data[0]) {
      return { projectId: data[0].id }
  }
  
  return { error: 'Failed to retrieve created project' }
}

export async function deleteProject(projectId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user.id) // Ensure they own it
      
    if (error) {
        return { error: error.message }
    }
    
    revalidatePath('/dashboard')
    return { success: true }
}
