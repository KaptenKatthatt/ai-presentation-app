export type SlideTone = 'intro' | 'teacher' | 'accelerator' | 'guardrails' | 'wildwest' | 'market' | 'summary' | 'demo';

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
  }>;
  steps?: Array<{
    label: string;
    title: string;
    text: string;
  }>;
  speakerNotes: string;
}
