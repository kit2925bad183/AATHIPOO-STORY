import React from 'react';
import { IlangathirCharacter, KovurKizharCharacter, ArumbuCharacter, SembiyanCharacter, MaaranCharacter } from '../characters/CharacterPresets';
import { TimelineState } from '../timeline/FilmTimelineController';
import { EmotionState } from '../characters/FaceExpressionController';

import { FortGateComplex, MarketStreetGroup, CitySkylineSilhouettes } from '../environments/CityArchitecture';

export const Seq09GatesOpen: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  // Emotional progression for Hero Moment 5 (Family Reunion)
  const isFamilyUnited = t >= 1080;
  const familyEmotion: EmotionState = 'relief';

  return (
    <group>
      {/* Sunlit highway ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#66523e" roughness={0.9} />
      </mesh>

      {/* Fortress Wall with Open Timber Gates */}
      <FortGateComplex isOpen={true} />

      {/* City Skyline */}
      <CitySkylineSilhouettes position={[0, 0, -22]} />

      {/* Market Street Beyond Gate (Relief & trade returning) */}
      <group position={[0, 0, 12]}>
        <MarketStreetGroup isSiege={false} />
      </group>

      {/* Grain / food cart passing through */}
      <group position={[0, 0, -4]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.8, 0.6, 2.8]} />
          <meshStandardMaterial color="#573e2a" roughness={0.9} />
        </mesh>
        <mesh position={[-1.0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 12]} />
          <meshStandardMaterial color="#362517" roughness={0.9} />
        </mesh>
        <mesh position={[1.0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 12]} />
          <meshStandardMaterial color="#362517" roughness={0.9} />
        </mesh>
      </group>

      {/* --- HERO MOMENT 5: FAMILY REUNION EMBRACE --- */}
      <group position={[0, 0, 1.5]}>
        {/* Father Sembiyan */}
        <SembiyanCharacter
          position={[-0.5, 0, -0.2]}
          rotation={[0, 0.8, 0]}
          pose="embracing"
          emotion={familyEmotion}
          lookAtTarget={[0.5, 1.4, -0.2]}
        />

        {/* Older Brother Maaran */}
        <MaaranCharacter
          position={[0.5, 0, -0.2]}
          rotation={[0, -0.8, 0]}
          pose="embracing"
          emotion={familyEmotion}
          lookAtTarget={[-0.5, 1.4, -0.2]}
        />

        {/* Mother Arumbu reaching and wrapping arms */}
        <ArumbuCharacter
          position={[-0.3, 0, isFamilyUnited ? 0.35 : 1.2]}
          rotation={[0, 0.3, 0]}
          pose={isFamilyUnited ? 'embracing' : 'walking'}
          emotion={familyEmotion}
          lookAtTarget={[0, 1.4, -0.2]}
        />

        {/* Ilangathir joining the embrace */}
        <IlangathirCharacter
          position={[0.35, 0, isFamilyUnited ? 0.4 : 1.4]}
          rotation={[0, -0.3, 0]}
          pose={isFamilyUnited ? 'embracing' : 'walking'}
          prop={isFamilyUnited ? 'none' : 'broken_horse'}
          emotion={familyEmotion}
          speechActivity={speaker === 'ilangathir' ? speech : 0}
          lookAtTarget={[0, 1.4, -0.2]}
        />
      </group>

      {/* Poet Kovur Kizhar walking peacefully down the southern highway */}
      <KovurKizharCharacter
        position={[-4.5, 0, 4.0]}
        rotation={[0, -2.4, 0]}
        pose="walking"
        prop="poet_staff"
        emotion="relief"
        lookAtTarget={[-10, 1.5, 10]}
      />
    </group>
  );
};
