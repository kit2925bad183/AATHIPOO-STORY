import React, { useState, useEffect, useRef } from 'react';
import { useFilmTimeline } from '../../timeline/useFilmTimeline';
import { filmTimeline, SubtitleLanguage } from '../../timeline/FilmTimelineController';
import { FilmCanvas } from './FilmCanvas';
import { SubtitlesDisplay } from './SubtitlesDisplay';
import { CreditsRoll } from './CreditsRoll';
import { ControlsOverlay } from './ControlsOverlay';
import { ChapterSelector } from './ChapterSelector';
import { AudioMixerModal } from './AudioMixerModal';

export const CinematicPlayer: React.FC = () => {
  const timeline = useFilmTimeline();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isChaptersOpen, setIsChaptersOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);

  // Global Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if typing in an input/textarea/select
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          filmTimeline.togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          filmTimeline.skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          filmTimeline.skip(10);
          break;
        case 'KeyM':
          e.preventDefault();
          filmTimeline.toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          if (containerRef.current) {
            if (!document.fullscreenElement) {
              containerRef.current.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }
          break;
        case 'KeyC': {
          e.preventDefault();
          const current = filmTimeline.getState().subtitlesMode;
          const next: SubtitleLanguage = current === 'ta' ? 'en' : current === 'en' ? 'off' : 'ta';
          filmTimeline.setSubtitlesMode(next);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video max-h-[85vh] bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-amber-900/30"
      tabIndex={0}
      aria-label="ஆத்திப்பூ 3D திரைப்படம் இயக்கி (Film Player)"
    >
      {/* 3D WebGL Canvas */}
      <FilmCanvas timeline={timeline} />

      {/* Synchronized Subtitles */}
      <SubtitlesDisplay subtitle={timeline.currentSubtitle} mode={timeline.subtitlesMode} />

      {/* Credits Roll (1180 - 1200s) */}
      <CreditsRoll currentTime={timeline.currentTime} />

      {/* Floating HUD Controls */}
      <ControlsOverlay
        timeline={timeline}
        onOpenChapters={() => setIsChaptersOpen(true)}
        onOpenMixer={() => setIsMixerOpen(true)}
        containerRef={containerRef}
      />

      {/* Chapter Navigation Modal */}
      <ChapterSelector
        isOpen={isChaptersOpen}
        onClose={() => setIsChaptersOpen(false)}
        currentSequenceId={timeline.currentSequence.id}
      />

      {/* Audio Mixer & Status Modal */}
      <AudioMixerModal
        isOpen={isMixerOpen}
        onClose={() => setIsMixerOpen(false)}
      />
    </div>
  );
};
