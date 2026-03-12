"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Palette, Baseline, Image as ImageIcon } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const features = [
    {
      title: "Theme Generator",
      description: "Auto-generate beautiful light and dark color scales based on a single input color and export to CSS/Tailwind.",
      icon: Palette,
      href: "/theme-generator",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Contrast Checker",
      description: "Ensure your apps are accessible with real-time WCAG compliance grading and readable color suggestions.",
      icon: Baseline,
      href: "/contrast-checker",
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      title: "Palette Extractor",
      description: "Upload app screenshots and instantly extract the underlying dominant colors to inspire your next web or mobile app.",
      icon: ImageIcon,
      href: "/palette-extractor",
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
      <div className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-5xl text-center"
      >
        <motion.div variants={item} className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Elevate Your UI Design
        </motion.div>
        
        <motion.div variants={item}>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-linear-to-br from-foreground to-foreground/70 pb-4">
              Master Your <br className="hidden sm:block" /> Color Story
            </h1>
        </motion.div>

        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
          The ultimate suite of tools to generate themes, check contrast, and extract color palettes. Built for modern React, Next.js, and Expo developers.
        </motion.p>

        <motion.div variants={item} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.href} className="group relative rounded-2xl border border-border/50 bg-card/40 p-1 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 backdrop-blur-sm">
                <div className="flex h-full flex-col justify-between rounded-xl bg-card p-6">
                    <div>
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${feature.color} shadow-lg`}>
                            <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-card-foreground text-left">{feature.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground text-left leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-medium text-primary group-hover:underline decoration-primary underline-offset-4">
                        Try it out <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
