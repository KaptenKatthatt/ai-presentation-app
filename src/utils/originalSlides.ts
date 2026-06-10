import { slides as initialSlides } from '../data/slides';
import type { Slide } from '../types';

const originalSlidesById = new Map(
  initialSlides.map((slide) => [slide.id, structuredClone(slide)]),
);

export function getOriginalSlide(id: string): Slide | undefined {
  const slide = originalSlidesById.get(id);
  return slide ? structuredClone(slide) : undefined;
}

export function hasOriginalSlide(id: string): boolean {
  return originalSlidesById.has(id);
}

export function getOriginalSlides(): Slide[] {
  return initialSlides.map((slide) => structuredClone(slide));
}
