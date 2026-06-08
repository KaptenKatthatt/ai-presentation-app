import { useCallback, useEffect, useRef, useState } from 'react';

function formatElapsed(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

export function usePresentationTimer(active = true) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const pausedTotalRef = useRef(0);
  const pauseStartedRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    if (!active || isPaused || startedAtRef.current === null) return;
    setElapsedMs(Date.now() - startedAtRef.current - pausedTotalRef.current);
  }, [active, isPaused]);

  useEffect(() => {
    if (!active) return;

    if (startedAtRef.current === null) {
      startedAtRef.current = Date.now();
    }

    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [active, tick]);

  const togglePause = useCallback(() => {
    setIsPaused((paused) => {
      if (!paused) {
        pauseStartedRef.current = Date.now();
        return true;
      }

      if (pauseStartedRef.current !== null) {
        pausedTotalRef.current += Date.now() - pauseStartedRef.current;
        pauseStartedRef.current = null;
      }

      tick();
      return false;
    });
  }, [tick]);

  const reset = useCallback(() => {
    startedAtRef.current = Date.now();
    pausedTotalRef.current = 0;
    pauseStartedRef.current = null;
    setIsPaused(false);
    setElapsedMs(0);
  }, []);

  return {
    elapsed: formatElapsed(elapsedMs),
    isPaused,
    togglePause,
    reset,
  };
}
