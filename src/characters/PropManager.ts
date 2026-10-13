// Authoritative Prop Ownership & Deterministic Trajectory Manager

export type HorsePropState =
  | 'ON_POTTER_WHEEL'
  | 'HELD_BY_ILANGATHIR'
  | 'FALLING'
  | 'BROKEN_ON_GROUND'
  | 'HELD_BROKEN'
  | 'BESIDE_NEW_HORSE';

export type FlowerPropState =
  | 'ON_TREE'
  | 'GATHERING'
  | 'HELD_IN_CLOSED_HAND'
  | 'OPEN_PALM_REVEAL'
  | 'OFFERED_PEACE';

export interface PropTimelineSnapshot {
  horseState: HorsePropState;
  horsePosition: [number, number, number];
  horseRotation: [number, number, number];
  isHorseBroken: boolean;
  brokenLegOffset: [number, number, number];
  flowerState: FlowerPropState;
  flowerCount: number;
  flowersVisibleInPalm: boolean;
}

export class PropManager {
  public static getSnapshotAtTime(currentTime: number): PropTimelineSnapshot {
    // 1. CLAY HORSE DETERMINISTIC CONTINUITY
    let horseState: HorsePropState = 'HELD_BY_ILANGATHIR';
    let horsePosition: [number, number, number] = [0, 0, 0];
    let horseRotation: [number, number, number] = [0, 0, 0];
    let isHorseBroken = false;
    let brokenLegOffset: [number, number, number] = [0, 0, 0];

    if (currentTime < 24) {
      // 0 - 24s: Sitting on spinning potter's wheel
      horseState = 'ON_POTTER_WHEEL';
      horsePosition = [0, 0.28, 0];
      horseRotation = [0, 0, 0];
      isHorseBroken = false;
    } else if (currentTime >= 24 && currentTime < 698) {
      // 24 - 698s: Held lovingly by Ilangathir
      horseState = 'HELD_BY_ILANGATHIR';
      isHorseBroken = false;
    } else if (currentTime >= 698 && currentTime < 701) {
      // 698 - 701s: The Slip & Fall in Nalankilli's Pavilion (Hero Moment 3)
      horseState = 'FALLING';
      const fallProgress = (currentTime - 698) / 3.0; // 0..1
      // Parabolic fall trajectory from hand (y=0.75) to carpet (y=0.06)
      const currentY = 0.75 - fallProgress * fallProgress * 0.69;
      const currentZ = 0.15 + fallProgress * 0.45;
      const rotX = fallProgress * Math.PI * 1.5;
      horsePosition = [0, currentY, currentZ];
      horseRotation = [rotX, 0, fallProgress * 0.8];
      isHorseBroken = fallProgress > 0.85; // Snaps leg on final impact
      brokenLegOffset = [0.08 * fallProgress, 0, 0.05 * fallProgress];
    } else if (currentTime >= 701 && currentTime < 714) {
      // 701 - 714s: Resting broken on the pavilion floor
      horseState = 'BROKEN_ON_GROUND';
      horsePosition = [0, 0.06, 0.6];
      horseRotation = [Math.PI * 0.45, 0, 0.3];
      isHorseBroken = true;
      brokenLegOffset = [0.14, 0.02, 0.08]; // Broken leg detached on ground
    } else if (currentTime >= 714 && currentTime < 1140) {
      // 714 - 1140s: Ilangathir gently carries the broken horse
      horseState = 'HELD_BROKEN';
      isHorseBroken = true;
      brokenLegOffset = [0, -0.05, 0.02]; // Broken leg carried in pocket/palm
    } else {
      // 1140 - 1200s: Placed on wooden plank beside new finished horse (Hero Moment 1 / Ending)
      horseState = 'BESIDE_NEW_HORSE';
      horsePosition = [0.65, 0.4, 0.2];
      horseRotation = [0, 0.3, 0];
      isHorseBroken = true;
      brokenLegOffset = [0.04, 0, 0.02];
    }

    // 2. AATHIPOO FLOWERS DETERMINISTIC CONTINUITY
    let flowerState: FlowerPropState = 'ON_TREE';
    let flowerCount = 2;
    let flowersVisibleInPalm = false;

    if (currentTime < 785) {
      flowerState = 'ON_TREE';
      flowersVisibleInPalm = false;
    } else if (currentTime >= 785 && currentTime < 820) {
      flowerState = 'GATHERING';
      flowersVisibleInPalm = true;
    } else if (currentTime >= 820 && currentTime < 968) {
      flowerState = 'HELD_IN_CLOSED_HAND';
      flowersVisibleInPalm = true;
    } else if (currentTime >= 968 && currentTime < 1010) {
      // 968 - 1010s: The Open Palm Climax Reveal: "இதில் எந்தப் பூ வெல்ல வேண்டும்?"
      flowerState = 'OPEN_PALM_REVEAL';
      flowersVisibleInPalm = true;
    } else {
      flowerState = 'OFFERED_PEACE';
      flowersVisibleInPalm = false;
    }

    return {
      horseState,
      horsePosition,
      horseRotation,
      isHorseBroken,
      brokenLegOffset,
      flowerState,
      flowerCount,
      flowersVisibleInPalm,
    };
  }
}
