import React, { useMemo } from 'react';
import * as THREE from 'three';

interface SoldierCrowdProps {
  count?: number;
  areaWidth?: number;
  areaDepth?: number;
  centerPosition?: [number, number, number];
  faction?: 'nalankilli' | 'nedunkilli';
  weaponsLowered?: boolean;
}

export const SoldierCrowd: React.FC<SoldierCrowdProps> = ({
  count = 24,
  areaWidth = 16,
  areaDepth = 6,
  centerPosition = [0, 0, 0],
  faction = 'nalankilli',
  weaponsLowered = false,
}) => {
  const clothColor = faction === 'nalankilli' ? '#7d3824' : '#2b3952';

  // Deterministic soldier positions
  const soldiers = useMemo(() => {
    const list: Array<{ x: number; z: number; spearRotX: number }> = [];
    const rows = 3;
    const cols = Math.ceil(count / rows);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (list.length >= count) break;
        const x = (c / (cols - 1 || 1) - 0.5) * areaWidth + (Math.sin(r * 2.3 + c) * 0.4);
        const z = (r / (rows - 1 || 1) - 0.5) * areaDepth + (Math.cos(c * 1.7 + r) * 0.3);
        const spearRotX = weaponsLowered ? 0.3 : -0.2 - Math.sin(r + c) * 0.1;
        list.push({ x, z, spearRotX });
      }
    }
    return list;
  }, [count, areaWidth, areaDepth, weaponsLowered]);

  return (
    <group position={centerPosition}>
      {soldiers.map((s, idx) => (
        <group key={idx} position={[s.x, 0, s.z]}>
          {/* Soldier body */}
          <mesh position={[0, 0.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.16, 0.9, 8]} />
            <meshStandardMaterial color={clothColor} roughness={0.8} />
          </mesh>

          {/* Head & turban */}
          <mesh position={[0, 1.45, 0]}>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshStandardMaterial color="#9e6642" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.55, 0]}>
            <cylinderGeometry args={[0.18, 0.17, 0.12, 8]} />
            <meshStandardMaterial color="#c29b6e" roughness={0.9} />
          </mesh>

          {/* Spear */}
          <group position={[0.25, 0.7, 0.2]} rotation={[s.spearRotX, 0, 0]}>
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 2.2, 6]} />
              <meshStandardMaterial color="#4a301a" roughness={0.9} />
            </mesh>
            {/* Spear tip */}
            <mesh position={[0, 1.75, 0]}>
              <coneGeometry args={[0.06, 0.24, 4]} />
              <meshStandardMaterial color="#7f888f" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>

          {/* Shield */}
          <mesh position={[-0.22, 0.8, 0.15]} rotation={[Math.PI / 2, 0.2, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.04, 8]} />
            <meshStandardMaterial color="#3b2b1d" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
