import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Plus, Palette, ArrowRight, Trash2, CalendarDays } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateProjectDialog } from '@/app/dashboard/create-project-dialog'
import { DeleteProjectButton } from '@/app/dashboard/delete-project-button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch projects for this user
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-purple-500">
               Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Manage your app color themes and palettes.</p>
          </div>
          
          <CreateProjectDialog />
       </div>

       {error ? (
          <div className="p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-center">
             Could not load projects. Please try again.
          </div>
       ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {projects.map((project) => (
                <Card key={project.id} className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
                   {/* Color banner */}
                   <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: project.base_color }} />
                   
                   <CardHeader className="pt-6">
                      <div className="flex justify-between items-start">
                         <div className="flex items-center space-x-3 mb-2">
                             <div className="w-8 h-8 rounded-lg shadow-inner shrink-0" style={{ backgroundColor: project.base_color }} />
                             <CardTitle className="text-xl truncate pr-4">{project.name}</CardTitle>
                         </div>
                         <DeleteProjectButton projectId={project.id} />
                      </div>
                      <CardDescription className="flex items-center text-xs">
                         <CalendarDays className="mr-1 h-3 w-3" />
                         {new Date(project.created_at).toLocaleDateString()}
                      </CardDescription>
                   </CardHeader>
                   <CardContent>
                      <div className="text-sm text-muted-foreground">
                         Theme Map: {project.theme_json && Object.keys(project.theme_json).length > 0 ? (
                             <span className="text-emerald-500 font-medium">Generated</span>
                         ) : (
                             <span>Not started</span>
                         )}
                      </div>
                   </CardContent>
                   <CardFooter>
                      <Link href={`/dashboard/project/${project.id}`} className="w-full">
                         <Button variant="secondary" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Open Project <ArrowRight className="ml-2 h-4 w-4" />
                         </Button>
                      </Link>
                   </CardFooter>
                </Card>
             ))}
          </div>
       ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border-2 border-dashed border-border/60 bg-card/30">
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                 <Palette className="h-10 w-10 text-primary" />
             </div>
             <h3 className="text-2xl font-bold tracking-tight mb-2">No projects yet</h3>
             <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
                Create your first project to start generating semantic mobile and web themes instantly.
             </p>
             <CreateProjectDialog />
          </div>
       )}
    </div>
  )
}
