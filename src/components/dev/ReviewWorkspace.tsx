import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  IlangathirCharacter,
  KovurKizharCharacter,
  ArumbuCharacter,
  SembiyanCharacter,
  MaaranCharacter,
  NalankilliCharacter,
  NedunkilliCharacter,
} from '../../characters/CharacterPresets';
import { CharacterPose, CharacterProp } from '../../characters/ArticulatedCharacter';
import { EmotionState } from '../../characters/FaceExpressionController';
import {
  X,
  RotateCw,
  Play,
  Pause,
  Eye,
  Sliders,
  User,
  Layers,
  FileText,
  Volume2,
  Camera,
  Activity,
} from 'lucide-react';

interface ReviewWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
}

type CharacterKey =
  | 'ilangathir'
  | 'kovur_kizhar'
  | 'arumbu'
  | 'sembiyan'
  | 'maaran'
  | 'nalankilli'
  | 'nedunkilli';

type CameraAngle = 'front' | 'side' | 'back' | 'three_quarter' | 'face_closeup';

const CAMERA_POSITIONS: Record<CameraAngle, [number, number, number]> = {
  front: [0, 1.1, 3.2],
  side: [-3.0, 1.1, 0.1],
  back: [0, 1.1, -3.2],
  three_quarter: [2.1, 1.25, 2.3],
  face_closeup: [0, 1.32, 1.05],
};

const CAMERA_TARGETS: Record<CameraAngle, [number, number, number]> = {
  front: [0, 0.95, 0],
  side: [0, 0.95, 0],
  back: [0, 0.95, 0],
  three_quarter: [0, 0.95, 0],
  face_closeup: [0, 1.15, 0],
};

