import { useCallback, useEffect, useMemo, useState } from 'react';

import { Controls } from './components/Controls';

import { EditorView } from './components/EditorView';

import { Overview } from './components/Overview';

import { PresenterView } from './components/PresenterView';

import { AnimatedSlideStage } from './components/AnimatedSlideStage';

import { slides as initialSlides } from './data/slides';

import { usePersistedSlides } from './hooks/usePersistedSlides';

import { usePresentationTimer } from './hooks/usePresentationTimer';

import { openPresentationWindow, usePresentationSync } from './hooks/usePresentationSync';

import type { Slide } from './types';

import { getOriginalSlide, getOriginalSlides, hasOriginalSlide } from './utils/originalSlides';
import { reorderSlides } from './utils/slideEditor';



const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);



export default function App() {

  const [slides, setSlides, storageWarning] = usePersistedSlides(initialSlides);

  const [current, setCurrent] = useState(0);

  const [presenterMode, setPresenterMode] = useState(false);

  const [overviewMode, setOverviewMode] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);



  const timer = usePresentationTimer(presenterMode);

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current, slides.length]);

  const currentSlide = slides[current];



  const updateSpeakerNotes = (index: number, notes: string) => {

    setSlides((prev) =>

      prev.map((slide, i) => (i === index ? { ...slide, speakerNotes: notes } : slide)),

    );

  };



  const updateSlide = useCallback((index: number, slide: Slide) => {

    setSlides((prev) => prev.map((item, i) => (i === index ? slide : item)));

  }, [setSlides]);



  const addSlide = useCallback((slide: Slide, afterIndex?: number) => {

    setSlides((prev) => {

      const insertAt = afterIndex === undefined ? prev.length : afterIndex + 1;

      const next = [...prev];

      next.splice(insertAt, 0, slide);

      return next;

    });

    setCurrent((value) => {

      const insertAt = afterIndex === undefined ? slides.length : afterIndex + 1;

      if (afterIndex === value) return insertAt;

      return insertAt <= value ? value + 1 : value;

    });

  }, [setSlides, slides.length]);



  const deleteSlide = useCallback((index: number) => {

    setSlides((prev) => {

      if (prev.length <= 1) return prev;

      return prev.filter((_, i) => i !== index);

    });

    setCurrent((value) => clamp(value >= index ? value - 1 : value, 0, slides.length - 2));

  }, [setSlides, slides.length]);



  const resetSlide = useCallback((index: number) => {
    setSlides((prev) => {
      const slide = prev[index];
      if (!slide) return prev;
      const original = getOriginalSlide(slide.id);
      if (!original) return prev;
      return prev.map((item, i) => (i === index ? original : item));
    });
  }, [setSlides]);

  const resetAllSlides = useCallback(() => {
    setSlides(getOriginalSlides());
    setCurrent(0);
  }, [setSlides]);

  const handleReorder = useCallback((fromIndex: number, toIndex: number) => {

    setSlides((prev) => reorderSlides(prev, fromIndex, toIndex));

    setCurrent((value) => {

      if (value === fromIndex) return toIndex;

      if (fromIndex < value && toIndex >= value) return value - 1;

      if (fromIndex > value && toIndex <= value) return value + 1;

      return value;

    });

  }, [setSlides]);



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



  const toggleEditMode = useCallback(() => {

    setEditMode((value) => {

      const nextValue = !value;

      if (nextValue) {

        setPresenterMode(false);

        setOverviewMode(false);

      }

      return nextValue;

    });

  }, []);



  useEffect(() => {

    const onKeyDown = (event: KeyboardEvent) => {

      const target = event.target;

      const isEditing =

        target instanceof HTMLTextAreaElement ||

        target instanceof HTMLInputElement ||

        target instanceof HTMLSelectElement ||

        (target instanceof HTMLElement && target.isContentEditable);



      const key = event.key.toLowerCase();

      if (!isEditing && !editMode) {

        if (key === 'arrowright' || key === ' ') next();

        if (key === 'arrowleft') previous();

      }

      if (key === 'm' && !editMode) setPresenterMode((value) => !value);

      if (key === 'o' && !editMode) setOverviewMode((value) => !value);

      if (key === 'e') toggleEditMode();

      if (key === 'f') void toggleFullscreen();

      if (key === 'p' && !editMode) openPresentationWindow();

    };



    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);

  }, [next, previous, toggleFullscreen, toggleEditMode, editMode]);



  useEffect(() => {

    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);

  }, []);



  return (

    <main className={`app ${presenterMode ? 'app--presenter' : ''} ${editMode ? 'app--edit' : ''}`}>

      <div className="aurora aurora--one" />

      <div className="aurora aurora--two" />



      <header className="topbar">

        <div>

          <span className="brand-mark">TS</span>

          <strong>Systemarkitekt med AI</strong>

        </div>

        <span className={`topbar__hint${storageWarning ? ' topbar__hint--warning' : ''}`}>

          {storageWarning ??
            (editMode
              ? 'E avsluta redigering • Dra bilder för att ändra ordning'
              : '← → • M manus • O översikt • E redigera • F fullskärm • P presentationsvy')}

        </span>

      </header>



      <div className="progress" aria-hidden="true">

        <div style={{ width: `${progress}%` }} />

      </div>



      {editMode ? (

        <EditorView

          slides={slides}

          current={current}

          onGoTo={goTo}

          onUpdateSlide={updateSlide}

          onAddSlide={addSlide}

          onDeleteSlide={deleteSlide}

          onReorder={handleReorder}

          onResetSlide={resetSlide}

          onResetAllSlides={resetAllSlides}

          canResetSlide={hasOriginalSlide}

        />

      ) : overviewMode ? (

        <Overview

          slides={slides}

          current={current}

          onSelect={(index) => {

            goTo(index);

            setOverviewMode(false);

          }}

          onReorder={handleReorder}

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

            timer={timer}

          />

        </div>

      ) : (

        <div className="stage">

          <AnimatedSlideStage slides={slides} current={current} fitToScreen />

        </div>

      )}



      <Controls

        current={current}

        total={slides.length}

        presenterMode={presenterMode}

        overviewMode={overviewMode}

        editMode={editMode}

        onPrevious={previous}

        onNext={next}

        onTogglePresenter={() => setPresenterMode((value) => !value)}

        onToggleOverview={() => setOverviewMode((value) => !value)}

        onToggleEdit={toggleEditMode}

        onToggleFullscreen={toggleFullscreen}

        isFullscreen={isFullscreen}

        onOpenPresentation={() => openPresentationWindow()}

      />

    </main>

  );

}


