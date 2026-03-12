"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Loader2, KeyRound } from "lucide-react";
import { login, signup } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const action = isLogin ? login : signup;
    const resultError = await action(formData);
    
    setLoading(false);
    
    if (resultError) {
      setError(resultError);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
      <div className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 bg-card/60 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-4 pb-8 text-center">
             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <Sparkles className="h-8 w-8 text-white" />
             </div>
             <div>
                <CardTitle className="text-3xl font-bold tracking-tight">
                   {isLogin ? "Welcome back" : "Create an account"}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                   {isLogin 
                     ? "Enter your details to access your projects" 
                     : "Start organizing your color palettes today"}
                </CardDescription>
             </div>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              {error && (
                 <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20 text-center">
                    {error}
                 </div>
              )}
            
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                   id="email" 
                   name="email" 
                   type="email" 
                   placeholder="you@example.com" 
                   required 
                   className="h-12 bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                   id="password" 
                   name="password" 
                   type="password" 
                   required
                   className="h-12 bg-background/50 border-border/50"
                />
              </div>
              
              <Button type="submit" className="w-full h-12 text-md mt-4 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <KeyRound className="mr-2 h-5 w-5" />
                )}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border/40 pt-6">
             <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                   onClick={() => setIsLogin(!isLogin)} 
                   className="font-medium text-primary hover:underline underline-offset-4"
                >
                   {isLogin ? "Sign up" : "Log in"}
                </button>
             </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
