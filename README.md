# ஆத்திப்பூ — வாளை நிறுத்திய தமிழ்
## Aathipoo — The Tamil That Stayed the Sword
### An Original 20-Minute (1,200s) Browser-Rendered 3D Animated Tamil Short Film

[![Built with React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black.svg)](https://threejs.org)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com)

---

## 📽️ திட்ட அறிமுகம் (Project Overview)

**“ஆத்திப்பூ — வாளை நிறுத்திய தமிழ்” (Aathipoo)** என்பது உலாவியிலேயே (Browser) நிகழ்நேரத்தில் முப்பரிமாணத்தில் (3D WebGL / Three.js) இயங்கும் 20 நிமிட (1,200 விநாடிகள்), 10 காட்சிகளைக் கொண்ட முழுமையான தமிழ்த் திரைப்பட அனுபவமாகும்.

- **இலக்கிய மூல உத்வேகம்:** சங்க காலப் **புறநானூறு பாடல் 45** (புலவர் **கோவூர் கிழார்** உறையூரை முற்றுகையிட்ட சோழ மன்னர்கள் **நலங்கிள்ளி** மற்றும் **நெடுங்கிள்ளி** ஆகியோருக்கு அறிவுறுத்திய பாடல்).
- **கதைக்கரு:** ஒரே வம்சத்தின் இரு சோழ மன்னர்களின் அதிகாரப் போரில் சிக்கித் தவிக்கும் ஒரு எளிய குயவர் குடும்பத்தின் (இளங்கதிர், செம்பியன், அரும்பு, மாறன்) வழியாக விரியும் போருக்கு எதிரான குடும்பக் கதை.
- **உச்சக்கட்டம்:** வாளுக்குப் பதிலாகத் தமிழின் அறநெறி நின்று போரைத் தடுக்கும் வரலாற்றுத் தருணம்.

---

## 🌟 முதன்மை அம்சங்கள் (Key Features)

1. **நிகழ்நேர 3D திரைப்பட இயக்கம் (Real-Time 3D Film Playback):**
   - முன்கூட்டியே பதிவு செய்யப்பட்ட காணொளி (Video) அல்லாமல், Three.js / React Three Fiber மூலம் கேன்வாஸில் நேரடியாக ரெண்டர் செய்யப்படும் கேமரா கோணங்கள், ஒளி அமைப்புகள், பாத்திர அசைவுகள்.
   - துல்லியமான 96 சினிமாட்டிக் ஷாட்கள் (Timed cinematic shot cuts) மற்றும் 1,200 விநாடிகள் தொடர்ச்சியான காலவரிசை (Timeline controller with scrubbing, pause/play, chapter seeking).

2. **வரலாற்று மற்றும் தொல்லியல் சான்றுகள் (Archaeological Research Gate):**
   - **உறையூர் அகழாய்வு (ASI / சென்னைப் பல்கலைக்கழகம், 1965–1969 — பேராசிரியர் கே.வி. இராமன்):** சுடுமண் செங்கற்கள், பள்ள வரிசைக் கூரை ஓடுகள், கறுப்பு-சிவப்பு மண்பாண்டக் காளவாய்கள்.
   - **பொருத்தமான சங்கக் கட்டடக்கலை:** குயவர் தொழிற்கூடம், மன்றத்து மரத்தடி வட்ட மேடை, தானியக் குதிர்களுடன் கூடிய நகரச் சந்தை, மற்றும் மனித அளவிலான எளிய சங்கக் கோட்டம் (Shrine).
   - **காலமுரண் தவிர்ப்பு (Zero Anachronisms):** பிற்காலச் சோழர் கல் கோபுரங்களோ, செப்புத் திருமேனிகளோ, புதிய உலகப் பயிர்களோ (மிளகாய், தக்காளி போன்றவை) கிடையாது.

3. **கதாபாத்திர ஆய்வுக்கூடம் (3D Character Review Studio):**
   - திரைப்படத்தில் தோன்றும் 7 பாத்திரங்கள்: **இளங்கதிர்**, **செம்பியன்**, **அரும்பு**, **மாறன்**, **கோவூர் கிழார்**, **நெடுங்கிள்ளி**, **நலங்கிள்ளி**.
   - 360° கேமரா சுழற்சி, எலும்புக்கூடு (Skeleton rig) பார்வை, பாவனை மாற்றங்கள் (Smile, Concern, Sadness, Anger, Determination), மற்றும் அசைவுகள்.

4. **ஒலி மற்றும் வசன கட்டமைப்பு (Procedural Audio & Web Speech):**
   - Web Audio API வழியாக உருவாக்கப்பட்ட காவிரி நதி அலை, திகிரி சுழல் ஒலி, இரவுப் பாசறை நெருப்பொலி, மாலைத் தென்றல், மற்றும் கோட்டை வாயில் திறக்கும் ஒலிகள்.
   - தமிழ் வசனங்கள் மற்றும் உதட்டசைவு ஒத்திசைவு (Tamil dialogue speech synthesis & viseme synchronizer).
   - பல-தட ஒலிக் கலவை (Dialogue, Music, Ambient SFX separate bus volumes).

---

## 🏛️ காட்சி வரிசை (Ten Sequences — 1,200 Seconds)

| எண் | காட்சித் தலைப்பு (Tamil) | Title (English) | கால அளவு | முதன்மைச் சூழல் |
|---|---|---|---|---|
| 1 | ஒரு மண், ஒரு குடும்பம் | One Soil, One Family | 00:00 – 02:00 (120s) | காவிரி ஆற்றங்கரை, குயவர் இல்லம் |
| 2 | மூடிய வாயில்கள் | Closed Gates | 02:00 – 04:00 (120s) | உறையூர்க் கோட்டை மதில், முடங்கிய சந்தை |
| 3 | புலவரிடம் ஒரு கேள்வி | A Question for the Poet | 04:00 – 06:00 (120s) | மன்றத்து மரத்தடி, குயவர் முற்றம் |
| 4 | உள்ளிருக்கும் வேந்தன் | The King Within | 06:00 – 08:00 (120s) | நெடுங்கிள்ளியின் கொலுமண்டபம் |
| 5 | சுவர்களுக்கு அப்பால் | Beyond the Walls | 08:00 – 10:00 (120s) | எளிய கோட்டம் (492s) & இரவுப் பாசறை |
| 6 | வெல்பவர் யார்? | Who Wins? | 10:00 – 12:00 (120s) | நலங்கிள்ளியின் கூடாரம், உடைந்த குதிரை |
| 7 | விடியலுக்கு முன் | Before Dawn | 12:00 – 14:00 (120s) | விடியல் ஆயத்தங்கள், இரு ஆத்திப்பூக்கள் |
| 8 | வாளுக்கு நடுவே தமிழ் (உச்சக்கட்டம்) | Tamil Between the Swords | 14:00 – 17:00 (180s) | புறநானூறு 45 முழக்கம், போர் நிறுத்தம் |
| 9 | திறந்த கதவுகள் | The Gates Open | 17:00 – 19:00 (120s) | கோட்டை வாயில் திறப்பு, குடும்ப மீள்இணைவு |
| 10 | மீண்டும் சுழலும் திகிரி | The Wheel Turns Again | 19:00 – 20:00 (120s) | சுழலும் திகிரி, திரை முடிவு நன்றியுரை |

---

## 🛠️ தொழில்நுட்பக் கட்டமைப்பு (Tech Stack)

- **Frontend Core:** React 19, TypeScript 5.9, Vite 8.3
- **3D Graphics & Rendering:** Three.js, React Three Fiber (@react-three/fiber), @react-three/drei
- **Audio Architecture:** Procedural Web Audio API Synthesis + Web Speech Synthesis API
- **Styling & UI:** Tailwind CSS v4, Lucide React Icons
- **Code Standards:** Type-safe props, zero placeholder scenes, strictly deterministic timeline.

---

## 📁 திட்டக் கோப்பகம் (Project Structure)

```
c:/AATHIPPOO.SF/
├── docs/                               # வரலாற்று மற்றும் கட்டடக்கலை ஆய்வு நூல்கள்
│   └── environment-research.md         # Research Gate: இலக்கியம், தொல்லியல் & பார்வைத் தொடர்ச்சி
├── public/
│   ├── docs/                           # வலைத்தளத்தில் வாசிக்கக்கூடிய ஆவணங்கள்
│   │   ├── ASSET_CREDITS.md            # இலக்கிய உசாத்துணை & தொல்லியல் பங்களிப்பு
│   │   ├── AUDIO_MANIFEST.md           # 40 வசனத் துண்டுகளின் ஒலிக்குறிப்பேடு
│   │   ├── CHARACTER_REFERENCE_SHEETS.md # 7 பாத்திரங்களின் மாதிரி வரைபடக் குறிப்புகள்
│   │   ├── SCREENPLAY.md               # 10 காட்சிகளின் முழுத் திரைக்கதை
│   │   ├── SETUP_GUIDE.md              # கணினி நிறுவல் வழிகாட்டி
│   │   ├── SHOT_LIST.md                # 96 சினிமாட்டிக் ஷாட்களின் பட்டியல்
│   │   └── environment-research.md     # முழுமையான கட்டடக்கலை ஆய்வு ஆவணம்
│   └── production-assets/
│       ├── character-sheets/           # 7 SVG கதாபாத்திர மாதிரி வரைபடங்கள்
│       └── environment-sheets/         # 9 SVG சூழல் மற்றும் கட்டட வரைபடங்கள்
├── src/
│   ├── audio/                          # Web Audio சிந்தசைசர் & ஒலிக் கலவை
│   ├── characters/                     # 3D மாந்தர்கள், எலும்புக்கூடு, முகபாவனைகள்
│   ├── components/
│   │   ├── dev/                        # 3D Character Review Studio
│   │   ├── film/                       # Cinematic Player, Chapter Selector, Audio Mixer
│   │   └── ui/                         # Hero, About, Character Guide
│   ├── data/                           # Screenplay, Shots (96), Subtitles, Audio Manifest
│   ├── environments/                   # CityArchitecture, Props, Sky
│   ├── scenes/                         # Seq01 முதல் Seq10 வரையிலான 10 முப்பரிமாணக் காட்சிகள்
│   └── timeline/                       # Film Timeline Controller & State Hook
├── package.json
└── vite.config.ts
```

---

## 🚀 கணினியில் இயக்குதல் (Running Locally)

### 1. தேவைகள் (Prerequisites)
- [Node.js](https://nodejs.org) (v18 அல்லது அதற்குப் புதியது)
- npm (Node Package Manager)

### 2. நிறுவல் (Installation)
```bash
git clone https://github.com/kit2925bad183/AATHIPOO-STORY.git
cd AATHIPOO-STORY
npm install
```

### 3. தயாரிப்பு வழங்கி தொடங்குதல் (Start Development Server)
```bash
npm run dev
```
உலாவியில் `http://localhost:5173` அல்லது காட்டப்படும் முகவரியைத் திறந்து படத்தைப் பார்க்கலாம்.

### 4. உற்பத்திக் கட்டமைப்பு (Production Build)
```bash
npm run build
npm run preview
```

---

## ⌨️ விசைப்பலகைக் குறுக்குவழிகள் (Keyboard Shortcuts)

- `Space` : இயக்கு / இடைநிறுத்து (Play / Pause)
- `← / →` : 5 விநாடிகள் பின்னோக்கி / முன்னோக்கி நகர்த்து
- `J / L` : முந்தைய / அடுத்த காட்சிக்குத் தாவு (Jump Sequence)
- `M` : ஒலியை அணை / இயக்கு (Mute / Unmute)
- `C` : தமிழ் வசன வரிகள் நிலைமாற்று (Toggle Subtitles)
- `F` : முழுத்திரை (Toggle Fullscreen)
- `0..9` : காட்சி 1 முதல் 10 வரை உடனடியாகத் தாவு

---

## 📜 இலக்கிய நற்சான்று & உரிமம் (Citation & Credits)

- **படைப்பு & 3D இயக்கம்:** விஷ்வா ஜி (Vishva G)
- **மூல இலக்கியப் பாடல்:** புறநானூறு 45 — **கோவூர் கிழார்** (Kovur Kizhar)
- **தொல்லியல் உசாத்துணை:** பேராசிரியர் கே.வி. இராமன், *Excavations at Uraiyur (1965–69)*, சென்னைப் பல்கலைக்கழகம் / ASI.
- **உரிமம்:** MIT License.
