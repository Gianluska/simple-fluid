// FluidPlane.js

import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { initFluidSimulation } from '@components/FluidSimulation';

function FluidPlane() {
  const meshRef = useRef();
  const canvasRef = useRef();
  const simulationRef = useRef();
  const [canvasTexture, setCanvasTexture] = useState(null);

  useEffect(() => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = 2024;
    offscreenCanvas.height = 2024;

    canvasRef.current = offscreenCanvas;

    console.log('Dimensões do canvas antes da simulação:', canvasRef.current.width, canvasRef.current.height);

    simulationRef.current = initFluidSimulation(canvasRef.current);

    console.log('Dimensões do canvas após a simulação:', canvasRef.current.width, canvasRef.current.height);

    const texture = new THREE.CanvasTexture(canvasRef.current);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;       
    setCanvasTexture(texture);
  }, []);

  useFrame(() => {
    if (canvasTexture) {
      canvasTexture.needsUpdate = true;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (canvasRef.current && simulationRef.current) {
      const { uv } = e;
      const posX = uv.x * canvasRef.current.width;
      const posY = (1 - uv.y) * canvasRef.current.height;

      simulationRef.current.updatePointerDownData(
        simulationRef.current.pointers[0],
        -1,
        posX,
        posY
      );
    }
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (canvasRef.current && simulationRef.current) {
      const { uv } = e;
      const posX = uv.x * canvasRef.current.width;
      const posY = (1 - uv.y) * canvasRef.current.height;

      simulationRef.current.updatePointerMoveData(
        simulationRef.current.pointers[0],
        posX,
        posY
      );
    }
  };

  return (
    canvasTexture && (
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial
          map={canvasTexture}
        />
        {/* <meshBasicMaterial color="red" /> */}
      </mesh>
    )
  );
}

export default FluidPlane;
