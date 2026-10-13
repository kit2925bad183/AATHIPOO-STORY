import React from 'react';
import { IlangathirCharacter, ArumbuCharacter, MaaranCharacter } from '../characters/CharacterPresets';
import { TimelineState } from '../timeline/FilmTimelineController';
import { EmotionState } from '../characters/FaceExpressionController';

import { FortGateComplex, MarketStreetGroup, CitySkylineSilhouettes } from '../environments/CityArchitecture';

export const Seq02ClosedGates: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  // Emotional progression for Hero Moment 2 (The Unanswerable Question)
  let boyEmotion: EmotionState = 'concern';
  let motherEmotion: EmotionState = 'concern';

  if (t < 194) {
    boyEmotion = 'curiosity';
    motherEmotion = 'concern';
  } else if (t < 204) {
    // "அப்பா வென்றால்… அண்ணன்?"
    boyEmotion = 'concern';
    motherEmotion = 'sadness'; // Mother stops, looks down, pain registers
  } else if (t < 225) {
    // Quiet resolute maternal answer
    boyEmotion = 'sadness';
    motherEmotion = 'determination';
  } else {
    boyEmotion = 'concern';
    motherEmotion = 'determination';
  }

  return (
    <group>
      {/* City ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#5e5246" roughness={0.9} />
      </mesh>

      {/* Massive Uraiyur Fort Ramparts & Closed Timber Gates */}
      <FortGateComplex isOpen={false} />

      {/* City Skyline Silhouettes */}
      <CitySkylineSilhouettes position={[0, 0, -22]} />

      {/* Besieged Market Street with closed stalls and scarcity */}
      <group position={[0, 0, 8]}>
        <MarketStreetGroup isSiege={true} />
      </group>

      {/* Brother Maaran stationed on rampart looking outwards with tension */}
      <MaaranCharacter
        position={[1.2, 8.0, -7.0]}
        rotation={[0, 0, 0]}
        pose="idle_standing"
        prop="spear"
        emotion="concern"
        lookAtTarget={[0, 2, 10]}
      />

      {/* --- HERO MOMENT 2: THE UNANSWERABLE QUESTION --- */}
      <group position={[-2, 0, 2]}>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.5, 2.0]} />
          <meshStandardMaterial color="#54473b" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.6, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.5, 1.0]} />
          <meshStandardMaterial color="#54473b" roughness={0.9} />
        </mesh>

        {/* Mother Arumbu resting by stone steps */}
        <ArumbuCharacter
          position={[-0.4, 0.6, -0.4]}
          rotation={[0, 0.4, 0]}
          pose="idle_sitting"
          emotion={motherEmotion}
          speechActivity={speaker === 'arumbu' ? speech : 0}
          lookAtTarget={t >= 194 && t < 204 ? [-0.2, 0.2, -0.2] : [0.6, 0.4, 0.2]}
        />

        {/* Ilangathir searching mother's face */}
        <IlangathirCharacter
          position={[0.6, 0.4, 0.2]}
          rotation={[0, -0.4, 0]}
          pose="idle_sitting"
          prop="clay_horse"
          emotion={boyEmotion}
          speechActivity={speaker === 'ilangathir' ? speech : 0}
          lookAtTarget={[-0.4, 0.8, -0.4]}
        />
      </group>
    </group>
  );
};
