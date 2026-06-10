import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controls } from './components/Controls';
import { Overview } from './components/Overview';
import { PresenterView } from './components/PresenterView';
import { SlideView } from './components/SlideView';
import { slides as initialSlides } from './data/slides';
import { openPresentationWindow, usePresentationSync } from './hooks/usePresentationSync';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function App() {
  const [slides, setSlides] = useState(initialSlides);
  const [current, setCurrent] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [overviewMode, setOverviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current, slides.length]);
  const currentSlide = slides[current];
  const updateSpeakerNotes = (index: number, notes: string) => {
    setSlides((prev) =>
      prev.map((slide, i) => (i === index ? { ...slide, speakerNotes: notes } : slide)),
    );
  };
  const goTo = useCallback(
    (index: number) => setCurrent(clamp(index, 0, slides.length - 1)),
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

  usePresentationSync({ role: 'presenter', current });

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isEditing =
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLInputElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      const key = event.key.toLowerCase();
      if (!isEditing) {
        if (key === 'arrowright' || key === ' ') next();
        if (key === 'arrowleft') previous();
      }
      if (key === 'm') setPresenterMode((value) => !value);
      if (key === 'o') setOverviewMode((value) => !value);
      if (key === 'f') void toggleFullscreen();
      if (key === 'p') openPresentationWindow();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous, toggleFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <main className={`app ${presenterMode ? 'app--presenter' : ''}`}>
      <div className="aurora aurora--one" />
      <div className="aurora aurora--two" />

      <header className="topbar">
        <div>
          <span className="brand-mark">TS</span>
          <strong>Systemarkitekt med AI</strong>
        </div>
        <span className="topbar__hint">← → • M manus • O översikt • F fullskärm • P presentationsvy</span>
      </header>

      <div className="progress" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      {overviewMode ? (
        <Overview
          slides={slides}
          current={current}
          onSelect={(index) => {
            goTo(index);
            setOverviewMode(false);
          }}
        />
      ) : presenterMode ? (
        <div className="stage stage--presenter-view">
          <PresenterView
            slides={slides}
            current={current}
            onGoTo={goTo}
            onPrevious={previous}
            onNext={next}
            onSpeakerNotesChange={updateSpeakerNotes}
          />
        </div>
      ) : (
        <div className="stage">
          <SlideView slide={currentSlide} fitToScreen />
        </div>
      )}

      <Controls
        current={current}
        total={slides.length}
        presenterMode={presenterMode}
        overviewMode={overviewMode}
        onPrevious={previous}
        onNext={next}
        onTogglePresenter={() => setPresenterMode((value) => !value)}
        onToggleOverview={() => setOverviewMode((value) => !value)}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onOpenPresentation={() => openPresentationWindow()}
      />
    </main>
  );
}
