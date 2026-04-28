"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AstraZenithFlex() {
  const innerGroupRef = useRef<THREE.Group>(null);
  const outerGroupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Responsive scaling for mobile vs desktop
  const isMobile = viewport.width < 4;
  const baseScale = isMobile ? 0.6 : 1;

  useEffect(() => {
    if (!outerGroupRef.current) return;

    // GSAP Timeline tied to the full document scroll
    gsap.to(outerGroupRef.current.rotation, {
      y: Math.PI * 2, // Full 360 rotation over the massive scroll distance
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, 
      },
    });

    gsap.to(outerGroupRef.current.scale, {
      x: baseScale * 1.5,
      y: baseScale * 1.5,
      z: baseScale * 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });
  }, [baseScale]);

  useFrame((state) => {
    if (!innerGroupRef.current) return;

    // Phase 3: Neural follow interaction (mouse tilt)
    const targetX = -state.pointer.y * 0.4; 
    const targetY = state.pointer.x * 0.4;  

    innerGroupRef.current.rotation.x = THREE.MathUtils.lerp(innerGroupRef.current.rotation.x, targetX, 0.05);
    innerGroupRef.current.rotation.y = THREE.MathUtils.lerp(innerGroupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={outerGroupRef} scale={baseScale}>
      <group ref={innerGroupRef}>
        
        {/* Device Body: Metallic Dark Chrome */}
        <RoundedBox args={[2.5, 5, 0.2]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#050505" 
            metalness={0.9} 
            roughness={0.15} 
          />
        </RoundedBox>

        {/* Screen Face: Glossy Black Glass with subtle Violet Glow */}
        <RoundedBox args={[2.4, 4.9, 0.02]} radius={0.1} smoothness={4} position={[0, 0, 0.101]}>
          <meshStandardMaterial 
            color="#000000" 
            metalness={1} 
            roughness={0.05} 
            emissive="#8B5CF6"
            emissiveIntensity={0.1}
          />
        </RoundedBox>

      </group>
    </group>
  );
}

export default function BasicScene() {
  return (
    <Canvas 
      className="w-full h-full" 
      camera={{ position: [0, 0, 7] }} // Pulled back slightly for the taller 5-unit device
      dpr={[1, 2]} 
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      {/* Soft Ambient Base */}
      <ambientLight intensity={0.5} />
      
      {/* Primary Key Light (White/Clean) */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Subtle Astra Violet Backlight / Accent */}
      <directionalLight position={[-5, -5, -5]} intensity={1.5} color="#8B5CF6" />
      
      <AstraZenithFlex />
    </Canvas>
  );
}
