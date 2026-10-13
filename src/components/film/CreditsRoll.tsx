import React from 'react';

export const CreditsRoll: React.FC<{ currentTime: number }> = ({ currentTime }) => {
  // Only display in the final 20 seconds (1180s - 1200s)
  if (currentTime < 1180) return null;

  const progress = Math.min(1, (currentTime - 1180) / 20);

  return (
    <div
      className="absolute inset-0 bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-30 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: progress > 0.1 ? 1 : progress * 10 }}
    >
      <div className="max-w-2xl space-y-6">
        <div className="text-amber-500 text-sm font-semibold tracking-widest uppercase">
          திரை முடிவு • THE END
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-amber-200 tracking-wide">
          ஆத்திப்பூ
        </h1>
        <h2 className="text-xl md:text-2xl text-stone-300 font-serif tracking-normal">
          வாளை நிறுத்திய தமிழ்
        </h2>
        <div className="text-sm text-amber-400/80 tracking-widest uppercase font-mono">
          Aathipoo — The Tamil That Stayed the Sword
        </div>

        <div className="w-24 h-0.5 bg-amber-600/50 mx-auto my-4" />

        <div className="space-y-3 text-stone-200 text-sm md:text-base">
          <div>
            <span className="text-stone-400 block text-xs tracking-wider uppercase">படைப்பு / CREATED BY</span>
            <span className="text-amber-300 font-semibold text-lg">விஷ்வா ஜி (Vishva G)</span>
          </div>

          <div>
            <span className="text-stone-400 block text-xs tracking-wider uppercase">இலக்கிய உத்வேகம் / LITERARY INSPIRATION</span>
            <span className="text-stone-100">சங்க இலக்கியம் — புறநானூறு பாடல் 45</span>
            <span className="text-amber-400/90 block text-sm italic">கோவூர் கிழார் (Kovur Kizhar)</span>
          </div>

          <div className="pt-2 text-xs md:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed border-t border-stone-800">
            <span className="text-amber-400 font-medium block mb-1">கற்பனைத் திரைவடிவம் (Fictional Adaptation Note)</span>
            சோழ மன்னர்களான நலங்கிள்ளி மற்றும் நெடுங்கிள்ளி இடையே மூண்ட உள்நாட்டுப் போரைத் தவிர்த்த கோவூர் கிழாரின் அறவுரையை அடிப்படையாகக் கொண்ட கற்பனைத் திரைப்பட வடிவமாகும்.
          </div>
        </div>
      </div>
    </div>
  );
};
