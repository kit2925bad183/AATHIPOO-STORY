import React from 'react';
import { IlangathirCharacter, KovurKizharCharacter, NedunkilliCharacter, MaaranCharacter } from '../characters/CharacterPresets';
import { TimelineState } from '../timeline/FilmTimelineController';

export const Seq04KingWithin: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;
  const isHall = t < 450;

  return (
    <group>
      {/* Stone polished hall floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#2e2520" roughness={0.6} />
      </mesh>

      {/* Ancient carved wooden/stone pillars */}
      {[-4, 4].map((x) =>
        [-4, 0, 4].map((z) => (
          <group key={`${x}_${z}`} position={[x, 0, z]}>
            <mesh position={[0, 3, 0]} castShadow>
              <cylinderGeometry args={[0.35, 0.45, 6, 12]} />
              <meshStandardMaterial color="#47382d" roughness={0.8} />
            </mesh>
            {/* Pillar capital */}
            <mesh position={[0, 5.8, 0]}>
              <boxGeometry args={[1.0, 0.4, 1.0]} />
              <meshStandardMaterial color="#574639" roughness={0.8} />
            </mesh>
          </group>
        ))
      )}

      {/* Wall behind throne */}
      <mesh position={[0, 3.5, -8]} castShadow receiveShadow>
        <boxGeometry args={[20, 7, 1]} />
        <meshStandardMaterial color="#3b2d24" roughness={0.9} />
      </mesh>

      {/* Chola Tiger Insignia Banner */}
      <mesh position={[0, 4.2, -7.4]}>
        <planeGeometry args={[2.5, 4.0]} />
        <meshStandardMaterial color="#9e2819" roughness={0.6} />
      </mesh>

      {isHall ? (
        <>
          {/* Throne Dias */}
          <mesh position={[0, 0.4, -4]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.8, 2.4]} />
            <meshStandardMaterial color="#543b2a" roughness={0.7} />
          </mesh>

          {/* Nedunkilli on his throne */}
          <NedunkilliCharacter
            characterId="nedunkilli"
            position={[0, 0.8, -4]}
            rotation={[0, 0, 0]}
            pose="idle_sitting"
            emotion={t < 420 ? 'concern' : 'determination'}
            speechActivity={speaker === 'nedunkilli' ? speech : 0}
            lookAtTarget={[0, 1.4, 0]}
          />

          {/* Kovur Kizhar standing before the dias */}
          <KovurKizharCharacter
            characterId="kovur_kizhar"
            position={[-0.8, 0, -1.2]}
            rotation={[0, 0.3, 0]}
            pose="poet_appeal"
            emotion="determination"
            speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
            lookAtTarget={[0, 2.0, -4]}
          />

          {/* Ilangathir standing beside the poet */}
          <IlangathirCharacter
            characterId="ilangathir"
            position={[0.8, 0, -1.0]}
            rotation={[0, -0.3, 0]}
            pose="holding_horse"
            prop="clay_horse"
            emotion="concern"
            speechActivity={speaker === 'ilangathir' ? speech : 0}
            lookAtTarget={[0, 2.0, -4]}
          />
        </>
      ) : (
        /* 450 - 480s: Courtyard passage encounter with brother Maaran */
        <group position={[0, 0, 0]}>
          <MaaranCharacter
            characterId="maaran"
            position={[-0.6, 0, 0]}
            rotation={[0, 1.3, 0]}
            pose="idle_standing"
            prop="spear"
            emotion="concern"
            speechActivity={speaker === 'maaran' ? speech : 0}
            lookAtTarget={[0.6, 1.0, 0]}
          />
          <IlangathirCharacter
            characterId="ilangathir"
            position={[0.6, 0, 0]}
            rotation={[0, -1.3, 0]}
            pose="holding_horse"
            prop="clay_horse"
            emotion="sadness"
            speechActivity={speaker === 'ilangathir' ? speech : 0}
            lookAtTarget={[-0.6, 1.5, 0]}
          />
        </group>
      )}
    </group>
  );
};
