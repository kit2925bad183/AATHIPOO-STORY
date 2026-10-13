# ஆத்திப்பூ — ஒலிவடிவக் குறிப்பேடு மற்றும் குரல் பதிவு வழிகாட்டி
## Audio Manifest & Voice Actor Recording Script

### 1. தற்போதைய நிலை (Audio Status & Asset Report)
- **பின்னணி இசை (Music):** Web Audio API மூலம் நிகழ்நேரத்தில் உருவாகும் தமிழ் ராக வாத்திய இசை (மோகனம் / ஹரிகாம்போஜி தழுவிய புல்லாங்குழல், வீணை, தம்புரா மற்றும் முழவு வாத்தியங்கள்).
- **சூழல் ஒலிகள் (Foley & SFX):** நிகழ்நேர procedural Web Audio தொகுப்பு (காவிரி நீர் அலைகள், விடியல் பறவைகள், திகிரி சுழலும் ஓசை, முரசொலிகள், குதிரை உடைதல், கதவு திறத்தல், படைகள் வாள் தாழ்த்தும் ஓசை).
- **வசனம் (Tamil Dialogue):** 
  - தற்காலிக காட்சிக்கு: Browser Tamil Web Speech API (`ta-IN`) மற்றும் ஒலி அலைவரிசைக்கு ஏற்ப நகரும் உதட்டசைவு (Procedural Mouth Envelope).
  - இறுதித் தரத்திற்கான குரல் பதிவுகள்: **Pending Studio Voiceover**.
  - கீழேயுள்ள 40 ஒலித் துண்டுகளுக்கு (40 clips) குரல் பதிவுகள் சேர்ப்பதற்கான வழிகாட்டி கீழே தரப்பட்டுள்ளது.

---

### 2. குரல் பதிவு வசனப் பட்டியல் (Actor Recording Sheet)

