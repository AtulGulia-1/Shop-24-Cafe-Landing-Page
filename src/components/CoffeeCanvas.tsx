"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FRAME_COUNT = 120;

export default function CoffeeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Scroll values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `/frames/${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Map scroll progress to frame index (0 to 0.4 progress covers frames 1 to 120)
  const frameIndex = useTransform(scrollYProgress, [0, 0.4], [0, FRAME_COUNT - 1]);
  // Use a spring for smoother frame transitions
  const smoothFrameIndex = useSpring(frameIndex, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Draw to canvas
  useEffect(() => {
    if (images.length === 0 || imagesLoaded < FRAME_COUNT) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(smoothFrameIndex.get()));
    };

    const renderFrame = (index: number) => {
      // Clamp index to available frames
      const safeIndex = Math.min(Math.max(0, index), FRAME_COUNT - 1);
      const img = images[safeIndex];
      if (!img || !img.complete) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image. Fit width.
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = canvas.height - drawHeight; // Anchor bottom
      } else {
        // Canvas is taller than image. Fit height.
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2; // Center horizontally
        offsetY = 0; 
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // initial size & draw

    const unsubscribe = smoothFrameIndex.on("change", (latest) => {
      renderFrame(Math.round(latest));
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [images, imagesLoaded, smoothFrameIndex]);

  // --- BEATS (0.0 to 0.4) ---
  const beatAOpacity = useTransform(scrollYProgress, [0, 0.04, 0.08, 0.12], [1, 1, 0, 0]);
  const beatAY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);

  const beatBOpacity = useTransform(scrollYProgress, [0.1, 0.14, 0.18, 0.22], [0, 1, 1, 0]);
  const beatBX = useTransform(scrollYProgress, [0.1, 0.22], [-50, 0]);

  const beatCOpacity = useTransform(scrollYProgress, [0.2, 0.24, 0.28, 0.32], [0, 1, 1, 0]);
  const beatCX = useTransform(scrollYProgress, [0.2, 0.32], [50, 0]);

  const beatDOpacity = useTransform(scrollYProgress, [0.3, 0.34, 0.38, 0.42], [0, 1, 1, 0]);
  const beatDScale = useTransform(scrollYProgress, [0.3, 0.42], [0.9, 1]);

  // --- BRIDGE COPY (0.4 to 1.0) ---
  
  // Ingredients Reveal (0.4 to 0.52)
  const ingredientsOpacity = useTransform(scrollYProgress, [0.4, 0.43, 0.48, 0.52], [0, 1, 1, 0]);

  // Section 1: The Sensory Peak (0.5 to 0.65)
  const s1Opacity = useTransform(scrollYProgress, [0.5, 0.53, 0.62, 0.65], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0.5, 0.53], [50, 0]);

  // Section 2: The Lifestyle Alignment (0.63 to 0.8)
  const s2Opacity = useTransform(scrollYProgress, [0.63, 0.66, 0.77, 0.8], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.63, 0.66], [50, 0]);

  // Section 3: The Branded Punchline & Live Status (0.78 to 0.93)
  const s3Opacity = useTransform(scrollYProgress, [0.78, 0.81, 0.9, 0.93], [0, 1, 1, 0]);
  const s3Scale = useTransform(scrollYProgress, [0.78, 0.81], [0.95, 1]);

  // Signature Quote & CTA (0.91 to 1.0)
  const sigOpacity = useTransform(scrollYProgress, [0.91, 0.94, 1.0], [0, 1, 1]);
  const sigY = useTransform(scrollYProgress, [0.91, 0.94], [50, 0]);

  return (
    // We extend the scroll length to 1000vh to fit all the new copy comfortably.
    <div ref={containerRef} className="h-[1000vh] w-full relative bg-brand-dark">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading State */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-brand-dark">
            <div className="text-brand-lime font-mono text-xl mb-4">LOADING EXPERIENCE</div>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-lime transition-all duration-200" 
                style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* --- SCROLLYTELLING TEXT OVERLAYS --- */}
        <div className="absolute inset-0 pointer-events-none no-select flex flex-col justify-center">
          
          {/* Beat A */}
          <motion.div style={{ opacity: beatAOpacity, y: beatAY }} className="absolute inset-0 flex items-center justify-center px-6">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-balance text-center text-white drop-shadow-2xl">
              BAHADURGARH’S <br/><span className="text-brand-lime">FINEST CAFE.</span>
            </h1>
          </motion.div>

          {/* Beat B */}
          <motion.div style={{ opacity: beatBOpacity, x: beatBX }} className="absolute inset-0 flex items-center justify-start px-6 md:pl-24">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl max-w-2xl">
              EXPLOSIVE <span className="text-brand-lime">FLAVOR.</span>
            </h2>
          </motion.div>

          {/* Beat C */}
          <motion.div style={{ opacity: beatCOpacity, x: beatCX }} className="absolute inset-0 flex items-center justify-end px-6 md:pr-24">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl max-w-2xl text-right">
              ANYTIME. <br/><span className="text-brand-lime">ANYTHING.</span>
            </h2>
          </motion.div>

          {/* Beat D */}
          <motion.div style={{ opacity: beatDOpacity, scale: beatDScale }} className="absolute inset-0 flex items-center justify-center px-6">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl text-center">
              CRAFTED FOR <span className="text-brand-lime">YOU.</span>
            </h2>
          </motion.div>

          {/* --- THE BRIDGE --- */}
          
          {/* Ingredients Reveal */}
          <motion.div style={{ opacity: ingredientsOpacity }} className="absolute inset-0 hidden md:block">
            {/* Top Label */}
            <div className="absolute top-[25%] right-[55%] flex items-center gap-4">
              <span className="font-mono text-brand-lime text-sm tracking-widest uppercase">Nitro-Infused Micro-foam</span>
              <div className="w-16 h-[1px] bg-brand-lime/50" />
            </div>
            {/* Middle Label */}
            <div className="absolute top-[50%] left-[55%] flex items-center gap-4">
              <div className="w-16 h-[1px] bg-brand-lime/50" />
              <span className="font-mono text-brand-lime text-sm tracking-widest uppercase">Slow-Drip Arabica Extract</span>
            </div>
            {/* Bottom Label */}
            <div className="absolute top-[75%] right-[55%] flex items-center gap-4">
              <span className="font-mono text-brand-lime text-sm tracking-widest uppercase">Precision Geometric Chill</span>
              <div className="w-16 h-[1px] bg-brand-lime/50" />
            </div>
          </motion.div>

          {/* Section 1: The Sensory Peak */}
          <motion.div style={{ opacity: s1Opacity, y: s1Y }} className="absolute inset-0 flex flex-col items-center justify-center px-6 bg-brand-dark/60 backdrop-blur-sm">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl mb-8">
              BORN IN THE <span className="text-brand-lime">BREW.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl text-center text-balance leading-relaxed">
              Every cup at Shop24seven is a technical masterpiece. We don’t just pour; we extract. Using a high-pressure nitrogen-chilled process, we lock in the bold notes of our premium Arabica, ensuring that the last sip is as intense as the first.
            </p>
          </motion.div>

          {/* Section 2: The Lifestyle Alignment */}
          <motion.div style={{ opacity: s2Opacity, y: s2Y }} className="absolute inset-0 flex items-center justify-center px-6 md:px-24 bg-brand-dark/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-7xl mx-auto">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-lime tracking-widest mb-6 border-b border-brand-lime/30 pb-4 inline-block">01. THE PULSE</h3>
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  Bahadurgarh doesn't stop, and neither do we. Whether it's a 3 AM brainstorm or a 3 PM reset, we provide the fuel for your ambition.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-lime tracking-widest mb-6 border-b border-brand-lime/30 pb-4 inline-block">02. THE SPACE</h3>
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  Located in the heart of the city, our cafe is designed as a sanctuary of minimalism—where the coffee is loud and the distractions are silent.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 3: The Branded Punchline */}
          <motion.div style={{ opacity: s3Opacity, scale: s3Scale }} className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark/90 backdrop-blur-md">
            <div className="flex flex-col items-center mb-16">
              <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-brand-lime leading-none drop-shadow-2xl">ANYTIME.</h1>
              <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-none drop-shadow-2xl">ANYTHING.</h1>
              <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white/20 leading-none drop-shadow-2xl">24SEVEN.</h1>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 md:px-8 md:py-4 flex items-center gap-4 shadow-2xl">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-brand-lime rounded-full animate-pulse shadow-[0_0_15px_rgba(145,230,0,0.8)]" />
              <span className="text-white font-mono tracking-widest text-xs md:text-sm">CURRENT STATUS: OPEN & BREWING</span>
            </div>
          </motion.div>

          {/* Signature Quote & CTA */}
          <motion.div style={{ opacity: sigOpacity, y: sigY }} className="absolute inset-0 flex flex-col items-center justify-center bg-brand-dark">
            <h2 className="font-serif italic text-4xl md:text-6xl text-center text-white max-w-4xl leading-tight drop-shadow-2xl mb-16 px-6">
              "The best time for a coffee is whenever you need it. <br/><span className="text-brand-lime">We'll be here.</span>"
            </h2>
            
            <div className="pointer-events-auto flex flex-col items-center">
              <a 
                href="/menu.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-brand-lime hover:bg-[#a3ff00] text-black font-bold text-lg md:text-2xl px-12 py-6 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(145,230,0,0.5)] mb-8"
              >
                EXPLORE THE FLAVORS
              </a>
              <p className="text-gray-400 text-sm tracking-widest font-mono">
                DESIGNED BY ATUL GULIA <span className="text-red-500">❤️</span>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
