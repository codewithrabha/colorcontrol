"use client";

import Link from "next/link";
import { User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOutAction } from "@/app/actions";
import { useTransition } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export function AuthNav({ user }: { user: any }) {
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return (
      <div className="flex items-center space-x-2 md:space-x-4">
        <ModeToggle />
        <Link href="/login">
          <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
        </Link>
        <Link href="/login">
          <Button className="shadow-lg shadow-primary/20">Sign up</Button>
        </Link>
      </div>
    );
  }

  // Generate initials for avatar
  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : "US";

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <ModeToggle />
      <Link href="/dashboard">
        <Button variant="outline" className="hidden md:flex items-center gap-2 border-primary/20 text-primary hover:bg-primary/10">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9 border border-border shadow-sm transition-transform hover:scale-105 cursor-pointer">
              <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-600 text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Account</p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
             <Link href="/dashboard" className="flex items-center w-full">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="#" className="flex items-center w-full">
                 <Settings className="mr-2 h-4 w-4" />
                 <span>Settings</span>
              </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={() => startTransition(() => { signOutAction() })}
            disabled={isPending}
           >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isPending ? "Logging out..." : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
