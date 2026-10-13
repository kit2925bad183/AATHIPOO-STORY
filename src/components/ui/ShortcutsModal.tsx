import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', descTa: 'திரைப்படத்தை இயக்கு / நிறுத்து (Play / Pause)' },
    { key: '← / →', descTa: '10 விநாடிகள் பின்னோக்கி / முன்னோக்கி நகர்த்து (Seek -10s / +10s)' },
    { key: 'M', descTa: 'ஒலி நிறுத்து / இயக்கு (Mute / Unmute)' },
    { key: 'F', descTa: 'முழுத்திரை மாற்று (Toggle Fullscreen)' },
    { key: 'C', descTa: 'வசன மொழி மாற்று (Cycle Subtitles: Ta / En / Off)' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-900/50 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2">
            <Keyboard className="text-amber-400" size={18} />
            <h3 className="text-amber-400 font-bold text-base">விசைப்பலகைக் குறுக்குவழிகள் (Keyboard Controls)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="மூடுக"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-stone-800/50 last:border-0">
              <span className="text-stone-300">{s.descTa}</span>
              <kbd className="px-2 py-1 bg-stone-950 border border-amber-900/40 rounded text-amber-300 font-mono text-[11px]">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
