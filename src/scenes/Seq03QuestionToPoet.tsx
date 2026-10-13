import React from 'react';
import { IlangathirCharacter, KovurKizharCharacter, ArumbuCharacter } from '../characters/CharacterPresets';
import { CivicGatheringSpace, CitySkylineSilhouettes } from '../environments/CityArchitecture';
import { TimelineState } from '../timeline/FilmTimelineController';
import { EmotionState } from '../characters/FaceExpressionController';

export const Seq03QuestionToPoet: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const t = timeline.currentTime;
  const speech = timeline.speechActivity;
  const speaker = timeline.currentSubtitle?.characterId;

  let boyEmotion: EmotionState = 'curiosity';
  let poetEmotion: EmotionState = 'neutral';
  let motherEmotion: EmotionState = 'concern';

  if (t < 330) {
    boyEmotion = 'curiosity';
    poetEmotion = 'neutral';
    motherEmotion = 'concern';
  } else if (t < 355) {
    // "இப்போ மட்டும் ஏன் ஒருவரை ஒருவர் கொல்லணும்?"
    boyEmotion = 'concern';
    poetEmotion = 'determination';
    motherEmotion = 'sadness';
  } else {
    // "உன் கேள்வியை அரசனிடம் எடுத்துச் செல்வோம்"
    boyEmotion = 'determination';
    poetEmotion = 'determination';
    motherEmotion = 'concern';
  }

  return (
    <group>
      {/* Civic Gathering Space (Ancient Marudham Tree & Raised Stone Manram Assembly Platform) */}
      <CivicGatheringSpace position={[0, 0, 0]} />

      {/* Background City Skyline */}
      <CitySkylineSilhouettes position={[0, 0, -22]} />

      {/* Poet Kovur Kizhar seated peacefully */}
      <KovurKizharCharacter
        position={[-0.6, 0.2, 0]}
        rotation={[0, 1.2, 0]}
        pose="idle_sitting"
        prop="poet_staff"
        emotion={poetEmotion}
        speechActivity={speaker === 'kovur_kizhar' ? speech : 0}
        lookAtTarget={[0.7, 0.6, 0.2]}
      />

      {/* Ilangathir sitting opposite the poet */}
      <IlangathirCharacter
        position={[0.7, 0.2, 0.2]}
        rotation={[0, -1.2, 0]}
        pose={t > 330 ? 'gesturing' : 'idle_sitting'}
        prop="clay_horse"
        emotion={boyEmotion}
        speechActivity={speaker === 'ilangathir' ? speech : 0}
        lookAtTarget={[-0.6, 0.9, 0]}
      />

      {/* Mother Arumbu standing nearby */}
      <ArumbuCharacter
        position={[-1.8, 0, 1.2]}
        rotation={[0, 0.8, 0]}
        pose="idle_standing"
        prop="porridge_bowl"
        emotion={motherEmotion}
        speechActivity={speaker === 'arumbu' ? speech : 0}
        lookAtTarget={[0, 0.6, 0]}
      />
    </group>
  );
};
