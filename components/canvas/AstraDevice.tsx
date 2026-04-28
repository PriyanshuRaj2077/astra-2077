"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@/hooks/useScroll";

const vertexShader = `
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    // Particle to mesh transition logic based on uReveal (0 to 1)
    vec3 pos = position;
    
    // Add noise/particles when reveal is low
    float noise = fract(sin(dot(pos.xyz ,vec3(12.9898,78.233,45.164))) * 43758.5453);
    vec3 particlePos = pos + normal * (1.0 - uReveal) * noise * 2.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(mix(particlePos, pos, uReveal), 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uReveal;
  uniform float uVelocity;
  uniform vec3 uColor;
  varying vec2 vUv;
  
  void main() {
    // RGB Shift / Chromatic Aberration based on scroll velocity
    float shift = uVelocity * 0.02;
    
    // Base color simulation
    vec3 baseColor = uColor;
    
    // Apply RGB shift
    float r = baseColor.r + shift;
    float g = baseColor.g;
    float b = baseColor.b - shift;
    
    vec3 finalColor = mix(vec3(0.0), vec3(r, g, b), uReveal);
    
    // Glowing edge effect
    float edge = pow(1.0 - distance(vUv, vec2(0.5)), 4.0);
    finalColor += vec3(0.36, 0.25, 0.83) * edge * uReveal; // Astra Violet glow
    
    gl_FragColor = vec4(finalColor, uReveal * 0.8 + 0.2);
  }
`;

export default function AstraDevice() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { scrollY, scrollVelocity } = useScroll();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uVelocity: { value: 0 },
      uColor: { value: new THREE.Color("#E0E0E0") }, // Titanium
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      
      // Calculate reveal based on scroll position (e.g. 100vh = window.innerHeight)
      const vh = window.innerHeight;
      let reveal = 0;
      if (scrollY > vh * 0.5) {
        reveal = Math.min((scrollY - vh * 0.5) / (vh * 0.5), 1.0);
      }
      
      // Interpolate for smooth shader transition
      materialRef.current.uniforms.uReveal.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uReveal.value,
        reveal,
        0.1
      );
      
      materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uVelocity.value,
        Math.abs(scrollVelocity),
        0.1
      );
    }
    
    if (meshRef.current) {
      // Rotation logic for "Fluidic" feature section (200vh-300vh)
      const vh = window.innerHeight;
      if (scrollY > vh * 1.5) {
        meshRef.current.rotation.y = scrollY * 0.002;
        meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.1;
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* 0-thickness foldable plane simulating the device */}
      <planeGeometry args={[2, 4, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
