import type { Slide } from '../types';

export const SLIDES_STORAGE_KEY = 'ai-presentation-slides';

/** Per-field limit for inline data URLs (localStorage is ~5 MB per origin). */
const MAX_DATA_URL_CHARS = 8_000;
/** Soft cap before attempting to write. */
const MAX_PAYLOAD_CHARS = 4 * 1024 * 1024;

export type SlideStorageError = 'quota' | 'too_large';

function isOversizedDataUrl(value: string): boolean {
  return value.startsWith('data:') && value.length > MAX_DATA_URL_CHARS;
}

function trimDataUrl(value: string | undefined): string | undefined {
  if (!value) return value;
  if (isOversizedDataUrl(value)) return undefined;
  return value;
}

/** Remove inline images that are too large to persist in localStorage. */
export function sanitizeSlidesForStorage(slides: Slide[]): Slide[] {
  return slides.map((slide) => {
    const image = trimDataUrl(slide.image);
    const cards = slide.cards?.map((card) => ({
      ...card,
      image: trimDataUrl(card.image),
    }));

    const changed =
      image !== slide.image ||
      cards?.some((card, index) => card.image !== slide.cards?.[index]?.image);

    if (!changed) return slide;

    return {
      ...slide,
      image,
      cards,
    };
  });
}

export function loadSlides(fallback: Slide[]): Slide[] {
  try {
    const raw = localStorage.getItem(SLIDES_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return fallback;
    return sanitizeSlidesForStorage(parsed as Slide[]);
  } catch {
    return fallback;
  }
}

function trySetItem(payload: string): SlideStorageError | null {
  if (payload.length > MAX_PAYLOAD_CHARS) return 'too_large';

  try {
    localStorage.setItem(SLIDES_STORAGE_KEY, payload);
    return null;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      return 'quota';
    }
    throw error;
  }
}

function stripInlineImages(slides: Slide[]): Slide[] {
  return slides.map((slide) => ({
    ...slide,
    image: slide.image?.startsWith('data:') ? undefined : slide.image,
    cards: slide.cards?.map((card) => ({
      ...card,
      image: card.image?.startsWith('data:') ? undefined : card.image,
    })),
  }));
}

export function saveSlides(slides: Slide[]): SlideStorageError | null {
  const sanitized = sanitizeSlidesForStorage(slides);
  let error = trySetItem(JSON.stringify(sanitized));

  if (error !== 'quota') return error;

  const stripped = stripInlineImages(sanitized);
  error = trySetItem(JSON.stringify(stripped));
  if (error !== 'quota') return error;

  // Last resort: remove bloated stored entry and retry with stripped payload.
  try {
    localStorage.removeItem(SLIDES_STORAGE_KEY);
    return trySetItem(JSON.stringify(stripped));
  } catch {
    return 'quota';
  }
}

export function storageErrorMessage(error: SlideStorageError): string {
  if (error === 'too_large') {
    return 'Presentationen är för stor att spara lokalt. Använd bild-URL:er i stället för inklistrade bilder.';
  }
  return 'Kunde inte spara ändringar lokalt (lagringsutrymmet är fullt). Använd bild-URL:er i stället för inklistrade bilder.';
}
