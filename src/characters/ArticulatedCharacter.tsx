import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { FaceExpressionController, EmotionState, FacialMorphParams } from './FaceExpressionController';

export type CharacterPose =
  | 'idle_standing'
  | 'idle_sitting'
  | 'walking'
  | 'gesturing'
  | 'holding_horse'
  | 'presenting_flowers'
  | 'poet_appeal'
  | 'spear_ready'
  | 'spear_lowered'
  | 'shield_raised'
  | 'shield_lowered'
  | 'embracing'
  | 'turning'
  | 'pottery_working'
  | 'guarded_listening';

export type CharacterProp =
  | 'none'
  | 'clay_horse'
  | 'broken_horse'
  | 'poet_staff'
  | 'porridge_bowl'
  | 'two_flowers'
  | 'spear'
  | 'shield';

export type CharacterId =
  | 'ilangathir'
  | 'kovur_kizhar'
  | 'arumbu'
  | 'sembiyan'
  | 'maaran'
  | 'nalankilli'
  | 'nedunkilli';

export interface ArticulatedCharacterProps {
  id?: CharacterId;
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  skinColor?: string;
  clothColor?: string;
  clothAccentColor?: string;
  hairColor?: string;
  hasBeard?: boolean;
  isElderly?: boolean;
  isChild?: boolean;
  isRegal?: boolean;
  regalMetalColor?: string;
  hasAathipooGarland?: boolean;
  pose?: CharacterPose;
  prop?: CharacterProp;
  emotion?: EmotionState;
  speechActivity?: number; // 0..1 mouth movement
  lookAtTarget?: [number, number, number] | null;
  walkSpeed?: number;
  showRigBones?: boolean; // For dev review mode
}

