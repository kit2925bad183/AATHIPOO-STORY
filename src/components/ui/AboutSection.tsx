import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-12 border-t border-stone-800/80 max-w-5xl mx-auto px-4 space-y-12">
      {/* 1. கதைச் சுருக்கம் (Story Synopsis) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
          <Heart size={16} />
          <span>கதைச் சுருக்கம் (The Story)</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-100">
          ஆத்திப்பூ — வாளை நிறுத்திய தமிழ்
        </h3>
        <p className="text-stone-300 leading-relaxed text-sm md:text-base">
          காவிரிக்கரைக் கிராமம் ஒன்றில், எளிய குயவனின் 13 வயது மகன் இளங்கதிர் தன் தந்தையோடு சேர்ந்து களிமண் குதிரை செய்கிறான்.
          ஆனால் உள்நாட்டுப் போர் வெடிக்கிறது. தந்தை செம்பியன் கோட்டைக்கு வெளியே முற்றுகையிடும் நலங்கிள்ளியின் படையில் நிற்கிறார்;
          அண்ணன் மாறன் கோட்டைக்குள் காவல் காக்கும் நெடுங்கிள்ளியின் படையில் நிற்கிறான்.
          குடும்பங்கள் பிரிந்து பட்டினியால் வாடும் நிலையில், சங்கப் புலவர் கோவூர் கிழாருடன் இணைந்து சிறுவன் இரு வேந்தர்களின் முன்னால் சென்று கேட்கும் கேள்வி:
        </p>
        <blockquote className="p-4 rounded-xl bg-amber-950/20 border-l-4 border-amber-500 text-amber-200 text-lg md:text-xl font-serif italic">
          “இதில் எந்தப் பூ வெல்ல வேண்டும்?”
        </blockquote>
        <p className="text-stone-300 leading-relaxed text-sm md:text-base">
          இரு வேந்தர்களின் மாலையிலும் சூடியிருப்பது ஒரே சோழர் ஆத்திப்பூ. ஒரு குடும்பத்தின் கண்ணீரும், புலவரின் அறவுரையும்
          அரியணைகளின் அறியாமையை உடைத்து வாள்களைத் தாழ்த்த வைக்கிறது.
        </p>
      </div>

      {/* 2. வரலாற்றுப் பின்னணி மற்றும் இலக்கிய ஆதாரம் (Historical & Literary Basis) */}
      <div className="p-6 md:p-8 rounded-2xl bg-stone-900/60 border border-amber-900/40 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
          <BookOpen size={16} />
          <span>வரலாற்றுப் பின்னணி (Historical Inspiration)</span>
        </div>
        <h4 className="text-xl font-bold text-stone-100">
          புறநானூறு பாடல் 45 — கோவூர் கிழார்
        </h4>
        <p className="text-stone-300 text-sm leading-relaxed">
          சங்க காலத்தில் சோழ மன்னர்களான நலங்கிள்ளி மற்றும் நெடுங்கிள்ளி இருவருக்கும் இடையே ஏற்பட்ட பகைமையால் உறையூர்க் கோட்டை முற்றுகையிடப்பட்டது.
          அப்போது புலவர் கோவூர் கிழார் பாடிய பாடல்:
        </p>
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-amber-300 font-serif text-sm md:text-base leading-relaxed space-y-1">
          <p>“செங்கதிர்ச் செல்வன் திருக்குலத்து உதித்தோய்!</p>
          <p className="text-amber-400 font-bold text-base md:text-lg">ஒருவீர் தோற்பினும், தோற்ப நும் குடியே;</p>
          <p>இருவீர் வேறல் இயற்கையும் அன்றே...”</p>
          <span className="block text-xs text-stone-400 font-sans mt-2">
            — புறநானூறு 45 (கோவூர் கிழார்)
          </span>
        </div>

        <div className="pt-2">
          <a
            href="https://www.tamilvu.org/library/l1280/html/l1280529.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4"
          >
            <span>தமிழ் இணையக் கல்விக்கழகம் — புறநானூறு 45 உசாத்துணை</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* 3. இலக்கியமும் உலக அமைப்பும் (Literature and World Design) */}
      <div className="p-6 md:p-8 rounded-2xl bg-stone-900/80 border border-amber-900/50 space-y-6">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
          <BookOpen size={16} />
          <span>இலக்கியமும் உலக அமைப்பும் (Literature &amp; World Design)</span>
        </div>

        <div className="space-y-3">
          <h4 className="text-xl md:text-2xl font-bold text-stone-100">
            சங்க கால வரலாற்று உசாத்துணையும் உலக வடிவமைப்பும்
          </h4>
          <p className="text-stone-300 text-sm leading-relaxed">
            இத்திரைப்படத்தில் காட்டப்படும் நகர அமைப்பு, குயவர் குடியிருப்பு, அங்காடி வீதி மற்றும் வழிபாட்டுக் கோட்டம் ஆகியவை
            வெறும் கற்பனை அல்லாமல், சங்க இலக்கியப் பாடல்களும் (புறநானூறு, பட்டினப்பாலை, பெரும்பாணாற்றுப்படை) மற்றும்
            உறையூர் தொல்லியல் அகழாய்வு அறிக்கைகளும் (இந்தியத் தொல்லியல் துறை / பேராசிரியர் கே.வி. ராமன், 1965-1969)
            வழங்கிய சான்றுகளின் அடிப்படையில் வரலாற்று எச்சரிக்கையுடன் மீளுருவாக்கம் செய்யப்பட்டுள்ளன.
          </p>
        </div>

        {/* 3-Tier Classification Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-950/70 border border-emerald-900/40 space-y-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold block w-fit">
              நிலை A: நேரடி வரலாற்றுச் சான்று
            </span>
            <p className="text-stone-300">
              புறநானூறு 45 (முற்றுகை), உறையூர் அகழாய்வு சுடுமண் ஓடுகள், கருப்பு-சிகப்பு மண்பாண்டங்கள், குயவர் திகிரி, மற்றும் சுடுமண் குதிரை விளையாட்டுப் பொருட்கள்.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-900/40 space-y-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold block w-fit">
              நிலை B: ஏற்புடைய கலை மீளுருவாக்கம்
            </span>
            <p className="text-stone-300">
              சங்க கால மனித அளவிலான செங்கல்-மரக் கோட்டம் (Shrine), திண்ணை அமைந்த இல்லங்கள், காவிரிக் கரை களிமண் தொட்டிகள், மற்றும் மர அங்காடி வரிசைகள்.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-rose-900/40 space-y-2">
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold block w-fit">
              நிலை C: உறுதியற்றவை முற்றாகத் தவிர்ப்பு
            </span>
            <p className="text-stone-300">
              பிற்காலப் பேரரசு சோழப் பெருங்கோபுரங்கள், பிற்கால வெண்கலச் சிலைகள், தக்காளி-மிளகாய் போன்ற புதிய உலகப் பயிர்கள், மற்றும் அமானுஷ்ய ஒளிவெள்ளங்கள் முற்றாகத் தவிர்ப்பு.
            </p>
          </div>
        </div>

        {/* Environment Concept Sheets Gallery Grid */}
        <div className="space-y-3 pt-2">
          <h5 className="text-sm font-bold text-amber-200">
            சுற்றுச்சூழல் வரைபடத் தொகுப்புகள் (Environment Concept Sheets - Views 1 to 9):
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'city_overview', title: '1. நகர அமைவு வரைபடம் (City Overview)', file: 'city_overview.svg' },
              { id: 'potters_courtyard', title: '2. குயவர் முற்றம் (Potter Courtyard)', file: 'potters_courtyard.svg' },
              { id: 'market_before_siege', title: '3. அங்காடி — போருக்கு முன் (Market)', file: 'market_before_siege.svg' },
              { id: 'market_during_siege', title: '4. அங்காடி — முற்றுகையில் (Siege Scarcity)', file: 'market_during_siege.svg' },
              { id: 'public_gathering_space', title: '5. பொது மன்றம் (Civic Manram Tree)', file: 'public_gathering_space.svg' },
              { id: 'shrine_exterior', title: '6. எளிய கோட்டம் வெளி (Shrine Exterior)', file: 'shrine_exterior.svg' },
              { id: 'shrine_interior', title: '7. கோட்டம் உள் பலிபீடம் (Shrine Altar)', file: 'shrine_interior.svg' },
              { id: 'gate_and_streets', title: '8. கோட்டை மதில் வாயில் (Fortress Gate)', file: 'gate_and_streets.svg' },
              { id: 'city_after_ceasefire', title: '9. அமைதிக்குப் பின் நகரம் (Ceasefire)', file: 'city_after_ceasefire.svg' },
            ].map((sheet) => (
              <a
                key={sheet.id}
                href={`/production-assets/environment-sheets/${sheet.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-stone-950/80 border border-stone-800 hover:border-amber-600 transition-colors flex items-center justify-between text-xs group"
              >
                <span className="text-stone-300 group-hover:text-amber-300 font-medium">{sheet.title}</span>
                <ExternalLink size={12} className="text-amber-500/70 shrink-0 ml-1" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <a
            href="/docs/environment-research.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium"
          >
            <span>முழுத் கட்டடக்கலை &amp; சுற்றுச்சூழல் ஆய்வு ஆவணம் (environment-research.md)</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* 4. படைப்பு விளக்கம் மற்றும் தொல்லியல் உண்மைத்தன்மை (Fictional Adaptation Note) */}
      <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400/90 font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck size={15} />
          <span>படைப்பு விளக்கம் &amp; எல்லைகள் (Creative Disclaimer)</span>
        </div>
        <div className="text-stone-300 text-xs md:text-sm leading-relaxed space-y-2">
          <p>
            • <strong>புனைகதை வடிவம்:</strong> இளங்கதிர், அவனது குடும்பத்தினர் (செம்பியன், அரும்பு, மாறன்), களிமண் குதிரை மற்றும் விரிவான உரையாடல்கள் கற்பனையான திரைக்கதை வடிவமாகும்.
          </p>
          <p>
            • <strong>காலக் கட்டமைப்பு:</strong> இத்திரைப்படம் பிற்காலப் பேரரசு சோழக் காலத்தையோ (இராஜராஜ சோழன், தஞ்சைப் பெருவுடையார் கோவில்) அல்லது பிற்காலக் கற்றளிகளையோ சித்தரிக்கவில்லை.
            சங்க காலத்தின் (பொ.ஆ.மு. 300 முதல் பொ.ஆ. 300) எளிய சுடுமண் மற்றும் மரக்கட்டட வாழ்வியலை அடிப்படையாகக் கொண்டு வடிவமைக்கப்பட்டுள்ளது.
          </p>
          <p>
            • <strong>முடிவுரை:</strong> கோட்டை வாயில்கள் திறக்கப்பட்டுத் தற்காலிக சமாதானம் ஏற்படுவதோடு படம் நிறைவடைகிறது; அரசியல் சிக்கல்கள் ஒரு கணத்தில் மாயமந்திரமாக மறைந்துவிடவில்லை என்பதைப் படம் நேர்மையாகக் காட்டுகிறது.
          </p>
        </div>
      </div>
    </section>
  );
};
