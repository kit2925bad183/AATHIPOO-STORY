import { useState, useEffect } from 'react';
import { filmTimeline, TimelineState } from './FilmTimelineController';

export function useFilmTimeline(): TimelineState {
  const [state, setState] = useState<TimelineState>(() => filmTimeline.getState());

  useEffect(() => {
    const unsubscribe = filmTimeline.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return state;
}
