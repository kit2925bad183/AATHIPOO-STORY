import React, { useState, useEffect } from 'react';
import { filmTimeline } from '../../timeline/FilmTimelineController';
import { webAudioEngine } from '../../audio/WebAudioEngine';
import { Play, RotateCcw, Clock, Sparkles } from 'lucide-react';

export const Hero: React.FC<{ onStartWatching: () => void }> = ({ onStartWatching }) => {
  const [savedTime, setSavedTime] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aathipoo_saved_time');
      if (stored) {
        const val = parseFloat(stored);
        if (!isNaN(val) && val > 10 && val < 1190) {
          setSavedTime(val);
        }
      }
    } catch {}
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleStart = async (seekTo?: number) => {
    await webAudioEngine.resume();
    if (seekTo !== undefined) {
      filmTimeline.seek(seekTo);
    } else {
      filmTimeline.seek(0);
    }
    filmTimeline.play();
    onStartWatching();
  };

  return (
    <div className="relative py-12 md:py-20 text-center flex flex-col items-center justify-center px-4">
      {/* Literary Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-700/40 text-amber-300 text-xs font-medium mb-6">
        <Sparkles size={13} className="text-amber-400" />
        <span>புறநானூறு 45 தழுவிய 3D அனிமேஷன் குறும்படம்</span>
      </div>

      {/* Main Titles */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 tracking-tight leading-tight">
        ஆத்திப்பூ
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl text-stone-200 font-serif mt-2 font-medium tracking-wide">
        வாளை நிறுத்திய தமிழ்
      </h2>
      <div className="text-xs sm:text-sm text-stone-400 font-mono tracking-widest uppercase mt-2">
        Aathipoo — The Tamil That Stayed the Sword
      </div>

      {/* Tamil Logline */}
      <p className="max-w-2xl text-stone-300 text-sm sm:text-base md:text-lg mt-6 leading-relaxed">
        ஒரு குடும்பத்தின் பாசம்... இரண்டு சோழ வேந்தர்களின் வீம்பு... இரு பெருஞ்சேனைகளின் நடுவே நின்ற ஒரு குயவன் சிறுவனின் ஒற்றைக் கேள்வி.
      </p>

      {/* Meta Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-stone-400">
        <span className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-3 py-1 rounded-full font-mono">
          <Clock size={13} className="text-amber-400" /> கால அளவு: 20:00 (1,200 விநாடிகள்)
        </span>
        <span className="bg-stone-900 border border-stone-800 px-3 py-1 rounded-full">
          Three.js • Web Audio API
        </span>
        <span className="bg-stone-900 border border-stone-800 px-3 py-1 rounded-full text-amber-400">
          உண்மையான 3D அனிமேஷன்
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          onClick={() => handleStart(0)}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-base md:text-lg shadow-xl shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Play size={20} fill="currentColor" />
          திரைப்படத்தைப் பார்க்க (Watch Film)
        </button>

        {savedTime !== null && (
          <button
            onClick={() => handleStart(savedTime)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 border border-amber-800/60 hover:bg-stone-850 hover:border-amber-600 text-stone-200 text-sm md:text-base font-semibold transition-all cursor-pointer"
          >
            <RotateCcw size={16} className="text-amber-400" />
            தொடர்ந்து பார்க்க ({formatTime(savedTime)})
          </button>
        )}
      </div>
    </div>
  );
};
