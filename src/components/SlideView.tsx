import type { Slide } from '../types';
import { FitToScreen } from './FitToScreen';

interface SlideViewProps {
  slide: Slide;
  fitToScreen?: boolean;
}

export function SlideView({ slide, fitToScreen = false }: SlideViewProps) {
  const content = (
    <div className="slide__content">
      <p className="eyebrow">{slide.eyebrow}</p>
      <h1 id={`slide-${slide.id}`}>{slide.title}</h1>
      {slide.subtitle && <p className="subtitle">{slide.subtitle}</p>}

      {slide.image && (
        <img src={slide.image} alt="" className="slide__image" loading="eager" decoding="async" />
      )}

      {slide.quote && <blockquote>{slide.quote}</blockquote>}

      {slide.steps && (
        <div className="steps">
          {slide.steps.map((step) => (
            <div className="step" key={step.label}>
              <span>{step.label}</span>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      )}

      {slide.cards && (
        <div className="cards">
          {slide.cards.map((card) => (
            <section className="card" key={card.title}>
              {card.image && (
                <img src={card.image} alt={card.title} className="card__image" loading="eager" decoding="async" />
              )}
              <h2>{card.title}</h2>
              <p>{card.text}</p>
            </section>
          ))}
        </div>
      )}

      {slide.bullets && (
        <ul className="bullets">
          {slide.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <article className={`slide slide--${slide.tone}`} aria-labelledby={`slide-${slide.id}`}>
      {fitToScreen ? (
        <FitToScreen className="slide__content-fit" contentKey={slide.id}>
          {content}
        </FitToScreen>
      ) : (
        content
      )}
    </article>
  );
}
