"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Overlay() {
  const resetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTacticalReset = () => {
    if (!resetRef.current || !containerRef.current) return;
    
    // Haptic tactical reset effect
    const tl = gsap.timeline();
    tl.to(resetRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "power4.in",
    }).to(resetRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Reset scroll smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Subtle breathing animation for typography
    gsap.to(".breathing-text", {
      opacity: 0.8,
      textShadow: "0px 0px 8px rgba(255,255,255,0.4)",
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full relative pointer-events-auto">
      {/* Tactical Reset Flash Element */}
      <div 
        ref={resetRef} 
        className="fixed inset-0 bg-white z-[100] opacity-0 pointer-events-none mix-blend-difference"
      />

      {/* Astra Logo / Home Button */}
      <div 
        className="fixed top-8 left-8 z-50 cursor-none"
        data-magnetic
        onClick={handleTacticalReset}
      >
        <div className="w-10 h-10 border border-white/20 rounded flex items-center justify-center bg-black/20 backdrop-blur-md transition-all hover:border-white/50">
          <span className="text-white font-bold tracking-widest text-xs uppercase opacity-80">AST</span>
        </div>
      </div>

      {/* Sync Section (0-100vh) */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-light tracking-[0.5em] text-white/50 uppercase breathing-text">
          Initializing Neural Link...
        </h1>
      </section>

      {/* Hero Reveal Section (100vh-200vh) */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center mt-96">
          <h2 className="text-5xl font-thin tracking-widest text-white uppercase mb-4">Astra Zenith</h2>
          <p className="text-sm font-light tracking-widest text-white/40 uppercase">Beyond the Senses.</p>
        </div>
      </section>

      {/* Fluidic Section (200vh-300vh) */}
      <section className="h-screen flex items-center justify-center">
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-64">
          <p className="text-right text-lg font-light leading-relaxed text-titanium/80 border-r border-astraViolet/30 pr-6">
            0.001ms Latency.<br/>Because your thoughts shouldn't have to wait.
          </p>
          <div className="text-right mt-12 text-xs text-white/30 uppercase tracking-[0.3em]">
            Quantum Core Active
          </div>
        </div>
      </section>

      {/* Night City Parallax (300vh-400vh) */}
      <section className="h-screen flex items-end justify-start p-24">
         <h3 className="text-3xl font-thin tracking-widest text-white/70 max-w-xl leading-tight">
           We didn't build a phone.<br/><span className="text-astraViolet">We built an extension of your soul.</span>
         </h3>
      </section>
      
      {/* End spacer */}
      <section className="h-screen" />
    </div>
  );
}
