import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { TimelineState } from '../../timeline/FilmTimelineController';
import { CinematicCameraController } from '../../cameras/CinematicCameraController';
import { SangamSky } from '../../environments/SangamSky';
import { SequenceManager } from '../../scenes/SequenceManager';

export const FilmCanvas: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const quality = timeline.quality;
  const dpr: [number, number] = quality === 'low' ? [0.8, 1.0] : quality === 'medium' ? [1.0, 1.5] : [1.0, 2.0];
  const shadows = quality !== 'low';

  return (
    <div className="relative w-full h-full bg-stone-950 overflow-hidden select-none">
      <Canvas
        shadows={shadows}
        dpr={dpr}
        camera={{ position: [0, 4, 18], fov: 42, near: 0.1, far: 180 }}
        gl={{
          antialias: quality !== 'low',
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <SangamSky sequenceId={timeline.currentSequence.id} />
          <CinematicCameraController timeline={timeline} />
          <SequenceManager timeline={timeline} />
        </Suspense>
      </Canvas>
    </div>
  );
};
