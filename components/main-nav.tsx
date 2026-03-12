"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Palette, Baseline, Image as ImageIcon, Sparkles, LayoutDashboard } from "lucide-react";

const navItems = [
  { name: "Theme Generator", href: "/theme-generator", icon: Palette },
  { name: "Contrast Checker", href: "/contrast-checker", icon: Baseline },
  { name: "Palette Extractor", href: "/palette-extractor", icon: ImageIcon },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <Link href="/" className="mr-8 flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="hidden font-bold sm:inline-block tracking-tight text-lg bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
          ColorControl
        </span>
      </Link>
      <nav className="flex flex-1 items-center space-x-1 md:space-x-2 overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80 ${
                isActive ? "text-foreground" : "text-foreground/60"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden md:inline">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 -z-10 rounded-full bg-secondary shadow-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
