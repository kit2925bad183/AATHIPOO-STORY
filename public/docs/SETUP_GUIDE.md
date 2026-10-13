# ஆத்திப்பூ — திட்ட நிறுவல் மற்றும் பயன்பாட்டு வழிகாட்டி
## Project Setup, Local Run & Customization Guide

### 1. கணினியில் இயக்குதல் (Running Locally)

1. தொகுப்புகளை நிறுவ (Install dependencies):
   ```bash
   npm install
   ```

2. மென்பொருளை இயக்க (Start development server):
   ```bash
   npm run dev
   ```
   உலாவியில் `http://localhost:5173` முகவரியைத் திறந்து திரைப்படத்தைக் காணலாம்.

3. நிலை நிறுவல் தொகுப்பு உருவாக்கம் (Production Build):
   ```bash
   npm run build
   ```

4. உருவான தொகுப்பை முன்னோட்டம் காண (Preview Production Build):
   ```bash
   npm run preview
   ```

---

### 2. காட்சி அல்லது கேமரா கோணங்களை மாற்றுவது எப்படி (Customizing Camera & Shots)
- `src/data/shotData.ts` கோப்பில் ஒவ்வொரு காட்சிக்கும் கேமரா நிலை (`position`), குவியப் புள்ளி (`target`), மற்றும் பார்வை அளவு (`fov`) வரையறுக்கப்பட்டுள்ளது.
- ஒரு காட்சியின் நேரத்தை அல்லது கோணத்தை மாற்ற விரும்பினால், அந்த shot-ஐத் தேர்ந்தெடுத்து `camera.position` அல்லது `actionDescription`-ஐ மாற்றலாம்.

---

### 3. வசனங்கள் மற்றும் வரிகளை மாற்றுவது எப்படி (Customizing Dialogues & Subtitles)
- `src/data/subtitlesData.ts` கோப்பில் உள்ள தமிழ் (`textTa`) மற்றும் ஆங்கிலம் (`textEn`) வரிகளை நேரடியாகத் திருத்தலாம்.
- கால அளவை மாற்றினால் தானாகவே `audioManifestData.ts`-லும் உதட்டசைவு வளைவு அதற்கேற்பப் புதுப்பிக்கப்படும்.

---

### 4. நிலையான இணையப் பக்கமாக பதிவேற்றம் செய்ய (Static Hosting)
- `npm run build` செய்தபின் உருவாகும் `dist/` அடைவை GitHub Pages, Vercel, Netlify அல்லது Cloudflare Pages-இல் எவ்வித பின்தள சேவையுமின்றி (zero backend required) நேரடியாகப் பதிவேற்றலாம்.
