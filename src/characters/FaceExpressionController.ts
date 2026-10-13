// Facial Expression Controller with 8 Emotional States & Morphs
// Designed for authentic, nuanced Sangam character performances

export type EmotionState =
  | 'neutral'
  | 'curiosity'
  | 'small_happiness'
  | 'concern'
  | 'fear'
  | 'determination'
  | 'sadness'
  | 'relief';

export interface FacialMorphParams {
  innerBrowRaise: number; // 0..1
  browLower: number; // 0..1
  leftBrowRaise: number; // 0..1
  rightBrowRaise: number; // 0..1
  upperEyelidRaise: number; // 0..1
  eyelidNarrow: number; // 0..1
  blink: number; // 0..1
  cheekRaise: number; // 0..1
  lipCornerRaise: number; // 0..1 (smile)
  lipCornerLower: number; // 0..1 (frown)
  lipPress: number; // 0..1
  jawOpen: number; // 0..1
  mouthRounded: number; // 0..1
  mouthWide: number; // 0..1
}

export const EMOTION_PRESETS: Record<EmotionState, FacialMorphParams> = {
  neutral: {
    innerBrowRaise: 0,
    browLower: 0,
    leftBrowRaise: 0,
    rightBrowRaise: 0,
    upperEyelidRaise: 0,
    eyelidNarrow: 0,
    blink: 0,
    cheekRaise: 0,
    lipCornerRaise: 0,
    lipCornerLower: 0,
    lipPress: 0,
    jawOpen: 0,
    mouthRounded: 0,
    mouthWide: 0,
  },
  curiosity: {
    innerBrowRaise: 0.35,
    browLower: 0,
    leftBrowRaise: 0.65, // characteristic uneven brow of Ilangathir
    rightBrowRaise: 0.15,
    upperEyelidRaise: 0.45,
    eyelidNarrow: 0,
    blink: 0,
    cheekRaise: 0.1,
    lipCornerRaise: 0.2,
    lipCornerLower: 0,
    lipPress: 0,
    jawOpen: 0.08,
    mouthRounded: 0.25,
    mouthWide: 0,
  },
  small_happiness: {
    innerBrowRaise: 0.1,
    browLower: 0,
    leftBrowRaise: 0.15,
    rightBrowRaise: 0.15,
    upperEyelidRaise: 0,
    eyelidNarrow: 0.25,
    blink: 0,
    cheekRaise: 0.75,
    lipCornerRaise: 0.85, // warm genuine smile
    lipCornerLower: 0,
    lipPress: 0,
    jawOpen: 0.15,
    mouthRounded: 0,
    mouthWide: 0.35,
  },
  concern: {
    innerBrowRaise: 0.8,
    browLower: 0.3,
    leftBrowRaise: 0.2,
    rightBrowRaise: 0.2,
    upperEyelidRaise: 0.1,
    eyelidNarrow: 0.35,
    blink: 0,
    cheekRaise: 0,
    lipCornerRaise: 0,
    lipCornerLower: 0.65,
    lipPress: 0.4,
    jawOpen: 0,
    mouthRounded: 0,
    mouthWide: 0,
  },
  fear: {
    innerBrowRaise: 0.9,
    browLower: 0,
    leftBrowRaise: 0.75,
    rightBrowRaise: 0.75,
    upperEyelidRaise: 0.95, // wide, startled eyes
    eyelidNarrow: 0,
    blink: 0,
    cheekRaise: 0,
    lipCornerRaise: 0,
    lipCornerLower: 0.5,
    lipPress: 0,
    jawOpen: 0.35,
    mouthRounded: 0.45,
    mouthWide: 0.1,
  },
  determination: {
    innerBrowRaise: 0,
    browLower: 0.85, // firmly focused, furrowed brow
    leftBrowRaise: 0,
    rightBrowRaise: 0,
    upperEyelidRaise: 0,
    eyelidNarrow: 0.55,
    blink: 0,
    cheekRaise: 0.2,
    lipCornerRaise: 0,
    lipCornerLower: 0.15,
    lipPress: 0.7, // set jaw
    jawOpen: 0,
    mouthRounded: 0,
    mouthWide: 0.1,
  },
  sadness: {
    innerBrowRaise: 0.95, // angled inner brows
    browLower: 0.15,
    leftBrowRaise: 0,
    rightBrowRaise: 0,
    upperEyelidRaise: 0,
    eyelidNarrow: 0.4,
    blink: 0,
    cheekRaise: 0,
    lipCornerRaise: 0,
    lipCornerLower: 0.9,
    lipPress: 0.2,
    jawOpen: 0.05,
    mouthRounded: 0,
    mouthWide: 0,
  },
  relief: {
    innerBrowRaise: 0.2,
    browLower: 0,
    leftBrowRaise: 0.1,
    rightBrowRaise: 0.1,
    upperEyelidRaise: 0,
    eyelidNarrow: 0.3,
    blink: 0,
    cheekRaise: 0.5,
    lipCornerRaise: 0.6,
    lipCornerLower: 0,
    lipPress: 0,
    jawOpen: 0.1,
    mouthRounded: 0,
    mouthWide: 0.2,
  },
};

export class FaceExpressionController {
  private currentParams: FacialMorphParams;
  private targetEmotion: EmotionState = 'neutral';
  private currentEmotion: EmotionState = 'neutral';
  private blinkSeed: number;

  constructor(characterSeed: number = 1) {
    this.currentParams = { ...EMOTION_PRESETS.neutral };
    this.blinkSeed = characterSeed;
  }

  public setEmotion(emotion: EmotionState): void {
    this.targetEmotion = emotion;
  }

  public getEmotion(): EmotionState {
    return this.targetEmotion;
  }

  public update(time: number, speechActivity: number, lerpRate: number = 0.08): FacialMorphParams {
    const target = EMOTION_PRESETS[this.targetEmotion] || EMOTION_PRESETS.neutral;

    // Smoothly interpolate all facial morph parameters
    for (const key of Object.keys(target) as (keyof FacialMorphParams)[]) {
      this.currentParams[key] =
        this.currentParams[key] + (target[key] - this.currentParams[key]) * lerpRate;
    }

    // Natural seeded pseudo-random blink calculation (every 3.6 to 4.8s + seed offset)
    const blinkPeriod = 3.8 + ((this.blinkSeed * 17) % 1.2);
    const blinkPhase = (time + this.blinkSeed * 2.3) % blinkPeriod;
    const isBlinking = blinkPhase < 0.14;
    const blinkWeight = isBlinking ? 1.0 - Math.abs(blinkPhase - 0.07) / 0.07 : 0;
    this.currentParams.blink = Math.max(this.currentParams.blink, blinkWeight);

    // Apply speech mouth motion on top without wiping emotional smile/frown
    if (speechActivity > 0.02) {
      // Speech modulates jaw opening and width while preserving lip corner raise/lower
      this.currentParams.jawOpen = Math.max(this.currentParams.jawOpen, speechActivity * 0.85);
      this.currentParams.mouthWide = Math.max(
        this.currentParams.mouthWide,
        speechActivity * 0.4 + this.currentParams.lipCornerRaise * 0.3
      );
    }

    return { ...this.currentParams };
  }
}
