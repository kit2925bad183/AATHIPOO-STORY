import React from 'react';
import { IlangathirCharacter, KovurKizharCharacter, SembiyanCharacter, MaaranCharacter } from '../characters/CharacterPresets';
import { SangamTree } from '../environments/Props';
import { TimelineState } from '../timeline/FilmTimelineController';

export const Seq07BeforeDawn: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  // Intercut stages within sequence 7:
  // 720 - 750: Sembiyan & Maaran dawn weapon prep
  // 750 - 790: Poet arranging truce
  // 790 - 840: Ilangathir picking two Aathipoo flowers
  const isIntercutWeapons = t < 765;

  return (
    <group>
      {/* Cold blue dawn ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#2d384a" roughness={0.9} />
      </mesh>

      {/* Blooming Aathi Tree with white flowers */}
      <SangamTree position={[3, 0, 0]} isAathiTree={true} scale={1.3} />

      {isIntercutWeapons ? (
        <>
          {/* Father Sembiyan lifting spear in the mist */}
          <SembiyanCharacter
            characterId="sembiyan"
            position={[-2.5, 0, 0]}
            rotation={[0, 0.4, 0]}
            pose="spear_ready"
            prop="spear"
            emotion="concern"
            lookAtTarget={[0, 2, 8]}
          />

          {/* Brother Maaran fastening shield */}
          <MaaranCharacter
            characterId="maaran"
            position={[2.5, 0, 0]}
            rotation={[0, -0.4, 0]}
            pose="shield_raised"
            prop="shield"
            emotion="fear"
            lookAtTarget={[0, 2, 8]}
          />
        </>
      ) : (
        /* 765 - 840s: Under blooming Aathi tree: boy picks two flowers with the poet */
        <>
          <KovurKizharCharacter
            characterId="kovur_kizhar"
            position={[-0.8, 0, 0.2]}
            rotation={[0, 0.9, 0]}
            pose="idle_standing"
            prop="poet_staff"
            emotion="determination"
            speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
            lookAtTarget={[0.6, 1.0, 0.5]}
          />

          <IlangathirCharacter
            characterId="ilangathir"
            position={[0.6, 0, 0.5]}
            rotation={[0, -0.9, 0]}
            pose="holding_horse"
            prop="two_flowers"
            emotion="determination"
            speechActivity={speaker === 'ilangathir' ? speech : 0}
            lookAtTarget={[-0.8, 1.5, 0.2]}
          />
        </>
      )}
    </group>
  );
};
