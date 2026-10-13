import React from 'react';
import { IlangathirCharacter, SembiyanCharacter, ArumbuCharacter, MaaranCharacter, KovurKizharCharacter } from '../characters/CharacterPresets';
import { PottersWheel, SangamTree } from '../environments/Props';
import { PotterNeighborhoodGroup, CitySkylineSilhouettes } from '../environments/CityArchitecture';
import { TimelineState } from '../timeline/FilmTimelineController';
import { PropManager } from '../characters/PropManager';

export const Seq10WheelTurnsAgain: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;
  const propSnap = PropManager.getSnapshotAtTime(timeline.currentTime);

  return (
    <group>
      {/* Kaveri River ground & waters */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#6e5239" roughness={0.9} />
      </mesh>

      {/* Kaveri river water band to the North */}
      <mesh position={[0, 0.05, 20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 24]} />
        <meshStandardMaterial color="#326c85" roughness={0.2} metalness={0.4} transparent opacity={0.88} />
      </mesh>

      {/* Background City Skyline */}
      <CitySkylineSilhouettes position={[0, 0, -26]} />

      {/* Expanded Potter's Neighborhood (Active pottery racks & artisan life returning) */}
      <PotterNeighborhoodGroup isSiege={false} />

      {/* Trees */}
      <SangamTree position={[-16, 0, 12]} scale={1.2} />
      <SangamTree position={[15, 0, 14]} scale={1.1} />

      {/* The Potter's Wheel spinning smoothly */}
      <PottersWheel position={[0, 0, 0]} isSpinning={true} />

      {/* Sunny Wooden Bench for the Two Horses */}
      <group position={[0.8, 0, 0.6]}>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.3, 0.4]} />
          <meshStandardMaterial color="#5e4128" roughness={0.85} />
        </mesh>

        {/* The New Perfectly Completed 4-legged Clay Horse */}
        <group position={[-0.18, 0.38, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.17, 0.11, 0.09]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[0.085, 0.09, 0]}>
            <boxGeometry args={[0.065, 0.13, 0.065]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          {/* 4 Stable Legs */}
          <mesh position={[-0.05, -0.09, 0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[0.05, -0.09, 0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[-0.05, -0.09, -0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[0.05, -0.09, -0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
        </group>

        {/* The Mended/Preserved Old Broken Horse Resting Respectfully Beside It */}
        <group position={[0.18, 0.38, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.17, 0.11, 0.09]} />
            <meshStandardMaterial color="#a64c2e" roughness={0.9} />
          </mesh>
          <mesh position={[0.085, 0.09, 0]}>
            <boxGeometry args={[0.065, 0.13, 0.065]} />
            <meshStandardMaterial color="#a64c2e" roughness={0.9} />
          </mesh>
          <mesh position={[-0.05, -0.09, 0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#a64c2e" roughness={0.9} />
          </mesh>
          <mesh position={[-0.05, -0.09, -0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#a64c2e" roughness={0.9} />
          </mesh>
          <mesh position={[0.05, -0.09, -0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#a64c2e" roughness={0.9} />
          </mesh>
          {/* Snapped leg piece placed gently beside */}
          <mesh position={[0.05, -0.09, 0.035]} rotation={[0, 0, Math.PI / 3]}>
            <cylinderGeometry args={[0.016, 0.016, 0.08, 8]} />
            <meshStandardMaterial color="#a64c2e" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* Father Sembiyan turning wheel with practicing ease */}
      <SembiyanCharacter
        position={[-0.8, 0, 0.2]}
        rotation={[0, 1.2, 0]}
        pose="pottery_working"
        emotion="small_happiness"
        lookAtTarget={[0, 0.5, 0]}
      />

      {/* Brother Maaran helping his father */}
      <MaaranCharacter
        position={[0.8, 0, -0.2]}
        rotation={[0, -1.2, 0]}
        pose="pottery_working"
        emotion="small_happiness"
        prop="none"
        lookAtTarget={[0, 0.5, 0]}
      />

      {/* Ilangathir with spontaneous delight */}
      <IlangathirCharacter
        position={[0.15, 0, 0.85]}
        rotation={[0, -0.25, 0]}
        pose="idle_standing"
        prop="none"
        emotion="small_happiness"
        speechActivity={speaker === 'ilangathir' ? speech : 0}
        lookAtTarget={[-2.2, 1.4, 1.6]}
      />

      {/* Mother Arumbu standing proudly beside Ilangathir */}
      <ArumbuCharacter
        position={[-0.45, 0, 0.85]}
        rotation={[0, 0.25, 0]}
        pose="idle_standing"
        emotion="small_happiness"
        lookAtTarget={[0.15, 0.9, 0.85]}
      />

      {/* Kovur Kizhar answering the final question before departing */}
      <KovurKizharCharacter
        position={[-2.2, 0, 1.6]}
        rotation={[0, 0.7, 0]}
        pose="idle_standing"
        prop="poet_staff"
        emotion="relief"
        speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
        lookAtTarget={[0.15, 1.0, 0.85]}
      />
    </group>
  );
};
