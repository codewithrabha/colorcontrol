import { createClient } from "@/utils/supabase/server"
import { AuthNav } from "@/components/auth-nav"
import { MainNav } from "@/components/main-nav"

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const sanitizedUser = user ? { email: user.email } : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center px-4 md:px-8">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
           <AuthNav user={sanitizedUser} />
        </div>
      </div>
    </header>
  );
}
