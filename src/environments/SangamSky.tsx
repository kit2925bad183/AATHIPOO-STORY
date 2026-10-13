import React from 'react';

interface SangamSkyProps {
  sequenceId: number;
}

export const SangamSky: React.FC<SangamSkyProps> = ({ sequenceId }) => {
  // Determine lighting & sky parameters deterministically per sequence
  let skyColor = '#e8b87d';
  let sunColor = '#ffddaa';
  let sunPos: [number, number, number] = [20, 15, 30];
  let ambientColor = '#8a6b47';
  let ambientIntensity = 0.7;
  let fogColor = '#dec09e';
  let fogNear = 15;
  let fogFar = 70;

  switch (sequenceId) {
    case 1: // Seq 1: Kaveri Golden Sunrise
      skyColor = '#f5c287';
      sunColor = '#ffe2a8';
      sunPos = [25, 12, 35];
      ambientColor = '#94704e';
      ambientIntensity = 0.8;
      fogColor = '#e8c49e';
      break;

    case 2: // Seq 2: Closed Gates (Dry, overcast, somber)
      skyColor = '#a8988b';
      sunColor = '#d9cfbe';
      sunPos = [10, 25, 20];
      ambientColor = '#635952';
      ambientIntensity = 0.6;
      fogColor = '#9c8c80';
      break;

    case 3: // Seq 3: Courtyard contemplative afternoon
      skyColor = '#d9a979';
      sunColor = '#fcd09f';
      sunPos = [15, 20, 15];
      ambientColor = '#73573e';
      ambientIntensity = 0.75;
      fogColor = '#caa37e';
      break;

    case 4: // Seq 4: Interior Audience Hall
      skyColor = '#241a15';
      sunColor = '#ff9944'; // torch flame highlights
      sunPos = [0, 8, 5];
      ambientColor = '#4a2c1b';
      ambientIntensity = 0.85;
      fogColor = '#1f140e';
      fogNear = 20;
      fogFar = 45;
      break;

    case 5: // Seq 5: Night Army Camp
      skyColor = '#0f1726';
      sunColor = '#ff8833'; // firelight
      sunPos = [5, 4, 8];
      ambientColor = '#141d2e';
      ambientIntensity = 0.35;
      fogColor = '#0c121f';
      fogNear = 10;
      fogFar = 55;
      break;

    case 6: // Seq 6: Royal Pavilion Interior (Night torchlight)
      skyColor = '#14111f';
      sunColor = '#ffaa44';
      sunPos = [0, 6, 4];
      ambientColor = '#3d2516';
      ambientIntensity = 0.7;
      fogColor = '#1a1210';
      fogNear = 12;
      fogFar = 40;
      break;

    case 7: // Seq 7: Cold pre-dawn mist
      skyColor = '#324159';
      sunColor = '#8faed9';
      sunPos = [20, 8, 30];
      ambientColor = '#263447';
      ambientIntensity = 0.55;
      fogColor = '#334459';
      fogNear = 8;
      fogFar = 50;
      break;

    case 8: // Seq 8: The Climax (Dawn breaking into golden brilliance)
      skyColor = '#e07a4a';
      sunColor = '#ffba73';
      sunPos = [35, 14, 25];
      ambientColor = '#804d33';
      ambientIntensity = 0.85;
      fogColor = '#d48861';
      fogNear = 14;
      fogFar = 65;
      break;

    case 9: // Seq 9: The Gates Open (Bright, hopeful morning)
      skyColor = '#6daae0';
      sunColor = '#fff5cf';
      sunPos = [25, 25, 20];
      ambientColor = '#708ea6';
      ambientIntensity = 0.9;
      fogColor = '#9bc5eb';
      fogNear = 20;
      fogFar = 85;
      break;

    case 10: // Seq 10: Family Potter's Wheel (Warm, peaceful golden daylight)
    default:
      skyColor = '#e6b981';
      sunColor = '#ffe3b0';
      sunPos = [20, 18, 25];
      ambientColor = '#876949';
      ambientIntensity = 0.85;
      fogColor = '#dec09b';
      break;
  }

  return (
    <>
      <color attach="background" args={[skyColor]} />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
      <ambientLight color={ambientColor} intensity={ambientIntensity} />
      <directionalLight
        position={sunPos}
        color={sunColor}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* Soft secondary bounce light */}
      <directionalLight position={[-sunPos[0], 10, -sunPos[2]]} color={skyColor} intensity={0.3} />
    </>
  );
};
