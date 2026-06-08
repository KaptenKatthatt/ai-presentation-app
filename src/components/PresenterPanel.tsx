import type { Slide } from '../types';

interface PresenterPanelProps {
  currentSlide: Slide;
  nextSlide?: Slide;
  index: number;
  total: number;
}

export function PresenterPanel({ currentSlide, nextSlide, index, total }: PresenterPanelProps) {
  return (
    <aside className="presenter" aria-label="Manus och talarstöd">
      <div className="presenter__meta">
        <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <span>{currentSlide.section}</span>
        <span>{currentSlide.duration}</span>
      </div>

      <div>
        <p className="eyebrow">Manus</p>
        <h2>{currentSlide.title}</h2>
        <p>{currentSlide.speakerNotes}</p>
      </div>

      {nextSlide && (
        <div className="next-up">
          <p className="eyebrow">Nästa</p>
          <h3>{nextSlide.title}</h3>
          <p>{nextSlide.section} • {nextSlide.duration}</p>
        </div>
      )}

      <div className="shortcuts">
        <p className="eyebrow">Kortkommandon</p>
        <span>← / → byt slide</span>
        <span>M visa manus</span>
        <span>O översikt</span>
        <span>F fullskärm</span>
        <span>P öppna åskådarvy</span>
      </div>
    </aside>
  );
}
