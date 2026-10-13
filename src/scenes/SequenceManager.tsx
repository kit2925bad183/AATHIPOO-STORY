import React from 'react';
import { TimelineState } from '../timeline/FilmTimelineController';
import { Seq01OneSoil } from './Seq01OneSoil';
import { Seq02ClosedGates } from './Seq02ClosedGates';
import { Seq03QuestionToPoet } from './Seq03QuestionToPoet';
import { Seq04KingWithin } from './Seq04KingWithin';
import { Seq05BeyondWalls } from './Seq05BeyondWalls';
import { Seq06WhoWins } from './Seq06WhoWins';
import { Seq07BeforeDawn } from './Seq07BeforeDawn';
import { Seq08TamilBetweenSwords } from './Seq08TamilBetweenSwords';
import { Seq09GatesOpen } from './Seq09GatesOpen';
import { Seq10WheelTurnsAgain } from './Seq10WheelTurnsAgain';

export const SequenceManager: React.FC<{ timeline: TimelineState }> = ({ timeline }) => {
  const seqId = timeline.currentSequence.id;

  switch (seqId) {
    case 1:
      return <Seq01OneSoil timeline={timeline} />;
    case 2:
      return <Seq02ClosedGates timeline={timeline} />;
    case 3:
      return <Seq03QuestionToPoet timeline={timeline} />;
    case 4:
      return <Seq04KingWithin timeline={timeline} />;
    case 5:
      return <Seq05BeyondWalls timeline={timeline} />;
    case 6:
      return <Seq06WhoWins timeline={timeline} />;
    case 7:
      return <Seq07BeforeDawn timeline={timeline} />;
    case 8:
      return <Seq08TamilBetweenSwords timeline={timeline} />;
    case 9:
      return <Seq09GatesOpen timeline={timeline} />;
    case 10:
    default:
      return <Seq10WheelTurnsAgain timeline={timeline} />;
  }
};
