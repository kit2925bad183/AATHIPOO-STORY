import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ============================================================================
// 1. SANGAM DOMESTIC DWELLING (HERO & MIDGROUND WITH VARIED ROOFS & THINNAI)
// ============================================================================

export interface DwellingProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  roofType?: 'terracotta_tile' | 'palm_thatch';
  wallColor?: string;
  hasThinnai?: boolean;
  hasAwning?: boolean;
  seed?: number;
}

export const SangamDwelling: React.FC<DwellingProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.0,
  roofType = 'terracotta_tile',
  wallColor = '#735843',
  hasThinnai = true,
  hasAwning = true,
  seed = 1,
}) => {
  const clothRef = useRef<THREE.Mesh>(null);

  // Subtle wind flutter for cloth awning
  useFrame(({ clock }) => {
    if (clothRef.current) {
      const t = clock.getElapsedTime() + seed * 2.3;
      clothRef.current.rotation.x = Math.sin(t * 1.8) * 0.08 + 0.35;
    }
  });

  const width = 3.6 + (seed % 3) * 0.4;
  const depth = 4.0 + ((seed + 1) % 3) * 0.5;
  const height = 2.4;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* 1. Mud-brick Wall Body */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={wallColor} roughness={0.92} />
      </mesh>

      {/* 2. Raised Front Porch / Veranda (Thinnai) */}
      {hasThinnai && (
        <group position={[0, 0.25, depth / 2 + 0.6]}>
          {/* Stone Plinth */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[width + 0.4, 0.5, 1.2]} />
            <meshStandardMaterial color="#5a4535" roughness={0.85} />
          </mesh>
          {/* Timber Pillars */}
          {[-width / 2 + 0.2, width / 2 - 0.2].map((x, i) => (
            <mesh key={i} position={[x, 1.1, 0.4]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 2.2, 8]} />
              <meshStandardMaterial color="#3d2b1f" roughness={0.8} />
            </mesh>
          ))}
        </group>
      )}

      {/* 3. Wooden Entrance Doorway */}
      <mesh position={[0, 1.0, depth / 2 + 0.02]}>
        <boxGeometry args={[0.9, 1.8, 0.08]} />
        <meshStandardMaterial color="#2b1d14" roughness={0.8} />
      </mesh>
      {/* Heavy Timber Lintel Header */}
      <mesh position={[0, 1.95, depth / 2 + 0.05]}>
        <boxGeometry args={[1.2, 0.16, 0.12]} />
        <meshStandardMaterial color="#21150e" roughness={0.85} />
      </mesh>

      {/* 4. Roof Construction (Gabled Terracotta Tile or Palm Thatch) */}
      <group position={[0, height, 0]}>
        {roofType === 'terracotta_tile' ? (
          <>
            {/* Main Roof Pitch */}
            <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]} castShadow>
              <coneGeometry args={[Math.max(width, depth) * 0.75, 1.6, 4]} />
              <meshStandardMaterial color="#94472c" roughness={0.85} />
            </mesh>
            {/* Ridge Beam Caps */}
            <mesh position={[0, 1.6, 0]}>
              <boxGeometry args={[width + 0.6, 0.15, 0.2]} />
              <meshStandardMaterial color="#7a361f" roughness={0.85} />
            </mesh>
          </>
        ) : (
          /* Palm Leaf Thatch Roof */
          <mesh position={[0, 0.75, 0]} castShadow>
            <coneGeometry args={[Math.max(width, depth) * 0.8, 1.5, 6]} />
            <meshStandardMaterial color="#6e573a" roughness={0.95} />
          </mesh>
        )}
      </group>

      {/* 5. Wind-blown Handloom Awning */}
      {hasAwning && (
        <group position={[0, height - 0.2, depth / 2 + 0.6]}>
          <mesh ref={clothRef} position={[0, 0, 0]} castShadow>
            <planeGeometry args={[width * 0.85, 1.3]} />
            <meshStandardMaterial color="#b3926d" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// ============================================================================
// 2. EXPANDED POTTER'S NEIGHBORHOOD (COURTYARD, DRYING RACKS, KILN TRENCH)
// ============================================================================

export const PotterNeighborhoodGroup: React.FC<{ isSiege?: boolean }> = ({ isSiege = false }) => {
  return (
    <group>
      {/* Surrounding Artisan Cottages */}
      <SangamDwelling position={[-12, 0, -4]} rotation={[0, 0.4, 0]} seed={2} roofType="terracotta_tile" />
      <SangamDwelling position={[-14, 0, 8]} rotation={[0, 1.3, 0]} seed={5} roofType="palm_thatch" />
      <SangamDwelling position={[11, 0, -5]} rotation={[0, -0.5, 0]} seed={3} roofType="terracotta_tile" />
      <SangamDwelling position={[13, 0, 7]} rotation={[0, -1.2, 0]} seed={7} roofType="palm_thatch" />

      {/* Low courtyard mud boundary walls */}
      <mesh position={[-6, 0.45, 2]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.9, 12]} />
        <meshStandardMaterial color="#634c38" roughness={0.95} />
      </mesh>
      <mesh position={[6, 0.45, 2]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.9, 12]} />
        <meshStandardMaterial color="#634c38" roughness={0.95} />
      </mesh>

      {/* Clay Preparation Pit (With Sediment Water Tub) */}
      <group position={[-3.5, 0, 3.5]}>
        {/* Shallow rectangular trench */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.2, 1.8]} />
          <meshStandardMaterial color="#4a382a" roughness={0.95} />
        </mesh>
        {/* Prepared damp clay lump */}
        <mesh position={[-0.4, 0.28, 0]}>
          <sphereGeometry args={[0.45, 8, 8]} />
          <meshStandardMaterial color="#7a4632" roughness={0.65} />
        </mesh>
        {/* Water container for wetting clay */}
        <mesh position={[0.7, 0.35, 0.3]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.6, 12]} />
          <meshStandardMaterial color="#8a442d" roughness={0.8} />
        </mesh>
      </group>

      {/* Multi-tier Wooden Drying Racks with Unfired Terracotta Pots */}
      <group position={[4.2, 0, 1.5]}>
        {/* Upright posts and horizontal timber slats */}
        {[-1.2, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.8, 0]} castShadow>
            <boxGeometry args={[0.08, 1.6, 0.08]} />
            <meshStandardMaterial color="#3d2b1f" roughness={0.85} />
          </mesh>
        ))}
        {/* 3 tiers of shelves */}
        {[0.35, 0.8, 1.25].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.6, 0.05, 0.6]} />
            <meshStandardMaterial color="#473426" roughness={0.85} />
          </mesh>
        ))}
        {/* Stacked drying vessels */}
        {!isSiege ? (
          <>
            {[-0.8, -0.3, 0.3, 0.8].map((x, idx) => (
              <mesh key={`t1_${idx}`} position={[x, 0.52, 0]} castShadow>
                <sphereGeometry args={[0.14, 8, 8]} />
                <meshStandardMaterial color="#b55838" roughness={0.85} />
              </mesh>
            ))}
            {[-0.6, 0, 0.6].map((x, idx) => (
              <mesh key={`t2_${idx}`} position={[x, 0.96, 0]} castShadow>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshStandardMaterial color="#9c482d" roughness={0.85} />
              </mesh>
            ))}
          </>
        ) : (
          /* Siege: sparse unfinished pottery */
          <mesh position={[0, 0.52, 0]} castShadow>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshStandardMaterial color="#8f462f" roughness={0.85} />
          </mesh>
        )}
      </group>

      {/* Sunk Kiln Firing Area (Peripheral safe trench) */}
      <group position={[-5.2, 0, -6]}>
        {/* Sunken Pit Rim */}
        <mesh position={[0, 0.25, 0]} receiveShadow>
          <cylinderGeometry args={[1.5, 1.6, 0.5, 16]} />
          <meshStandardMaterial color="#3d3228" roughness={0.98} />
        </mesh>
        {/* Ash and terracotta fragments layer */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.08, 16]} />
          <meshStandardMaterial color="#26211c" roughness={0.9} />
        </mesh>
        {/* Fired brick chimney vents */}
        {[-0.6, 0.6].map((x, i) => (
          <mesh key={i} position={[x, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.22, 0.6, 8]} />
            <meshStandardMaterial color="#8a442d" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Woven Palm Baskets & Clay Shovel Tools */}
      <group position={[1.5, 0, -3.2]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.25, 0.4, 10]} />
          <meshStandardMaterial color="#7a6245" roughness={0.9} />
        </mesh>
        {/* Wooden tool handle */}
        <mesh position={[0.4, 0.4, 0.1]} rotation={[0.4, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.9, 6]} />
          <meshStandardMaterial color="#4a3625" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

// ============================================================================
// 3. AUTHENTIC SANGAM MARKET STREET (COMMODITIES, GRAIN BINS, SIEGE CONTRAST)
// ============================================================================

export const MarketStreetGroup: React.FC<{ isSiege?: boolean }> = ({ isSiege = false }) => {
  return (
    <group>
      {/* Market Street Ground (Stone packed dirt with wagon ruts) */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#57493b" roughness={0.95} />
      </mesh>

      {/* Left side commercial row */}
      {[-12, -6, 0, 6, 12].map((z, i) => (
        <group key={`m_left_${i}`} position={[-6.5, 0, z]}>
          <SangamDwelling
            position={[0, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
            roofType={i % 2 === 0 ? 'terracotta_tile' : 'palm_thatch'}
            seed={i + 1}
            hasThinnai={true}
          />
          {/* Market Stall Goods on Front Veranda */}
          <group position={[2.2, 0, 0]}>
            {/* Bamboo / Timber Stall Table */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 0.7, 0.9]} />
              <meshStandardMaterial color="#4d3928" roughness={0.85} />
            </mesh>

            {/* Commodities (Grain bins, flower baskets, coarse cloth) */}
            {!isSiege ? (
              <group position={[0, 0.75, 0]}>
                {/* Woven grain basket with millets (Thinai / Varagu) */}
                <mesh position={[-0.45, 0.15, 0]} castShadow>
                  <cylinderGeometry args={[0.22, 0.18, 0.3, 10]} />
                  <meshStandardMaterial color="#b39868" roughness={0.9} />
                </mesh>
                {/* White Jasmine & Aathipoo flower basket */}
                <mesh position={[0.4, 0.12, 0.1]} castShadow>
                  <cylinderGeometry args={[0.2, 0.16, 0.22, 10]} />
                  <meshStandardMaterial color="#f0ece1" roughness={0.6} />
                </mesh>
                {/* Terracotta measuring cup (Marakkal) */}
                <mesh position={[0, 0.1, -0.2]}>
                  <cylinderGeometry args={[0.1, 0.1, 0.2, 8]} />
                  <meshStandardMaterial color="#8a442d" roughness={0.85} />
                </mesh>
              </group>
            ) : (
              /* During Siege: Stalls are shuttered, empty overturned baskets */
              <group position={[0, 0.75, 0]}>
                <mesh position={[0, 0.1, 0]} rotation={[0.4, 0, 1.2]} castShadow>
                  <cylinderGeometry args={[0.22, 0.18, 0.3, 10]} />
                  <meshStandardMaterial color="#5e4f3a" roughness={0.9} />
                </mesh>
              </group>
            )}
          </group>
        </group>
      ))}

      {/* Right side commercial row */}
      {[-12, -6, 0, 6, 12].map((z, i) => (
        <group key={`m_right_${i}`} position={[6.5, 0, z]}>
          <SangamDwelling
            position={[0, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            roofType={i % 2 === 1 ? 'terracotta_tile' : 'palm_thatch'}
            seed={i + 4}
            hasThinnai={true}
          />
          {/* Stall display */}
          <group position={[-2.2, 0, 0]}>
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 0.7, 0.9]} />
              <meshStandardMaterial color="#4d3928" roughness={0.85} />
            </mesh>
            {/* Large Earthen Grain Storage Silo (Kudhuru) */}
            <mesh position={[0, 0.7, -0.8]} castShadow>
              <cylinderGeometry args={[0.4, 0.45, 1.2, 12]} />
              <meshStandardMaterial color="#7a422d" roughness={0.88} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};

// ============================================================================
// 4. CIVIC GATHERING SPACE (MANRAM / AMBALAM UNDER ANCIENT MARUDHAM TREE)
// ============================================================================

export const CivicGatheringSpace: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, 0],
}) => {
  return (
    <group position={position}>
      {/* Stone assembly ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#524436" roughness={0.95} />
      </mesh>

      {/* Ancient Banyan / Marudham Shade Tree */}
      <group position={[0, 0, 0]}>
        {/* Massive Trunk */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.7, 1.0, 5, 10]} />
          <meshStandardMaterial color="#3b2b1d" roughness={0.92} />
        </mesh>
        {/* Supporting Aerial Roots */}
        {[-1.2, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 1.8, (i - 0.5) * 1.4]} castShadow>
            <cylinderGeometry args={[0.14, 0.18, 3.6, 6]} />
            <meshStandardMaterial color="#332417" roughness={0.95} />
          </mesh>
        ))}
        {/* Foliage Spreading Canopy */}
        <mesh position={[0, 5.8, 0]} castShadow>
          <sphereGeometry args={[4.2, 12, 10]} />
          <meshStandardMaterial color="#2d5224" roughness={0.85} />
        </mesh>
        <mesh position={[2.2, 5.2, 1.2]} castShadow>
          <sphereGeometry args={[3.2, 10, 8]} />
          <meshStandardMaterial color="#355e2b" roughness={0.85} />
        </mesh>
        <mesh position={[-2.4, 5.4, -1.0]} castShadow>
          <sphereGeometry args={[3.4, 10, 8]} />
          <meshStandardMaterial color="#294a20" roughness={0.85} />
        </mesh>
      </group>

      {/* Raised Circular Dressed-Stone Assembly Platform (Manram / Ambalam Thinnai) */}
      <group position={[0, 0.25, 0]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[3.4, 3.6, 0.5, 24]} />
          <meshStandardMaterial color="#614f40" roughness={0.85} />
        </mesh>
        {/* Top Sitting Flagstones */}
        <mesh position={[0, 0.26, 0]} receiveShadow>
          <cylinderGeometry args={[3.3, 3.3, 0.04, 24]} />
          <meshStandardMaterial color="#504134" roughness={0.8} />
        </mesh>
      </group>

      {/* Bordering Civics Huts */}
      <SangamDwelling position={[-8, 0, 7]} rotation={[0, 0.8, 0]} seed={4} />
      <SangamDwelling position={[9, 0, 6]} rotation={[0, -0.7, 0]} seed={6} />
    </group>
  );
};

