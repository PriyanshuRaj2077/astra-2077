"use client";

import { useState, useEffect } from "react";

export function useMouseVelocity() {
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const dt = currentTime - lastTime || 16;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      setVelocity({ x: dx / dt, y: dy / dt });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return velocity;
}
