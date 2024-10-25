import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import "@components/FluidSimulation";

export function Home() {
  const boxRef = useRef<Mesh>(null);
  useFrame(() => {
    if (!boxRef.current) return;
    boxRef.current.rotation.y += 0.002;
  });

  
  return (
    <>
    </>
  )
}