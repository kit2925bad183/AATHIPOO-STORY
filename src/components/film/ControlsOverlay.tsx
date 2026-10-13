import React, { useState, useEffect, useRef } from 'react';
import { TimelineState, filmTimeline, QualityLevel, SubtitleLanguage } from '../../timeline/FilmTimelineController';
import { SEQUENCES } from '../../data/screenplayData';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Subtitles,
  Sliders,
  Layers,
  Settings2,
} from 'lucide-react';

interface ControlsOverlayProps {
  timeline: TimelineState;
  onOpenChapters: () => void;
  onOpenMixer: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  timeline,
  onOpenChapters,
  onOpenMixer,
  containerRef,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState<number>(0);
  const hideTimerRef = useRef<number | null>(null);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Reset auto-hide on mouse movement
  const handleUserActivity = () => {
    setIsVisible(true);
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
    }
    if (timeline.isPlaying) {
      hideTimerRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 3500);
    }
  };

  useEffect(() => {
    if (!timeline.isPlaying) {
      setIsVisible(true);
    } else {
      handleUserActivity();
    }
    return () => {
      if (hideTimerRef.current !== null) clearTimeout(hideTimerRef.current);
    };
  }, [timeline.isPlaying]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    filmTimeline.seek(parseFloat(e.target.value));
  };

  const handleSeekMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pct = x / rect.width;
    setHoverTime(pct * timeline.duration);
    setHoverPos(x);
  };

  return (
    <div
      onMouseMove={handleUserActivity}
      className={`absolute inset-0 z-20 flex flex-col justify-between pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Top Bar: Chapter title & quick selectors */}
      <div className="p-4 md:p-6 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
              காட்சி {timeline.currentSequence.id} / 10
            </span>
            <h2 className="text-stone-100 font-bold text-sm md:text-base leading-tight">
              {timeline.currentSequence.titleTa}
              <span className="text-xs text-stone-400 font-serif italic ml-2 hidden sm:inline">
                ({timeline.currentSequence.titleEn})
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Chapter Selector Button */}
          <button
            onClick={onOpenChapters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/80 border border-amber-900/40 text-stone-300 hover:text-amber-300 hover:border-amber-600/60 text-xs font-medium transition-colors cursor-pointer"
            title="காட்சிப் பிரிவுகள் (Chapters)"
          >
            <Layers size={14} />
            <span className="hidden sm:inline">காட்சிகள்</span>
          </button>

          {/* Audio Mixer Button */}
          <button
            onClick={onOpenMixer}
            className="p-2 rounded-lg bg-stone-900/80 border border-amber-900/40 text-stone-300 hover:text-amber-300 hover:border-amber-600/60 transition-colors cursor-pointer"
            title="ஒலிக் கலவை (Audio Mixer & Status)"
          >
            <Sliders size={15} />
          </button>
        </div>
      </div>

      {/* Bottom Bar: Timeline Scrubber & Playback Controls */}
      <div className="p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-auto space-y-3">
        {/* Scrubber Container */}
        <div
          className="relative group w-full cursor-pointer py-1"
          onMouseMove={handleSeekMouseMove}
          onMouseLeave={() => setHoverTime(null)}
        >
          {/* Chapter Markers on the scrubber */}
          <div className="absolute top-1.5 left-0 right-0 h-2 flex justify-between pointer-events-none">
            {SEQUENCES.map((seq) => {
              const leftPct = (seq.startTime / timeline.duration) * 100;
              return (
                <div
                  key={seq.id}
                  className="absolute w-0.5 h-2 bg-amber-500/40 z-10"
                  style={{ left: `${leftPct}%` }}
                  title={`${seq.id}. ${seq.titleTa}`}
                />
              );
            })}
          </div>

          {/* Seek Input */}
          <input
            type="range"
            min="0"
            max={timeline.duration}
            step="0.1"
            value={timeline.currentTime}
            onChange={handleSeekChange}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-2.5 transition-all"
            aria-label="திரைப்பட நகர்வுப்பட்டை (Timeline Seek)"
          />

          {/* Hover Timestamp Preview */}
          {hoverTime !== null && (
            <div
              className="absolute -top-7 transform -translate-x-1/2 bg-stone-900 border border-amber-700/60 px-2 py-0.5 rounded text-[11px] font-mono text-amber-300 shadow-lg pointer-events-none"
              style={{ left: `${hoverPos}px` }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Play / Pause */}
            <button
              onClick={() => filmTimeline.togglePlay()}
              className="p-2.5 md:p-3 rounded-full bg-amber-500 text-stone-950 hover:bg-amber-400 transition-transform active:scale-95 cursor-pointer shadow-lg"
              aria-label={timeline.isPlaying ? 'நிறுத்து (Pause)' : 'இயக்கு (Play)'}
            >
              {timeline.isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            </button>

            {/* Skip -10s */}
            <button
              onClick={() => filmTimeline.skip(-10)}
              className="p-2 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="-10 விநாடிகள்"
            >
              <SkipBack size={18} />
            </button>

            {/* Skip +10s */}
            <button
              onClick={() => filmTimeline.skip(10)}
              className="p-2 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="+10 விநாடிகள்"
            >
              <SkipForward size={18} />
            </button>

            {/* Restart */}
            <button
              onClick={() => filmTimeline.restart()}
              className="p-2 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="மறுதொடக்கம் (Restart)"
            >
              <RotateCcw size={16} />
            </button>

            {/* Time Indicator */}
            <div className="text-xs font-mono text-stone-300 ml-1">
              <span className="text-amber-400 font-semibold">{formatTime(timeline.currentTime)}</span>
              <span className="text-stone-500 mx-1">/</span>
              <span>{formatTime(timeline.duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Volume & Mute */}
            <div className="flex items-center gap-1.5 group">
              <button
                onClick={() => filmTimeline.toggleMute()}
                className="p-2 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
                title={timeline.isMuted ? 'ஒலி இயக்கு' : 'ஒலி நிறுத்து'}
              >
                {timeline.isMuted || timeline.volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={timeline.isMuted ? 0 : timeline.volume}
                onChange={(e) => filmTimeline.setVolume(parseFloat(e.target.value))}
                className="w-16 md:w-20 accent-amber-500 h-1.5 bg-stone-800 rounded appearance-none cursor-pointer hidden sm:block"
                aria-label="ஒலி அளவு"
              />
            </div>

            {/* Subtitles Language Toggle */}
            <div className="relative group">
              <button
                onClick={() => {
                  const next: SubtitleLanguage =
                    timeline.subtitlesMode === 'ta' ? 'en' : timeline.subtitlesMode === 'en' ? 'off' : 'ta';
                  filmTimeline.setSubtitlesMode(next);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                  timeline.subtitlesMode !== 'off'
                    ? 'bg-amber-950/60 border-amber-600/70 text-amber-300'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400'
                }`}
                title="வசனங்கள் (Subtitles: Ta / En / Off)"
              >
                <Subtitles size={14} />
                <span className="uppercase text-[11px]">{timeline.subtitlesMode}</span>
              </button>
            </div>

            {/* Quality Selector */}
            <div className="relative">
              <select
                value={timeline.quality}
                onChange={(e) => filmTimeline.setQuality(e.target.value as QualityLevel)}
                className="bg-stone-900/80 border border-stone-800 hover:border-amber-700 text-stone-300 text-xs rounded-lg px-2 py-1 cursor-pointer focus:outline-none"
                title="காட்சித் தரம் (Quality)"
              >
                <option value="high">High 1080p</option>
                <option value="medium">Med 720p</option>
                <option value="low">Low (Mobile)</option>
              </select>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
              title={isFullscreen ? 'முழுத்திரையிலிருந்து வெளியேறு' : 'முழுத்திரை (Fullscreen)'}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
