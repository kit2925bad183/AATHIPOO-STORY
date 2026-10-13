import { SUBTITLES } from './subtitlesData';

export interface DialogueAudioClip {
  clipId: string;
  speaker: string;
  speakerEn: string;
  characterId: string;
  tamilText: string;
  englishText: string;
  filePath: string;
  startTime: number; // in seconds
  duration: number; // in seconds
  subtitleId: string;
  recordedStatus: 'missing_studio_recording' | 'preview_synthesized' | 'ready';
  mouthEnvelopeCurve: number[]; // relative 0..1 values for stylized mouth animation
}

// Generate the complete audio manifest mapping each spoken subtitle
export const AUDIO_MANIFEST: DialogueAudioClip[] = SUBTITLES.map((sub, idx) => {
  const duration = sub.endTime - sub.startTime;
  // Generate a procedural mouth envelope curve with speech syllables cadence
  const samples = Math.max(8, Math.floor(duration * 4));
  const envelope: number[] = [];
  for (let i = 0; i < samples; i++) {
    // Envelope rises, fluctuates with natural syllable rhythm, and falls at the end
    const progress = i / (samples - 1);
    const window = Math.sin(progress * Math.PI); // Hann-like window
    const syllablePulse = 0.5 + 0.5 * Math.sin(progress * Math.PI * (duration * 2.8));
    envelope.push(parseFloat((window * syllablePulse).toFixed(2)));
  }

  return {
    clipId: `clip_${String(idx + 1).padStart(3, '0')}_${sub.characterId}`,
    speaker: sub.speakerTa,
    speakerEn: sub.speakerEn,
    characterId: sub.characterId,
    tamilText: sub.textTa,
    englishText: sub.textEn,
    filePath: `/audio/dialogue/clip_${String(idx + 1).padStart(3, '0')}_${sub.characterId}.mp3`,
    startTime: sub.startTime,
    duration: parseFloat(duration.toFixed(1)),
    subtitleId: sub.id,
    recordedStatus: 'missing_studio_recording', // Honest asset tracking
    mouthEnvelopeCurve: envelope,
  };
});
