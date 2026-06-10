import { useCallback, useEffect, useMemo, useState } from 'react';
import { slides as initialSlides } from '../data/slides';
import { loadSlides, SLIDES_STORAGE_KEY } from '../hooks/usePersistedSlides';
import { usePresentationSync } from '../hooks/usePresentationSync';
import { AnimatedSlideStage } from './AnimatedSlideStage';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function SlideOnlyApp() {
  const [slides, setSlides] = useState(() => loadSlides(initialSlides));
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const reloadSlides = () => setSlides(loadSlides(initialSlides));

    const onStorage = (event: StorageEvent) => {
      if (event.key === SLIDES_STORAGE_KEY) reloadSlides();
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current, slides.length]);

  const goTo = useCallback(
    (index: number) => setCurrent((value) => clamp(index, 0, slides.length - 1)),
    [slides.length],
  );
  const next = useCallback(
    () => setCurrent((value) => clamp(value + 1, 0, slides.length - 1)),
    [slides.length],
  );
  const previous = useCallback(
    () => setCurrent((value) => clamp(value - 1, 0, slides.length - 1)),
    [slides.length],
  );

  usePresentationSync({
    role: 'audience',
    current,
    onRemoteSlide: goTo,
  });

  useEffect(() => {
    document.documentElement.classList.add('slide-only-root');
    return () => document.documentElement.classList.remove('slide-only-root');
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'arrowright' || key === ' ') next();
      if (key === 'arrowleft') previous();
      if (key === 'f') {
        if (!document.fullscreenElement) void document.documentElement.requestFullscreen();
        else void document.exitFullscreen();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  useEffect(() => {
    setCurrent((value) => clamp(value, 0, slides.length - 1));
  }, [slides.length]);

  return (
    <main className={`app app--slide-only app--presentation${isFullscreen ? ' app--fullscreen' : ''}`}>
      <div className="aurora aurora--one" />
      <div className="aurora aurora--two" />

      <div className="progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="stage stage--solo">
        <AnimatedSlideStage slides={slides} current={current} fitToScreen />
      </div>
    </main>
  );
}
