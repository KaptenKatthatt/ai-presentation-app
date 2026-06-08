import type { Slide } from '../types';

interface OverviewProps {
  slides: Slide[];
  current: number;
  onSelect: (index: number) => void;
}

export function Overview({ slides, current, onSelect }: OverviewProps) {
  return (
    <section className="overview" aria-label="Slideöversikt">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          className={`overview-card ${index === current ? 'overview-card--active' : ''}`}
          onClick={() => onSelect(index)}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h2>{slide.title}</h2>
          <p>{slide.section} • {slide.duration}</p>
        </button>
      ))}
    </section>
  );
}
