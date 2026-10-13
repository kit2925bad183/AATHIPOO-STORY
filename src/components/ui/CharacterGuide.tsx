import React from 'react';
import { Users } from 'lucide-react';

interface CharacterProfile {
  nameTa: string;
  nameEn: string;
  roleTa: string;
  roleEn: string;
  descTa: string;
  color: string;
}

const CHARACTERS: CharacterProfile[] = [
  {
    nameTa: 'இளங்கதிர்',
    nameEn: 'Ilangathir (13)',
    roleTa: 'குயவன் மகன் (Potter’s Son)',
    roleEn: 'Protagonist',
    descTa: 'எளிய சுடுமண் வண்ண உடை அணிந்த சிறுவன். தன் கையால் வடித்த களிமண் குதிரையைச் சுமப்பவன். அச்சமும் உறுதியும் கலந்த குழந்தை உள்ளம் கொண்டவன்.',
    color: 'from-amber-700/30 to-amber-900/10 border-amber-600/40',
  },
  {
    nameTa: 'கோவூர் கிழார்',
    nameEn: 'Kovur Kizhar',
    roleTa: 'சங்கப் புலவர் (Sangam Poet)',
    roleEn: 'Moral Voice',
    descTa: 'நரைத்த முடியும் எளிய பருத்தி ஆடையும் கொண்ட முதிய தமிழ்ப் புலவர். நிதானமான அசைவுகளும், அரியணைகளை அதிரவைக்கும் அறவுரையும் கொண்டவர்.',
    color: 'from-stone-700/30 to-stone-900/10 border-stone-500/40',
  },
  {
    nameTa: 'அரும்பு',
    nameEn: 'Arumbu',
    roleTa: 'தாய் (Mother)',
    roleEn: 'Emotional Pillar',
    descTa: 'உழைப்பாளிக் குடும்பத்தின் தாய். "எனக்கு யார் வென்றாலும் வேண்டாம்; இருவரும் வீட்டுக்கு வந்தால் போதும்" என உறுதியோடு நிற்கும் பாச நெஞ்சம்.',
    color: 'from-red-950/30 to-stone-900/10 border-red-800/40',
  },
  {
    nameTa: 'செம்பியன்',
    nameEn: 'Sembiyan',
    roleTa: 'தந்தை & குயவன் (Father & Potter)',
    roleEn: 'Outside with Besiegers',
    descTa: 'முற்றுகைப் படையில் எளிய வீரராகப் பணிபுரியும் தந்தை. திகிரியைச் சுழற்றிய கைகளில் வேல் ஏந்தினாலும், தன் மகனையும் வீட்டையும் மறக்காதவர்.',
    color: 'from-yellow-950/30 to-stone-900/10 border-yellow-800/40',
  },
  {
    nameTa: 'மாறன்',
    nameEn: 'Maaran',
    roleTa: 'மூத்த மகன் & காவலன் (Older Brother & Guard)',
    roleEn: 'Inside City Guard',
    descTa: 'உறையூர்க் கோட்டை மதிலின் மீது காவல் நிற்கும் இளைஞன். நீல நிற ஆடை அணிந்தவன். தன் தம்பி இளங்கதிரைக் காக்கும் பாசம் கொண்டவன்.',
    color: 'from-blue-950/30 to-stone-900/10 border-blue-800/40',
  },
  {
    nameTa: 'நலங்கிள்ளி',
    nameEn: 'Nalankilli',
    roleTa: 'சோழ வேந்தன் (Chola Ruler Outside)',
    roleEn: 'Besieging Monarch',
    descTa: 'பொற்கவசமும் ஆத்தி மாலையும் சூடிய சோழ மன்னன். தன் வீரத்தில் செருக்குக் கொண்டாலும், தன் குலத்தை அழிவிலிருந்து காக்கும் அறத்தை ஏற்பவன்.',
    color: 'from-amber-950/40 to-stone-900/10 border-amber-700/50',
  },
  {
    nameTa: 'நெடுங்கிள்ளி',
    nameEn: 'Nedunkilli',
    roleTa: 'சோழ வேந்தன் (Chola Ruler Inside)',
    roleEn: 'Defending Monarch',
    descTa: 'உறையூர் அரியணையில் வீற்றிருக்கும் அரசன். தன் தற்காப்பு மானத்தை விடவும், பசியால் வாடும் தன் குடிமக்களின் உயிரை மேலானதாக உணர்பவன்.',
    color: 'from-rose-950/40 to-stone-900/10 border-rose-800/50',
  },
];

export const CharacterGuide: React.FC = () => {
  return (
    <section className="py-12 border-t border-stone-800/80 max-w-5xl mx-auto px-4 space-y-8">
      <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider">
        <Users size={16} />
        <span>கதாபாத்திரங்கள் (Characters & Cast)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHARACTERS.map((char, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${char.color} border backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="font-bold text-stone-100 text-lg">{char.nameTa}</h4>
              <span className="text-xs text-amber-400 font-mono">{char.nameEn}</span>
            </div>
            <div className="text-xs text-stone-400 font-medium mb-3">
              {char.roleTa}
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {char.descTa}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
