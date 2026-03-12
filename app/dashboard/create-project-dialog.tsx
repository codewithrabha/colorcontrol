"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProject } from "./actions";

export function CreateProjectDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // default to indigo-600
  const [baseColor, setBaseColor] = useState("#4f46e5");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    formData.append("baseColor", baseColor);

    const result = await createProject(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.projectId) {
      setOpen(false);
      // Optional: automatically navigate to the new project
      // router.push(`/dashboard/project/${result.projectId}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-lg shadow-primary/20">
           <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Color Project</DialogTitle>
          <DialogDescription>
            Give your new app a name and set an initial brand color.
          </DialogDescription>
        </DialogHeader>
        
        <form action={onSubmit} className="space-y-6 py-4">
           {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                 {error}
              </div>
           )}

           <div className="space-y-2">
             <Label htmlFor="name">Project Name</Label>
             <Input 
                id="name" 
                name="name" 
                placeholder="e.g. Acme Mobile App" 
                required 
                autoFocus
             />
           </div>

           <div className="space-y-2">
             <Label>Initial Brand Color</Label>
             <div className="flex items-center space-x-4">
                <div className="h-12 w-12 shrink-0 rounded-xl border shadow-inner overflow-hidden relative">
                   <input
                     type="color"
                     value={baseColor}
                     onChange={(e) => setBaseColor(e.target.value)}
                     className="absolute -inset-4 h-20 w-20 cursor-pointer opacity-0"
                   />
                   <div className="h-full w-full pointer-events-none" style={{ backgroundColor: baseColor }} />
                </div>
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 font-mono uppercase"
                />
             </div>
           </div>
           
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
             </Button>
             <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Project
             </Button>
           </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
