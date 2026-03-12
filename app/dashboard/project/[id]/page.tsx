import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Sparkles, Smartphone, Copy } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { ProjectThemeEditor } from '@/app/dashboard/project/[id]/project-theme-editor'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch specific project
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single()

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <h2 className="text-2xl font-bold mb-4">Project not found</h2>
         <Link href="/dashboard">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Button>
         </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-full hover:bg-muted">
               <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
               <h1 className="text-3xl font-extrabold tracking-tight flex items-center">
                  {project.name}
               </h1>
               <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 inline-block" style={{ backgroundColor: project.base_color }} />
                  Base Color: <span className="font-mono uppercase ml-1">{project.base_color}</span>
               </p>
            </div>
         </div>
      </div>
      
      {/* 
        We pass the project data to a Client Component 
        which will hold the heavy Theme Generator state 
        because it needs to react to user input via drag-and-drop or color pickers.
      */}
      <ProjectThemeEditor project={project} />
    </div>
  )
}
