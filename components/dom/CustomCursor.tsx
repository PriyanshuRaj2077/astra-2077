"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position out of view
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Check for magnetic elements
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic]') as HTMLElement;

      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        gsap.to(cursor, {
          x,
          y,
          width: rect.width + 20,
          height: rect.height + 20,
          borderRadius: '8px',
          backgroundColor: 'rgba(93, 63, 211, 0.2)', // Astra Violet glow
          border: '1px solid rgba(255,255,255,0.1)',
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '1px solid rgba(224, 224, 224, 0.4)', // Titanium
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 border border-white/40 rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      style={{
        boxShadow: "0 0 20px rgba(255,255,255,0.2)",
        transition: "width 0.2s, height 0.2s, background-color 0.2s, border-radius 0.2s",
      }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  );
}
