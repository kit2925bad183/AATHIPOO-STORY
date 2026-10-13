import React, { useState } from 'react';
import { webAudioEngine } from '../../audio/WebAudioEngine';
import { tamilSpeech } from '../../audio/TamilSpeechSynthesizer';
import { AUDIO_MANIFEST } from '../../data/audioManifestData';
import { X, Volume2, Mic, Music, Wind, AlertCircle } from 'lucide-react';

interface AudioMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioMixerModal: React.FC<AudioMixerModalProps> = ({ isOpen, onClose }) => {
  const [volumes, setVolumes] = useState(() => webAudioEngine.getBusVolumes());
  const [speechEnabled, setSpeechEnabled] = useState(() => tamilSpeech.getEnabled());
  const speechCaps = tamilSpeech.detectVoices();

  if (!isOpen) return null;

  const handleVolumeChange = (bus: 'dialogue' | 'music' | 'sfx', val: number) => {
    const updated = { ...volumes, [bus]: val };
    setVolumes(updated);
    webAudioEngine.setBusVolumes(updated.dialogue, updated.music, updated.sfx);
  };

  const handleToggleSpeech = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setSpeechEnabled(val);
    tamilSpeech.setEnabled(val);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2">
            <Volume2 className="text-amber-400" size={20} />
            <h3 className="text-amber-400 font-bold text-lg">ஒலிக் கலவை & நிலவரம் (Audio Mixer & Status)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="மூடுக"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Audio Bus Controls */}
          <div className="space-y-4">
            <h4 className="text-stone-300 font-semibold text-xs tracking-wider uppercase">ஒலி நிலைகள் (Bus Volumes)</h4>

            {/* Dialogue */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Mic size={14} className="text-amber-400" /> வசனம் (Dialogue)
                </span>
                <span className="font-mono">{Math.round(volumes.dialogue * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumes.dialogue}
                onChange={(e) => handleVolumeChange('dialogue', parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Music */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Music size={14} className="text-amber-400" /> பின்னணி இசை (Sangam Music)
                </span>
                <span className="font-mono">{Math.round(volumes.music * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumes.music}
                onChange={(e) => handleVolumeChange('music', parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Sound Effects */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Wind size={14} className="text-amber-400" /> சூழல் ஒலிகள் (Foley & Ambience)
                </span>
                <span className="font-mono">{Math.round(volumes.sfx * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumes.sfx}
                onChange={(e) => handleVolumeChange('sfx', parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Browser Tamil TTS Preview Toggle */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-stone-200 font-medium text-sm block">உலவி தமிழ் குரல் முன்னோட்டம் (Browser Speech Preview)</span>
                <span className="text-stone-400 text-xs block">
                  {speechCaps.hasTamilVoice
                    ? `கிடைக்கப்பெற்ற குரல்: ${speechCaps.tamilVoiceName}`
                    : 'இயல்புநிலை உரை-குரல் தொகுப்பு (Tamil voice synthesis preview)'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={speechEnabled}
                  onChange={handleToggleSpeech}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>

          {/* Honest Asset Status Report */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
            <div className="flex items-start gap-2 text-amber-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-xs uppercase tracking-wide block">குரல்வடிவ நிலை அறிக்கை (Audio Asset Status)</span>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  இத்திரைப்படத்தின் 40 வசனத் துண்டுகளுக்கு (40 dialogue lines) தொழில்முறை ஸ்டுடியோ குரல் பதிவுகள் (Studio Voiceover) திட்டமிடப்பட்டுள்ளன.
                  தற்போது நிகழ்நேர Web Audio ராக இசை, சூழல் ஒலிகள் மற்றும் உரை-ஒலி உதட்டசைவு வளைவு (mouth envelopes) துல்லியமாக இயங்குகின்றன.
                </p>
                <div className="mt-2 text-[11px] text-stone-400 font-mono">
                  பதிவு வசன வழிகாட்டி: <span className="text-amber-300">public/docs/AUDIO_MANIFEST.md</span> ({AUDIO_MANIFEST.length} வசனங்கள்)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
