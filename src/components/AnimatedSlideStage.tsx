import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Slide } from '../types';
import {
  getSlideTransition,
  getTransitionDuration,
  type SlideTransition,
} from '../utils/slideTransitions';
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

interface StageState {
  committed: number;
  active: ActiveTransition | null;
  ready: boolean;
}

function buildTransition(
  slides: Slide[],
  fromIndex: number,
  toIndex: number,
): ActiveTransition | null {
  if (fromIndex === toIndex) return null;

  const transition = getSlideTransition(slides[toIndex] ?? {});
  if (transition === 'none') return null;

  return {
    fromIndex,
    toIndex,
    transition,
    direction: toIndex > fromIndex ? 'forward' : 'backward',
  };
}

export function AnimatedSlideStage({
  slides,
  current,
  fitToScreen = false,
  previewNonce = 0,
}: AnimatedSlideStageProps) {
  const [state, setState] = useState<StageState>(() => ({
    committed: current,
    active: null,
    ready: false,
  }));
  const previewNonceRef = useRef(previewNonce);

  const finishTransition = useCallback(() => {
    setState((prev) => {
      if (!prev.active) return prev;
      return { committed: prev.active.toIndex, active: null, ready: false };
    });
  }, []);

  useLayoutEffect(() => {
    setState((prev) => {
      if (current === prev.committed && !prev.active) return prev;

      const fromIndex = prev.active?.toIndex ?? prev.committed;
      if (current === fromIndex) return prev;

      const active = buildTransition(slides, fromIndex, current);
      if (!active) {
        return { committed: current, active: null, ready: false };
      }

      return { committed: prev.committed, active, ready: false };
    });
  }, [current, slides]);

  useLayoutEffect(() => {
    if (previewNonce <= 0 || previewNonce === previewNonceRef.current) return;
    previewNonceRef.current = previewNonce;

    const fromIndex = current > 0 ? current - 1 : current;
    if (fromIndex === current) return;

    const active = buildTransition(slides, fromIndex, current);
    if (!active) return;

    setState({ committed: fromIndex, active, ready: false });
  }, [previewNonce, current, slides]);

  useLayoutEffect(() => {
    if (!state.active) return;

    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setState((prev) => (prev.active ? { ...prev, ready: true } : prev));
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [state.active]);

  useEffect(() => {
    if (!state.active || !state.ready) return;

    const duration = getTransitionDuration(state.active.transition);
    const timer = window.setTimeout(finishTransition, duration + 50);
    return () => window.clearTimeout(timer);
  }, [state.active, state.ready, finishTransition]);

  const displayIndex = state.active?.toIndex ?? state.committed;
  const currentSlide = slides[displayIndex];
  if (!currentSlide) return null;

  if (!state.active) {
    return <SlideView slide={currentSlide} fitToScreen={fitToScreen} />;
  }

  const fromSlide = slides[state.active.fromIndex];
  const toSlide = slides[state.active.toIndex];
  if (!fromSlide || !toSlide) {
    return <SlideView slide={currentSlide} fitToScreen={fitToScreen} />;
  }

  const transitionClass = `slide-transition--${state.active.transition} slide-transition--${state.active.direction}`;
  const readyClass = state.ready ? 'slide-transition--ready' : '';

  return (
    <div
      className={`slide-transition ${transitionClass} ${readyClass}`.trim()}
      aria-live="polite"
    >
      <div className="slide-transition__layer slide-transition__layer--out">
        <SlideView slide={fromSlide} fitToScreen={fitToScreen} stableLayout />
      </div>
      <div className="slide-transition__layer slide-transition__layer--in">
        <SlideView slide={toSlide} fitToScreen={fitToScreen} stableLayout />
      </div>
      {state.active.transition === 'fade-through-black' && (
        <div className="slide-transition__veil" aria-hidden="true" />
      )}
    </div>
  );
}
