"use server";

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveTheme(projectId: string, themeJson: any) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }
  
  const { error } = await supabase
    .from('projects')
    .update({ theme_json: themeJson })
    .eq('id', projectId)
    .eq('user_id', user.id) // Ensure they own it
    
  if (error) {
      console.error('Error saving theme:', error)
      return { error: error.message }
  }
  
  revalidatePath(`/dashboard/project/${projectId}`)
  revalidatePath('/dashboard')
  return { success: true }
}
