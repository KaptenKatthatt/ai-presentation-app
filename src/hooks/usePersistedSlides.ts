import { useEffect, useRef, useState } from 'react';
import type { Slide } from '../types';
import {
  loadSlides,
  saveSlides,
  storageErrorMessage,
  type SlideStorageError,
} from '../utils/slideStorage';

export { SLIDES_STORAGE_KEY, loadSlides } from '../utils/slideStorage';

const SAVE_DEBOUNCE_MS = 400;

export function usePersistedSlides(initialSlides: Slide[]) {
  const [slides, setSlides] = useState(() => loadSlides(initialSlides));
  const [storageWarning, setStorageWarning] = useState<string | null>(null);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      const error: SlideStorageError | null = saveSlides(slides);
      setStorageWarning(error ? storageErrorMessage(error) : null);
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [slides]);

  return [slides, setSlides, storageWarning] as const;
}
