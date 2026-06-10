import type { Slide } from '../types';
import { FitToScreen } from './FitToScreen';

interface SlideViewProps {
  slide: Slide;
  fitToScreen?: boolean;
  /** Skip delayed refits — used during cross-slide transitions. */
  stableLayout?: boolean;
}

export function SlideView({ slide, fitToScreen = false, stableLayout = false }: SlideViewProps) {
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
          {slide.cards.map((card, cardIndex) => {
            const cardKey = card.title || card.href || `card-${cardIndex}`;
            const linkProps = {
              className: 'card__link',
              target: '_blank' as const,
              rel: 'noopener noreferrer',
            };

            const cardBody = (
              <>
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title || 'Projektbild'}
                    className="card__image"
                    style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
                    loading="eager"
                    decoding="async"
                  />
                )}
                {card.title &&
                  (card.href && card.textHref ? (
                    <h2>
                      <a href={card.href} {...linkProps}>
                        {card.title}
                      </a>
                    </h2>
                  ) : (
                    <h2>{card.title}</h2>
                  ))}
                {card.text &&
                  (card.textHref ? (
                    <p>
                      <a href={card.textHref} {...linkProps}>
                        {card.text}
                      </a>
                    </p>
                  ) : (
                    <p>{card.text}</p>
                  ))}
              </>
            );

            if (card.href && !card.textHref) {
              return (
                <a
                  key={cardKey}
                  href={card.href}
                  className="card card--linked"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cardBody}
                </a>
              );
            }

            return (
              <section className={`card${card.href || card.textHref ? ' card--linked' : ''}`} key={cardKey}>
                {cardBody}
              </section>
            );
          })}
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
        <FitToScreen className="slide__content-fit" contentKey={slide.id} stableLayout={stableLayout}>
          {content}
        </FitToScreen>
      ) : (
        content
      )}
    </article>
  );
}
