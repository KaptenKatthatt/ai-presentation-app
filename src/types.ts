export type SlideTone = 'intro' | 'teacher' | 'accelerator' | 'guardrails' | 'wildwest' | 'market' | 'summary' | 'demo';

export type SlideTransition =
  | 'none'
  | 'dissolve'
  | 'push'
  | 'slide'
  | 'zoom'
  | 'fade-through-black'
  | 'flip'
  | 'cube'
  | 'doorway'
  | 'mosaic';

export interface Slide {
  id: string;
  section: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  duration: string;
  tone: SlideTone;
  bullets?: string[];
  quote?: string;
  image?: string;
  cards?: Array<{
    title: string;
    text: string;
    image?: string;
    imagePosition?: string;
    href?: string;
    textHref?: string;
  }>;
  steps?: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  speakerNotes: string;
  /** Animation when entering this slide from the previous one. */
  transition?: SlideTransition;
}