// ============================================================================
// 5. MODEST HISTORICAL EARLY TAMIL SHRINE (KOTTAM / SACRED ENCLOSURE)
// ============================================================================

export const ModestShrineEnvironment: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const lampLightRef = useRef<THREE.PointLight>(null);

  // Subtle flicker for terracotta oil lamps
  useFrame(({ clock }) => {
    if (lampLightRef.current) {
      const t = clock.getElapsedTime();
      lampLightRef.current.intensity = 0.9 + Math.sin(t * 7.5) * 0.15 + Math.cos(t * 11) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Low Brick Courtyard Boundary (Kottam Enclosure) */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 0.9, 5.5]} />
        <meshStandardMaterial color="#7a4635" roughness={0.9} />
      </mesh>
      {/* Hollow inner courtyard */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[5.7, 1.0, 4.7]} />
        <meshStandardMaterial color="#544336" roughness={0.95} />
      </mesh>

      {/* 2. Modest Sanctum Room (Human-scale 2.6m high) */}
      <group position={[0, 0, -1.2]}>
        {/* Mud-brick walls with lime-wash accent */}
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 2.6, 2.2]} />
          <meshStandardMaterial color="#694d3c" roughness={0.88} />
        </mesh>
        {/* Low Entrance Opening */}
        <mesh position={[0, 0.9, 1.12]}>
          <boxGeometry args={[0.85, 1.7, 0.1]} />
          <meshStandardMaterial color="#1f1610" roughness={0.9} />
        </mesh>
        {/* Simple Timber Pillar Supports */}
        {[-0.55, 0.55].map((x, i) => (
          <mesh key={i} position={[x, 1.0, 1.15]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 2.0, 8]} />
            <meshStandardMaterial color="#362418" roughness={0.8} />
          </mesh>
        ))}
        {/* Low Pitch Terracotta Tiled Roof */}
        <mesh position={[0, 2.9, 0]} castShadow>
          <coneGeometry args={[2.1, 1.1, 4]} />
          <meshStandardMaterial color="#8c3e27" roughness={0.85} />
        </mesh>
      </group>

      {/* 3. Raised Granite Offering Altar Slab */}
      <group position={[0, 0.25, 0.4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.5, 0.7]} />
          <meshStandardMaterial color="#42352b" roughness={0.8} />
        </mesh>

        {/* Scattered White Aathipoo & Jasmine Flower Petal Offerings */}
        {[-0.3, -0.1, 0.15, 0.35].map((x, idx) => (
          <mesh key={idx} position={[x, 0.26, (idx % 2 - 0.5) * 0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        ))}

        {/* Terracotta Oil Lamp (Agal Vilakku) */}
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.06, 0.06, 8]} />
          <meshStandardMaterial color="#94472c" roughness={0.8} />
        </mesh>
        {/* Warm Lamp Flame Light */}
        <pointLight
          ref={lampLightRef}
          position={[0, 0.38, 0]}
          color="#ffaa44"
          distance={4.5}
          decay={2}
          intensity={0.95}
        />
      </group>

      {/* 4. Small Flowering Aathi Tree in Shrine Corner */}
      <group position={[2.1, 0, 1.6]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 2.8, 8]} />
          <meshStandardMaterial color="#3b2b1d" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <sphereGeometry args={[1.2, 8, 8]} />
          <meshStandardMaterial color="#2e5223" roughness={0.85} />
        </mesh>
        {/* White blossoms */}
        {[
          [0.3, 2.9, 0.8],
          [-0.4, 2.6, 0.7],
          [0.6, 2.7, -0.4],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ============================================================================
// 6. URAIYUR FORT BASTION & MASSIVE TIMBER GATE COMPLEX
// ============================================================================

export const FortGateComplex: React.FC<{ isOpen?: boolean }> = ({ isOpen = false }) => {
  return (
    <group position={[0, 0, -8]}>
      {/* Rammed Earth Ramparts */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[52, 8, 3.8]} />
        <meshStandardMaterial color="#5c4a39" roughness={0.95} />
      </mesh>
      {/* Timber Sentry Parapet Walkway */}
      <mesh position={[0, 8.4, 1.3]} castShadow>
        <boxGeometry args={[52, 1.2, 0.6]} />
        <meshStandardMaterial color="#473628" roughness={0.9} />
      </mesh>
      {/* Timber Palings */}
      {[-20, -15, -10, -5, 5, 10, 15, 20].map((x, i) => (
        <mesh key={i} position={[x, 9.4, 1.3]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.15]} />
          <meshStandardMaterial color="#332418" roughness={0.85} />
        </mesh>
      ))}

      {/* Massive Timber Double Gate Doors */}
      {!isOpen ? (
        /* Closed Gate with Iron Crossbars */
        <group position={[0, 3.2, 0.4]}>
          <mesh castShadow>
            <boxGeometry args={[5.6, 6.4, 0.4]} />
            <meshStandardMaterial color="#332419" roughness={0.85} />
          </mesh>
          {/* Iron Reinforcing Straps */}
          {[-1.5, 0, 1.5].map((y, i) => (
            <mesh key={i} position={[0, y, 0.22]}>
              <boxGeometry args={[5.7, 0.32, 0.05]} />
              <meshStandardMaterial color="#26282b" metalness={0.8} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ) : (
        /* Open Gate (Folded back against the gate jambs) */
        <group>
          <mesh position={[-3.2, 3.2, -0.6]} rotation={[0, -Math.PI / 2.5, 0]} castShadow>
            <boxGeometry args={[2.7, 6.4, 0.35]} />
            <meshStandardMaterial color="#332419" roughness={0.85} />
          </mesh>
          <mesh position={[3.2, 3.2, -0.6]} rotation={[0, Math.PI / 2.5, 0]} castShadow>
            <boxGeometry args={[2.7, 6.4, 0.35]} />
            <meshStandardMaterial color="#332419" roughness={0.85} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// ============================================================================
// 7. LIGHTWEIGHT BACKGROUND CITY SKYLINE SILHOUETTES (DEPTH & PARALLAX)
// ============================================================================

export const CitySkylineSilhouettes: React.FC<{ position?: [number, number, number] }> = ({
  position = [0, 0, -28],
}) => {
  return (
    <group position={position}>
      {/* Repeating tiered roof silhouettes with palm canopies */}
      {[-36, -24, -12, 0, 12, 24, 36].map((x, i) => {
        const h = 4.5 + (Math.abs(i * 3) % 4) * 0.8;
        return (
          <group key={i} position={[x, h / 2, (i % 2) * -3]}>
            <mesh>
              <boxGeometry args={[6.5, h, 2]} />
              <meshBasicMaterial color="#2c221a" />
            </mesh>
            <mesh position={[0, h / 2 + 1.2, 0]}>
              <coneGeometry args={[4.2, 2.4, 4]} />
              <meshBasicMaterial color="#231a14" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
