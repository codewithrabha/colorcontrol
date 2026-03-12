"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import chroma from "chroma-js";
import { CheckCircle2, XCircle, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContrastChecker() {
  const [bg, setBg] = useState("#ffffff");
  const [fg, setFg] = useState("#000000");
  const [ratio, setRatio] = useState(21);

  useEffect(() => {
    try {
      if (chroma.valid(bg) && chroma.valid(fg)) {
        setRatio(chroma.contrast(bg, fg));
      }
    } catch (e) {
      // Ignore invalid colors while typing
    }
  }, [bg, fg]);

  const passesAA = ratio >= 4.5;
  const passesAALarge = ratio >= 3.0;
  const passesAAA = ratio >= 7.0;
  const passesAAALarge = ratio >= 4.5;

  const handleSwap = () => {
    const temp = bg;
    setBg(fg);
    setFg(temp);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-pink-500">
          Contrast Checker
        </h1>
        <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
          Ensure your colors meet WCAG accessibility standards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-6"
        >
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm backdrop-blur-sm">
             <div className="flex flex-col sm:flex-row gap-6 mb-2">
                <div className="flex-1 space-y-2">
                   <label className="text-sm font-medium">Background Color</label>
                   <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 shrink-0 rounded-full border shadow-sm overflow-hidden relative">
                         <input
                           type="color"
                           value={bg}
                           onChange={(e) => setBg(e.target.value)}
                           className="absolute -inset-2 h-14 w-14 cursor-pointer opacity-0"
                         />
                         <div className="h-full w-full pointer-events-none" style={{ backgroundColor: bg }} />
                      </div>
                      <input
                        type="text"
                        value={bg}
                        onChange={(e) => setBg(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 uppercase shadow-inner"
                      />
                   </div>
                </div>

                <div className="flex items-end justify-center pb-1">
                   <Button variant="ghost" size="icon" onClick={handleSwap} className="rounded-full hover:bg-muted" title="Swap colors">
                      <ArrowRightLeft className="h-4 w-4" />
                   </Button>
                </div>

                <div className="flex-1 space-y-2">
                   <label className="text-sm font-medium">Text Color</label>
                   <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 shrink-0 rounded-full border shadow-sm overflow-hidden relative">
                         <input
                           type="color"
                           value={fg}
                           onChange={(e) => setFg(e.target.value)}
                           className="absolute -inset-2 h-14 w-14 cursor-pointer opacity-0"
                         />
                         <div className="h-full w-full pointer-events-none" style={{ backgroundColor: fg }} />
                      </div>
                      <input
                        type="text"
                        value={fg}
                        onChange={(e) => setFg(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 uppercase shadow-inner"
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contrast Ratio</h3>
            <div className="text-6xl font-black tracking-tighter tabular-nums" style={{ color: passesAA ? 'var(--radius)' /* default */ : 'var(--destructive)' }}>
               {ratio.toFixed(2)}<span className="text-3xl font-medium text-muted-foreground ml-1">:1</span>
            </div>
            
            <div className={`mt-4 inline-flex items-center space-x-1.5 rounded-full px-3 py-1 text-xs font-medium ${passesAA ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-destructive/10 text-destructive'}`}>
               {passesAA ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
               <span>{passesAA ? 'Looks good!' : 'Poor contrast'}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex flex-col space-y-6"
        >
          {/* Live Preview */}
          <div 
             className="flex-1 rounded-2xl border shadow-sm p-8 flex flex-col justify-center min-h-[250px] transition-colors duration-300"
             style={{ backgroundColor: chroma.valid(bg) ? bg : '#ffffff', color: chroma.valid(fg) ? fg : '#000000' }}
          >
             <h2 className="text-3xl font-bold mb-4 tracking-tight">Real-time Preview</h2>
             <p className="text-lg leading-relaxed opacity-90">
               Design is not just what it looks like and feels like. Design is how it works. Ensure your content is legible for everyone, everywhere.
             </p>
             <div className="mt-8 flex items-center space-x-4">
                <Button className="rounded-full shadow-lg" style={{ backgroundColor: chroma.valid(fg) ? fg : '#000000', color: chroma.valid(bg) ? bg : '#ffffff' }}>
                   Primary Action
                </Button>
                <div className="text-sm font-medium underline opacity-80">Secondary Link</div>
             </div>
          </div>

          {/* WCAG Badges */}
          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-sm font-medium text-muted-foreground">Normal Text</div>
                   <div className="text-xs font-bold text-muted-foreground">WCAG AA</div>
                </div>
                <div className="flex items-center space-x-2">
                   {passesAA ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                   <span className="text-xl font-bold">{passesAA ? 'Pass' : 'Fail'}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Requires 4.5:1 ratio</div>
             </div>
             
             <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-sm font-medium text-muted-foreground">Large Text</div>
                   <div className="text-xs font-bold text-muted-foreground">WCAG AA</div>
                </div>
                <div className="flex items-center space-x-2">
                   {passesAALarge ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                   <span className="text-xl font-bold">{passesAALarge ? 'Pass' : 'Fail'}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Requires 3.0:1 ratio</div>
             </div>

             <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-sm font-medium text-muted-foreground">Normal Text</div>
                   <div className="text-xs font-bold text-muted-foreground">WCAG AAA</div>
                </div>
                <div className="flex items-center space-x-2">
                   {passesAAA ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                   <span className="text-xl font-bold">{passesAAA ? 'Pass' : 'Fail'}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Requires 7.0:1 ratio</div>
             </div>

             <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-sm font-medium text-muted-foreground">Large Text</div>
                   <div className="text-xs font-bold text-muted-foreground">WCAG AAA</div>
                </div>
                <div className="flex items-center space-x-2">
                   {passesAAALarge ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-destructive" />}
                   <span className="text-xl font-bold">{passesAAALarge ? 'Pass' : 'Fail'}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">Requires 4.5:1 ratio</div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
