'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f0c040"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}


function FloatingOrb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere args={[1.2, 64, 64]} position={[3, 0, -2]}>
        <MeshDistortMaterial
          color="#f0c040"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </Sphere>
    </Float>
  );
}


function WireRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.6}>
      <mesh ref={ref} position={[-3, 1, -3]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#f0c040" transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}


function FloatingCubes() {
  const cubes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.12 + 0.04,
        speed: Math.random() * 0.5 + 0.3,
        key: i,
      })),
    []
  );

  return (
    <>
      {cubes.map(({ position, scale, speed, key }) => (
        <FloatingCube
          key={key}
          position={position}
          scale={scale}
          speed={speed}
        />
      ))}
    </>
  );
}

function FloatingCube({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed * 0.7;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#f0c040"
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
}


function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}


export function HeroCanvas() {
  return (
    <div className="canvas-container" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#f0c040" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#d4a017" />

        <ParticleField count={1500} />
        <FloatingOrb />
        <WireRing />
        <FloatingCubes />
        <CameraRig />
      </Canvas>
    </div>
  );
}