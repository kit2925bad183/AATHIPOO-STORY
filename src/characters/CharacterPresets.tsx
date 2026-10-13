import React from 'react';
import { ArticulatedCharacter, CharacterPose, CharacterProp } from './ArticulatedCharacter';
import { EmotionState } from './FaceExpressionController';

export interface CharacterBaseProps {
  characterId?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  pose?: CharacterPose;
  prop?: CharacterProp;
  emotion?: EmotionState;
  speechActivity?: number;
  lookAtTarget?: [number, number, number] | null;
  showRigBones?: boolean;
}

// 1. ILANGATHIR (Age 13, potter's son, forward hair curl, uneven brows, clay stains, earth-colored clothes)
export const IlangathirCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'clay_horse',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="ilangathir"
    name="ilangathir"
    isChild={true}
    skinColor="#b87b53" // warm Tamil brown
    clothColor="#a8623b" // earthy terracotta
    clothAccentColor="#66361a" // deep burnt umber
    hairColor="#141110"
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);

// 2. KOVUR KIZHAR (Elderly Tamil poet, silver hair & beard, unbleached cotton, wooden staff, calm authority)
export const KovurKizharCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'poet_staff',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="kovur_kizhar"
    name="kovur_kizhar"
    isElderly={true}
    hasBeard={true}
    skinColor="#a6734c"
    clothColor="#dedcd4" // unbleached natural khadi cotton
    clothAccentColor="#b5b3aa"
    hairColor="#e0e2e6" // silver grey
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);

// 3. ARUMBU (Working mother, tied-back hair bun, practical madder red saree, resilient & loving)
export const ArumbuCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'none',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="arumbu"
    name="arumbu"
    skinColor="#b3754e"
    clothColor="#943b2f" // madder root rust red
    clothAccentColor="#632117"
    hairColor="#120e0d"
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);

// 4. SEMBIYAN (Father & potter, sturdy build, weathered ochre clothing, short beard, clay traces)
export const SembiyanCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'none',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="sembiyan"
    name="sembiyan"
    hasBeard={true}
    skinColor="#995e38" // sun-weathered field worker tone
    clothColor="#b57b31" // muted ochre
    clothAccentColor="#704414"
    hairColor="#211a18"
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);

// 5. MAARAN (Older brother, city guard inside Uraiyur, muted indigo guard attire, shield harness)
export const MaaranCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'spear',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="maaran"
    name="maaran"
    skinColor="#a36b43"
    clothColor="#34445c" // muted indigo guard cloth
    clothAccentColor="#1c2636"
    hairColor="#140f0d"
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);

// 6. NALANKILLI (Chola ruler outside, broad angular silhouette, royal crimson & gold armor, Aathipoo garland)
export const NalankilliCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'none',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="nalankilli"
    name="nalankilli"
    isRegal={true}
    hasAathipooGarland={true}
    skinColor="#b3774f"
    clothColor="#852b1b" // royal crimson
    clothAccentColor="#54160a"
    regalMetalColor="#dba639" // polished royal bronze/gold
    hairColor="#17110f"
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);

// 7. NEDUNKILLI (Chola ruler inside, compact silhouette, distinct muted forest green & maroon, defensive)
export const NedunkilliCharacter: React.FC<CharacterBaseProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  pose = 'idle_standing',
  prop = 'none',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  showRigBones = false,
}) => (
  <ArticulatedCharacter
    id="nedunkilli"
    name="nedunkilli"
    isRegal={true}
    hasAathipooGarland={true}
    skinColor="#a66e47" // distinct facial tone and jaw
    clothColor="#3b5240" // muted deep green and maroon
    clothAccentColor="#243327"
    regalMetalColor="#a87133" // antique bronze
    hairColor="#120d0b"
    position={position}
    rotation={rotation}
    pose={pose}
    prop={prop}
    emotion={emotion}
    speechActivity={speechActivity}
    lookAtTarget={lookAtTarget}
    showRigBones={showRigBones}
  />
);
