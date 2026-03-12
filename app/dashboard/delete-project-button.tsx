"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProject } from "./actions";

// Optional: you could use shadcn AlertDialog here for confirmation,
// keeping it simpler for now with a double-click confirm state
export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      // reset confirmation after 3 seconds
      setTimeout(() => {
         if(!loading) setConfirming(false);
      }, 3000);
      return;
    }

    setLoading(true);
    await deleteProject(projectId);
    setLoading(false);
    setConfirming(false);
  }

  return (
    <Button 
       variant="ghost" 
       size="icon" 
       onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(); }}
       disabled={loading}
       className={`relative z-10 hover:bg-destructive/10 hover:text-destructive transition-colors ${confirming ? 'bg-destructive/10 text-destructive border border-destructive/20' : 'text-muted-foreground'}`}
       title={confirming ? "Click again to delete" : "Delete project"}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : confirming ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
