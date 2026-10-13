import React from 'react';
import { IlangathirCharacter, KovurKizharCharacter, SembiyanCharacter, ArumbuCharacter } from '../characters/CharacterPresets';
import { Campfire } from '../environments/Props';
import { ModestShrineEnvironment, CitySkylineSilhouettes } from '../environments/CityArchitecture';
import { SoldierCrowd } from '../characters/SoldierCrowd';
import { TimelineState } from '../timeline/FilmTimelineController';

export const Seq05BeyondWalls: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;
  const isShrineDeparture = timeline.currentTime < 518;
  const isFatherEncounter = timeline.currentTime >= 540;

  if (isShrineDeparture) {
    return (
      <group>
        {/* City lane ground outside domestic quarters */}
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#57493b" roughness={0.95} />
        </mesh>

        {/* City Skyline */}
        <CitySkylineSilhouettes position={[0, 0, -22]} />

        {/* Modest Early Tamil Shrine (Kottam) with oil lamp & flower altar */}
        <ModestShrineEnvironment position={[0, 0, 0]} />

        {/* Mother Arumbu pausing by the shrine with food parcel before departure */}
        <ArumbuCharacter
          characterId="arumbu"
          position={[0, 0, 1.2]}
          rotation={[0, 0, 0]}
          pose="idle_standing"
          prop="porridge_bowl"
          emotion="concern"
          speechActivity={speaker === 'arumbu' ? speech : 0}
          lookAtTarget={[0, 0.4, 0.4]}
        />

        {/* Ilangathir and Poet starting their departure along the lane */}
        <IlangathirCharacter
          characterId="ilangathir"
          position={[-2.4, 0, 2.5]}
          rotation={[0, -0.4, 0]}
          pose="walking"
          prop="clay_horse"
          emotion="curiosity"
          lookAtTarget={[-1.0, 1.0, 1.0]}
        />
        <KovurKizharCharacter
          characterId="kovur_kizhar"
          position={[-3.6, 0, 2.8]}
          rotation={[0, -0.3, 0]}
          pose="walking"
          prop="poet_staff"
          emotion="concern"
          lookAtTarget={[-1.0, 1.0, 1.0]}
        />
      </group>
    );
  }

  return (
    <group>
      {/* Camp night terrain */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#211e19" roughness={0.95} />
      </mesh>

      {/* Army camp tents */}
      {[-6, 7].map((x, i) => (
        <group key={i} position={[x, 0, -4]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[2.4, 2.4, 6]} />
            <meshStandardMaterial color="#4a3e2f" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Campfires */}
      <Campfire position={[0, 0, 0]} />
      <Campfire position={[-8, 0, 6]} />
      <Campfire position={[8, 0, 5]} />

      {/* Background soldiers resting */}
      <SoldierCrowd
        count={12}
        areaWidth={10}
        areaDepth={4}
        centerPosition={[0, 0, -6]}
        faction="nalankilli"
        weaponsLowered={true}
      />

      {isFatherEncounter ? (
        <>
          {/* Sembiyan by the forge fire */}
          <SembiyanCharacter
            characterId="sembiyan"
            position={[-0.8, 0, 0.4]}
            rotation={[0, 1.2, 0]}
            pose="embracing"
            emotion="relief"
            speechActivity={speaker === 'sembiyan' ? speech : 0}
            lookAtTarget={[0.6, 1.0, 0.4]}
          />

          {/* Ilangathir embracing father */}
          <IlangathirCharacter
            characterId="ilangathir"
            position={[0.6, 0, 0.4]}
            rotation={[0, -1.2, 0]}
            pose="embracing"
            prop="clay_horse"
            emotion="relief"
            speechActivity={speaker === 'ilangathir' ? speech : 0}
            lookAtTarget={[-0.8, 1.4, 0.4]}
          />

          {/* Kovur Kizhar watching gently nearby */}
          <KovurKizharCharacter
            characterId="kovur_kizhar"
            position={[-2.2, 0, 1.8]}
            rotation={[0, 0.8, 0]}
            pose="idle_standing"
            prop="poet_staff"
            emotion="relief"
            lookAtTarget={[0, 1.0, 0.4]}
          />
        </>
      ) : (
        // 480 - 540s: Walking through camp seeing common humanity
        <>
          <KovurKizharCharacter
            characterId="kovur_kizhar"
            position={[-0.8, 0, 0.8]}
            rotation={[0, 0.4, 0]}
            pose="walking"
            prop="poet_staff"
            emotion="concern"
            speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
            lookAtTarget={[1.2, 0.8, 0]}
          />
          <IlangathirCharacter
            characterId="ilangathir"
            position={[0.6, 0, 1.2]}
            rotation={[0, -0.2, 0]}
            pose="walking"
            prop="clay_horse"
            emotion="curiosity"
            speechActivity={speaker === 'ilangathir' ? speech : 0}
            lookAtTarget={[1.2, 0.8, 0]}
          />
        </>
      )}
    </group>
  );
};
