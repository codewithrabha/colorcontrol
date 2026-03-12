"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chroma from "chroma-js";
import { Copy, CheckCircle2, ChevronDown, Download, Sparkles, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SemanticTheme = {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceHighlight: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  primary: string;
  primaryMuted: string;
  primaryActive: string;
  border: string;
  borderStrong: string;
  error: string;
  errorBackground: string;
  success: string;
  successBackground: string;
  warning: string;
  info: string;
  iconPrimary: string;
  iconMuted: string;
};

function generateSemanticTheme(baseColor: string, isDark: boolean = false): SemanticTheme {
  try {
    const primary = chroma(baseColor);
    
    if (isDark) {
      // Dark Mode Generation
      const bgHue = primary.get('hsl.h') || 0;
      // Slight tint of primary color in the dark background
      const background = chroma.hsl(bgHue, 0.1, 0.05).hex();
      const surface = chroma.hsl(bgHue, 0.1, 0.1).hex();
      const surfaceElevated = chroma.hsl(bgHue, 0.15, 0.15).hex();
      const surfaceHighlight = chroma.hsl(bgHue, 0.2, 0.2).hex();
      
      return {
        background,
        surface,
        surfaceElevated,
        surfaceHighlight,
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
        textTertiary: "#475569",
        textInverse: "#000000",
        primary: primary.brighten(0.5).hex(), // Slightly brighter primary in dark mode
        primaryMuted: primary.darken(2.5).alpha(0.3).hex(),
        primaryActive: primary.darken(0.5).hex(),
        border: chroma.hsl(bgHue, 0.1, 0.2).hex(),
        borderStrong: chroma.hsl(bgHue, 0.2, 0.3).hex(),
        error: "#ef4444",
        errorBackground: chroma("#ef4444").darken(3).alpha(0.2).hex(),
        success: "#10b981",
        successBackground: chroma("#10b981").darken(3).alpha(0.2).hex(),
        warning: "#f59e0b",
        info: "#3b82f6",
        iconPrimary: "#f8fafc",
        iconMuted: "#64748b",
      };
    } else {
      // Light Mode Generation
      const bgHue = primary.get('hsl.h') || 0;
      
      return {
        background: "#ffffff",
        surface: chroma.hsl(bgHue, 0.1, 0.98).hex(),
        surfaceElevated: "#ffffff",
        surfaceHighlight: chroma.hsl(bgHue, 0.2, 0.95).hex(),
        textPrimary: "#0f172a",
        textSecondary: "#475569",
        textTertiary: "#94a3b8",
        textInverse: "#ffffff",
        primary: primary.hex(),
        primaryMuted: primary.brighten(3).hex(),
        primaryActive: primary.darken(0.5).hex(),
        border: chroma.hsl(bgHue, 0.1, 0.9).hex(),
        borderStrong: chroma.hsl(bgHue, 0.15, 0.8).hex(),
        error: "#dc2626",
        errorBackground: "#fee2e2",
        success: "#059669",
        successBackground: "#d1fae5",
        warning: "#d97706",
        info: "#2563eb",
        iconPrimary: "#0f172a",
        iconMuted: "#94a3b8",
      };
    }
  } catch(e) {
    // Fallback if invalid color
    const fallback = "#000000";
    return {
      background: fallback, surface: fallback, surfaceElevated: fallback, surfaceHighlight: fallback,
      textPrimary: fallback, textSecondary: fallback, textTertiary: fallback, textInverse: fallback,
      primary: fallback, primaryMuted: fallback, primaryActive: fallback, border: fallback, borderStrong: fallback,
      error: fallback, errorBackground: fallback, success: fallback, successBackground: fallback, warning: fallback, info: fallback, iconPrimary: fallback, iconMuted: fallback
    };
  }
}

// Mobile Mockup Component
const MobileMockup = ({ theme, isDark }: { theme: SemanticTheme, isDark: boolean }) => {
   return (
      <div 
         className="w-[320px] h-[650px] rounded-[3rem] border-8 border-zinc-900 shadow-2xl overflow-hidden relative transition-colors duration-500 flex flex-col mx-auto"
         style={{ backgroundColor: theme.background }}
      >
         {/* Status Bar Mock */}
         <div className="h-12 w-full flex justify-between items-end px-6 pb-2 shrink-0 z-10" style={{ backgroundColor: theme.background }}>
             <span className="text-[13px] font-bold" style={{ color: theme.textPrimary }}>9:41</span>
             <div className="flex space-x-1.5 items-center mb-0.5" style={{ color: theme.textPrimary }}>
                <div className="w-4 h-3 rounded-[2px] border" style={{ borderColor: theme.textPrimary }}></div>
             </div>
         </div>
         
         {/* App Header */}
         <div className="px-6 py-4 flex justify-between items-center" style={{ backgroundColor: theme.background, borderBottomWidth: 1, borderBottomColor: theme.border }}>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>Messages</h1>
            <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.surfaceHighlight }}>
               <Sparkles size={18} style={{ color: theme.primary }} />
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 overflow-hidden flex flex-col p-4 space-y-4">
             {/* Search Bar */}
             <div className="h-10 w-full rounded-xl flex items-center px-4" style={{ backgroundColor: theme.surfaceHighlight, borderWidth: 1, borderColor: theme.border }}>
                <span className="text-sm" style={{ color: theme.textSecondary }}>Search or jump to...</span>
             </div>
             
             {/* Alert/Banner */}
             <div className="p-4 rounded-2xl flex items-start space-x-3" style={{ backgroundColor: theme.primaryMuted, borderWidth: 1, borderColor: theme.primary + '20' }}>
                 <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.primary }}>
                     <Sparkles size={14} style={{ color: theme.textInverse }} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold" style={{ color: theme.primary }}>Pro Feature Unlocked</h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>You now have access to premium themes and palettes.</p>
                 </div>
             </div>

             {/* List Items */}
             <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border }}>
                {[1, 2, 3].map((i, idx) => (
                   <div key={i} className="p-4 flex items-center space-x-4" style={{ borderBottomWidth: idx !== 2 ? 1 : 0, borderBottomColor: theme.border }}>
                      <div className="w-10 h-10 rounded-full" style={{ backgroundColor: i === 1 ? theme.primary : theme.surfaceHighlight }} />
                      <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-bold" style={{ color: theme.textPrimary }}>Mobile Dev</h4>
                            <span className="text-[10px]" style={{ color: theme.textTertiary }}>2m ago</span>
                         </div>
                         <p className="text-xs truncate max-w-[150px]" style={{ color: theme.textSecondary }}>Checking out the new color spec...</p>
                      </div>
                   </div>
                ))}
             </div>
         </div>

         {/* Bottom Tab Nav */}
         <div className="h-20 w-full shrink-0 flex justify-around items-center px-2 pb-4" style={{ backgroundColor: theme.surfaceElevated, borderTopWidth: 1, borderTopColor: theme.border }}>
            <div className="flex flex-col items-center space-y-1">
               <div className="p-2 rounded-xl" style={{ backgroundColor: theme.primaryMuted }}>
                  <Sparkles size={20} style={{ color: theme.primary }} />
               </div>
               <span className="text-[10px] font-medium" style={{ color: theme.primary }}>Home</span>
            </div>
            <div className="flex flex-col items-center space-y-1 opacity-50">
               <div className="p-2">
                  <Smartphone size={20} style={{ color: theme.iconMuted }} />
               </div>
               <span className="text-[10px] font-medium" style={{ color: theme.textTertiary }}>Apps</span>
            </div>
         </div>
         
         {/* Home Indicator */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-full" style={{ backgroundColor: theme.textPrimary }} />
      </div>
   );
};

