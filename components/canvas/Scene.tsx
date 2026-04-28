"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import AstraDevice from "./AstraDevice";

function CameraController() {
  const { camera } = useThree();
  useFrame(() => {
    // Subtle breathing animation for camera
    camera.position.y = Math.sin(Date.now() * 0.001) * 0.05;
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#5D3FD3" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#E0E0E0" />
      
      <AstraDevice />
      
      <CameraController />
      <Environment preset="night" />
      <Preload all />
    </Canvas>
  );
}