export const ArticulatedCharacter: React.FC<ArticulatedCharacterProps> = ({
  id = 'ilangathir',
  name: _name,
  position,
  rotation = [0, 0, 0],
  scale = 1.0,
  skinColor = '#b57951',
  clothColor = '#c2854e',
  clothAccentColor = '#8c5025',
  hairColor = '#1c1715',
  hasBeard = false,
  isElderly = false,
  isChild = false,
  isRegal = false,
  regalMetalColor = '#c9933b',
  hasAathipooGarland = false,
  pose = 'idle_standing',
  prop = 'none',
  emotion = 'neutral',
  speechActivity = 0,
  lookAtTarget = null,
  walkSpeed = 3.5,
  showRigBones = false,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);

  // Facial elements
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const leftEyebrowRef = useRef<THREE.Group>(null);
  const rightEyebrowRef = useRef<THREE.Group>(null);
  const mouthUpperRef = useRef<THREE.Mesh>(null);
  const mouthLowerRef = useRef<THREE.Mesh>(null);
  const leftCheekRef = useRef<THREE.Mesh>(null);
  const rightCheekRef = useRef<THREE.Mesh>(null);

  // Limbs
  const armLeftUpperRef = useRef<THREE.Group>(null);
  const armLeftLowerRef = useRef<THREE.Group>(null);
  const armRightUpperRef = useRef<THREE.Group>(null);
  const armRightLowerRef = useRef<THREE.Group>(null);
  const legLeftUpperRef = useRef<THREE.Group>(null);
  const legLeftLowerRef = useRef<THREE.Group>(null);
  const legRightUpperRef = useRef<THREE.Group>(null);
  const legRightLowerRef = useRef<THREE.Group>(null);

  // Seed for blink and micro-motion
  const charSeed = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash += id.charCodeAt(i);
    return (hash % 10) + 1;
  }, [id]);

  const faceController = useMemo(() => new FaceExpressionController(charSeed), [charSeed]);

  // Body scale proportions
  const bodyHeightFactor = isChild ? 0.72 : isElderly ? 0.95 : 1.0;
  const torsoHeight = 0.55 * bodyHeightFactor;
  const legHeight = 0.65 * bodyHeightFactor;
  const headRadius = (isChild ? 0.22 : 0.2) * bodyHeightFactor;

  // Stride parameters for planted foot contacts (anti-sliding)
  const strideDistance = 0.45 * bodyHeightFactor;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Update facial emotion & morph parameters
    faceController.setEmotion(emotion);
    const morphs: FacialMorphParams = faceController.update(t, speechActivity);

    // 1. Natural Idle Breathing & Weight Shift
    if (torsoRef.current) {
      const breath = Math.sin(t * 2.1 + charSeed) * 0.018;
      // Slight asymmetrical weight shift in idle
      const weightSway = Math.sin(t * 0.7 + charSeed * 0.5) * 0.012;
      torsoRef.current.position.y = legHeight + torsoHeight * 0.5 + breath;
      torsoRef.current.position.x = weightSway;
      torsoRef.current.scale.set(1 + breath * 0.4, 1 + breath, 1 + breath * 0.4);
    }

    // 2. Eye Gaze (Eyes move slightly before head)
    if (headRef.current && leftEyeRef.current && rightEyeRef.current) {
      if (lookAtTarget && rootRef.current) {
        const dx = lookAtTarget[0] - position[0];
        const dy = lookAtTarget[1] - (position[1] + legHeight + torsoHeight);
        const dz = lookAtTarget[2] - position[2];
        const targetAngleY = Math.atan2(dx, dz) - rotation[1];
        const targetAngleX = -Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));

        const clampedAngleY = Math.max(-0.65, Math.min(0.65, targetAngleY));
        const clampedAngleX = Math.max(-0.35, Math.min(0.35, targetAngleX));

        // Eyes lead head
        const eyeLeadY = clampedAngleY * 0.35;
        const eyeLeadX = clampedAngleX * 0.35;
        leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(leftEyeRef.current.rotation.y, eyeLeadY, 0.1);
        rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(rightEyeRef.current.rotation.y, eyeLeadY, 0.1);
        leftEyeRef.current.rotation.x = THREE.MathUtils.lerp(leftEyeRef.current.rotation.x, eyeLeadX, 0.1);
        rightEyeRef.current.rotation.x = THREE.MathUtils.lerp(rightEyeRef.current.rotation.x, eyeLeadX, 0.1);

        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, clampedAngleY, 0.04);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, clampedAngleX, 0.04);
      } else {
        // Natural micro-saccades
        const saccade = Math.sin(t * 1.8 + charSeed) * 0.02;
        headRef.current.rotation.y = Math.sin(t * 0.7 + charSeed) * 0.035;
        headRef.current.rotation.x = Math.sin(t * 1.3) * 0.015;
        leftEyeRef.current.rotation.y = saccade;
        rightEyeRef.current.rotation.y = saccade;
      }
    }

    // 3. Facial Morph Application
    // Eyebrows
    if (leftEyebrowRef.current && rightEyebrowRef.current) {
      const leftY = headRadius * 0.28 + morphs.leftBrowRaise * 0.04 + morphs.innerBrowRaise * 0.025 - morphs.browLower * 0.03;
      const rightY = headRadius * 0.28 + morphs.rightBrowRaise * 0.04 + morphs.innerBrowRaise * 0.025 - morphs.browLower * 0.03;
      leftEyebrowRef.current.position.y = leftY;
      rightEyebrowRef.current.position.y = rightY;

      // Inner brow angle for sadness/questioning or determination
      leftEyebrowRef.current.rotation.z = 0.08 + morphs.innerBrowRaise * 0.2 - morphs.browLower * 0.25;
      rightEyebrowRef.current.rotation.z = -0.08 - morphs.innerBrowRaise * 0.2 + morphs.browLower * 0.25;
    }

    // Eyelids (Blinking & Squinting)
    if (leftEyeRef.current && rightEyeRef.current) {
      const openScaleY = Math.max(0.08, 1.0 - morphs.blink * 0.92 - morphs.eyelidNarrow * 0.4 + morphs.upperEyelidRaise * 0.2);
      leftEyeRef.current.scale.y = openScaleY;
      rightEyeRef.current.scale.y = openScaleY;
    }

    // Cheeks
    if (leftCheekRef.current && rightCheekRef.current) {
      const cheekLift = morphs.cheekRaise * 0.02;
      leftCheekRef.current.position.y = -headRadius * 0.12 + cheekLift;
      rightCheekRef.current.position.y = -headRadius * 0.12 + cheekLift;
    }

    // Mouth (Lip Corners & Jaw Opening)
    if (mouthUpperRef.current && mouthLowerRef.current) {
      const jawDrop = morphs.jawOpen * 0.06;
      const smileArch = (morphs.lipCornerRaise - morphs.lipCornerLower) * 0.03;

      mouthUpperRef.current.position.y = -headRadius * 0.38 + smileArch * 0.5;
      mouthLowerRef.current.position.y = -headRadius * 0.44 - jawDrop - smileArch * 0.3;

      const mouthWidth = 1.0 + morphs.mouthWide * 0.4 - morphs.mouthRounded * 0.3;
      mouthUpperRef.current.scale.x = mouthWidth;
      mouthLowerRef.current.scale.x = mouthWidth;
    }

    // 4. Grounded Limb Animation with Clear Weight Transfer
    const armL = armLeftUpperRef.current;
    const armR = armRightUpperRef.current;
    const legL = legLeftUpperRef.current;
    const legR = legRightUpperRef.current;

    if (armL && armR && legL && legR) {
      switch (pose) {
        case 'walking': {
          // Planted foot contact cycle with hip dipping
          const cycle = t * walkSpeed;
          const phaseL = Math.sin(cycle);
          const phaseR = -Math.sin(cycle);

          // Eased stride movement
          legL.rotation.x = phaseL * 0.42;
          legR.rotation.x = phaseR * 0.42;

          // Foot bend during lift
          if (legLeftLowerRef.current) legLeftLowerRef.current.rotation.x = phaseL < 0 ? -phaseL * 0.5 : 0;
          if (legRightLowerRef.current) legRightLowerRef.current.rotation.x = phaseR < 0 ? -phaseR * 0.5 : 0;

          // Natural opposite arm swing
          armL.rotation.x = -phaseL * 0.3;
          armR.rotation.x = -phaseR * 0.3;

          // Slight pelvic dip
          if (torsoRef.current) {
            torsoRef.current.position.y = legHeight + torsoHeight * 0.5 - Math.abs(Math.cos(cycle)) * 0.025;
          }
          break;
        }

        case 'idle_sitting': {
          legL.rotation.x = -Math.PI / 2.15;
          legL.rotation.z = 0.28;
          legR.rotation.x = -Math.PI / 2.15;
          legR.rotation.z = -0.28;
          armL.rotation.x = 0.22;
          armR.rotation.x = 0.22;
          if (rootRef.current) rootRef.current.position.y = position[1] - 0.35;
          break;
        }

        case 'pottery_working': {
          // Father gently guiding son's hands on wheel (Hero Moment 1)
          const craftSway = Math.sin(t * 3.5) * 0.06;
          armL.rotation.x = -0.65 + craftSway;
          armL.rotation.z = 0.3;
          armR.rotation.x = -0.65 - craftSway;
          armR.rotation.z = -0.3;
          if (armLeftLowerRef.current) armLeftLowerRef.current.rotation.x = -0.45;
          if (armRightLowerRef.current) armRightLowerRef.current.rotation.x = -0.45;
          break;
        }

        case 'holding_horse': {
          // Staged gentle two-handed grip
          armL.rotation.x = -0.72;
          armL.rotation.z = 0.22;
          armR.rotation.x = -0.72;
          armR.rotation.z = -0.22;
          if (armLeftLowerRef.current) armLeftLowerRef.current.rotation.x = -0.38;
          if (armRightLowerRef.current) armRightLowerRef.current.rotation.x = -0.38;
          break;
        }

        case 'presenting_flowers': {
          // Hero Moment 4: Climax open palm reveal
          // Planted solid stance
          legL.rotation.z = 0.08;
          legR.rotation.z = -0.08;
          // Smooth elevated arms with outstretched flat palms
          armL.rotation.x = -1.28;
          armL.rotation.z = 0.18;
          armR.rotation.x = -1.28;
          armR.rotation.z = -0.18;
          if (armLeftLowerRef.current) armLeftLowerRef.current.rotation.x = -0.18;
          if (armRightLowerRef.current) armRightLowerRef.current.rotation.x = -0.18;
          break;
        }

        case 'poet_appeal': {
          // Kovur Kizhar: Measured, stable vertical stance
          armR.rotation.x = -1.32;
          armR.rotation.z = -0.32;
          armL.rotation.x = -0.35;
          armL.rotation.z = 0.12;
          break;
        }

        case 'gesturing': {
          const gestureWave = Math.sin(t * 2.8) * 0.12;
          armR.rotation.x = -0.75 + gestureWave;
          armR.rotation.z = -0.25;
          armL.rotation.x = 0.08;
          break;
        }

        case 'spear_ready': {
          armR.rotation.x = -1.15;
          armR.rotation.z = -0.18;
          armL.rotation.x = -0.65;
          break;
        }

        case 'spear_lowered': {
          // Ceasefire: weapons lowered smoothly to earth
          armR.rotation.x = 0.18;
          armR.rotation.z = 0.12;
          armL.rotation.x = 0.08;
          break;
        }

        case 'shield_raised': {
          armL.rotation.x = -0.88;
          armL.rotation.z = 0.38;
          armR.rotation.x = -0.88;
          break;
        }

        case 'shield_lowered': {
          armL.rotation.x = 0.12;
          armL.rotation.z = 0.08;
          armR.rotation.x = 0.08;
          break;
        }

        case 'embracing': {
          // Hero Moment 5: Natural wrap around shoulders/back
          armL.rotation.x = -1.08;
          armL.rotation.z = 0.55;
          armR.rotation.x = -1.08;
          armR.rotation.z = -0.55;
          if (armLeftLowerRef.current) armLeftLowerRef.current.rotation.x = -0.4;
          if (armRightLowerRef.current) armRightLowerRef.current.rotation.x = -0.4;
          break;
        }

        case 'guarded_listening': {
          // Nedunkilli compact guarded royal stance
          armL.rotation.x = -0.35;
          armL.rotation.z = 0.2;
          armR.rotation.x = -0.35;
          armR.rotation.z = -0.2;
          break;
        }

        case 'idle_standing':
        default: {
          const sway = Math.sin(t * 1.4 + charSeed) * 0.035;
          armL.rotation.x = 0.05 + sway;
          armR.rotation.x = 0.05 - sway;
          legL.rotation.x = 0;
          legR.rotation.x = 0;
          break;
        }
      }
    }
  });

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      {/* Visual Bone Joints for Review Studio Mode */}
      {showRigBones && (
        <group>
          <mesh position={[0, legHeight + torsoHeight * 0.5, 0]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color="#00ffcc" wireframe />
          </mesh>
          <mesh position={[0, legHeight + torsoHeight + headRadius, 0]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial color="#ff00cc" wireframe />
          </mesh>
          <mesh position={[-0.15, legHeight, 0]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#ffff00" wireframe />
          </mesh>
          <mesh position={[0.15, legHeight, 0]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#ffff00" wireframe />
          </mesh>
        </group>
      )}

      {/* --- TORSO & CHEST --- */}
      <group ref={torsoRef} position={[0, legHeight + torsoHeight * 0.5, 0]}>
        {/* Upper chest garment */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.22 * bodyHeightFactor, 0.18 * bodyHeightFactor, torsoHeight, 14]} />
          <meshStandardMaterial color={clothColor} roughness={0.78} />
        </mesh>

        {/* Clay Stains on Garment for Ilangathir & Sembiyan */}
        {(id === 'ilangathir' || id === 'sembiyan') && (
          <mesh position={[0.06 * bodyHeightFactor, -0.05 * bodyHeightFactor, 0.16 * bodyHeightFactor]}>
            <circleGeometry args={[0.07 * bodyHeightFactor, 8]} />
            <meshStandardMaterial color="#804128" roughness={0.9} transparent opacity={0.75} />
          </mesh>
        )}

        {/* Guard Chest Harness for Maaran */}
        {id === 'maaran' && (
          <group position={[0, 0.02 * bodyHeightFactor, 0.02 * bodyHeightFactor]}>
            <mesh position={[0, 0, 0.1 * bodyHeightFactor]} rotation={[0, 0, 0.6]}>
              <boxGeometry args={[0.05 * bodyHeightFactor, 0.45 * bodyHeightFactor, 0.02]} />
              <meshStandardMaterial color="#1e1815" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.1 * bodyHeightFactor]} rotation={[0, 0, -0.6]}>
              <boxGeometry args={[0.05 * bodyHeightFactor, 0.45 * bodyHeightFactor, 0.02]} />
              <meshStandardMaterial color="#1e1815" roughness={0.8} />
            </mesh>
          </group>
        )}

        {/* Regal Armor Plate for Nalankilli / Nedunkilli */}
        {isRegal && (
          <group position={[0, 0.06 * bodyHeightFactor, 0.05 * bodyHeightFactor]}>
            <mesh castShadow>
              <boxGeometry args={[0.27 * bodyHeightFactor, 0.3 * bodyHeightFactor, 0.13 * bodyHeightFactor]} />
              <meshStandardMaterial color={regalMetalColor} metalness={0.75} roughness={0.35} />
            </mesh>
            {/* Chola Tiger emblem bronze engraving */}
            <mesh position={[0, 0, 0.07 * bodyHeightFactor]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.06 * bodyHeightFactor, 0.06 * bodyHeightFactor, 0.02, 12]} />
              <meshStandardMaterial color="#ffc107" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        )}

        {/* Aathipoo Floral Garland for Nalankilli / Nedunkilli */}
        {hasAathipooGarland && (
          <group position={[0, 0.1 * bodyHeightFactor, 0.13 * bodyHeightFactor]}>
            {[-0.14, -0.07, 0, 0.07, 0.14].map((x, i) => (
              <mesh key={i} position={[x, -Math.abs(x) * 0.42, 0]}>
                <sphereGeometry args={[0.038, 8, 8]} />
                <meshStandardMaterial color="#ffffff" roughness={0.45} />
              </mesh>
            ))}
          </group>
        )}

        {/* Poet Uthariyam Drape for Kovur Kizhar */}
        {id === 'kovur_kizhar' && (
          <mesh position={[-0.08 * bodyHeightFactor, 0, 0.08 * bodyHeightFactor]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.12 * bodyHeightFactor, torsoHeight * 1.1, 0.04]} />
            <meshStandardMaterial color="#8a6547" roughness={0.85} />
          </mesh>
        )}

        {/* Mother Saree Pallu Drape for Arumbu */}
        {id === 'arumbu' && (
          <mesh position={[0.06 * bodyHeightFactor, 0, 0.07 * bodyHeightFactor]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.1 * bodyHeightFactor, torsoHeight * 1.05, 0.04]} />
            <meshStandardMaterial color="#7a2a22" roughness={0.85} />
          </mesh>
        )}

        {/* Lower waist wrap / veshti cloth */}
        <mesh position={[0, -torsoHeight * 0.45, 0]}>
          <cylinderGeometry args={[0.2 * bodyHeightFactor, 0.22 * bodyHeightFactor, 0.2 * bodyHeightFactor, 14]} />
          <meshStandardMaterial color={clothAccentColor} roughness={0.8} />
        </mesh>

        {/* --- HEAD & FACE --- */}
        <group ref={headRef} position={[0, torsoHeight * 0.5 + headRadius * 1.1, 0]}>
          {/* Head cranium */}
          <mesh castShadow>
            <sphereGeometry args={[headRadius, 18, 18]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>

          {/* Character-Specific Sculpted Hair */}
          <group>
            {/* Base hair cap */}
            <mesh position={[0, headRadius * 0.35, -headRadius * 0.15]}>
              <sphereGeometry args={[headRadius * 1.05, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
              <meshStandardMaterial color={hairColor} roughness={0.85} />
            </mesh>

            {/* Signature Forward Hair Curl for Ilangathir */}
            {id === 'ilangathir' && (
              <mesh position={[0.04 * headRadius, headRadius * 0.85, headRadius * 0.7]} rotation={[0.4, 0.2, -0.3]}>
                <torusGeometry args={[0.045, 0.018, 6, 12, Math.PI * 1.2]} />
                <meshStandardMaterial color={hairColor} roughness={0.85} />
              </mesh>
            )}

            {/* Tied Hair Bun for Arumbu */}
            {id === 'arumbu' && (
              <mesh position={[0, headRadius * 0.3, -headRadius * 1.05]}>
                <sphereGeometry args={[headRadius * 0.45, 12, 12]} />
                <meshStandardMaterial color={hairColor} roughness={0.85} />
              </mesh>
            )}

            {/* Flowing Silver Sangam Hair & Beard for Kovur Kizhar */}
            {hasBeard && (
              <group>
                <mesh position={[0, -headRadius * 0.62, headRadius * 0.58]} rotation={[Math.PI, 0, 0]}>
                  <coneGeometry args={[headRadius * 0.52, headRadius * 0.85, 10]} />
                  <meshStandardMaterial color={hairColor} roughness={0.9} />
                </mesh>
                {/* Mustache */}
                <mesh position={[0, -headRadius * 0.32, headRadius * 0.92]} rotation={[0, 0, 0]}>
                  <boxGeometry args={[headRadius * 0.45, headRadius * 0.08, 0.04]} />
                  <meshStandardMaterial color={hairColor} roughness={0.9} />
                </mesh>
              </group>
            )}
          </group>

          {/* Left Eye & Pupil */}
          <group ref={leftEyeRef} position={[-headRadius * 0.32, headRadius * 0.08, headRadius * 0.86]}>
            {/* Eye Sclera */}
            <mesh>
              <sphereGeometry args={[headRadius * 0.16, 10, 10]} />
              <meshStandardMaterial color="#f0ede6" roughness={0.3} />
            </mesh>
            {/* Iris & Pupil */}
            <mesh position={[0, 0, headRadius * 0.12]}>
              <circleGeometry args={[headRadius * 0.09, 10]} />
              <meshStandardMaterial color="#1a1412" roughness={0.2} />
            </mesh>
          </group>

          {/* Right Eye & Pupil */}
          <group ref={rightEyeRef} position={[headRadius * 0.32, headRadius * 0.08, headRadius * 0.86]}>
            <mesh>
              <sphereGeometry args={[headRadius * 0.16, 10, 10]} />
              <meshStandardMaterial color="#f0ede6" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, headRadius * 0.12]}>
              <circleGeometry args={[headRadius * 0.09, 10]} />
              <meshStandardMaterial color="#1a1412" roughness={0.2} />
            </mesh>
          </group>

          {/* Left Eyebrow (Articulated with Expression Rig) */}
          <group ref={leftEyebrowRef} position={[-headRadius * 0.32, headRadius * 0.28, headRadius * 0.88]}>
            <mesh>
              <boxGeometry args={[headRadius * 0.34, headRadius * 0.07, 0.025]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </group>

          {/* Right Eyebrow */}
          <group ref={rightEyebrowRef} position={[headRadius * 0.32, headRadius * 0.28, headRadius * 0.88]}>
            <mesh>
              <boxGeometry args={[headRadius * 0.34, headRadius * 0.07, 0.025]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </group>

          {/* Left & Right Cheeks (Puff / Lift with Genuine Smiles) */}
          <mesh ref={leftCheekRef} position={[-headRadius * 0.42, -headRadius * 0.12, headRadius * 0.8]}>
            <sphereGeometry args={[headRadius * 0.15, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>
          <mesh ref={rightCheekRef} position={[headRadius * 0.42, -headRadius * 0.12, headRadius * 0.8]}>
            <sphereGeometry args={[headRadius * 0.15, 8, 8]} />
            <meshStandardMaterial color={skinColor} roughness={0.7} />
          </mesh>

          {/* Sculpted Nose */}
          <mesh position={[0, -headRadius * 0.05, headRadius * 0.98]} rotation={[0.38, 0, 0]}>
            <coneGeometry args={[headRadius * 0.13, headRadius * 0.3, 6]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>

          {/* Sculpted Upper Lip */}
          <mesh ref={mouthUpperRef} position={[0, -headRadius * 0.38, headRadius * 0.88]}>
            <boxGeometry args={[headRadius * 0.32, headRadius * 0.05, 0.03]} />
            <meshStandardMaterial color="#5e2b22" roughness={0.4} />
          </mesh>

          {/* Sculpted Lower Lip & Jaw */}
          <mesh ref={mouthLowerRef} position={[0, -headRadius * 0.44, headRadius * 0.86]}>
            <boxGeometry args={[headRadius * 0.28, headRadius * 0.05, 0.03]} />
            <meshStandardMaterial color="#54261f" roughness={0.4} />
          </mesh>
        </group>

        {/* --- LEFT ARM --- */}
        <group ref={armLeftUpperRef} position={[-0.24 * bodyHeightFactor, torsoHeight * 0.38, 0]}>
          <mesh position={[0, -0.15 * bodyHeightFactor, 0]}>
            <cylinderGeometry args={[0.065 * bodyHeightFactor, 0.055 * bodyHeightFactor, 0.3 * bodyHeightFactor, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
          <group ref={armLeftLowerRef} position={[0, -0.3 * bodyHeightFactor, 0]}>
            <mesh position={[0, -0.14 * bodyHeightFactor, 0]}>
              <cylinderGeometry args={[0.055 * bodyHeightFactor, 0.045 * bodyHeightFactor, 0.28 * bodyHeightFactor, 10]} />
              <meshStandardMaterial color={skinColor} roughness={0.65} />
            </mesh>
            {/* Articulated Hand & Fingers */}
            <mesh position={[0, -0.3 * bodyHeightFactor, 0]}>
              <sphereGeometry args={[0.05 * bodyHeightFactor, 8, 8]} />
              <meshStandardMaterial color={skinColor} roughness={0.65} />
            </mesh>

            {/* Clay on fingers for Ilangathir */}
            {id === 'ilangathir' && (
              <mesh position={[0, -0.32 * bodyHeightFactor, 0.02 * bodyHeightFactor]}>
                <sphereGeometry args={[0.025 * bodyHeightFactor, 6, 6]} />
                <meshStandardMaterial color="#804128" roughness={0.9} />
              </mesh>
            )}

            {/* Left Hand Props */}
            {prop === 'shield' && (
              <mesh position={[-0.1, -0.15, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.04, 16]} />
                <meshStandardMaterial color="#423023" roughness={0.8} />
              </mesh>
            )}
            {prop === 'porridge_bowl' && (
              <mesh position={[0, -0.28, 0.15]}>
                <cylinderGeometry args={[0.13, 0.08, 0.08, 12]} />
                <meshStandardMaterial color="#a35436" roughness={0.9} />
              </mesh>
            )}
            {prop === 'two_flowers' && (
              <group position={[0, -0.28, 0.12]}>
                {/* Flower 1 resting in left palm */}
                <mesh position={[-0.03, 0, 0]}>
                  <sphereGeometry args={[0.042, 8, 8]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </mesh>
              </group>
            )}
          </group>
        </group>

        {/* --- RIGHT ARM --- */}
        <group ref={armRightUpperRef} position={[0.24 * bodyHeightFactor, torsoHeight * 0.38, 0]}>
          <mesh position={[0, -0.15 * bodyHeightFactor, 0]}>
            <cylinderGeometry args={[0.065 * bodyHeightFactor, 0.055 * bodyHeightFactor, 0.3 * bodyHeightFactor, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
          <group ref={armRightLowerRef} position={[0, -0.3 * bodyHeightFactor, 0]}>
            <mesh position={[0, -0.14 * bodyHeightFactor, 0]}>
              <cylinderGeometry args={[0.055 * bodyHeightFactor, 0.045 * bodyHeightFactor, 0.28 * bodyHeightFactor, 10]} />
              <meshStandardMaterial color={skinColor} roughness={0.65} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.3 * bodyHeightFactor, 0]}>
              <sphereGeometry args={[0.05 * bodyHeightFactor, 8, 8]} />
              <meshStandardMaterial color={skinColor} roughness={0.65} />
            </mesh>

            {/* Right Hand Props */}
            {prop === 'clay_horse' && (
              <group position={[0, -0.25, 0.18]}>
                {/* Stylized Terracotta Clay Horse */}
                <mesh castShadow>
                  <boxGeometry args={[0.17, 0.11, 0.09]} />
                  <meshStandardMaterial color="#b35434" roughness={0.88} />
                </mesh>
                <mesh position={[0.085, 0.09, 0]}>
                  <boxGeometry args={[0.065, 0.13, 0.065]} />
                  <meshStandardMaterial color="#b35434" roughness={0.88} />
                </mesh>
                {/* 4 Clay Legs */}
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
            )}

            {prop === 'broken_horse' && (
              <group position={[0, -0.25, 0.18]}>
                <mesh castShadow>
                  <boxGeometry args={[0.17, 0.11, 0.09]} />
                  <meshStandardMaterial color="#b35434" roughness={0.88} />
                </mesh>
                <mesh position={[0.085, 0.09, 0]}>
                  <boxGeometry args={[0.065, 0.13, 0.065]} />
                  <meshStandardMaterial color="#b35434" roughness={0.88} />
                </mesh>
                {/* Exactly 3 legs; 1 snapped off cleanly */}
                <mesh position={[-0.05, -0.09, 0.035]}>
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
            )}

            {prop === 'poet_staff' && (
              <mesh position={[0, 0.42, 0.08]}>
                <cylinderGeometry args={[0.022, 0.026, 1.85, 8]} />
                <meshStandardMaterial color="#5e381b" roughness={0.85} />
              </mesh>
            )}

            {prop === 'spear' && (
              <group position={[0, 0.62, 0.1]}>
                <mesh>
                  <cylinderGeometry args={[0.022, 0.026, 2.25, 8]} />
                  <meshStandardMaterial color="#4a2e19" roughness={0.85} />
                </mesh>
                <mesh position={[0, 1.18, 0]}>
                  <coneGeometry args={[0.075, 0.32, 4]} />
                  <meshStandardMaterial color="#8a9499" metalness={0.7} roughness={0.3} />
                </mesh>
              </group>
            )}

            {prop === 'two_flowers' && (
              <group position={[0, -0.28, 0.12]}>
                {/* Flower 2 resting in right palm */}
                <mesh position={[0.03, 0, 0]}>
                  <sphereGeometry args={[0.042, 8, 8]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </mesh>
              </group>
            )}
          </group>
        </group>
      </group>

      {/* --- LEGS & PLANTED FEET --- */}
      <group ref={legLeftUpperRef} position={[-0.12 * bodyHeightFactor, legHeight, 0]}>
        <mesh position={[0, -legHeight * 0.25, 0]}>
          <cylinderGeometry args={[0.085 * bodyHeightFactor, 0.07 * bodyHeightFactor, legHeight * 0.5, 10]} />
          <meshStandardMaterial color={clothAccentColor} roughness={0.8} />
        </mesh>
        <group ref={legLeftLowerRef} position={[0, -legHeight * 0.5, 0]}>
          <mesh position={[0, -legHeight * 0.22, 0]}>
            <cylinderGeometry args={[0.065 * bodyHeightFactor, 0.05 * bodyHeightFactor, legHeight * 0.45, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
          {/* Ground-planted Foot with Heel & Toe */}
          <mesh position={[0, -legHeight * 0.46, 0.06 * bodyHeightFactor]}>
            <boxGeometry args={[0.08 * bodyHeightFactor, 0.05 * bodyHeightFactor, 0.16 * bodyHeightFactor]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
        </group>
      </group>

      <group ref={legRightUpperRef} position={[0.12 * bodyHeightFactor, legHeight, 0]}>
        <mesh position={[0, -legHeight * 0.25, 0]}>
          <cylinderGeometry args={[0.085 * bodyHeightFactor, 0.07 * bodyHeightFactor, legHeight * 0.5, 10]} />
          <meshStandardMaterial color={clothAccentColor} roughness={0.8} />
        </mesh>
        <group ref={legRightLowerRef} position={[0, -legHeight * 0.5, 0]}>
          <mesh position={[0, -legHeight * 0.22, 0]}>
            <cylinderGeometry args={[0.065 * bodyHeightFactor, 0.05 * bodyHeightFactor, legHeight * 0.45, 10]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
          {/* Ground-planted Foot */}
          <mesh position={[0, -legHeight * 0.46, 0.06 * bodyHeightFactor]}>
            <boxGeometry args={[0.08 * bodyHeightFactor, 0.05 * bodyHeightFactor, 0.16 * bodyHeightFactor]} />
            <meshStandardMaterial color={skinColor} roughness={0.65} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
