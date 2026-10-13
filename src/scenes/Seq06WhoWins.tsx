import React from 'react';
import { IlangathirCharacter, KovurKizharCharacter, NalankilliCharacter } from '../characters/CharacterPresets';
import { TimelineState } from '../timeline/FilmTimelineController';
import { PropManager } from '../characters/PropManager';
import { EmotionState } from '../characters/FaceExpressionController';

export const Seq06WhoWins: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  // Prop snapshot for deterministic continuity of the falling/broken horse
  const propSnap = PropManager.getSnapshotAtTime(t);

  // Emotional progression for Hero Moment 3 (The Horse Breaks)
  let boyEmotion: EmotionState = 'concern';
  let kingEmotion: EmotionState = 'determination';
  let poetEmotion: EmotionState = 'determination';

  if (t < 698) {
    boyEmotion = 'concern';
    kingEmotion = 'determination';
    poetEmotion = 'determination';
  } else if (t < 702) {
    // Slip, fall and break!
    boyEmotion = 'fear'; // startled freeze
    kingEmotion = 'concern'; // king stops mid-sentence, looking down at child
    poetEmotion = 'concern';
  } else {
    // 702 - 720s: Boy reaches for broken piece; tearful plea to send father home
    boyEmotion = 'sadness';
    kingEmotion = 'concern'; // King's stilled silence
    poetEmotion = 'determination';
  }

  return (
    <group>
      {/* Royal Pavilion carpet ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial color="#3d2119" roughness={0.7} />
      </mesh>

      {/* Royal Pavilion Tent Structure */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[6.5, 7.5, 7, 10, 1, true]} />
        <meshStandardMaterial color="#6e2d1d" roughness={0.8} side={2} />
      </mesh>

      {/* Pavilion Central Pole */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 7, 8]} />
        <meshStandardMaterial color="#402816" roughness={0.8} />
      </mesh>

      {/* War map table on treated hides */}
      <group position={[0, 0, -1]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.9, 1.4]} />
          <meshStandardMaterial color="#543722" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.6, 1.0]} />
          <meshStandardMaterial color="#c2a97c" roughness={0.6} />
        </mesh>
      </group>

      {/* --- HERO MOMENT 3: THE HORSE BREAKS --- */}
      {/* Detached Broken Horse on Ground during 698 - 714s */}
      {(propSnap.horseState === 'FALLING' || propSnap.horseState === 'BROKEN_ON_GROUND') && (
        <group position={propSnap.horsePosition} rotation={propSnap.horseRotation}>
          {/* Main horse body */}
          <mesh castShadow>
            <boxGeometry args={[0.17, 0.11, 0.09]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[0.085, 0.09, 0]}>
            <boxGeometry args={[0.065, 0.13, 0.065]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          {/* Remaining 3 legs */}
          <mesh position={[-0.05, -0.09, -0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[0.05, -0.09, -0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          <mesh position={[0.05, -0.09, 0.035]}>
            <cylinderGeometry args={[0.016, 0.016, 0.09, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
          {/* Detached front leg snapped off cleanly on carpet */}
          <mesh position={propSnap.brokenLegOffset} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.016, 0.016, 0.085, 8]} />
            <meshStandardMaterial color="#b35434" roughness={0.88} />
          </mesh>
        </group>
      )}

      {/* King Nalankilli */}
      <NalankilliCharacter
        position={[0, 0, -2.6]}
        rotation={[0, 0, 0]}
        pose={t < 670 ? 'gesturing' : 'idle_standing'}
        emotion={kingEmotion}
        speechActivity={speaker === 'nalankilli' ? speech : 0}
        lookAtTarget={t >= 698 ? [0.9, 0.2, 1.0] : [0, 1.5, 1]}
      />

      {/* Kovur Kizhar standing dignified */}
      <KovurKizharCharacter
        position={[-1.2, 0, 0.8]}
        rotation={[0, 0.5, 0]}
        pose="poet_appeal"
        prop="poet_staff"
        emotion={poetEmotion}
        speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
        lookAtTarget={[0, 1.8, -2.6]}
      />

      {/* Ilangathir */}
      <IlangathirCharacter
        position={[0.9, 0, 1.0]}
        rotation={[0, -0.4, 0]}
        pose={t >= 714 ? 'holding_horse' : t >= 698 ? 'idle_standing' : 'holding_horse'}
        prop={t >= 714 ? 'broken_horse' : t >= 698 ? 'none' : 'clay_horse'}
        emotion={boyEmotion}
        speechActivity={speaker === 'ilangathir' ? speech : 0}
        lookAtTarget={t >= 698 && t < 706 ? [0.9, 0.06, 0.6] : [0, 1.8, -2.6]}
      />
    </group>
  );
};
