import { useEffect, useMemo, useState } from 'react';
import { Controls } from './components/Controls';
import { Overview } from './components/Overview';
import { PresenterPanel } from './components/PresenterPanel';
import { SlideView } from './components/SlideView';
import { slides } from './data/slides';
import { openPresentationWindow, usePresentationSync } from './hooks/usePresentationSync';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function App() {
  const [current, setCurrent] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [overviewMode, setOverviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);
  const currentSlide = slides[current];
  const nextSlide = slides[current + 1];

  const goTo = (index: number) => setCurrent(clamp(index, 0, slides.length - 1));
  const next = () => goTo(current + 1);
  const previous = () => goTo(current - 1);

  usePresentationSync({ role: 'presenter', current });

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === 'arrowright' || key === ' ') next();
      if (key === 'arrowleft') previous();
      if (key === 'm') setPresenterMode((value) => !value);
      if (key === 'o') setOverviewMode((value) => !value);
      if (key === 'f') void toggleFullscreen();
      if (key === 'p') openPresentationWindow('audience');
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [current]);

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
        <span className="topbar__hint">← → • M manus • O översikt • F fullskärm • P åskådare</span>
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
      ) : (
        <div className="stage">
          <SlideView slide={currentSlide} fitToScreen />
          {presenterMode && (
            <PresenterPanel
              currentSlide={currentSlide}
              nextSlide={nextSlide}
              index={current}
              total={slides.length}
            />
          )}
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
        onOpenAudience={() => openPresentationWindow('audience')}
        onOpenPresentation={() => openPresentationWindow('presentation')}
      />
    </main>
  );
}
