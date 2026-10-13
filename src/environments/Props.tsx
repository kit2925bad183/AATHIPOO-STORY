import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// 1. Spinning Potter's Wheel
export const PottersWheel: React.FC<{ position?: [number, number, number]; isSpinning?: boolean }> = ({
  position = [0, 0, 0],
  isSpinning = true,
}) => {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheelRef.current && isSpinning) {
      wheelRef.current.rotation.y += delta * 4.2;
    }
  });

  return (
    <group position={position}>
      {/* Stone base pit */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.7, 0.75, 0.1, 16]} />
        <meshStandardMaterial color="#5e554a" roughness={0.9} />
      </mesh>

      {/* Rotating stone wheel */}
      <group ref={wheelRef} position={[0, 0.15, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.08, 20]} />
          <meshStandardMaterial color="#423b34" roughness={0.8} />
        </mesh>
        {/* Clay lump on center */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 0.2, 12]} />
          <meshStandardMaterial color="#a65538" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};

// 2. Terracotta Pots Collection
export const ClayPotsGroup: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => (
  <group position={position}>
    {[
      { x: 0, z: 0, r: 0.22, h: 0.35, color: '#b55838' },
      { x: 0.35, z: 0.1, r: 0.18, h: 0.28, color: '#a64d30' },
      { x: -0.3, z: 0.15, r: 0.25, h: 0.42, color: '#bf6343' },
      { x: 0.1, z: 0.35, r: 0.15, h: 0.22, color: '#9c4528' },
    ].map((pot, i) => (
      <group key={i} position={[pot.x, pot.h * 0.5, pot.z]}>
        <mesh castShadow>
          <sphereGeometry args={[pot.r, 12, 12]} />
          <meshStandardMaterial color={pot.color} roughness={0.85} />
        </mesh>
        <mesh position={[0, pot.r * 0.9, 0]}>
          <cylinderGeometry args={[pot.r * 0.5, pot.r * 0.6, pot.h * 0.25, 12]} />
          <meshStandardMaterial color={pot.color} roughness={0.85} />
        </mesh>
      </group>
    ))}
  </group>
);

// 3. Ancient Sangam Tree (Marudham or blooming Aathi tree)
export const SangamTree: React.FC<{
  position?: [number, number, number];
  isAathiTree?: boolean;
  scale?: number;
}> = ({ position = [0, 0, 0], isAathiTree = false, scale = 1.0 }) => (
  <group position={position} scale={scale}>
    {/* Trunk */}
    <mesh position={[0, 2, 0]} castShadow>
      <cylinderGeometry args={[0.3, 0.45, 4, 8]} />
      <meshStandardMaterial color="#422e1b" roughness={0.9} />
    </mesh>

    {/* Foliage canopies */}
    <group position={[0, 4.2, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[2.0, 10, 10]} />
        <meshStandardMaterial color="#355e2b" roughness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.6, 0.4]} castShadow>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshStandardMaterial color="#2d5224" roughness={0.8} />
      </mesh>
      <mesh position={[-0.7, 0.5, -0.5]} castShadow>
        <sphereGeometry args={[1.6, 8, 8]} />
        <meshStandardMaterial color="#3b6930" roughness={0.8} />
      </mesh>

      {/* White Aathipoo blossoms dotted on tree */}
      {isAathiTree && (
        <group>
          {[
            [0.5, 0.2, 1.8],
            [-0.7, -0.3, 1.6],
            [1.2, -0.2, 1.2],
            [-1.1, 0.4, 1.1],
            [0.2, -0.8, 1.7],
            [0.9, 0.8, 1.1],
            [-0.4, -0.6, 1.8],
          ].map(([x, y, z], idx) => (
            <mesh key={idx} position={[x, y, z]}>
              <sphereGeometry args={[0.09, 6, 6]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  </group>
);

// 4. Flickering Campfire
export const Campfire: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, 0] }) => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.intensity = 1.4 + Math.sin(t * 8) * 0.3 + Math.cos(t * 13) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Stones ring */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const ang = (i / 7) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(ang) * 0.45, 0.08, Math.sin(ang) * 0.45]}>
            <sphereGeometry args={[0.09, 6, 6]} />
            <meshStandardMaterial color="#4a443d" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Burning wood logs */}
      <mesh rotation={[0.4, 0.3, 0]} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
        <meshStandardMaterial color="#2e1d13" roughness={0.9} />
      </mesh>
      <mesh rotation={[-0.3, -0.4, 0]} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
        <meshStandardMaterial color="#2e1d13" roughness={0.9} />
      </mesh>

      {/* Fire ember glow */}
      <mesh position={[0, 0.22, 0]}>
        <coneGeometry args={[0.18, 0.4, 6]} />
        <meshStandardMaterial color="#ff5500" emissive="#ff4400" emissiveIntensity={0.8} />
      </mesh>

      <pointLight ref={lightRef} position={[0, 0.5, 0]} color="#ff8833" intensity={1.5} distance={10} />
    </group>
  );
};

// 5. Thatched Potter Cottage
export const PotterCottage: React.FC<{ position?: [number, number, number]; rotation?: [number, number, number] }> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => (
  <group position={position} rotation={rotation}>
    {/* Sun-dried mud walls */}
    <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
      <boxGeometry args={[4.2, 2.5, 3.2]} />
      <meshStandardMaterial color="#8a5f45" roughness={0.9} />
    </mesh>

    {/* Doorway opening */}
    <mesh position={[0, 0.9, 1.62]}>
      <boxGeometry args={[1.0, 1.8, 0.1]} />
      <meshStandardMaterial color="#261b14" roughness={0.9} />
    </mesh>

    {/* Thatched straw roof */}
    <mesh position={[0, 3.1, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
      <coneGeometry args={[3.2, 1.8, 4]} />
      <meshStandardMaterial color="#947c4e" roughness={0.95} />
    </mesh>
  </group>
);
