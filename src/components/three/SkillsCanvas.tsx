'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

function GDLogo3D() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[1.2, 0.06, 16, 100]} />
          <meshStandardMaterial
            color="#f0c040"
            metalness={0.9}
            roughness={0.1}
            emissive="#f0c040"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Inner ring */}
        <mesh>
          <torusGeometry args={[0.9, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#d4a017"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

interface SkillOrbProps {
  position: [number, number, number];
  color: string;
  speed: number;
}

function SkillOrb({ position, color, speed }: SkillOrbProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed;
      ref.current.rotation.y += delta * speed * 0.7;
      const scale = hovered ? 1.3 : 1;
      ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={1 + Math.random()} floatIntensity={0.5}>
      <mesh
        ref={ref}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.18, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          wireframe={!hovered}
        />
      </mesh>
    </Float>
  );
}

const ORBS = [
  { position: [-2, 1, 0],    color: '#f0c040', speed: 0.5 },
  { position: [2, -1, 0],    color: '#60a5fa', speed: 0.7 },
  { position: [0, 2, -1],    color: '#34d399', speed: 0.4 },
  { position: [-1.5, -1.5, 0], color: '#a78bfa', speed: 0.6 },
  { position: [1.5, 1.5, 0], color: '#fb923c', speed: 0.8 },
  { position: [0, -2, 0],    color: '#22d3ee', speed: 0.5 },
  { position: [-2, 0, 1],    color: '#f0c040', speed: 0.3 },
  { position: [2, 0, -1],    color: '#e879f9', speed: 0.6 },
] as const;

export function SkillsCanvas() {
  return (
    <div style={{ width: '100%', height: '300px', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#f0c040" />
        <pointLight position={[-3, -3, 3]} intensity={0.5} color="#60a5fa" />

        {ORBS.map((orb, i) => (
          <SkillOrb key={i} {...orb} position={[...orb.position] as [number, number, number]} />
        ))}
        <GDLogo3D />
      </Canvas>
    </div>
  );
}