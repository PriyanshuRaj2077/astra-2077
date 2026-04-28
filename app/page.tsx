"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/Loader";

gsap.registerPlugin(ScrollTrigger);

// Lazy load the 3D Scene
const Scene = dynamic(() => import("@/components/canvas/BasicScene"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Intro refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Cinematic Intro GSAP Sequence
    const tl = gsap.timeline();

    gsap.set([titleRef.current, subtitleRef.current, statementRef.current, scrollPromptRef.current], { 
      opacity: 0, 
      y: 20 
    });
    gsap.set(canvasRef.current, { opacity: 0 });

    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=1")
      .to(statementRef.current, { opacity: 1, y: 0, duration: 2, ease: "power3.out" }, "+=1.5")
      .to([titleRef.current, subtitleRef.current, statementRef.current], {
        opacity: 0, y: -20, duration: 2, ease: "power3.inOut", stagger: 0.2, delay: 2.5
      })
      .to(canvasRef.current, { opacity: 0.4, duration: 3, ease: "power2.inOut" }, "-=1.5")
      .to(scrollPromptRef.current, { opacity: 1, y: 0, duration: 1 }, "-=2");

    // 2. Feature Sections Scroll Animations (UX Fix: Readability + Timing)
    const features = document.querySelectorAll(".feature-wrapper");
    features.forEach((wrapper) => {
      const content = wrapper.querySelector(".feature-content");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top center",   // Start when the top of the wrapper hits the center of viewport
          end: "bottom center",  // End when the bottom of the wrapper hits the center
          scrub: 1,              // Smooth linking with scroll
        }
      });

      // Duration values here are proportional percentages of the total scroll distance
      tl.fromTo(content, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
      )
      .to(content, { opacity: 1, duration: 6 }) // HOLD TIME (60% of the scroll distance)
      .to(content, { opacity: 0, y: -30, duration: 2, ease: "power2.in" }); // Fade out
    });
  }, []);

  return (
    <main className="relative bg-[#050505] selection:bg-[#8B5CF6] selection:text-white">
      
      {/* 3D Canvas Background */}
      <div ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#8B5CF6] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
        <Scene />
      </div>

      {/* Top Left Logo */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference pointer-events-none opacity-80">
        <div className="flex items-center justify-center border border-white/20 px-4 py-2 rounded bg-black/20 backdrop-blur-md">
          <span className="text-white font-bold tracking-[0.3em] text-xs uppercase" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            ASTRA 2077
          </span>
        </div>
      </div>

      {/* Intro Sequence */}
      <section ref={introRef} className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 ref={titleRef} className="text-7xl md:text-9xl font-bold tracking-tighter text-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          ASTRA 2077
        </h1>
        <p ref={subtitleRef} className="mt-8 text-xs md:text-sm font-light tracking-[0.5em] text-white/60 uppercase">
          Relentlessly Human
        </p>
        <p ref={statementRef} className="absolute bottom-32 text-sm md:text-base font-light tracking-widest text-white/50 max-w-md mx-auto leading-loose uppercase">
          In a world of noise,<br/>Astra builds silence.
        </p>

        {/* Scroll Indicator */}
        <div ref={scrollPromptRef} className="absolute bottom-8 flex flex-col items-center gap-4">
          <p className="text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase animate-pulse">
            Initialize Flex
          </p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Feature 1: FORM INTELLIGENCE */}
      <section className="feature-wrapper relative z-10 h-[200vh]">
        <div className="feature-content sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 opacity-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#8B5CF6] uppercase mb-6">
            Form Intelligence
          </h2>
          <p className="text-4xl md:text-7xl font-light tracking-tighter text-white max-w-2xl drop-shadow-xl">
            One Form.<br/>Every Possibility.
          </p>
        </div>
      </section>

      {/* Feature 2: NEURAL SYNC INTERFACE */}
      <section className="feature-wrapper relative z-10 h-[200vh]">
        <div className="feature-content sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 opacity-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#8B5CF6] uppercase mb-6">
            Neural Sync Interface
          </h2>
          <p className="text-4xl md:text-7xl font-light tracking-tighter text-white max-w-3xl drop-shadow-xl">
            The Interface That<br/>Understands You.
          </p>
        </div>
      </section>

      {/* Feature 3: QUANTUM CORE */}
      <section className="feature-wrapper relative z-10 h-[200vh]">
        <div className="feature-content sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 opacity-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#8B5CF6] uppercase mb-6">
            Quantum Core
          </h2>
          <p className="text-4xl md:text-7xl font-light tracking-tighter text-white max-w-2xl drop-shadow-xl">
            Zero Delay.<br/>Pure Response.
          </p>
        </div>
      </section>

      {/* Feature 4: INFINITE ENERGY */}
      <section className="feature-wrapper relative z-10 h-[200vh]">
        <div className="feature-content sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 opacity-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#8B5CF6] uppercase mb-6">
            Infinite Energy
          </h2>
          <p className="text-4xl md:text-7xl font-light tracking-tighter text-white max-w-2xl drop-shadow-xl">
            Unbound Power.<br/>Absolute Freedom.
          </p>
        </div>
      </section>

      {/* Feature 5: AMBIENT CONNECTIVITY */}
      <section className="feature-wrapper relative z-10 h-[200vh]">
        <div className="feature-content sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 opacity-0">
          <h2 className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#8B5CF6] uppercase mb-6">
            Ambient Connectivity
          </h2>
          <p className="text-4xl md:text-7xl font-light tracking-tighter text-white max-w-2xl drop-shadow-xl">
            Always Present.<br/>Never Obtrusive.
          </p>
        </div>
      </section>
      
      {/* Footer Buffer */}
      <div className="h-[30vh]" />
    </main>
  );
}