export default function ThemeGenerator() {
  const [baseColor, setBaseColor] = useState("#4f46e5"); // indigo-600
  const [copied, setCopied] = useState(false);

  const lightTheme = useMemo(() => generateSemanticTheme(baseColor, false), [baseColor]);
  const darkTheme = useMemo(() => generateSemanticTheme(baseColor, true), [baseColor]);

  const copyToClipboard = () => {
    const output = {
        light: lightTheme,
        dark: darkTheme
    };
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
          Mobile App Focused
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-cyan-400">
          Theme Generator
        </h1>
        <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
          Input a brand color to instantly generate semantic light and dark themes tailored for mobile apps (React Native / Expo).
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Controls */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="w-full lg:w-1/4 space-y-6"
        >
           <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl backdrop-blur-md sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                 <Sparkles className="mr-2 h-5 w-5 text-blue-500" /> Identity Color
              </h2>
              
              <div className="space-y-4">
                 <div className="flex flex-col space-y-4">
                    <div className="h-24 w-full rounded-2xl border shadow-inner overflow-hidden relative transition-transform hover:scale-105">
                       <input
                         type="color"
                         value={baseColor}
                         onChange={(e) => setBaseColor(e.target.value)}
                         className="absolute -inset-4 h-32 w-[120%] cursor-pointer opacity-0"
                       />
                       <div className="h-full w-full pointer-events-none" style={{ backgroundColor: baseColor }} />
                    </div>
                    <div className="w-full">
                       <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Hex Value</label>
                       <input
                         type="text"
                         value={baseColor}
                         onChange={(e) => setBaseColor(e.target.value)}
                         className="flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-lg font-mono tracking-widest ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 uppercase shadow-inner text-center"
                       />
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                 <Button onClick={copyToClipboard} className="w-full h-12 text-md font-medium rounded-xl shadow-lg transition-transform active:scale-95" style={{ backgroundColor: baseColor, color: chroma.contrast(baseColor, 'white') > 4.5 ? 'white' : 'black' }}>
                    {copied ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <Download className="mr-2 h-5 w-5" />}
                    {copied ? 'Copied Theme Object!' : 'Export JSON'}
                 </Button>
              </div>
           </div>
        </motion.div>

        {/* Previews */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="w-full lg:w-3/4 space-y-8"
        >
           <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14 rounded-2xl bg-muted/50 p-1 backdrop-blur-md">
                <TabsTrigger value="preview" className="rounded-xl text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">Device Preview</TabsTrigger>
                <TabsTrigger value="tokens" className="rounded-xl text-base data-[state=active]:bg-background data-[state=active]:shadow-sm">Semantic Tokens</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-0 outline-none">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <h3 className="text-xl font-bold mb-6 text-center">Light Theme</h3>
                       <MobileMockup theme={lightTheme} isDark={false} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold mb-6 text-center">Dark Theme</h3>
                       <MobileMockup theme={darkTheme} isDark={true} />
                    </div>
                 </div>
              </TabsContent>
              
              <TabsContent value="tokens" className="mt-0 outline-none">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Light Tokens */}
                    <div className="rounded-3xl border border-border/50 bg-white dark:bg-zinc-950 p-6 shadow-sm">
                       <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center justify-between border-b pb-4">
                          <span>Light Theme</span>
                       </h3>
                       <div className="grid grid-cols-1 gap-2">
                          {Object.entries(lightTheme).map(([key, color]) => (
                             <div key={key} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{key}</span>
                                <div className="flex items-center space-x-3">
                                   <span className="text-xs font-mono text-zinc-500 uppercase">{color}</span>
                                   <div className="w-8 h-8 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-800" style={{ backgroundColor: color }} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Dark Tokens */}
                    <div className="rounded-3xl border border-border/50 bg-zinc-950 dark:bg-zinc-900 p-6 shadow-sm">
                       <h3 className="text-xl font-bold text-zinc-100 mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                          <span>Dark Theme</span>
                       </h3>
                       <div className="grid grid-cols-1 gap-2">
                          {Object.entries(darkTheme).map(([key, color]) => (
                             <div key={key} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors">
                                <span className="text-sm font-medium text-zinc-300">{key}</span>
                                <div className="flex items-center space-x-3">
                                   <span className="text-xs font-mono text-zinc-500 uppercase">{color}</span>
                                   <div className="w-8 h-8 rounded-md shadow-sm border border-zinc-800" style={{ backgroundColor: color }} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </TabsContent>
           </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
