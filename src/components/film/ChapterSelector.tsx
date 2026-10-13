import React from 'react';
import { SEQUENCES, SequenceInfo } from '../../data/screenplayData';
import { filmTimeline } from '../../timeline/FilmTimelineController';
import { X, Play, Clock } from 'lucide-react';

interface ChapterSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentSequenceId: number;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({ isOpen, onClose, currentSequenceId }) => {
  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectChapter = (seq: SequenceInfo) => {
    filmTimeline.seek(seq.startTime);
    if (!filmTimeline.getState().isPlaying) {
      filmTimeline.play();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div>
            <h3 className="text-amber-400 font-bold text-lg md:text-xl">காட்சிப் பிரிவுகள் (Chapter Selector)</h3>
            <p className="text-stone-400 text-xs md:text-sm">20 நிமிடத் திரைப்படத்தின் 10 காட்சிகள்</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="மூடுக (Close)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chapters List */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-3 divide-y divide-stone-800/40">
          {SEQUENCES.map((seq) => {
            const isActive = seq.id === currentSequenceId;
            return (
              <div
                key={seq.id}
                onClick={() => handleSelectChapter(seq)}
                className={`pt-3 first:pt-0 group flex items-start justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-950/40 border border-amber-700/60 shadow-lg'
                    : 'hover:bg-stone-850 hover:border hover:border-stone-700/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold shrink-0 mt-0.5 ${
                      isActive ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300 group-hover:bg-amber-600/30'
                    }`}
                  >
                    {seq.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-stone-100 text-sm md:text-base group-hover:text-amber-300 transition-colors">
                        {seq.titleTa}
                      </h4>
                      <span className="text-xs text-stone-400 font-serif italic hidden sm:inline">
                        ({seq.titleEn})
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed">
                      {seq.summaryTa}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0 pl-3">
                  <span className="flex items-center gap-1 text-xs font-mono text-amber-400/90 bg-stone-950/60 px-2 py-0.5 rounded-md border border-stone-800">
                    <Clock size={11} />
                    {formatTime(seq.startTime)} – {formatTime(seq.endTime)}
                  </span>
                  <span className="text-stone-400 group-hover:text-amber-400 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={12} /> பார்
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
