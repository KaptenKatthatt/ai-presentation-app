import { GripVertical } from 'lucide-react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import type { Slide } from '../types';
import { useDragReorder } from '../hooks/useDragReorder';

const TITLE_MIN_FONT_PX = 11;
const TITLE_MAX_FONT_PX = 14;

interface OverviewProps {
  slides: Slide[];
  current: number;
  onSelect: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

function OverviewCardTitle({ title }: { title: string }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const area = areaRef.current;
    const heading = titleRef.current;
    if (!area || !heading) return;

    const fitTitle = () => {
      let size = TITLE_MAX_FONT_PX;
      heading.style.fontSize = `${size}px`;

      while (size > TITLE_MIN_FONT_PX && heading.scrollHeight > area.clientHeight) {
        size -= 0.5;
        heading.style.fontSize = `${size}px`;
      }
    };

    fitTitle();
    const observer = new ResizeObserver(fitTitle);
    observer.observe(area);
    void document.fonts.ready.then(fitTitle);

    return () => observer.disconnect();
  }, [title]);

  return (
    <div ref={areaRef} className="overview-card__title-area">
      <h2 ref={titleRef}>{title}</h2>
    </div>
  );
}

export function Overview({ slides, current, onSelect, onReorder }: OverviewProps) {
  const skipClickRef = useRef(false);

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      skipClickRef.current = true;
      onReorder(fromIndex, toIndex);
    },
    [onReorder],
  );

  const { getDragProps, dropTarget, isDragging } = useDragReorder(handleReorder);

  return (
    <section className={`overview ${isDragging ? 'overview--dragging' : ''}`} aria-label="Slideöversikt">
      {slides.map((slide, index) => {
        const dragProps = getDragProps(index);
        return (
          <div
            key={slide.id}
            className={`overview-card-wrap ${dropTarget === index ? 'overview-card-wrap--drop' : ''}`}
            {...dragProps}
          >
            <span className="overview-card__drag" aria-hidden="true">
              <GripVertical size={16} />
            </span>
            <button
              type="button"
              className={`overview-card ${index === current ? 'overview-card--active' : ''}`}
              onClick={() => {
                if (skipClickRef.current) {
                  skipClickRef.current = false;
                  return;
                }
                onSelect(index);
              }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <OverviewCardTitle title={slide.title} />
              <p>{slide.section} • {slide.duration}</p>
            </button>
          </div>
        );
      })}
    </section>
  );
}
