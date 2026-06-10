import type { Slide, SlideTone } from '../types';

export const SLIDE_TONES: SlideTone[] = [
  'intro',
  'teacher',
  'accelerator',
  'guardrails',
  'wildwest',
  'market',
  'summary',
  'demo',
];

export type SlideLayout = 'basic' | 'bullets' | 'quote' | 'image';

export const SLIDE_LAYOUTS: Array<{ id: SlideLayout; label: string }> = [
  { id: 'basic', label: 'Titel' },
  { id: 'bullets', label: 'Punkter' },
  { id: 'quote', label: 'Citat' },
  { id: 'image', label: 'Bild' },
];

let slideCounter = 0;

export function createSlideId(): string {
  slideCounter += 1;
  return `custom-${Date.now()}-${slideCounter}`;
}

export function reorderSlides(slides: Slide[], fromIndex: number, toIndex: number): Slide[] {
  if (fromIndex === toIndex) return slides;
  const next = [...slides];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export function getSlideLayout(slide: Slide): SlideLayout {
  if (slide.bullets?.length) return 'bullets';
  if (slide.quote) return 'quote';
  if (slide.image) return 'image';
  return 'basic';
}

export function createSlideFromTemplate(layout: SlideLayout): Slide {
  const base = {
    id: createSlideId(),
    section: 'Ny sektion',
    eyebrow: 'Underrubrik',
    title: 'Ny bild',
    duration: '2 min',
    tone: 'intro' as SlideTone,
    speakerNotes: '',
  };

  switch (layout) {
    case 'bullets':
      return {
        ...base,
        bullets: ['Första punkten', 'Andra punkten', 'Tredje punkten'],
      };
    case 'quote':
      return {
        ...base,
        quote: 'Skriv ditt citat här.',
      };
    case 'image':
      return {
        ...base,
        subtitle: 'Bildtext under titeln',
        image: '/images/heliotrip.png',
      };
    default:
      return {
        ...base,
        subtitle: 'Undertitel för bilden',
      };
  }
}

export function applySlideLayout(slide: Slide, layout: SlideLayout): Slide {
  const cleared: Slide = {
    id: slide.id,
    section: slide.section,
    eyebrow: slide.eyebrow,
    title: slide.title,
    subtitle: slide.subtitle,
    duration: slide.duration,
    tone: slide.tone,
    speakerNotes: slide.speakerNotes,
    transition: slide.transition,
  };

  switch (layout) {
    case 'bullets':
      return { ...cleared, bullets: slide.bullets ?? ['Ny punkt'] };
    case 'quote':
      return { ...cleared, quote: slide.quote ?? 'Nytt citat' };
    case 'image':
      return { ...cleared, image: slide.image ?? '/images/heliotrip.png' };
    default:
      return cleared;
  }
}

export function bulletsToText(bullets: string[] | undefined): string {
  return bullets?.join('\n') ?? '';
}

export function textToBullets(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}
