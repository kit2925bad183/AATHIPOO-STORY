// Procedural Web Audio Sound Effects Synthesizer for Ancient Sangam Ambience

export class SoundEffectsSynthesizer {
  private ctx: AudioContext | null = null;
  private sfxBus: GainNode | null = null;

  // Continuous ambient nodes
  private riverGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private campfireGain: GainNode | null = null;
  private wheelGain: GainNode | null = null;

  // Active trigger guards
  private lastTriggered: Record<string, number> = {};

  public init(ctx: AudioContext, sfxBus: GainNode): void {
    this.ctx = ctx;
    this.sfxBus = sfxBus;
    this.setupAmbientBuses();
  }

  private setupAmbientBuses(): void {
    if (!this.ctx || !this.sfxBus) return;

    // River water generator (filtered pink noise)
    const riverNoise = this.createNoiseBuffer(2.0);
    const riverSource = this.ctx.createBufferSource();
    riverSource.buffer = riverNoise;
    riverSource.loop = true;

    const riverFilter = this.ctx.createBiquadFilter();
    riverFilter.type = 'lowpass';
    riverFilter.frequency.value = 450;

    this.riverGain = this.ctx.createGain();
    this.riverGain.gain.value = 0;

    riverSource.connect(riverFilter);
    riverFilter.connect(this.riverGain);
    this.riverGain.connect(this.sfxBus);
    riverSource.start();

    // Wind generator
    const windNoise = this.createNoiseBuffer(3.0);
    const windSource = this.ctx.createBufferSource();
    windSource.buffer = windNoise;
    windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 320;
    windFilter.Q.value = 1.2;

    this.windGain = this.ctx.createGain();
    this.windGain.gain.value = 0;

    windSource.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.sfxBus);
    windSource.start();

    // Campfire generator (crackling noise)
    const fireNoise = this.createNoiseBuffer(2.5);
    const fireSource = this.ctx.createBufferSource();
    fireSource.buffer = fireNoise;
    fireSource.loop = true;

    const fireFilter = this.ctx.createBiquadFilter();
    fireFilter.type = 'bandpass';
    fireFilter.frequency.value = 1200;
    fireFilter.Q.value = 3.0;

    this.campfireGain = this.ctx.createGain();
    this.campfireGain.gain.value = 0;

    fireSource.connect(fireFilter);
    fireFilter.connect(this.campfireGain);
    this.campfireGain.connect(this.sfxBus);
    fireSource.start();

    // Potter's wheel rhythmic whoosh
    const wheelOsc = this.ctx.createOscillator();
    wheelOsc.type = 'triangle';
    wheelOsc.frequency.value = 55; // low hum

    this.wheelGain = this.ctx.createGain();
    this.wheelGain.gain.value = 0;

    wheelOsc.connect(this.wheelGain);
    this.wheelGain.connect(this.sfxBus);
    wheelOsc.start();
  }

  private createNoiseBuffer(seconds: number): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter approximation
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }
    return buffer;
  }

  public updateAmbience(environment: string, isPlaying: boolean): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const setGain = (gainNode: GainNode | null, targetVal: number) => {
      if (!gainNode) return;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setTargetAtTime(isPlaying ? targetVal : 0, now, 0.4);
    };

    switch (environment) {
      case 'riverbank':
        setGain(this.riverGain, 0.22);
        setGain(this.windGain, 0.12);
        setGain(this.campfireGain, 0);
        setGain(this.wheelGain, 0.16);
        break;
      case 'potters_home':
        setGain(this.riverGain, 0.06);
        setGain(this.windGain, 0.08);
        setGain(this.campfireGain, 0.04);
        setGain(this.wheelGain, 0.2);
        break;
      case 'city_street':
        setGain(this.riverGain, 0);
        setGain(this.windGain, 0.18);
        setGain(this.campfireGain, 0);
        setGain(this.wheelGain, 0);
        break;
      case 'audience_hall':
        setGain(this.riverGain, 0);
        setGain(this.windGain, 0.04);
        setGain(this.campfireGain, 0.05); // indoor torch flame
        setGain(this.wheelGain, 0);
        break;
      case 'shrine':
        setGain(this.riverGain, 0.02);
        setGain(this.windGain, 0.08); // gentle dusk breeze
        setGain(this.campfireGain, 0.02); // quiet flickering oil lamp flame
        setGain(this.wheelGain, 0);
        break;
      case 'army_camp':
      case 'royal_pavilion':
        setGain(this.riverGain, 0);
        setGain(this.windGain, 0.14);
        setGain(this.campfireGain, 0.22);
        setGain(this.wheelGain, 0);
        break;
      case 'truce_ground':
        setGain(this.riverGain, 0.04);
        setGain(this.windGain, 0.24); // dramatic plain wind
        setGain(this.campfireGain, 0);
        setGain(this.wheelGain, 0);
        break;
      default:
        setGain(this.riverGain, 0.08);
        setGain(this.windGain, 0.1);
        setGain(this.campfireGain, 0);
        setGain(this.wheelGain, 0);
    }
  }

  // Trigger sound effect for specific dramatic beats
  public triggerSFX(type: 'war_drum' | 'clay_break' | 'gate_creak' | 'weapons_lowered' | 'bird_chirp', timeKey: string): void {
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;

    // Prevent re-triggering the same beat within 2 seconds
    if (this.lastTriggered[timeKey] && now - this.lastTriggered[timeKey] < 2.0) {
      return;
    }
    this.lastTriggered[timeKey] = now;

    switch (type) {
      case 'war_drum':
        this.playWarDrum(now);
        break;
      case 'clay_break':
        this.playClayBreak(now);
        break;
      case 'gate_creak':
        this.playGateCreak(now);
        break;
      case 'weapons_lowered':
        this.playWeaponsLowered(now);
        break;
      case 'bird_chirp':
        this.playBirdChirp(now);
        break;
    }
  }

  private playWarDrum(now: number): void {
    if (!this.ctx || !this.sfxBus) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.6);

    gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  private playClayBreak(now: number): void {
    if (!this.ctx || !this.sfxBus) return;
    // Transient pop + ceramic click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  private playGateCreak(now: number): void {
    if (!this.ctx || !this.sfxBus) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65, now);
    osc.frequency.linearRampToValueAtTime(85, now + 1.2);
    osc.frequency.linearRampToValueAtTime(50, now + 2.5);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 2.9);
  }

  private playWeaponsLowered(now: number): void {
    if (!this.ctx || !this.sfxBus) return;
    // Chime of lowered spears and bronze plates
    [240, 360, 480].forEach((freq, idx) => {
      if (!this.ctx || !this.sfxBus) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.12, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 1.5);

      osc.connect(gain);
      gain.connect(this.sfxBus);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 1.6);
    });
  }

  private playBirdChirp(now: number): void {
    if (!this.ctx || !this.sfxBus) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(3400, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.sfxBus);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  public dispose(): void {
    this.riverGain = null;
    this.windGain = null;
    this.campfireGain = null;
    this.wheelGain = null;
    this.ctx = null;
    this.sfxBus = null;
  }
}
