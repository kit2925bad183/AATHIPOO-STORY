import { filmTimeline, TimelineState } from '../timeline/FilmTimelineController';
import { SoundEffectsSynthesizer } from './SoundEffectsSynthesizer';
import { MusicSynthesizer } from './MusicSynthesizer';
import { tamilSpeech } from './TamilSpeechSynthesizer';

export class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private dialogueBus: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;

  private sfxSynth: SoundEffectsSynthesizer = new SoundEffectsSynthesizer();
  private musicSynth: MusicSynthesizer = new MusicSynthesizer();

  private isInitialized: boolean = false;
  private unsubscribeTimeline: (() => void) | null = null;
  private lastTime: number = 0;

  // Custom bus volume levels (0..1)
  private dialogueVolume: number = 1.0;
  private musicVolume: number = 0.8;
  private sfxVolume: number = 0.85;

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = filmTimeline.getState().isMuted ? 0 : filmTimeline.getState().volume;
      this.masterGain.connect(this.ctx.destination);

      // Dialogue Bus
      this.dialogueBus = this.ctx.createGain();
      this.dialogueBus.gain.value = this.dialogueVolume;
      this.dialogueBus.connect(this.masterGain);

      // Music Bus
      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = this.musicVolume;
      this.musicBus.connect(this.masterGain);

      // SFX Bus
      this.sfxBus = this.ctx.createGain();
      this.sfxBus.gain.value = this.sfxVolume;
      this.sfxBus.connect(this.masterGain);

      // Init sub-synthesizers
      this.sfxSynth.init(this.ctx, this.sfxBus);
      this.musicSynth.init(this.ctx, this.musicBus);

      this.isInitialized = true;

      // Subscribe to timeline state changes
      this.unsubscribeTimeline = filmTimeline.subscribe((state) => this.handleTimelineUpdate(state));
    } catch (e) {
      console.warn('AudioContext initialization failed or blocked', e);
    }
  }

  public async resume(): Promise<void> {
    if (!this.ctx) {
      await this.initialize();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  private handleTimelineUpdate(state: TimelineState): void {
    if (!this.ctx || !this.isInitialized) return;

    const now = this.ctx.currentTime;

    // Master volume & mute
    if (this.masterGain) {
      const targetGain = state.isMuted ? 0 : state.volume;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(targetGain, now, 0.05);
    }

    // Music ducking when dialogue is active
    if (this.musicBus) {
      const isSpeechActive = state.speechActivity > 0.05 || state.currentSubtitle !== null;
      const targetMusicGain = isSpeechActive ? this.musicVolume * 0.35 : this.musicVolume;
      this.musicBus.gain.cancelScheduledValues(now);
      this.musicBus.gain.setTargetAtTime(targetMusicGain, now, 0.2);
    }

    // Update ambiances & music
    const activeEnvironment =
      state.currentSequence.id === 5 && state.currentTime < 518
        ? 'shrine'
        : state.currentSequence.environment;
    this.sfxSynth.updateAmbience(activeEnvironment, state.isPlaying);
    this.musicSynth.updateSequence(state.currentSequence.id, state.isPlaying);

    // Dramatic sound effects triggered at specific timeline milestones
    if (state.isPlaying) {
      // 01:30 - War drum interrupt
      if (state.currentTime >= 95 && state.currentTime <= 105 && this.lastTime < 95) {
        this.sfxSynth.triggerSFX('war_drum', 'seq1_drum');
      }
      // 11:42 (702s) - Clay horse drops and breaks
      if (state.currentTime >= 700 && state.currentTime <= 704 && this.lastTime < 700) {
        this.sfxSynth.triggerSFX('clay_break', 'seq6_clay_break');
      }
      // 17:05 (1025s) - Gate creaks open
      if (state.currentTime >= 1024 && state.currentTime <= 1028 && this.lastTime < 1024) {
        this.sfxSynth.triggerSFX('gate_creak', 'seq9_gate_open');
      }
      // 17:20 (1040s) - Weapons lowered
      if (state.currentTime >= 1008 && state.currentTime <= 1014 && this.lastTime < 1008) {
        this.sfxSynth.triggerSFX('weapons_lowered', 'seq8_weapons_lowered');
      }
      // River birds chirping in sequence 1 & 10
      if ((state.currentTime > 5 && state.currentTime < 20) || (state.currentTime > 1145 && state.currentTime < 1170)) {
        if (Math.random() < 0.015) {
          this.sfxSynth.triggerSFX('bird_chirp', `bird_${Math.floor(state.currentTime / 5)}`);
        }
      }

      // Synchronize Tamil speech synthesis if enabled
      if (state.currentSubtitle && tamilSpeech.getEnabled()) {
        tamilSpeech.speakSubtitle(state.currentSubtitle.id, state.currentSubtitle.textTa, state.currentSubtitle.characterId);
      }
    } else {
      tamilSpeech.stop();
    }

    this.lastTime = state.currentTime;
  }

  public setBusVolumes(dialogue: number, music: number, sfx: number): void {
    this.dialogueVolume = Math.max(0, Math.min(1, dialogue));
    this.musicVolume = Math.max(0, Math.min(1, music));
    this.sfxVolume = Math.max(0, Math.min(1, sfx));

    if (this.ctx) {
      const now = this.ctx.currentTime;
      if (this.dialogueBus) this.dialogueBus.gain.setTargetAtTime(this.dialogueVolume, now, 0.05);
      if (this.musicBus) this.musicBus.gain.setTargetAtTime(this.musicVolume, now, 0.05);
      if (this.sfxBus) this.sfxBus.gain.setTargetAtTime(this.sfxVolume, now, 0.05);
    }
  }

  public getBusVolumes(): { dialogue: number; music: number; sfx: number } {
    return { dialogue: this.dialogueVolume, music: this.musicVolume, sfx: this.sfxVolume };
  }

  public dispose(): void {
    if (this.unsubscribeTimeline) {
      this.unsubscribeTimeline();
      this.unsubscribeTimeline = null;
    }
    this.sfxSynth.dispose();
    this.musicSynth.dispose();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isInitialized = false;
  }
}

export const webAudioEngine = new WebAudioEngine();
