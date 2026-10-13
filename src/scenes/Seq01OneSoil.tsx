import React from 'react';
import { IlangathirCharacter, SembiyanCharacter, ArumbuCharacter, MaaranCharacter } from '../characters/CharacterPresets';
import { PottersWheel, SangamTree } from '../environments/Props';
import { PotterNeighborhoodGroup, CitySkylineSilhouettes } from '../environments/CityArchitecture';
import { TimelineState } from '../timeline/FilmTimelineController';
import { EmotionState } from '../characters/FaceExpressionController';

export const Seq01OneSoil: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const isMemory = t < 100;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  // Emotional progression for Hero Moment 1
  let boyEmotion: EmotionState = 'curiosity';
  let fatherEmotion: EmotionState = 'small_happiness';

  if (t < 35) {
    boyEmotion = 'curiosity';
    fatherEmotion = 'neutral';
  } else if (t < 55) {
    // Father explains balance; horse stabilizes; delight!
    boyEmotion = 'small_happiness';
    fatherEmotion = 'small_happiness';
  } else if (t < 95) {
    boyEmotion = 'small_happiness';
    fatherEmotion = 'small_happiness';
  } else if (t < 105) {
    // Drum interrupts
    boyEmotion = 'fear';
    fatherEmotion = 'concern';
  } else {
    // Present day alone
    boyEmotion = 'sadness';
  }

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
        <meshStandardMaterial color="#2d5e73" roughness={0.2} metalness={0.4} transparent opacity={0.88} />
      </mesh>

      {/* Background City Skyline Silhouettes */}
      <CitySkylineSilhouettes position={[0, 0, -26]} />

      {/* Expanded Potter's Neighborhood (Courtyard, Drying Racks, Kiln Pit, Dwellings) */}
      <PotterNeighborhoodGroup isSiege={!isMemory} />

      {/* Riverside Ancient Trees */}
      <SangamTree position={[-16, 0, 14]} scale={1.2} />
      <SangamTree position={[15, 0, 16]} scale={1.1} />

      {/* Potter's wheel with wet clay at courtyard center */}
      <PottersWheel position={[0, 0, 0]} isSpinning={isMemory} />

      {/* --- HERO MOMENT 1: MAKING THE CLAY HORSE --- */}
      {isMemory ? (
        <>
          {/* Father Sembiyan guiding son's hands on wheel */}
          <SembiyanCharacter
            position={[-0.75, 0, 0.2]}
            rotation={[0, 1.15, 0]}
            pose={t < 48 ? 'pottery_working' : 'idle_standing'}
            emotion={fatherEmotion}
            speechActivity={speaker === 'sembiyan' ? speech : 0}
            lookAtTarget={[0.4, 0.6, 0.2]}
          />

          {/* Ilangathir with his clay horse */}
          <IlangathirCharacter
            position={[0.55, 0, 0.25]}
            rotation={[0, -1.15, 0]}
            pose={t < 48 ? 'pottery_working' : 'holding_horse'}
            prop="clay_horse"
            emotion={boyEmotion}
            speechActivity={speaker === 'ilangathir' ? speech : 0}
            lookAtTarget={[-0.75, 1.35, 0.2]}
          />

          {/* Brother Maaran arriving (after 45s) */}
          {t >= 45 && (
            <MaaranCharacter
              position={[2.8, 0, -2.5]}
              rotation={[0, -0.6, 0]}
              pose={t < 65 ? 'walking' : 'idle_standing'}
              emotion={t > 95 ? 'concern' : 'small_happiness'}
              prop="none"
              lookAtTarget={[0, 1.0, 0]}
            />
          )}

          {/* Mother Arumbu calling everyone (after 60s) */}
          {t >= 60 && (
            <ArumbuCharacter
              position={[-2.4, 0, -0.5]}
              rotation={[0, 0.9, 0]}
              pose={t < 75 ? 'gesturing' : 'idle_standing'}
              emotion={t > 95 ? 'concern' : 'small_happiness'}
              prop="porridge_bowl"
              speechActivity={speaker === 'arumbu' ? speech : 0}
              lookAtTarget={[0, 1.0, 0]}
            />
          )}
        </>
      ) : (
        /* Present Day: Boy alone in dusty courtyard with clay horse */
        <IlangathirCharacter
          position={[0, 0, 0.5]}
          rotation={[0, 0, 0]}
          pose="holding_horse"
          prop="clay_horse"
          emotion="sadness"
          lookAtTarget={[0, 1.5, 5]}
        />
      )}
    </group>
  );
};
