# ஆத்திப்பூ — வாளை நிறுத்திய தமிழ்
## CHARACTER DESIGN REFERENCE SHEETS & TECHNICAL RIG BIBLE (VIEWS A–J)

This technical production document establishes the definitive character design specifications, 3D topology guidelines, skeletal rig hierarchies, facial morph target libraries, material swatches, and signature acting vocabularies for the seven principal characters of the animated short film **“ஆத்திப்பூ — வாளை நிறுத்திய தமிழ்” (Aathipoo — The Tamil That Stayed the Sword)**.

All character models are artistic interpretations rooted in Sangam literary traditions (specifically **Purananuru 45** by Kovur Kizhar) and avoid modern fantasy armor, plastic skin shaders, cartoonish bobbleheads, and generic facial symmetry.

---

### INDEX OF PRINCIPAL CHARACTERS
1. **இளங்கதிர் (Ilangathir)** — The Emotional Center (13-Year-Old Potter's Son)
2. **கோவூர் கிழார் (Kovur Kizhar)** — Quiet Authority (Elderly Sangam Poet-Diplomat)
3. **அரும்பு (Arumbu)** — Strength Through Action (Working Mother & Potter)
4. **செம்பியன் (Sembiyan)** — The Maker Forced to Fight (Father, Conscripted Craftsman)
5. **மாறன் (Maaran)** — Duty and Fear (Elder Brother, Fort Garrison Spearman)
6. **நலங்கிள்ளி (Nalankilli)** — Command Becomes Restraint (Besieging Chola King)
7. **நெடுங்கிள்ளி (Nedunkilli)** — The Guarded Ruler (Besieged Fort Chola King)

---

## 1. ILANGATHIR (இளங்கதிர்) — THE EMOTIONAL CENTER

### Design Philosophy
- **Age**: 13 years old.
- **Role**: Catalyst of peace, representative of ordinary lives caught between royal wars.
- **Silhouette**: Small, forward-curious posture (height 1.28m, ~75% adult scale). Slender shoulders, one hand instinctively guarding his clay horse.
- **Anatomy**: Youthful warm brown skin (`#b87b53`), slender arms, slightly uneven expressive eyebrows, and a distinct signature forward hair curl (`curl_bangs`) that shifts with movement.
- **Costume**: Terracotta-tinted handloom dhoti (`#a8623b`) and unbleached cream shoulder cloth (`#f0e2cc`). Noticeable dried gray clay stains on fingertips and knee hem.

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Symmetrical stance with weight biased toward the left heel (55/45). Left hand gently cupping the chest-level clay horse; right arm relaxed at side with fingers loosely curled.
- **View B (Left-Side Profile)**: Slight spinal curvature showing youthful forward curiosity; forward hair curl visible over brow; dhoti drape falling straight to mid-calf.
- **View C (Back View)**: Clean neck line, textured short dark hair (`#141110`), folded terracotta sash knotted over right hip.
- **View D (Three-Quarter View)**: Primary cinematic angle; asymmetry of facial brow clearly legible against sky/interior backgrounds; clay horse head resting between thumb and forefinger.
- **View E (Face Close-Up)**: Expressive almond-shaped dark brown eyes (`#1a1008`) with subtle sclera tinting, soft rounded cheekbones, micro-imperfections on nose bridge, mobile lips.
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Gentle resting face, lips relaxed with 1mm separation, soft brow.
  2. *Curiosity*: Right brow raised +0.45, eyes widened +0.25, chin lifted +5°.
  3. *Small Happiness*: Lip corners raised +0.55, cheeks elevated +0.35, gentle crinkle at eye corners.
  4. *Concern*: Inner brows drawn upward +0.60, lips lightly pressed, chin pulled back.
  5. *Fear*: Eyelids widened +0.80, pupils dilated, mouth slightly parted with lower lip retracted.
  6. *Determination*: Brows lowered and drawn inward +0.70, jaw set firmly, lips compressed +0.40.
  7. *Sadness*: Inner brows raised +0.85, outer brows lowered -0.30, lip corners pulled down +0.65.
  8. *Relief*: Long exhale posture, eyelids half-lowered to 0.40, brow smoothed, soft spontaneous smile.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#b87b53`, Roughness 0.58, Metalness 0.0, Subsurface Scatter warmth tint.
  - *Terracotta Garment*: `#a8623b`, Roughness 0.88, woven linen micro-grain.
  - *Clay Smudges*: `#8d7768`, Roughness 0.95.
  - *Hair*: `#141110`, Roughness 0.70.
- **View H (Props & Scale)**:
  - Handcrafted Sangam terracotta toy horse (Length: 0.18m, Height: 0.14m, Weight: 0.35kg).
  - Two freshly bloomed white Aathipoo flowers (Diameter: 0.04m each).
- **View I (Rig Preview)**:
  - 34-bone stylized humanoid skeleton: `Root -> Pelvis -> Spine1 -> Spine2 -> Neck -> Head -> [LeftEye, RightEye, Jaw, HairCurl]`.
  - IK limbs for feet and hands with pole vector elbows and knees. Hand target attachment node for clay horse (`prop_attach_hand_L/R`).
- **View J (Six Signature Acting Poses)**:
  1. *Curious Inquire*: Leaning forward 8°, thumb stroking the mane of the clay horse.
  2. *Guarded Retreat*: Pulling horse closer into chest, shoulders tightening.
  3. *Anxious Wait*: Weight shift from right foot to left foot, holding breath.
  4. *The Frozen Shock*: Hands frozen in mid-air as clay horse slips and impacts the stone ground.
  5. *Hero Stance (Climax)*: Planted wide feet, chin raised high, open palm displaying two flowers.
  6. *Spontaneous Smile (Ending)*: Soft dropped shoulders, arms swinging freely beside wheel.

---

## 2. KOVUR KIZHAR (கோவூர் கிழார்) — QUIET AUTHORITY

### Design Philosophy
- **Role**: Sangam poet of the Chola royal court, author of Purananuru verse 45, moral mediator.
- **Silhouette**: Tall, lean, serene vertical posture (height 1.76m). Minimal superfluous fidgeting. Economic gestures that command attention without shouting.
- **Anatomy**: Weathered olive-brown skin (`#a87850`), dignified facial wrinkles around eyes and temples, silver-grey streaked beard (`#d4cfc7`) and tied aesthetic ascetic knot.
- **Costume**: Natural unbleached handspun off-white khadi wrap (`#e8dfcf`) with a muted deep-sand border (`#bda98c`), carved tamarind-wood walking staff (`#4a3728`).

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Dignified upright posture. Right hand resting on poet's staff at chest height; left hand resting comfortably at hip sash.
- **View B (Left-Side Profile)**: Slight elder stoop compensated by high chin angle; graceful drape flowing over left shoulder.
- **View C (Back View)**: Clean drape folds, elder hair knot pinned with wooden pin.
- **View D (Three-Quarter View)**: Deeply empathetic gaze toward the two sparring armies; calm presence that halts swords.
- **View E (Face Close-Up)**: Fine lines around eyes, calm deep dark eyes, soft silver-white mustache blending into trimmed beard, high forehead.
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Dignified calm, steady breathing, measured gaze.
  2. *Curiosity*: Thoughtful head tilt 4°, brow furrowed slightly in poetic inquiry.
  3. *Small Happiness*: Gentle eye wrinkling, warm restrained lip smile.
  4. *Concern*: Deepened forehead lines, quiet steady stare at weapon lines.
  5. *Fear*: Retained internal tension—not screaming panic, but a grave stiffening of the neck.
  6. *Determination (The Appeal)*: Eyes locked on kings, brow lowered with moral weight, jaw firm.
  7. *Sadness*: Downward gaze at soldiers, heavy chest breath.
  8. *Relief*: Upright breath release, eyes softening, gentle hand blessing gesture.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#a87850`, Roughness 0.62.
  - *Poet Shawl*: `#e8dfcf`, Roughness 0.90, cotton matte.
  - *Beard/Hair*: `#d4cfc7`, Roughness 0.80.
  - *Staff*: `#4a3728`, Roughness 0.55, polished weathered wood.
- **View H (Props & Scale)**:
  - Tamarind-wood Sangam traveler's staff (Height: 1.62m, Diameter: 0.03m).
  - Palm-leaf manuscript scroll tucked in waist sash.
- **View I (Rig Preview)**:
  - 36-bone senior biped skeleton with cloth physics helpers for the left shoulder drape and beard bone chains (`beard_root -> beard_mid -> beard_tip`).
- **View J (Six Signature Acting Poses)**:
  1. *Listening Pause*: Tilting head slightly before turning the body.
  2. *Poet's Appeal*: Stepping forward, extending right palm open toward Nalankilli.
  3. *Moral Challenge*: Lifting chin high before speaking the sacred Purananuru verse.
  4. *Protective Guidance*: Left hand resting gently over Ilangathir's shoulder.
  5. *The Still Stance*: Standing motionless between two advancing battle lines.
  6. *Salute of Peace*: Both hands brought together in dignified Sangam vanakkam.

---

## 3. ARUMBU (அரும்பு) — STRENGTH THROUGH ACTION

### Design Philosophy
- **Role**: Potter, matriarch, pragmatic pillar holding the village and family together.
- **Silhouette**: Earthy, grounded, capable silhouette (height 1.58m). Strong working forearms and calloused potter hands.
- **Anatomy**: Deep warm honey-brown skin (`#a46845`), hair tied back in a practical, unpretentious Sangam bun (`#161210`), faint tiredness beneath expressive eyes.
- **Costume**: Natural terracotta-ochre handloom cotton saree drape (`#8c4227`) with burnt-cinnamon sash (`#5e2a16`).

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Grounded stance with stable wide base. Hands carrying clay pot or re-tying shoulder bundle.
- **View B (Left-Side Profile)**: Curved working back from years over pottery wheels; neat low bun secured with terracotta hairpin.
- **View C (Back View)**: Asymmetrical drape crossed over back shoulder, allowing free arm movement for heavy pottery labor.
- **View D (Three-Quarter View)**: Attentive motherly glance; protective stance shielding young Ilangathir.
- **View E (Face Close-Up)**: Intense, clear brown eyes; expressive lips capable of conveying silent grief without theatrical sobbing.
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Focused, steady working gaze.
  2. *Curiosity*: Sharp glance up from clay work, lips parted slightly.
  3. *Small Happiness*: Proud motherly smile watching her son center clay on the wheel.
  4. *Concern (The Unanswerable Question)*: Hands stop mid-action; eyes look down; mouth tightens.
  5. *Fear*: Fast intake of breath, hand gripping son's arm.
  6. *Determination*: Firm set of the jaw, protective upright spine.
  7. *Sadness*: Silent brimming gaze without melodramatic weeping.
  8. *Relief*: Long, trembling exhale; deep embrace holding her reunited family.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#a46845`, Roughness 0.60.
  - *Working Cotton*: `#8c4227`, Roughness 0.92, porous weave.
  - *Hair*: `#161210`, Roughness 0.72.
- **View H (Props & Scale)**:
  - Handspun clay grain vessel (Height: 0.32m).
  - Cloth food parcel wrapped in dried banana leaf.
- **View I (Rig Preview)**:
  - 34-bone female biped skeleton with hair bun attachment joint and dual-hand IK constraints for dual-handed pottery and vessel lifting.
- **View J (Six Signature Acting Poses)**:
  1. *Measuring Grain*: Pausing hand in mid-air upon hearing war drums.
  2. *Adjusting Son's Cloth*: Smoothing Ilangathir's shoulder drape with tender precision.
  3. *The Difficult Answer*: Looking down into empty hands before whispering to her son.
  4. *Wheel Teaching*: Guiding son's young hands over the rotating clay cone.
  5. *Vigil at the Gate*: Standing outside fortified walls with eyes scanning dust clouds.
  6. *Firm Embrace*: Wrapping both arms around husband and son with grounding force.

---

## 4. SEMBIYAN (செம்பியன்) — THE MAKER FORCED TO FIGHT

### Design Philosophy
- **Role**: Master potter conscripted into Nalankilli's besieging army camp.
- **Silhouette**: Broad shoulders, muscular craftsman's back, practical physical strength (height 1.74m).
- **Anatomy**: Sun-baked dark copper-brown skin (`#98603c`), short trimmed black beard (`#181412`), clay traces on wrists contrasting with iron camp spear.
- **Costume**: Worn ochre working tunic (`#80502a`) reinforced with simple leather chest strap; iron-tipped Sangam spear (`#444444`).

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Sturdy front silhouette; heavy working hands; spear held vertically with resting grip.
- **View B (Left-Side Profile)**: Forward-slanted neck carrying the weight of forced conscription; heavy stride.
- **View C (Back View)**: Broad muscular scapulae, worn leather strap crossing diagonal from right shoulder to left hip.
- **View D (Three-Quarter View)**: Contrast between potter's gentle eyes and soldier's forced grimace.
- **View E (Face Close-Up)**: Weathered brow lines, gentle dark eyes with fatigue circles, square jaw with neat short beard.
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Somber, quiet craftsman gaze.
  2. *Curiosity*: Head turned toward footsteps in the encampment.
  3. *Small Happiness*: Radiant fatherly pride teaching clay shaping.
  4. *Concern*: Looking down at weapon in hands, remembering pottery wheel.
  5. *Fear*: Looking across the battlefield toward the fort where his older son Maaran is stationed.
  6. *Determination*: Stepping into battle line out of duty to the king.
  7. *Sadness*: Quiet resignation in the evening camp mist.
  8. *Relief*: Lowering the spear, dropping to knees to hug Ilangathir.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#98603c`, Roughness 0.58.
  - *Ochre Tunic*: `#80502a`, Roughness 0.85.
  - *Iron Spear*: `#3a3a3a`, Metalness 0.75, Roughness 0.40.
- **View H (Props & Scale)**:
  - Sangam infantry spear (Length: 2.10m, Iron leaf tip: 0.28m).
  - Wet clay test lump for pottery wheel scenes.
- **View I (Rig Preview)**:
  - 34-bone heavy biped skeleton with weapon holster node on right hand and secondary spine weight controllers.
- **View J (Six Signature Acting Poses)**:
  1. *Hands of the Potter*: Gentle, circular guiding motions over the turning clay.
  2. *Uncomfortable Grip*: Squeezing spear shaft when anxious or startled.
  3. *Campfire Longing*: Staring into the camp embers holding a piece of dried clay.
  4. *Reunion Recognition*: Freezing in disbelief upon seeing Ilangathir at the battlefield.
  5. *Releasing the Spear*: Deliberately opening fingers and letting iron weapon strike the earth.
  6. *Family Shelter*: Enfolding wife and sons inside his broad arms.

---

## 5. MAARAN (மாறன்) — DUTY AND FEAR

### Design Philosophy
- **Role**: Elder son, conscripted inside Nedunkilli's besieged Uraiyur citadel fortress.
- **Silhouette**: Lean, agile young warrior (height 1.70m, age 19).
- **Anatomy**: Warm medium brown skin (`#a86d48`), athletic young frame, clean-shaven youthful face, anxious alert eyes.
- **Costume**: Fort garrison indigo tunic (`#2d3f56`) with dark slate-gray sash (`#1d2836`); wooden wicker-and-leather Sangam round shield (`#44382e`).

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Alert defensive stance, shield strapped to left forearm, spear held at 45° angle.
- **View B (Left-Side Profile)**: Shield held protecting ribcage; alert neck craning toward fort parapets.
- **View C (Back View)**: Lean youthful shoulder blades, tied garrison sash knots.
- **View D (Three-Quarter View)**: Young face struggling between obedience to king and terror of killing his own father.
- **View E (Face Close-Up)**: Wide youthful brown eyes, nervous mouth, smooth jaw, alert brow.
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Alert sentinel watch face.
  2. *Curiosity*: Peering down through the fortress arrow slits.
  3. *Small Happiness*: Smiling at his younger brother's childhood antics.
  4. *Concern*: Looking down at brother Ilangathir holding the broken clay horse.
  5. *Fear*: Sweating under iron helmet, knowing father is in the opposing line.
  6. *Determination*: Tightening shield strap to protect the fort gate.
  7. *Sadness*: Dropping gaze when Ilangathir asks why brothers must war.
  8. *Relief*: Utter collapse of tension, tears of gratitude as war drums cease.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#a86d48`, Roughness 0.55.
  - *Indigo Garment*: `#2d3f56`, Roughness 0.88.
  - *Shield Surface*: `#44382e`, Roughness 0.70.
- **View H (Props & Scale)**:
  - Sangam circular wicker shield (Diameter: 0.55m).
  - Garrison iron javelin (Length: 1.80m).
- **View I (Rig Preview)**:
  - 34-bone agile biped skeleton with shield attachment pivot on left ulna and dynamic weapon handling constraints.
- **View J (Six Signature Acting Poses)**:
  1. *Sentinel Stance*: Rigid, military posture when officers inspect ranks.
  2. *Shield Fastening*: Tightening leather buckle with nervous fingers.
  3. *Avoiding Eye Contact*: Looking down when mother asks about the siege.
  4. *Softening Posture*: Immediately breaking rigid guard pose when Ilangathir approaches.
  5. *Recognition Across the Lines*: Spotting his father's ochre tunic in the enemy vanguard.
  6. *The Brother's Grasp*: Gripping Ilangathir's hand tightly across the open fort threshold.

---

## 6. NALANKILLI (நலங்கிள்ளி) — COMMAND BECOMES RESTRAINT

### Design Philosophy
- **Role**: Besieging Chola King, commanding the outer army encamped before Uraiyur.
- **Silhouette**: Broad, imposing, regal angular silhouette (height 1.82m).
- **Anatomy**: Deep regal golden-bronze skin (`#9a633a`), strong square jawline, piercing dark eyes, groomed imperial mustache.
- **Costume**: Royal crimson-ochre silk angavastram (`#82241e`), cast bronze breastplate engraved with the Chola jumping tiger (`#ffc107`), Aathipoo flower garland (`#ffffff`) worn across the chest.

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Commanding royal stance, feet planted at shoulder width, hand resting on bronze sword hilt.
- **View B (Left-Side Profile)**: Upright regal spine, heavy royal drape falling in crisp pleats.
- **View C (Back View)**: Broad royal shoulders covered by deep red silk cape with gold threaded selvedge.
- **View D (Three-Quarter View)**: Piercing commanding gaze shifting from rage to introspective shame.
- **View E (Face Close-Up)**: Imperial brow, bronze crown band with single tiger emblem, chiseled chin.
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Stern royal authority, impassive commander.
  2. *Curiosity*: Pausing as an unarmed child and poet enter the battle center.
  3. *Small Happiness*: A slow, profound smile acknowledging the wisdom of Tamil.
  4. *Concern*: Realizing his own subjects make up both armies.
  5. *Fear*: Momentary dread at the truth of Kovur Kizhar's words: *"ஒருவீர் தோற்பினும், தோற்ப நும் குடியே."*
  6. *Determination*: Drawing sword with intent to breach the fortress walls.
  7. *Sadness*: Heavy gaze looking at the crushed clay horse and two identical Aathipoo flowers.
  8. *Relief*: Sheathing royal sword, raising open hand to command army withdrawal.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#9a633a`, Roughness 0.50.
  - *Royal Crimson Silk*: `#82241e`, Roughness 0.40, subtle specular sheen.
  - *Bronze Armor & Tiger*: `#ffc107` / `#c89228`, Metalness 0.85, Roughness 0.25.
  - *Aathipoo Garland*: `#ffffff`, Roughness 0.45.
- **View H (Props & Scale)**:
  - Chola royal ceremonial bronze sword (Length: 0.95m).
  - Royal commander's banner displaying the leaping tiger on red field.
- **View I (Rig Preview)**:
  - 36-bone royal biped skeleton with sword sheath constraint, cape physics bones, and crown head attachment.
- **View J (Six Signature Acting Poses)**:
  1. *Commanding Glare*: Staring down at fort battlements with clenched jaw.
  2. *The Sudden Halt*: Halting advancing chariot/steed when Ilangathir's horse shatters.
  3. *Intense Listening*: Absorbing the poet's recitation without interrupting.
  4. *Examining the Flowers*: Gazing downward at Ilangathir's open hands.
  5. *The King's Sheath*: Slowly sliding the royal bronze blade back into its scabbard.
  6. *The Ceasefire Command*: Raising the right arm high with open palm to order the trumpet call of peace.

---

## 7. NEDUNKILLI (நெடுங்கிள்ளி) — THE GUARDED RULER

### Design Philosophy
- **Role**: Besieged Chola King defending the Uraiyur fort citadel.
- **Silhouette**: Compact, guarded, defensive regal silhouette (height 1.78m).
- **Anatomy**: Olive-copper skin (`#8f5c35`), sharp angular cheekbones, neat dark goatee, weary eyes burdened by the prolonged siege.
- **Costume**: Forest-green and gold royal silk tunic (`#244b36`), bronze armlets and torc, identical Aathipoo flower garland (`#ffffff`) as Chola royal heritage.

### Character Reference Sheet Views (A–J)
- **View A (Full-Body Front)**: Defensive royal posture, hands clasped together over belt.
- **View B (Left-Side Profile)**: Lean, guarded profile, scanning messengers nervously.
- **View C (Back View)**: Royal dark-green mantle draped over defensive leather-and-bronze cuirass.
- **View D (Three-Quarter View)**: Skeptical, anxious royal gaze softening into solemn comprehension.
- **View E (Face Close-Up)**: Distinct facial geometry from Nalankilli (slimmer nose, sharper jawline, different crown design).
- **View F (Eight-Expression Matrix)**:
  1. *Neutral*: Guarded sovereign, calculating survival.
  2. *Curiosity*: Leaning forward from throne when poet arrives.
  3. *Small Happiness*: Quiet nod of gratitude toward Kovur Kizhar.
  4. *Concern*: Reviewing grain shortages and trapped citizens.
  5. *Fear*: Listening to battering rams shaking the outer gates.
  6. *Determination*: Refusing unconditional surrender.
  7. *Sadness*: Remembering that his enemy Nalankilli shares the same ancestor.
  8. *Relief*: Ordering the gates unbarred and the siege bells stilled.
- **View G (Costume & Material Swatches)**:
  - *Skin*: `#8f5c35`, Roughness 0.52.
  - *Citadel Green Silk*: `#244b36`, Roughness 0.42.
  - *Bronze Torc & Crown*: `#d49a30`, Metalness 0.80, Roughness 0.30.
  - *Aathipoo Garland*: `#ffffff`, Roughness 0.45.
- **View H (Props & Scale)**:
  - Fort royal seal ring & bronze scepter (Length: 0.65m).
- **View I (Rig Preview)**:
  - 36-bone royal biped skeleton with throne seating IK targets and mantle blend shapes.
- **View J (Six Signature Acting Poses)**:
  1. *Throne Deliberation*: Resting chin on knuckles while hearing battle news.
  2. *Anxious Pacing*: Measuring steps across the stone throne room.
  3. *Facing the Poet*: Folding hands together with deep reverence.
  4. *Looking Beyond the Wall*: Standing on parapet as the two flowers are displayed.
  5. *Relaxing the Shoulders*: Physical release of siege paranoia.
  6. *Opening the Gates*: Commanding guards to drop the heavy timber crossbars.

---

## 8. SANGAM SCALE & PROPORTION MATRIX

| Character | Height | Skin Tone | Primary Color | Material Finish | Signature Prop |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ilangathir** | 1.28 m | `#b87b53` (Warm Brown) | `#a8623b` (Terracotta) | Matte Cotton / Clay | Clay Horse / Two Flowers |
| **Kovur Kizhar** | 1.76 m | `#a87850` (Olive Brown) | `#e8dfcf` (Off-White Khadi) | Handspun Cotton | Tamarind Staff |
| **Arumbu** | 1.58 m | `#a46845` (Honey Brown) | `#8c4227` (Earth Ochre) | Porous Cotton | Clay Pot / Grain Basket |
| **Sembiyan** | 1.74 m | `#98603c` (Copper Brown) | `#80502a` (Worn Ochre) | Coarse Cotton / Leather | Iron Spear / Potter Wheel |
| **Maaran** | 1.70 m | `#a86d48` (Medium Brown) | `#2d3f56` (Fort Indigo) | Garrison Linen | Wicker Shield / Spear |
| **Nalankilli** | 1.82 m | `#9a633a` (Bronze Brown) | `#82241e` (Royal Crimson) | Silk / Bronze Armor | Tiger Sword / Aathipoo |
| **Nedunkilli** | 1.78 m | `#8f5c35` (Olive Copper) | `#244b36` (Citadel Green) | Silk / Bronze Torc | Scepter / Aathipoo |

---

## 9. TECHNICAL ANIMATION & VISUAL PIPELINE VERIFICATION

1. **Deterministic Seekability**:
   All 7 characters bind poses, facial expressions, and prop ownership deterministically to `filmTimeline.currentTime` (0 to 1,200 seconds). Seeking backward or forward accurately restores bone rotations, morph target weights, eye targets, and prop parenting.
2. **Contact & Foot Planting**:
   Foot IK solves grounded height at `y = 0.0`. During walking and running cycles, stride contact phase plants the heel and rolls to the toe with zero floor sliding.
3. **Decoupled Lip-Sync vs. Facial Performance**:
   Speech viseme amplitude (driven by audio or synthetic viseme envelopes) modulates `jawOpen` and `lipPress` without flattening emotional brow furrows (`browLower`), cheek puff (`cheekRaise`), or emotional eyelid squinting (`eyelidNarrow`).
4. **Studio Turntable & Dev Tools**:
   Integrated via the in-browser Quality Review Studio (`ReviewWorkspace.tsx`) accessible from the main header and documentation links.
