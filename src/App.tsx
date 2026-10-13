import React, { useRef, useState } from 'react';
import { Hero } from './components/ui/Hero';
import { CinematicPlayer } from './components/film/CinematicPlayer';
import { AboutSection } from './components/ui/AboutSection';
import { CharacterGuide } from './components/ui/CharacterGuide';
import { ShortcutsModal } from './components/ui/ShortcutsModal';
import { ChapterSelector } from './components/film/ChapterSelector';
import { AudioMixerModal } from './components/film/AudioMixerModal';
import { ReviewWorkspace } from './components/dev/ReviewWorkspace';
import { useFilmTimeline } from './timeline/useFilmTimeline';
import { filmTimeline } from './timeline/FilmTimelineController';
import { webAudioEngine } from './audio/WebAudioEngine';
import {
  Film,
  Layers,
  Sliders,
  Keyboard,
  FileText,
  Heart,
  Volume2,
  Activity,
  Sparkles,
} from 'lucide-react';

export function App() {
  const playerRef = useRef<HTMLDivElement>(null);
  const timeline = useFilmTimeline();

  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isChaptersOpen, setIsChaptersOpen] = useState(false);
  const [isMixerOpen, setIsMixerOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const scrollToPlayerAndPlay = async () => {
    await webAudioEngine.resume();
    filmTimeline.play();
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-stone-950/85 backdrop-blur-md border-b border-stone-850 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md">
            <Film size={18} />
          </div>
          <div>
            <span className="font-bold text-amber-200 text-sm md:text-base leading-none block">
              ஆத்திப்பூ
            </span>
            <span className="text-[11px] text-stone-400 font-serif italic block">
              வாளை நிறுத்திய தமிழ்
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 3D Character Review Studio */}
          <button
            onClick={() => setIsReviewOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
            title="கதாபாத்திர ஆய்வுக்கூடம் (3D Character Review Studio)"
          >
            <Activity size={14} className="text-amber-400" />
            <span className="hidden sm:inline">ஆய்வகம் (Studio)</span>
          </button>

          {/* Chapters */}
          <button
            onClick={() => setIsChaptersOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <Layers size={14} className="text-amber-400" />
            <span className="hidden sm:inline">காட்சிகள் (Chapters)</span>
          </button>

          {/* Audio Status & Mixer */}
          <button
            onClick={() => setIsMixerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
            title="ஒலிக் கலவை & நிலவரம்"
          >
            <Volume2 size={14} className="text-amber-400" />
            <span className="hidden sm:inline">ஒலி (Audio)</span>
          </button>

          {/* Shortcuts */}
          <button
            onClick={() => setIsShortcutsOpen(true)}
            className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700/60 text-stone-300 transition-colors cursor-pointer"
            title="விசைப்பலகைக் குறுக்குவழிகள்"
            aria-label="விசைப்பலகைக் குறுக்குவழிகள்"
          >
            <Keyboard size={15} />
          </button>

          {/* Watch Now CTA */}
          <button
            onClick={scrollToPlayerAndPlay}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ml-1"
          >
            படத்தைப் பார்
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-12">
        {/* Hero Banner */}
        <Hero onStartWatching={scrollToPlayerAndPlay} />

        {/* 3D Film Player Area */}
        <div ref={playerRef} className="scroll-mt-20">
          <CinematicPlayer />
        </div>

        {/* Story & Historical Citation Section */}
        <AboutSection />

        {/* Character Guide */}
        <CharacterGuide />

        {/* Production Documentation & Script Files */}
        <section className="py-8 border-t border-stone-800/80 max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
            <FileText size={16} />
            <span>தயாரிப்பு ஆவணங்கள் (Production Documentation)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <a
              href="/docs/environment-research.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-stone-900/60 border border-amber-800/40 hover:border-amber-600 hover:bg-stone-850 transition-all block group"
            >
              <div className="font-semibold text-amber-300 text-sm group-hover:text-amber-200">
                கட்டடக்கலை ஆய்வு நூல்
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5">environment-research.md</div>
              <div className="text-[11px] text-stone-400 mt-2">உறையூர் அகழாய்வு, சங்கக் கட்டடக் கலை & கோட்டம்</div>
            </a>

            <a
              href="/docs/CHARACTER_REFERENCE_SHEETS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-700/60 hover:bg-stone-850 transition-all block group"
            >
              <div className="font-semibold text-stone-100 text-sm group-hover:text-amber-300">
                கதாபாத்திர மாதிரிகள்
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5">CHARACTER_REFERENCE_SHEETS.md</div>
              <div className="text-[11px] text-stone-400 mt-2">7 பாத்திரங்களின் A–J கோணங்கள், எலும்புகள், பாவனைகள்</div>
            </a>

            <a
              href="/docs/SCREENPLAY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-700/60 hover:bg-stone-850 transition-all block group"
            >
              <div className="font-semibold text-stone-100 text-sm group-hover:text-amber-300">
                முழுத் திரைக்கதை
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5">SCREENPLAY.md</div>
              <div className="text-[11px] text-stone-400 mt-2">10 காட்சிகளின் விரிவான வசனங்கள் & கால அமைவு</div>
            </a>

            <a
              href="/docs/AUDIO_MANIFEST.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-700/60 hover:bg-stone-850 transition-all block group"
            >
              <div className="font-semibold text-stone-100 text-sm group-hover:text-amber-300">
                குரல் பதிவு வழிகாட்டி
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5">AUDIO_MANIFEST.md</div>
              <div className="text-[11px] text-stone-400 mt-2">40 வசனத் துண்டுகளின் ஒலிப்பதிவுக் குறிப்பேடு</div>
            </a>

            <a
              href="/docs/ASSET_CREDITS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-700/60 hover:bg-stone-850 transition-all block group"
            >
              <div className="font-semibold text-stone-100 text-sm group-hover:text-amber-300">
                கலைப் பங்களிப்பு
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5">ASSET_CREDITS.md</div>
              <div className="text-[11px] text-stone-400 mt-2">புறநானூறு 45 இலக்கிய உசாத்துணை & உரிமங்கள்</div>
            </a>

            <a
              href="/docs/SETUP_GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-700/60 hover:bg-stone-850 transition-all block group"
            >
              <div className="font-semibold text-stone-100 text-sm group-hover:text-amber-300">
                நிறுவல் வழிகாட்டி
              </div>
              <div className="text-xs text-stone-400 font-mono mt-0.5">SETUP_GUIDE.md</div>
              <div className="text-[11px] text-stone-400 mt-2">கணினியில் இயக்குதல் & நிலைநிறுத்தல்</div>
            </a>
          </div>
        </section>
      </main>

      {/* Global Modals */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <ChapterSelector
        isOpen={isChaptersOpen}
        onClose={() => setIsChaptersOpen(false)}
        currentSequenceId={timeline.currentSequence.id}
      />
      <AudioMixerModal isOpen={isMixerOpen} onClose={() => setIsMixerOpen(false)} />
      <ReviewWorkspace isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-stone-850 bg-stone-950 py-8 px-4 text-center text-xs text-stone-400 space-y-3">
        <div className="flex items-center justify-center gap-2 text-stone-300 font-medium text-sm">
          <span>ஆத்திப்பூ — வாளை நிறுத்திய தமிழ் (Aathipoo)</span>
        </div>
        <div>
          படைப்பு: <strong className="text-amber-300">விஷ்வா ஜி (Vishva G)</strong> • மூல உத்வேகம்:{' '}
          <strong className="text-stone-300">புறநானூறு பாடல் 45 (கோவூர் கிழார்)</strong> •{' '}
          <span className="italic text-amber-400/90">கற்பனைத் திரைவடிவம்</span>
        </div>
        <div className="text-stone-400 font-mono text-[11px]">
          React + TypeScript + Three.js + React Three Fiber + Web Audio API + Tailwind CSS
        </div>
      </footer>
    </div>
  );
}

export default App;
