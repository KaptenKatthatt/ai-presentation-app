import { useCallback, useEffect, useRef, useState } from 'react';
import type { Slide } from '../types';
import { getSlideTransition, TRANSITION_DURATION_MS, type SlideTransition } from '../utils/slideTransitions';
import { SlideView } from './SlideView';

interface AnimatedSlideStageProps {
  slides: Slide[];
  current: number;
  fitToScreen?: boolean;
  /** Increment to replay the transition into the current slide (editor preview). */
  previewNonce?: number;
}

type TransitionDirection = 'forward' | 'backward';

interface ActiveTransition {
  fromIndex: number;
  toIndex: number;
  transition: SlideTransition;
  direction: TransitionDirection;
}

export function AnimatedSlideStage({
  slides,
  current,
  fitToScreen = false,
  previewNonce = 0,
}: AnimatedSlideStageProps) {
  const prevCurrentRef = useRef(current);
  const [active, setActive] = useState<ActiveTransition | null>(null);

  const beginTransition = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;

      const transition = getSlideTransition(slides[toIndex] ?? {});
      if (transition === 'none') return;

      setActive({
        fromIndex,
        toIndex,
        transition,
        direction: toIndex > fromIndex ? 'forward' : 'backward',
      });
    },
    [slides],
  );

  useEffect(() => {
    const previous = prevCurrentRef.current;
    if (current !== previous) {
      beginTransition(previous, current);
      prevCurrentRef.current = current;
    }
  }, [current, beginTransition]);

  useEffect(() => {
    if (previewNonce <= 0) return;
    const fromIndex = current > 0 ? current - 1 : current;
    if (fromIndex === current) return;
    beginTransition(fromIndex, current);
  }, [previewNonce, current, beginTransition]);

  const finishTransition = useCallback(() => {
    setActive(null);
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(finishTransition, TRANSITION_DURATION_MS + 40);
    return () => window.clearTimeout(timer);
  }, [active, finishTransition]);

  const currentSlide = slides[current];
  if (!currentSlide) return null;

  if (!active) {
    return <SlideView slide={currentSlide} fitToScreen={fitToScreen} />;
  }

  const fromSlide = slides[active.fromIndex];
  const toSlide = slides[active.toIndex];
  if (!fromSlide || !toSlide) {
    return <SlideView slide={currentSlide} fitToScreen={fitToScreen} />;
  }

  return (
    <div
      className={`slide-transition slide-transition--${active.transition} slide-transition--${active.direction}`}
      aria-live="polite"
    >
      <div className="slide-transition__layer slide-transition__layer--out" onAnimationEnd={finishTransition}>
        <SlideView slide={fromSlide} fitToScreen={fitToScreen} />
      </div>
      <div className="slide-transition__layer slide-transition__layer--in">
        <SlideView slide={toSlide} fitToScreen={fitToScreen} />
      </div>
      {active.transition === 'fade-through-black' && <div className="slide-transition__veil" aria-hidden="true" />}
    </div>
  );
}
