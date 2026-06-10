import { GripVertical, Plus, RotateCcw } from 'lucide-react';
import { useCallback, useState } from 'react';
import type { Slide } from '../types';
import { useDragReorder } from '../hooks/useDragReorder';
import { createSlideFromTemplate, type SlideLayout } from '../utils/slideEditor';
import { SlideInspector } from './SlideInspector';
import { SlideThumbnail } from './SlideThumbnail';
import { AnimatedSlideStage } from './AnimatedSlideStage';

interface EditorViewProps {
  slides: Slide[];
  current: number;
  onGoTo: (index: number) => void;
  onUpdateSlide: (index: number, slide: Slide) => void;
  onAddSlide: (slide: Slide, afterIndex?: number) => void;
  onDeleteSlide: (index: number) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onResetSlide: (index: number) => void;
  onResetAllSlides: () => void;
  canResetSlide: (slideId: string) => boolean;
}

export function EditorView({
  slides,
  current,
  onGoTo,
  onUpdateSlide,
  onAddSlide,
  onDeleteSlide,
  onReorder,
  onResetSlide,
  onResetAllSlides,
  canResetSlide,
}: EditorViewProps) {
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [previewNonce, setPreviewNonce] = useState(0);
  const currentSlide = slides[current];

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      onReorder(fromIndex, toIndex);
      if (current === fromIndex) {
        onGoTo(toIndex);
      } else if (fromIndex < current && toIndex >= current) {
        onGoTo(current - 1);
      } else if (fromIndex > current && toIndex <= current) {
        onGoTo(current + 1);
      }
    },
    [current, onGoTo, onReorder],
  );

  const { getDragProps, dropTarget } = useDragReorder(handleReorder);

  const addSlide = (layout: SlideLayout) => {
    const slide = createSlideFromTemplate(layout);
    onAddSlide(slide, current);
    setShowLayoutPicker(false);
  };

  if (!currentSlide) return null;

  return (
    <div className="editor" aria-label="Redigeringsläge">
      <aside className="editor__navigator" aria-label="Bildlista">
        <header className="editor__navigator-header">
          <h2>Bilder</h2>
          <div className="editor__navigator-actions">
            <button
              type="button"
              className="editor__reset-all-btn"
              onClick={() => {
                if (window.confirm('Återställ hela presentationen till ursprungsläget? Egna bilder tas bort.')) {
                  onResetAllSlides();
                }
              }}
            >
              <RotateCcw size={14} />
              Återställ alla
            </button>
            <div className="editor__add-wrap">
            <button
              type="button"
              className="editor__add-btn"
              onClick={() => setShowLayoutPicker((value) => !value)}
              aria-expanded={showLayoutPicker}
              aria-haspopup="menu"
            >
              <Plus size={16} />
              Ny bild
            </button>
            {showLayoutPicker && (
              <div className="editor__layout-picker" role="menu">
                <button type="button" role="menuitem" onClick={() => addSlide('basic')}>
                  Titel
                </button>
                <button type="button" role="menuitem" onClick={() => addSlide('bullets')}>
                  Punkter
                </button>
                <button type="button" role="menuitem" onClick={() => addSlide('quote')}>
                  Citat
                </button>
                <button type="button" role="menuitem" onClick={() => addSlide('image')}>
                  Bild
                </button>
              </div>
            )}
            </div>
          </div>
        </header>

        <div className="editor__thumbnails">
          {slides.map((slide, index) => {
            const dragProps = getDragProps(index);
            return (
              <div
                key={slide.id}
                className={`editor__thumb-row ${index === current ? 'editor__thumb-row--active' : ''} ${dropTarget === index ? 'editor__thumb-row--drop' : ''}`}
                {...dragProps}
              >
                <span className="editor__drag-handle" aria-hidden="true">
                  <GripVertical size={14} />
                </span>
                <button
                  type="button"
                  className="editor__thumb-select"
                  onClick={() => onGoTo(index)}
                  aria-label={`Redigera bild ${index + 1}: ${slide.title}`}
                  aria-current={index === current}
                >
                  <SlideThumbnail slide={slide} size="small" />
                  <span className="editor__thumb-label">{String(index + 1).padStart(2, '0')}</span>
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      <main className="editor__canvas" aria-label="Förhandsvisning">
        <AnimatedSlideStage
          slides={slides}
          current={current}
          fitToScreen
          previewNonce={previewNonce}
        />
      </main>

      <SlideInspector
        slide={currentSlide}
        slideIndex={current}
        totalSlides={slides.length}
        canReset={canResetSlide(currentSlide.id)}
        onChange={(slide) => onUpdateSlide(current, slide)}
        onReset={() => {
          if (window.confirm('Återställ den här bilden till ursprungsläget?')) {
            onResetSlide(current);
          }
        }}
        onDelete={() => onDeleteSlide(current)}
        onPreviewTransition={() => setPreviewNonce((value) => value + 1)}
      />
    </div>
  );
}
