import React from 'react';
import { SubtitleCue } from '../../data/subtitlesData';
import { SubtitleLanguage } from '../../timeline/FilmTimelineController';

interface SubtitlesDisplayProps {
  subtitle: SubtitleCue | null;
  mode: SubtitleLanguage;
}

export const SubtitlesDisplay: React.FC<SubtitlesDisplayProps> = ({ subtitle, mode }) => {
  if (!subtitle || mode === 'off') return null;

  return (
    <div
      className="absolute bottom-20 left-0 right-0 flex flex-col items-center justify-end pointer-events-none px-6 z-20"
      aria-live="polite"
      role="region"
      aria-label="திரைப்பட வசனங்கள்"
    >
      <div className="max-w-3xl bg-black/75 backdrop-blur-md border border-amber-900/40 rounded-xl px-6 py-3.5 text-center shadow-2xl transition-all duration-200">
        {/* Speaker Name */}
        <div className="text-amber-400 font-medium text-xs md:text-sm tracking-wider uppercase mb-1">
          {mode === 'en' ? subtitle.speakerEn : subtitle.speakerTa}
        </div>

        {/* Tamil Primary Dialogue Text */}
        {(mode === 'ta' || mode === 'en') && (
          <div className="text-stone-100 font-semibold text-base md:text-xl lg:text-2xl leading-relaxed tracking-wide drop-shadow-md">
            {subtitle.textTa}
          </div>
        )}

        {/* English Translation */}
        {mode === 'en' && (
          <div className="text-stone-300 font-normal text-xs md:text-base italic mt-1 leading-snug drop-shadow">
            "{subtitle.textEn}"
          </div>
        )}
      </div>
    </div>
  );
};
