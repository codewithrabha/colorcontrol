"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import chroma from "chroma-js";
import { Upload, ImageIcon, Copy, CheckCircle2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

function extractColors(ctx: CanvasRenderingContext2D, width: number, height: number): string[] {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const colorMap: Record<string, number> = {};

  // Sample every 4th pixel to improve performance
  for (let i = 0; i < data.length; i += 4 * 16) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const a = data[i + 3];

    if (a < 128) continue; // Ignore mostly transparent pixels
    
    // Ignore pure black or pure white mostly (optional, but helps get vibrant colors)
    if ((r < 30 && g < 30 && b < 30) || (r > 230 && g > 230 && b > 230)) {
        continue;
    }

    const key = `${r},${g},${b}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }

  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key]) => {
      const [r, g, b] = key.split(",");
      return chroma([parseInt(r), parseInt(g), parseInt(b)]).hex();
    });
    
  // If we couldn't find enough vibrant colors, just get the most common ones including b/w
  if (sortedColors.length < 4) {
      const allColors = Object.entries(colorMap).sort((a,b)=>b[1]-a[1]).slice(0, 6).map(([key]) => {
          const [r,g,b] = key.split(",");
          return chroma([parseInt(r), parseInt(g), parseInt(b)]).hex();
      });
      return allColors;
  }

  return sortedColors;
}

export default function PaletteExtractor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = (src: string) => {
    setImageSrc(src);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          // Resize large images for faster processing
          const MAX_DIM = 400;
          let width = img.width;
          let height = img.height;
          if (width > MAX_DIM || height > MAX_DIM) {
             const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
             width = width * ratio;
             height = height * ratio;
          }
          canvasRef.current.width = width;
          canvasRef.current.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const colors = extractColors(ctx, width, height);
          setPalette(colors);
        }
      }
    };
    img.src = src;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        processImage(url);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      processImage(url);
    }
  };
  
  const copyColor = (color: string, index: number) => {
      navigator.clipboard.writeText(color);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-orange-500">
          Palette Extractor
        </h1>
        <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
          Upload an app screenshot or image and we'll extract the dominant colors instantly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="h-full flex flex-col"
        >
          <div 
             className={`flex-1 min-h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all bg-card/50 backdrop-blur-sm shadow-sm relative overflow-hidden group
               ${isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-border/60 hover:border-amber-500/50 hover:bg-amber-500/5'}`}
             onDrop={handleDrop}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
          >
             <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleFileChange} />
             
             {imageSrc ? (
                 <img src={imageSrc} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain p-4 group-hover:blur-sm transition-all" />
             ) : (
                <div className="text-center p-6 point-events-none">
                    <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6">
                       <Upload className="h-8 w-8 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Drop your image here</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      Supports JPG, PNG, WEBP. Extract the beautiful colors hiding in your screenshots.
                    </p>
                </div>
             )}
             
             {imageSrc && (
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/40 backdrop-blur-sm z-20 pointer-events-none">
                     <p className="font-bold text-lg pointer-events-auto bg-background px-6 py-2 rounded-full shadow-lg">Upload another</p>
                 </div>
             )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
        >
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl h-full backdrop-blur-md">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <ImageIcon className="mr-2 h-6 w-6 text-amber-500" /> Extracted Palette
                </h2>
                
                {palette.length > 0 ? (
                    <div className="space-y-4">
                        {palette.map((color, i) => (
                            <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: i * 0.1 }}
                               key={`${color}-${i}`} 
                               className="flex items-center space-x-4 bg-background border border-border/50 rounded-2xl p-2 pr-4 shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="h-14 w-14 rounded-xl shadow-inner shrink-0" style={{ backgroundColor: color }} />
                                <div className="flex-1">
                                    <div className="text-lg font-mono font-bold uppercase">{color}</div>
                                    <div className="text-xs text-muted-foreground">RGB: {chroma(color).rgb().join(', ')}</div>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full shadow-sm hover:bg-amber-500/10 hover:text-amber-600 border border-transparent group-hover:border-border"
                                    onClick={() => copyColor(color, i)}
                                >
                                    {copiedIndex === i ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-center opacity-50">
                        <Palette className="h-16 w-16 mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground">Upload an image to see the magic.</p>
                    </div>
                )}
            </div>
        </motion.div>
      </div>
    </div>
  );
}