// Studio Scene Inside Canvas
const StudioScene: React.FC<{
  character: CharacterKey;
  pose: CharacterPose;
  prop: CharacterProp;
  emotion: EmotionState;
  speechActivity: number;
  showRigBones: boolean;
  showFootMarkers: boolean;
  turntableSpeed: number;
  cameraAngle: CameraAngle;
}> = ({
  character,
  pose,
  prop,
  emotion,
  speechActivity,
  showRigBones,
  showFootMarkers,
  turntableSpeed,
  cameraAngle,
}) => {
  const turntableRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Camera smooth lerp to selected view
    const targetPos = CAMERA_POSITIONS[cameraAngle];
    const lookTarget = CAMERA_TARGETS[cameraAngle];
    state.camera.position.lerp(new THREE.Vector3(...targetPos), 0.1);
    state.camera.lookAt(new THREE.Vector3(...lookTarget));

    // Turntable rotation
    if (turntableRef.current && turntableSpeed !== 0) {
      turntableRef.current.rotation.y += delta * turntableSpeed * 0.8;
    }
  });

  return (
    <>
      {/* 3-Point Studio Lighting */}
      <ambientLight intensity={0.55} />
      {/* Key Light */}
      <directionalLight position={[3, 4, 3]} intensity={1.1} castShadow />
      {/* Fill Light (Cool) */}
      <directionalLight position={[-3, 2, 2]} intensity={0.4} color="#dbeafe" />
      {/* Rim Light (Warm hair/silhouette separator) */}
      <directionalLight position={[0, 3, -3]} intensity={0.8} color="#fde68a" />

      {/* Studio Pedestal Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial color="#1e1814" roughness={0.7} />
      </mesh>
      {/* Concentric turntable rings */}
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.03, 48]} />
        <meshBasicMaterial color="#d97706" opacity={0.3} transparent />
      </mesh>
      <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.83, 48]} />
        <meshBasicMaterial color="#78553d" opacity={0.25} transparent />
      </mesh>

      {/* Turntable Group */}
      <group ref={turntableRef}>
        {/* Foot-Contact Ground Markers (Proves grounded planting with zero floor slide) */}
        {showFootMarkers && (
          <group position={[0, 0.005, 0]}>
            {/* Left foot contact */}
            <mesh position={[-0.14, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ellipseCurve
                aX={0}
                aY={0}
                xRadius={0.08}
                yRadius={0.14}
                aStartAngle={0}
                aEndAngle={2 * Math.PI}
                aClockwise={false}
                aRotation={0}
              />
              <circleGeometry args={[0.08, 16]} />
              <meshBasicMaterial color="#10b981" opacity={0.65} transparent />
            </mesh>
            {/* Right foot contact */}
            <mesh position={[0.14, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.08, 16]} />
              <meshBasicMaterial color="#10b981" opacity={0.65} transparent />
            </mesh>
          </group>
        )}

        {/* Selected Character */}
        {character === 'ilangathir' && (
          <IlangathirCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
        {character === 'kovur_kizhar' && (
          <KovurKizharCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
        {character === 'arumbu' && (
          <ArumbuCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
        {character === 'sembiyan' && (
          <SembiyanCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
        {character === 'maaran' && (
          <MaaranCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
        {character === 'nalankilli' && (
          <NalankilliCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
        {character === 'nedunkilli' && (
          <NedunkilliCharacter
            pose={pose}
            prop={prop}
            emotion={emotion}
            speechActivity={speechActivity}
            showRigBones={showRigBones}
          />
        )}
      </group>
    </>
  );
};

export const ReviewWorkspace: React.FC<ReviewWorkspaceProps> = ({ isOpen, onClose }) => {
  const [character, setCharacter] = useState<CharacterKey>('ilangathir');
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('three_quarter');
  const [emotion, setEmotion] = useState<EmotionState>('neutral');
  const [pose, setPose] = useState<CharacterPose>('idle_standing');
  const [prop, setProp] = useState<CharacterProp>('clay_horse');
  const [turntableSpeed, setTurntableSpeed] = useState<number>(0);
  const [speechActivity, setSpeechActivity] = useState<number>(0);
  const [showRigBones, setShowRigBones] = useState<boolean>(false);
  const [showFootMarkers, setShowFootMarkers] = useState<boolean>(true);
  const [isSpeechSimRunning, setIsSpeechSimRunning] = useState<boolean>(false);

  // Speech Viseme Simulation loop
  const speechIntervalRef = useRef<number | null>(null);
  const toggleSpeechSimulation = () => {
    if (isSpeechSimRunning) {
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
      setIsSpeechSimRunning(false);
      setSpeechActivity(0);
    } else {
      setIsSpeechSimRunning(true);
      speechIntervalRef.current = window.setInterval(() => {
        // Natural pulsing speech viseme envelope
        const sim = Math.sin(Date.now() / 140) * 0.45 + 0.45;
        setSpeechActivity(sim > 0.2 ? sim : 0);
      }, 50);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 md:p-6 overflow-hidden">
      <div className="relative w-full max-w-7xl h-[95vh] bg-stone-925 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Top Header Bar */}
        <header className="px-6 py-3.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <Activity size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-200">
                கதாபாத்திர ஆய்வுக்கூடம் (3D Character Quality Review Studio)
              </h2>
              <p className="text-xs text-stone-400">
                Deterministic Rig Verification • Facial Morph Testing • Turnaround Turntable
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reference Sheet Link */}
            <a
              href={`/production-assets/character-sheets/${character}.svg`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700 transition-colors"
            >
              <FileText size={14} />
              <span>மாதிரிப் படம் (SVG Sheet)</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Main Body Split: 3D Viewport on Left, Director Controls on Right */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: 3D Viewport */}
          <div className="flex-1 relative bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex flex-col">
            {/* Viewport Floating Quick Angle Bar */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 bg-stone-950/80 p-1.5 rounded-xl border border-stone-800 backdrop-blur-md">
              <button
                onClick={() => setCameraAngle('front')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  cameraAngle === 'front'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                A. Front
              </button>
              <button
                onClick={() => setCameraAngle('side')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  cameraAngle === 'side'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                B. Profile
              </button>
              <button
                onClick={() => setCameraAngle('back')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  cameraAngle === 'back'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                C. Back
              </button>
              <button
                onClick={() => setCameraAngle('three_quarter')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  cameraAngle === 'three_quarter'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                D. 3/4 Hero
              </button>
              <button
                onClick={() => setCameraAngle('face_closeup')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  cameraAngle === 'face_closeup'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                E. Face Close-up
              </button>
            </div>

            {/* Turntable Control Bar */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-stone-950/80 p-2 rounded-xl border border-stone-800 backdrop-blur-md text-xs">
              <span className="text-stone-400 font-medium flex items-center gap-1">
                <RotateCw size={13} className="text-amber-400" /> சுழற்சி:
              </span>
              <button
                onClick={() => setTurntableSpeed(0)}
                className={`px-2 py-0.5 rounded ${
                  turntableSpeed === 0 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                }`}
              >
                நிறுத்து (0x)
              </button>
              <button
                onClick={() => setTurntableSpeed(0.5)}
                className={`px-2 py-0.5 rounded ${
                  turntableSpeed === 0.5 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                }`}
              >
                மெது (0.5x)
              </button>
              <button
                onClick={() => setTurntableSpeed(1.2)}
                className={`px-2 py-0.5 rounded ${
                  turntableSpeed === 1.2 ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                }`}
              >
                இயல்பு (1x)
              </button>
            </div>

            {/* 3D Canvas */}
            <Canvas
              shadows
              camera={{ fov: 42, position: [2.1, 1.25, 2.3] }}
              className="w-full h-full"
            >
              <Suspense fallback={null}>
                <StudioScene
                  character={character}
                  pose={pose}
                  prop={prop}
                  emotion={emotion}
                  speechActivity={speechActivity}
                  showRigBones={showRigBones}
                  showFootMarkers={showFootMarkers}
                  turntableSpeed={turntableSpeed}
                  cameraAngle={cameraAngle}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Right: Technical Inspector & Animation Controls */}
          <div className="w-full md:w-96 bg-stone-900/90 border-t md:border-t-0 md:border-l border-stone-800 p-5 overflow-y-auto space-y-6 text-xs">
            {/* 1. Character Selector */}
            <div className="space-y-2">
              <label className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <User size={14} />
                <span>கதாபாத்திரம் (Character)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    ['ilangathir', 'இளங்கதிர் (13y)'],
                    ['kovur_kizhar', 'கோவூர் கிழார் (புலவர்)'],
                    ['arumbu', 'அரும்பு (தாய்)'],
                    ['sembiyan', 'செம்பியன் (தந்தை)'],
                    ['maaran', 'மாறன் (அண்ணன்)'],
                    ['nalankilli', 'நலங்கிள்ளி (வேந்தர்)'],
                    ['nedunkilli', 'நெடுங்கிள்ளி (அரசர்)'],
                  ] as [CharacterKey, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCharacter(key);
                      // Set default logical prop for character
                      if (key === 'ilangathir') setProp('clay_horse');
                      else if (key === 'kovur_kizhar') setProp('poet_staff');
                      else if (key === 'sembiyan') setProp('spear');
                      else if (key === 'maaran') setProp('shield');
                      else if (key === 'nalankilli' || key === 'nedunkilli') setProp('none');
                    }}
                    className={`p-2 rounded-lg text-left transition-all ${
                      character === key
                        ? 'bg-amber-500/20 border border-amber-500 text-amber-200 font-semibold'
                        : 'bg-stone-850 border border-stone-800 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Facial Expressions (View F) */}
            <div className="space-y-2">
              <label className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} />
                <span>முக பாவம் (Facial Emotion Matrix)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    ['neutral', '1. நடுநிலை (Neutral)'],
                    ['curiosity', '2. ஆர்வம் (Curiosity)'],
                    ['small_happiness', '3. புன்னகை (Happiness)'],
                    ['concern', '4. கவலை (Concern)'],
                    ['fear', '5. நடுக்கம் (Fear)'],
                    ['determination', '6. உறுதி (Resolve)'],
                    ['sadness', '7. சோகம் (Sadness)'],
                    ['relief', '8. நிம்மதி (Relief)'],
                  ] as [EmotionState, string][]
                ).map(([emoKey, label]) => (
                  <button
                    key={emoKey}
                    onClick={() => setEmotion(emoKey)}
                    className={`p-1.5 rounded text-left transition-colors ${
                      emotion === emoKey
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-850 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Speech Viseme Decoupling Test */}
              <div className="pt-2">
                <button
                  onClick={toggleSpeechSimulation}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors ${
                    isSpeechSimRunning
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700'
                  }`}
                >
                  <Volume2 size={15} />
                  <span>
                    {isSpeechSimRunning ? 'குரல் ஒத்திசைவை நிறுத்து' : 'குரல் உதட்டசைவு சோதனை (Speech Sync)'}
                  </span>
                </button>
                <p className="text-[10px] text-stone-400 mt-1">
                  உதட்டசைவு முக உணர்வை அழிக்காமல் இயங்குகிறதா என்பதைச் சரிபார்க்கவும்.
                </p>
              </div>
            </div>

            {/* 3. Acting Poses & Animation Clips (View J) */}
            <div className="space-y-2">
              <label className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={14} />
                <span>நடிப்பு நிலைகள் (Acting Poses)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    ['idle_standing', 'இயல்பு நிற்றல் (Idle)'],
                    ['idle_sitting', 'அமர்ந்திருத்தல் (Sitting)'],
                    ['walking', 'நடை (Walk Cycle)'],
                    ['kneeling', 'மண்டியிடுதல் (Kneeling)'],
                    ['pottery_wheel', 'சக்கரம் சுழற்றுதல் (Potter)'],
                    ['holding_horse', 'குதிரை ஏந்துதல் (Horse)'],
                    ['two_flowers', 'இரு மலர் வெளிப்பாடு (Flowers)'],
                    ['embracing', 'குடும்பத் தழுவல் (Embrace)'],
                    ['poet_appeal', 'புலவர் முறையீடு (Appeal)'],
                    ['spear_ready', 'ஈட்டி ஆயத்தம் (Spear)'],
                    ['shield_raised', 'கேடயம் தூக்குதல் (Shield)'],
                  ] as [CharacterPose, string][]
                ).map(([poseKey, label]) => (
                  <button
                    key={poseKey}
                    onClick={() => setPose(poseKey)}
                    className={`p-1.5 rounded text-left transition-colors ${
                      pose === poseKey
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-850 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Props & Hand Targets (View H) */}
            <div className="space-y-2">
              <label className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Eye size={14} />
                <span>பொருட்கள் (Props &amp; Targets)</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    ['none', 'இல்லை (None)'],
                    ['clay_horse', 'மண் குதிரை'],
                    ['broken_horse', 'உடைந்த குதிரை'],
                    ['two_flowers', 'இரு மலர்கள்'],
                    ['poet_staff', 'புலவர் தடி'],
                    ['spear', 'ஈட்டி'],
                    ['shield', 'கேடயம்'],
                  ] as [CharacterProp, string][]
                ).map(([propKey, label]) => (
                  <button
                    key={propKey}
                    onClick={() => setProp(propKey)}
                    className={`p-1.5 rounded text-center transition-colors ${
                      prop === propKey
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-850 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Rig & Technical Overlays (View I) */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <label className="text-amber-400 font-semibold uppercase tracking-wider">
                தொழில்நுட்ப மேலடுக்கு (Technical Overlays)
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={showRigBones}
                    onChange={(e) => setShowRigBones(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <span>எலும்புக் கூடு காட்சிப்படுத்து (Skeletal Rig Joints)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={showFootMarkers}
                    onChange={(e) => setShowFootMarkers(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <span>தரை தொடுகுறி (Planted Foot Contact Markers)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
