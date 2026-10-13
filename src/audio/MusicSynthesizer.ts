// Sangam-inspired modal ambient soundtrack generator using Web Audio API

export class MusicSynthesizer {
  private ctx: AudioContext | null = null;
  private musicBus: GainNode | null = null;
  private isPlaying: boolean = false;

  // Drone oscillators
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  // Melodic timer
  private timerId: number | null = null;
  private currentSequenceId: number = 1;

  // Scales based on Tamil Sangam modes (Kurunji / Mullai / Marutham - Mohanam / Harikambhoji)
  // Base frequencies (C3 root = 130.81Hz)
  private readonly MOHANAM = [130.81, 146.83, 164.81, 196.0, 220.0, 261.63, 293.66, 329.63, 392.0, 440.0];
  // Tension / somber mode
  private readonly TENSION_MODE = [130.81, 138.59, 155.56, 174.61, 196.0, 207.65, 233.08, 261.63];
  // Climax solemn mode
  private readonly CLIMAX_MODE = [130.81, 164.81, 196.0, 246.94, 261.63, 329.63, 392.0];

  public init(ctx: AudioContext, musicBus: GainNode): void {
    this.ctx = ctx;
    this.musicBus = musicBus;
    this.setupDrone();
  }

  private setupDrone(): void {
    if (!this.ctx || !this.musicBus) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0;
    this.droneGain.connect(this.musicBus);

    // Root drone (Sa)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.value = 65.41; // C2 deep root

    // Fifth harmonic drone (Pa)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.value = 98.0; // G2

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  public updateSequence(sequenceId: number, isPlaying: boolean): void {
    this.currentSequenceId = sequenceId;
    this.isPlaying = isPlaying;

    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;

    if (!isPlaying) {
      this.droneGain.gain.setTargetAtTime(0, now, 0.3);
      if (this.timerId !== null) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      return;
    }

    // Set drone volume and character based on sequence
    let droneTarget = 0.22;
    if (sequenceId === 8) {
      // Climax: slightly quieter, awe-inspiring stillness
      droneTarget = 0.14;
    } else if (sequenceId === 7) {
      // Pre-dawn tension
      droneTarget = 0.25;
    }

    this.droneGain.gain.cancelScheduledValues(now);
    this.droneGain.gain.setTargetAtTime(droneTarget, now, 0.5);

    // Ensure melodic note loop is running
    if (this.timerId === null) {
      this.timerId = window.setInterval(() => this.scheduleNextMelodicNote(), 2800);
    }
  }

  private scheduleNextMelodicNote(): void {
    if (!this.ctx || !this.musicBus || !this.isPlaying) return;

    // Pick notes according to sequence mood
    let notes = this.MOHANAM;
    let noteType: OscillatorType = 'sine';
    let duration = 2.4;

    if ([2, 4, 6, 7].includes(this.currentSequenceId)) {
      notes = this.TENSION_MODE;
      noteType = 'triangle';
      duration = 1.8;
    } else if (this.currentSequenceId === 8) {
      notes = this.CLIMAX_MODE;
      noteType = 'sine';
      duration = 3.5;
    }

    const freq = notes[Math.floor(Math.random() * notes.length)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = noteType;
    osc.frequency.setValueAtTime(freq, now);

    // Subtle gentle glide (gamakam)
    if (Math.random() > 0.4) {
      const targetFreq = notes[Math.floor(Math.random() * notes.length)];
      osc.frequency.exponentialRampToValueAtTime(targetFreq, now + duration * 0.5);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.musicBus);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  public dispose(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.droneGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.ctx = null;
    this.musicBus = null;
  }
}
