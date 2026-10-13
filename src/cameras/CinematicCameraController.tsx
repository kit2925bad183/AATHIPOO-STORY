import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { TimelineState } from '../timeline/FilmTimelineController';

export const CinematicCameraController: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const { camera } = useThree();
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.5, 0));
  const lastShotIdRef = useRef<string>('');

  const shot = timeline.currentShot;
  const t = timeline.currentTime;

  useEffect(() => {
    // When shot cuts to a new shot, reset immediately (motivated cut)
    if (shot && shot.id !== lastShotIdRef.current) {
      lastShotIdRef.current = shot.id;
      const initialPos = shot.camera.position;
      const initialTarget = shot.camera.target;

      camera.position.set(initialPos[0], initialPos[1], initialPos[2]);
      currentTargetRef.current.set(initialTarget[0], initialTarget[1], initialTarget[2]);
      camera.lookAt(currentTargetRef.current);

      if (shot.camera.fov && 'fov' in camera) {
        (camera as THREE.PerspectiveCamera).fov = shot.camera.fov;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    }
  }, [shot, camera]);

  useFrame(() => {
    if (!shot) return;

    // Calculate progression fraction within this shot
    const duration = Math.max(0.1, shot.endTime - shot.startTime);
    const progress = Math.max(0, Math.min(1, (t - shot.startTime) / duration));

    const startPos = shot.camera.position;
    const startTarget = shot.camera.target;

    let targetX = startPos[0];
    let targetY = startPos[1];
    let targetZ = startPos[2];

    let lookX = startTarget[0];
    let lookY = startTarget[1];
    let lookZ = startTarget[2];

    if (shot.targetCamera) {
      // Smooth tracking shot
      const endPos = shot.targetCamera.position;
      const endTarget = shot.targetCamera.target;

      // Smooth smoothstep curve for natural camera dollies
      const smoothProgress = progress * progress * (3 - 2 * progress);

      targetX = THREE.MathUtils.lerp(startPos[0], endPos[0], smoothProgress);
      targetY = THREE.MathUtils.lerp(startPos[1], endPos[1], smoothProgress);
      targetZ = THREE.MathUtils.lerp(startPos[2], endPos[2], smoothProgress);

      lookX = THREE.MathUtils.lerp(startTarget[0], endTarget[0], smoothProgress);
      lookY = THREE.MathUtils.lerp(startTarget[1], endTarget[1], smoothProgress);
      lookZ = THREE.MathUtils.lerp(startTarget[2], endTarget[2], smoothProgress);
    }

    // Direct deterministic placement on canvas
    camera.position.set(targetX, targetY, targetZ);
    currentTargetRef.current.set(lookX, lookY, lookZ);
    camera.lookAt(currentTargetRef.current);
  });

  return null;
};