| Clip ID | கதாபாத்திரம் | தொடக்க விநாடி | கால அளவு | வசனம் (Tamil Script) | English Context |
|---|---|---|---|---|---|
| `clip_001_ilangathir` | இளங்கதிர் (13) | 24s | 9s | "அப்பா… என் குதிரை ஏன் நிற்க மாட்டேங்குது?" | Boy asks why his clay horse won't stand |
| `clip_002_sembiyan` | செம்பியன் (தந்தை) | 35s | 11s | "இரண்டு காலையும் நீ வேற வேற பக்கம் இழுத்திருக்கே. ஒன்றாகத் தாங்கினால்தான் நிற்கும்." | Father explains balance & mutual support |
| `clip_003_arumbu` | அரும்பு (தாய்) | 64s | 10s | "உணவு ஆறிடப் போகுது, எல்லாரும் வாங்க!" | Mother calls family for meal |
| `clip_004_narration` | விளக்க உரை | 104s | 14s | "ஒரே மண்ணில் பிறந்தவர்கள்… ஒரு நாள் அந்த மண்ணையே தங்களுக்குள் பிரித்துக்கொள்ள நின்றார்கள்." | Narration on brotherly conflict |
| `clip_005_ilangathir` | இளங்கதிர் | 180s | 12s | "அண்ணன் வென்றால் அப்பா திரும்ப மாட்டாரா?" | Fear of losing father |
| `clip_006_ilangathir` | இளங்கதிர் | 194s | 8s | "அப்பா வென்றால்… அண்ணன்?" | Fear of losing brother |
| `clip_007_arumbu` | அரும்பு | 204s | 14s | "எனக்கு யார் வென்றாலும் வேண்டாம். இருவரும் வீட்டுக்கு வந்தால் போதும்." | Mother's unyielding wish for peace |
| `clip_008_ilangathir` | இளங்கதிர் | 304s | 10s | "நீங்கள் அரசர்களிடம் பேசுவீர்களா?" | Ilangathir asks Kovur Kizhar |
| `clip_009_kovur_kizhar`| கோவூர் கிழார் | 316s | 14s | "அவர்கள் கேட்கத் தயாராக இருந்தால் பேசுவேன். இல்லாவிட்டாலும் சொல்ல வேண்டியதைச் சொல்வேன்." | Poet speaks truth to power |
| `clip_010_ilangathir` | இளங்கதிர் | 332s | 8s | "அப்படின்னா போரை நிறுத்தச் சொல்லுங்கள்." | Plea to stop war |
| `clip_011_ilangathir` | இளங்கதிர் | 342s | 14s | "எங்க அப்பாவும் அண்ணனும் சண்டை போட்டதில்லை. இப்போ மட்டும் ஏன் ஒருவரை ஒருவர் கொல்லணும்?" | Core innocent question |
| `clip_012_kovur_kizhar`| கோவூர் கிழார் | 358s | 8s | "உன் கேள்வியை அரசனிடம் எடுத்துச் செல்வோம்." | Poet resolves to take boy's question |
| `clip_013_nedunkilli` | நெடுங்கிள்ளி | 394s | 14s | "எதிரி என் வாயிலில் நிற்கிறான். நான் கதவைத் திறந்து தலைகுனிய வேண்டுமா?" | Nedunkilli's defensive pride |
| `clip_014_kovur_kizhar`| கோவூர் கிழார் | 410s | 14s | "கதவுக்கு வெளியே உன் பகை இருக்கலாம். உள்ளே உன் மக்கள் இருக்கிறார்கள்." | Poet's reminder of starving citizens |
| `clip_015_ilangathir` | இளங்கதிர் | 426s | 16s | "வெளியில் என் அப்பா இருக்கிறார். அவர் உள்ளே வந்தால்… அவரையும் எதிரின்னு சொல்வீங்களா?" | Boy challenges king |
| `clip_016_maaran` | மாறன் (அண்ணன்) | 458s | 8s | "நீ இங்கே வரக்கூடாது." | Older brother warning Ilangathir |
| `clip_017_ilangathir` | இளங்கதிர் | 468s | 10s | "நீ வீட்டுக்கு வந்தா நான் வர மாட்டேன்." | Boy's heartfelt response |
| `clip_018_ilangathir` | இளங்கதிர் | 526s | 10s | "இவர்களும் நம்ம ஊர் ஆட்கள் மாதிரியே இருக்காங்க." | Seeing common humanity in enemy soldiers |
| `clip_019_kovur_kizhar`| கோவூர் கிழார் | 538s | 8s | "இவர்களுக்கும் வீடு இருக்கிறது, இளங்கதிர்." | Poet agrees soldiers have homes |
| `clip_020_sembiyan` | செம்பியன் | 562s | 6s | "அம்மா? மாறன்?" | Father asks about family |
| `clip_021_ilangathir` | இளங்கதிர் | 570s | 10s | "உங்களைப் பற்றித்தான் கேட்டுக்கிட்டிருக்காங்க." | Boy reassures father |
| `clip_022_nalankilli` | நலங்கிள்ளி | 618s | 10s | "விடியும்போது முற்றுகையை முடிப்பேன்." | Nalankilli plans dawn victory |
| `clip_023_kovur_kizhar`| கோவூர் கிழார் | 630s | 6s | "அதன்பிறகு?" | "And after that?" |
| `clip_024_nalankilli` | நலங்கிள்ளி | 638s | 8s | "உறையூர் என் ஆட்சிக்குள் வரும்." | Nalankilli claims dominion |
| `clip_025_kovur_kizhar`| கோவூர் கிழார் | 648s | 16s | "அந்த நகரில் உன்னை வரவேற்க வேண்டியவர்கள் போரில் இறந்துவிட்டால்?" | Who will welcome the victor? |
| `clip_026_nalankilli` | நலங்கிள்ளி | 666s | 8s | "என் வீரத்தைச் சந்தேகிக்கிறீரா?" | King asks if his valor is doubted |
| `clip_027_kovur_kizhar`| கோவூர் கிழார் | 676s | 16s | "உன் வலிமையை நம்பித்தான் பேசுகிறேன். ஒரு படையை முன்னேற்றும் கையால் அதை நிறுத்தவும் முடியும்." | Strength is halting an army |
| `clip_028_ilangathir` | இளங்கதிர் | 700s | 12s | "அப்பா சரி பண்ணித் தருவார்… அவரை நாளைக்கு வீட்டுக்கு அனுப்புவீங்களா?" | Boy asks after horse breaks |
| `clip_029_ilangathir` | இளங்கதிர் | 804s | 10s | "இரண்டு அரசர்களும் இதே பூவைத்தானே அணிகிறார்கள்?" | Gathering Aathipoo flowers |
| `clip_030_kovur_kizhar`| கோவூர் கிழார் | 816s | 8s | "ஆம். ஆத்தி மாலை சோழரின் அடையாளம்." | Explaining Chola floral garland |
| `clip_031_kovur_kizhar`| கோவூர் கிழார் | 884s | 18s | "ஒருவீர் தோற்பினும், தோற்ப நும் குடியே." | Purananuru 45 climax line |
| `clip_032_kovur_kizhar`| கோவூர் கிழார் | 908s | 24s | "உங்கள் இருவரின் மாலையிலும் ஒரே பூ. உங்கள் படைகளில் நிற்பவர்களுக்கும் ஒரே மண்ணில் வேர்கள். இன்று யாருடைய வெற்றிக்காக யாருடைய வீட்டை அழிக்கப் போகிறீர்கள்?" | The poet's profound appeal |
| `clip_033_ilangathir` | இளங்கதிர் | 934s | 12s | "அப்பா! அண்ணா!" | Boy's cry across the field |
| `clip_034_ilangathir` | இளங்கதிர் | 970s | 14s | "இதில் எந்தப் பூ வெல்ல வேண்டும்?" | Climactic question with open palms |
| `clip_035_nedunkilli` | நெடுங்கிள்ளி | 992s | 12s | "என் மக்கள் வெளியே வரட்டும். அவர்கள்மீது ஆயுதம் உயரக்கூடாது." | Nedunkilli halts attack |
| `clip_036_nalankilli` | நலங்கிள்ளி | 1006s | 12s | "படைகள் பின்னால் செல்லட்டும். இது என் ஆணை." | Nalankilli orders withdrawal |
| `clip_037_ilangathir` | இளங்கதிர் | 1126s | 12s | "ஐயா! நீங்கள் உணவு சாப்பிட்டுப் போக வேண்டும்!" | Hospitality to the departing poet |
| `clip_038_ilangathir` | இளங்கதிர் | 1162s | 10s | "ஐயா… உங்கள் பாடலுக்கு இவ்வளவு வலிமையா?" | Boy wonders at poetry's power |
| `clip_039_kovur_kizhar`| கோவூர் கிழார் | 1173s | 11s | "அவர்கள் மறந்திருந்ததை நினைவுபடுத்தியது. எதிரே நின்றவனுக்கும் ஒரு வீடு இருக்கிறது என்பதை." | "Opposite man also has a home" |
| `clip_040_narration` | விளக்க உரை | 1185s | 13s | "அன்று ஒரு சிறுவன் விரும்பியது ஒரு நாட்டின் வெற்றியை அல்ல. தன் வீட்டில் அனைவரும் சேர்ந்து உண்ணும் ஒரு பொழுதை." | Final closing narration |

---

### 3. குரல் கோப்புகளை இணைப்பது எப்படி (How to add recorded audio files)
1. ஒலிப்பதிவுகளை `mp3` வடிவத்தில் பதிவு செய்க.
2. கோப்புப் பெயர்களை `public/audio/dialogue/clip_001_ilangathir.mp3` வடிவில் பெயரிட்டு அந்த அடைவில் சேமிக்க.
3. இணையதளம் தானாகவே பதிவுசெய்யப்பட்ட ஆடியோவை இயக்கும்.
