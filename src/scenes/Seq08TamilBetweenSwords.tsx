import React from 'react';
import {
  IlangathirCharacter,
  KovurKizharCharacter,
  NalankilliCharacter,
  NedunkilliCharacter,
  SembiyanCharacter,
  MaaranCharacter,
} from '../characters/CharacterPresets';
import { SoldierCrowd } from '../characters/SoldierCrowd';
import { TimelineState } from '../timeline/FilmTimelineController';
import { EmotionState } from '../characters/FaceExpressionController';

export const Seq08TamilBetweenSwords: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  // Staging progression for Hero Moment 4 (Two Flowers & Climax)
  const isPresentingFlowers = t >= 960 && t < 1005;
  const weaponsLowered = t >= 1005;

  let boyEmotion: EmotionState = 'determination';
  let nalankilliEmotion: EmotionState = 'determination';
  let nedunkilliEmotion: EmotionState = 'determination';
  let poetEmotion: EmotionState = 'determination';
  let familyEmotion: EmotionState = 'concern';

  if (t < 930) {
    // Purananuru 45 Recitation by Kovur Kizhar
    poetEmotion = 'determination';
    nalankilliEmotion = t > 900 ? 'concern' : 'determination';
    nedunkilliEmotion = t > 900 ? 'concern' : 'determination';
  } else if (t < 960) {
    // Ilangathir calls out "அப்பா! அண்ணா!"
    boyEmotion = 'fear';
    familyEmotion = 'fear';
  } else if (t < 1005) {
    // Hero Moment 4: "இதில் எந்தப் பூ வெல்ல வேண்டும்?"
    boyEmotion = 'determination'; // Quiet, unflinching, innocent courage
    nalankilliEmotion = 'concern'; // Kings stunned by the question
    nedunkilliEmotion = 'concern';
    poetEmotion = 'determination';
    familyEmotion = 'concern';
  } else {
    // 1005 - 1020s: Ceasefire & Weapons Lowered
    boyEmotion = 'relief';
    nalankilliEmotion = 'relief';
    nedunkilliEmotion = 'relief';
    poetEmotion = 'relief';
    familyEmotion = 'relief';
  }

  // Boy looks between both kings during the two-flower appeal
  const boyGazeTarget: [number, number, number] =
    t >= 970 && t < 976 ? [-1.8, 1.7, -1.5] : [1.8, 1.7, -1.5];

  return (
    <group>
      {/* Truce field terrain */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#5e4431" roughness={0.9} />
      </mesh>

      {/* Fortress wall behind Nedunkilli's garrison */}
      <mesh position={[0, 4, -14]} castShadow receiveShadow>
        <boxGeometry args={[60, 8, 3]} />
        <meshStandardMaterial color="#614f3e" roughness={0.95} />
      </mesh>

      {/* --- ARMY RANKS ON FLANKS --- */}
      {/* Nalankilli's besieging host (left side) */}
      <SoldierCrowd
        count={28}
        areaWidth={18}
        areaDepth={5}
        centerPosition={[-12, 0, 2]}
        faction="nalankilli"
        weaponsLowered={weaponsLowered}
      />

      {/* Nedunkilli's garrison host (right side) */}
      <SoldierCrowd
        count={28}
        areaWidth={18}
        areaDepth={5}
        centerPosition={[12, 0, 2]}
        faction="nedunkilli"
        weaponsLowered={weaponsLowered}
      />

      {/* Sembiyan in Nalankilli's front rank */}
      <SembiyanCharacter
        position={[-3.8, 0, 1.2]}
        rotation={[0, 0.8, 0]}
        pose={weaponsLowered ? 'spear_lowered' : 'spear_ready'}
        prop="spear"
        emotion={familyEmotion}
        lookAtTarget={[0, 1.2, 0]}
      />

      {/* Maaran in Nedunkilli's front rank */}
      <MaaranCharacter
        position={[3.8, 0, 1.2]}
        rotation={[0, -0.8, 0]}
        pose={weaponsLowered ? 'shield_lowered' : 'shield_raised'}
        prop="shield"
        emotion={familyEmotion}
        lookAtTarget={[0, 1.2, 0]}
      />

      {/* --- CENTER MEETING GROUND: HERO MOMENT 4 --- */}
      {/* Nalankilli (left monarch, gold armor, white aathipoo garland) */}
      <NalankilliCharacter
        position={[-1.8, 0, -1.5]}
        rotation={[0, 0.5, 0]}
        pose={weaponsLowered ? 'idle_standing' : 'gesturing'}
        emotion={nalankilliEmotion}
        speechActivity={speaker === 'nalankilli' ? speech : 0}
        lookAtTarget={isPresentingFlowers ? [0.3, 0.9, 0.6] : [1.8, 1.7, -1.5]}
      />

      {/* Nedunkilli (right monarch, bronze armor, white aathipoo garland) */}
      <NedunkilliCharacter
        position={[1.8, 0, -1.5]}
        rotation={[0, -0.5, 0]}
        pose={weaponsLowered ? 'idle_standing' : 'gesturing'}
        emotion={nedunkilliEmotion}
        speechActivity={speaker === 'nedunkilli' ? speech : 0}
        lookAtTarget={isPresentingFlowers ? [0.3, 0.9, 0.6] : [-1.8, 1.7, -1.5]}
      />

      {/* Kovur Kizhar standing central and moral */}
      <KovurKizharCharacter
        position={[-0.5, 0, -0.4]}
        rotation={[0, 0.1, 0]}
        pose="poet_appeal"
        prop="poet_staff"
        emotion={poetEmotion}
        speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
        lookAtTarget={[0, 1.8, -1.5]}
      />

      {/* Ilangathir stepping between the kings with the two flowers */}
      <IlangathirCharacter
        position={[0.3, 0, 0.6]}
        rotation={[0, 0, 0]}
        pose={isPresentingFlowers ? 'presenting_flowers' : 'holding_horse'}
        prop="two_flowers"
        emotion={boyEmotion}
        speechActivity={speaker === 'ilangathir' ? speech : 0}
        lookAtTarget={boyGazeTarget}
      />
    </group>
  );
};
