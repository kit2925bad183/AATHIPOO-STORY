import { SEQUENCES, SequenceInfo } from '../data/screenplayData';
import { SHOTS, FilmShot } from '../data/shotData';
import { SUBTITLES, SubtitleCue } from '../data/subtitlesData';
import { AUDIO_MANIFEST, DialogueAudioClip } from '../data/audioManifestData';

export type QualityLevel = 'low' | 'medium' | 'high';
export type SubtitleLanguage = 'ta' | 'en' | 'off';

export interface TimelineState {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number; // 0..1
  isMuted: boolean;
  quality: QualityLevel;
  subtitlesMode: SubtitleLanguage;
  currentSequence: SequenceInfo;
  currentShot: FilmShot;
  currentSubtitle: SubtitleCue | null;
  currentDialogue: DialogueAudioClip | null;
  speechActivity: number; // 0..1 for mouth animation
  hasStarted: boolean;
}

export type TimelineListener = (state: TimelineState) => void;

class FilmTimelineController {
  private currentTime: number = 0;
  private readonly duration: number = 1200; // 20 minutes
  private isPlaying: boolean = false;
  private volume: number = 0.85;
  private isMuted: boolean = false;
  private quality: QualityLevel = 'high';
  private subtitlesMode: SubtitleLanguage = 'ta';
  private hasStarted: boolean = false;

  private listeners: Set<TimelineListener> = new Set();
  private lastRafTime: number = 0;
  private rafId: number | null = null;

  constructor() {
    // Restore saved progress if any
    if (typeof window !== 'undefined') {
      try {
        const savedTime = localStorage.getItem('aathipoo_saved_time');
        if (savedTime) {
          const parsed = parseFloat(savedTime);
          if (!isNaN(parsed) && parsed > 0 && parsed < this.duration - 10) {
            this.currentTime = parsed;
          }
        }
        const savedQuality = localStorage.getItem('aathipoo_quality');
        if (savedQuality && ['low', 'medium', 'high'].includes(savedQuality)) {
          this.quality = savedQuality as QualityLevel;
        }
        const savedSubs = localStorage.getItem('aathipoo_subtitles');
        if (savedSubs && ['ta', 'en', 'off'].includes(savedSubs)) {
          this.subtitlesMode = savedSubs as SubtitleLanguage;
        }
      } catch (e) {
        console.warn('Could not read localStorage progress', e);
      }

      // Pause when browser tab is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.isPlaying) {
          this.pause();
        }
      });
    }
  }

  public subscribe(listener: TimelineListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState(): TimelineState {
    const currentSequence = this.getSequenceAt(this.currentTime);
    const currentShot = this.getShotAt(this.currentTime);
    const currentSubtitle = this.getSubtitleAt(this.currentTime);
    const currentDialogue = this.getDialogueAt(this.currentTime);
    const speechActivity = this.getSpeechActivityAt(this.currentTime, currentDialogue);

    return {
      currentTime: this.currentTime,
      duration: this.duration,
      isPlaying: this.isPlaying,
      volume: this.volume,
      isMuted: this.isMuted,
      quality: this.quality,
      subtitlesMode: this.subtitlesMode,
      currentSequence,
      currentShot,
      currentSubtitle,
      currentDialogue,
      speechActivity,
      hasStarted: this.hasStarted,
    };
  }

  public getSequenceAt(time: number): SequenceInfo {
    const clamped = Math.max(0, Math.min(this.duration, time));
    const found = SEQUENCES.find((s) => clamped >= s.startTime && clamped < s.endTime);
    return found || SEQUENCES[SEQUENCES.length - 1];
  }

  public getShotAt(time: number): FilmShot {
    const clamped = Math.max(0, Math.min(this.duration, time));
    const found = SHOTS.find((s) => clamped >= s.startTime && clamped < s.endTime);
    return found || SHOTS[SHOTS.length - 1];
  }

  public getSubtitleAt(time: number): SubtitleCue | null {
    if (this.subtitlesMode === 'off') return null;
    const clamped = Math.max(0, Math.min(this.duration, time));
    return SUBTITLES.find((s) => clamped >= s.startTime && clamped <= s.endTime) || null;
  }

  public getDialogueAt(time: number): DialogueAudioClip | null {
    const clamped = Math.max(0, Math.min(this.duration, time));
    return AUDIO_MANIFEST.find((c) => clamped >= c.startTime && clamped <= c.startTime + c.duration) || null;
  }

  public getSpeechActivityAt(time: number, dialogue: DialogueAudioClip | null): number {
    if (!dialogue) return 0;
    const relTime = time - dialogue.startTime;
    if (relTime < 0 || relTime > dialogue.duration) return 0;

    const fraction = relTime / dialogue.duration;
    const curve = dialogue.mouthEnvelopeCurve;
    if (!curve || curve.length === 0) return 0;

    const idx = Math.min(curve.length - 1, Math.floor(fraction * curve.length));
    return curve[idx];
  }

  public play(): void {
    if (this.currentTime >= this.duration) {
      this.currentTime = 0;
    }
    this.isPlaying = true;
    this.hasStarted = true;
    this.lastRafTime = performance.now();
    this.startLoop();
    this.notify();
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.persistProgress();
    this.notify();
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(targetTimeSeconds: number): void {
    const clamped = Math.max(0, Math.min(this.duration, targetTimeSeconds));
    this.currentTime = clamped;
    this.persistProgress();
    this.notify();
  }

  public skip(seconds: number): void {
    this.seek(this.currentTime + seconds);
  }

  public restart(): void {
    this.currentTime = 0;
    this.play();
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.volume > 0 && this.isMuted) {
      this.isMuted = false;
    }
    this.notify();
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.notify();
  }

  public setQuality(quality: QualityLevel): void {
    this.quality = quality;
    try {
      localStorage.setItem('aathipoo_quality', quality);
    } catch {}
    this.notify();
  }

  public setSubtitlesMode(mode: SubtitleLanguage): void {
    this.subtitlesMode = mode;
    try {
      localStorage.setItem('aathipoo_subtitles', mode);
    } catch {}
    this.notify();
  }

  private startLoop(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);

    const step = (now: number) => {
      if (!this.isPlaying) return;

      const deltaSeconds = (now - this.lastRafTime) / 1000;
      this.lastRafTime = now;

      // Cap delta to avoid giant jumps if browser hung
      const safeDelta = Math.min(deltaSeconds, 0.1);
      this.currentTime += safeDelta;

      if (this.currentTime >= this.duration) {
        this.currentTime = this.duration;
        this.pause();
        return;
      }

      this.notify();
      this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }

  private persistProgress(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('aathipoo_saved_time', this.currentTime.toFixed(1));
      }
    } catch {}
  }
}

export const filmTimeline = new FilmTimelineController();
