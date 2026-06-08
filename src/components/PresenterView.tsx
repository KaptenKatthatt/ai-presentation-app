import { ChevronDown, ChevronUp, Pause, Play, RotateCcw } from 'lucide-react';
import type { Slide } from '../types';
import { usePresentationTimer } from '../hooks/usePresentationTimer';
import { PresenterPanel } from './PresenterPanel';
import { SlideThumbnail } from './SlideThumbnail';

interface PresenterViewProps {
  slides: Slide[];
  current: number;
  onGoTo: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSpeakerNotesChange: (index: number, notes: string) => void;
}

export function PresenterView({
  slides,
  current,
  onGoTo,
  onPrevious,
  onNext,
  onSpeakerNotesChange,
}: PresenterViewProps) {
  const currentSlide = slides[current];
  const previousSlide = slides[current - 1];
  const nextSlide = slides[current + 1];
  const { elapsed, isPaused, togglePause, reset } = usePresentationTimer(true);

  return (
    <div className="presenter-view">
      <section className="presenter-view__left" aria-label="Slideförhandsvisning">
        <header className="presenter-view__toolbar">
          <div className="presenter-timer" aria-live="polite">
            <time className="presenter-timer__clock">{elapsed}</time>
            <div className="presenter-timer__actions">
              <button type="button" onClick={togglePause} aria-label={isPaused ? 'Fortsätt timer' : 'Pausa timer'}>
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
                {isPaused ? 'Spela' : 'Pausa'}
              </button>
              <button type="button" onClick={reset} aria-label="Återställ timer">
                <RotateCcw size={16} />
                Återställ
              </button>
            </div>
          </div>
        </header>

        <div className="presenter-view__selector">
          <span className="presenter-view__selector-label">Bild {current + 1}</span>
          <div className="presenter-view__selector-nav">
            <button type="button" onClick={onPrevious} disabled={current === 0} aria-label="Föregående bild">
              <ChevronUp size={18} />
            </button>
            <button type="button" onClick={onNext} disabled={current === slides.length - 1} aria-label="Nästa bild">
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        <div className="presenter-view__current">
          <SlideThumbnail slide={currentSlide} size="large" />
        </div>

        <div className="presenter-view__adjacent">
          <div className="presenter-view__adjacent-item">
            {previousSlide ? (
              <SlideThumbnail
                slide={previousSlide}
                label="Föregående"
                onClick={() => onGoTo(current - 1)}
              />
            ) : (
              <div className="presenter-view__adjacent-empty">
                <span>Föregående</span>
                <p>Ingen bild</p>
              </div>
            )}
          </div>
          <div className="presenter-view__adjacent-item">
            {nextSlide ? (
              <SlideThumbnail slide={nextSlide} label="Nästa" onClick={() => onGoTo(current + 1)} />
            ) : (
              <div className="presenter-view__adjacent-empty">
                <span>Nästa</span>
                <p>Ingen bild</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <PresenterPanel
        currentSlide={currentSlide}
        index={current}
        total={slides.length}
        onSpeakerNotesChange={(notes) => onSpeakerNotesChange(current, notes)}
      />
    </div>
  );
}
