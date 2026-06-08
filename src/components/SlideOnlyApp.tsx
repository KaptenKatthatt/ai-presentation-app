import { useEffect, useMemo, useState } from 'react';
import { slides } from '../data/slides';
import { usePresentationSync } from '../hooks/usePresentationSync';
import { SlideView } from './SlideView';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

interface SlideOnlyAppProps {
  mode: 'audience' | 'presentation';
}

export function SlideOnlyApp({ mode }: SlideOnlyAppProps) {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isAudience = mode === 'audience';

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);
  const currentSlide = slides[current];

  const goTo = (index: number) => setCurrent(clamp(index, 0, slides.length - 1));
  const next = () => goTo(current + 1);
  const previous = () => goTo(current - 1);

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
    if (isAudience) return;

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
  }, [current, isAudience]);

  return (
    <main className={`app app--slide-only app--${mode}${isFullscreen ? ' app--fullscreen' : ''}`}>
      <div className="aurora aurora--one" />
      <div className="aurora aurora--two" />

      {isAudience && (
        <div className="audience-badge" aria-hidden="true">
          Åskådarvy
        </div>
      )}

      <div className="progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="stage stage--solo">
        <SlideView slide={currentSlide} fitToScreen />
      </div>
    </main>
  );
}
