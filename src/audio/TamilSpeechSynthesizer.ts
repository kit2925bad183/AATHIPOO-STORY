// Tamil Speech Synthesis preview handler using browser Web Speech API (with safety & fallbacks)

export interface SpeechCapabilities {
  supported: boolean;
  hasTamilVoice: boolean;
  tamilVoiceName: string | null;
}

export class TamilSpeechSynthesizer {
  private tamilVoice: SpeechSynthesisVoice | null = null;
  private isEnabled: boolean = true;
  private lastSpokenSubtitleId: string | null = null;

  constructor() {
    this.detectVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => this.detectVoices();
    }
  }

  public detectVoices(): SpeechCapabilities {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { supported: false, hasTamilVoice: false, tamilVoiceName: null };
    }

    const voices = window.speechSynthesis.getVoices();
    const tamil = voices.find((v) => v.lang.toLowerCase().startsWith('ta') || v.name.toLowerCase().includes('tamil'));

    if (tamil) {
      this.tamilVoice = tamil;
      return { supported: true, hasTamilVoice: true, tamilVoiceName: tamil.name };
    }

    return { supported: true, hasTamilVoice: false, tamilVoiceName: null };
  }

  public speakSubtitle(subtitleId: string, textTa: string, characterId: string): void {
    if (!this.isEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (this.lastSpokenSubtitleId === subtitleId) return;

    this.lastSpokenSubtitleId = subtitleId;

    try {
      window.speechSynthesis.cancel(); // clear previous utterance

      const utterance = new SpeechSynthesisUtterance(textTa);
      utterance.lang = 'ta-IN';

      if (this.tamilVoice) {
        utterance.voice = this.tamilVoice;
      }

      // Slightly modulate pitch/rate depending on character
      if (characterId === 'ilangathir') {
        utterance.pitch = 1.35; // child voice
        utterance.rate = 1.0;
      } else if (characterId === 'kovur_kizhar') {
        utterance.pitch = 0.85; // elderly dignified poet
        utterance.rate = 0.92;
      } else if (characterId === 'arumbu') {
        utterance.pitch = 1.1; // mother
        utterance.rate = 0.98;
      } else if (characterId === 'nedunkilli' || characterId === 'nalankilli') {
        utterance.pitch = 0.95; // regal
        utterance.rate = 0.95;
      } else {
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis speak error:', e);
    }
  }

  public stop(): void {
    this.lastSpokenSubtitleId = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  public setEnabled(val: boolean): void {
    this.isEnabled = val;
    if (!val) this.stop();
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }
}

export const tamilSpeech = new TamilSpeechSynthesizer();
