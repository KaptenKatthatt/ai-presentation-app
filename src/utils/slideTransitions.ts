import type { SlideTransition } from '../types';

export type { SlideTransition };

export const SLIDE_TRANSITIONS: Array<{ id: SlideTransition; label: string }> = [
  { id: 'none', label: 'Ingen' },
  { id: 'dissolve', label: 'Upplösning' },
  { id: 'push', label: 'Skjut' },
  { id: 'slide', label: 'Glid' },
  { id: 'zoom', label: 'Zooma' },
  { id: 'fade-through-black', label: 'Tonar genom svart' },
  { id: 'flip', label: 'Vänd' },
  { id: 'cube', label: 'Kub' },
  { id: 'doorway', label: 'Dörröppning' },
  { id: 'mosaic', label: 'Mosaik' },
];

export const TRANSITION_DURATION_MS = 650;

export function getSlideTransition(slide: { transition?: SlideTransition }): SlideTransition {
  return slide.transition ?? 'none';
}
