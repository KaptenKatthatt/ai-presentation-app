import type { ReactNode } from 'react';
import { RotateCcw, Trash2 } from 'lucide-react';
import type { Slide, SlideTransition } from '../types';
import {
  SLIDE_LAYOUTS,
  SLIDE_TONES,
  applySlideLayout,
  bulletsToText,
  getSlideLayout,
  textToBullets,
  type SlideLayout,
} from '../utils/slideEditor';
import { SLIDE_TRANSITIONS, getSlideTransition } from '../utils/slideTransitions';

interface SlideInspectorProps {
  slide: Slide;
  slideIndex: number;
  totalSlides: number;
  canReset: boolean;
  onChange: (slide: Slide) => void;
  onReset: () => void;
  onDelete: () => void;
  onPreviewTransition?: () => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="inspector-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function SlideInspector({
  slide,
  slideIndex,
  totalSlides,
  canReset,
  onChange,
  onDelete,
  onReset,
  onPreviewTransition,
}: SlideInspectorProps) {
  const layout = getSlideLayout(slide);
  const transition = getSlideTransition(slide);
  const canPreview = slideIndex > 0 && transition !== 'none';

  const update = (patch: Partial<Slide>) => onChange({ ...slide, ...patch });

  const setLayout = (nextLayout: SlideLayout) => {
    onChange(applySlideLayout(slide, nextLayout));
  };

  return (
    <aside className="inspector" aria-label="Bildinställningar">
      <header className="inspector__header">
        <div>
          <p className="inspector__eyebrow">Bild {slideIndex + 1}</p>
          <h2>Formatera bild</h2>
        </div>
        <button
          type="button"
          className="inspector__delete"
          onClick={onDelete}
          disabled={totalSlides <= 1}
          aria-label="Ta bort bild"
        >
          <Trash2 size={16} />
        </button>
      </header>

      <div className="inspector__sections">
        <section className="inspector__section">
          <div className="inspector__section-header">
            <h3>Layout</h3>
            {canReset && (
              <button type="button" className="inspector__reset" onClick={onReset}>
                <RotateCcw size={14} />
                Återställ bild
              </button>
            )}
          </div>
          <div className="inspector__layout-grid">
            {SLIDE_LAYOUTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`inspector__layout-btn ${layout === item.id ? 'inspector__layout-btn--active' : ''}`}
                onClick={() => setLayout(item.id)}
                aria-pressed={layout === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="inspector__section">
          <h3>Innehåll</h3>
          <Field label="Sektion">
            <input value={slide.section} onChange={(e) => update({ section: e.target.value })} />
          </Field>
          <Field label="Etikett">
            <input value={slide.eyebrow} onChange={(e) => update({ eyebrow: e.target.value })} />
          </Field>
          <Field label="Titel">
            <input value={slide.title} onChange={(e) => update({ title: e.target.value })} />
          </Field>
          <Field label="Undertitel">
            <textarea
              value={slide.subtitle ?? ''}
              onChange={(e) => update({ subtitle: e.target.value || undefined })}
              rows={2}
            />
          </Field>
        </section>

        {layout === 'bullets' && (
          <section className="inspector__section">
            <h3>Punkter</h3>
            <Field label="En punkt per rad">
              <textarea
                value={bulletsToText(slide.bullets)}
                onChange={(e) => update({ bullets: textToBullets(e.target.value) })}
                rows={6}
              />
            </Field>
          </section>
        )}

        {layout === 'quote' && (
          <section className="inspector__section">
            <h3>Citat</h3>
            <Field label="Citatetext">
              <textarea
                value={slide.quote ?? ''}
                onChange={(e) => update({ quote: e.target.value })}
                rows={4}
              />
            </Field>
          </section>
        )}

        {layout === 'image' && (
          <section className="inspector__section">
            <h3>Bild</h3>
            <Field label="Bild-URL">
              <input
                value={slide.image ?? ''}
                onChange={(e) => update({ image: e.target.value })}
                placeholder="/images/exempel.png"
              />
            </Field>
          </section>
        )}

        <section className="inspector__section">
          <div className="inspector__section-header">
            <h3>Övergång</h3>
            {onPreviewTransition && (
              <button
                type="button"
                className="inspector__reset"
                onClick={onPreviewTransition}
                disabled={!canPreview}
                title={slideIndex === 0 ? 'Första bilden har ingen föregående övergång' : undefined}
              >
                Förhandsgranska
              </button>
            )}
          </div>
          <p className="inspector__hint">
            {slideIndex === 0
              ? 'Första bilden visas utan övergång.'
              : 'Spelas när du kommer till den här bilden.'}
          </p>
          <div className="inspector__layout-grid inspector__transition-grid">
            {SLIDE_TRANSITIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`inspector__layout-btn inspector__transition-btn inspector__transition-btn--${item.id} ${transition === item.id ? 'inspector__layout-btn--active' : ''}`}
                onClick={() => update({ transition: item.id as SlideTransition })}
                aria-pressed={transition === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="inspector__section">
          <h3>Utseende</h3>
          <Field label="Tema">
            <select value={slide.tone} onChange={(e) => update({ tone: e.target.value as Slide['tone'] })}>
              {SLIDE_TONES.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Tid">
            <input value={slide.duration} onChange={(e) => update({ duration: e.target.value })} />
          </Field>
        </section>

        <section className="inspector__section">
          <h3>Manus</h3>
          <Field label="Presentatörsanteckningar">
            <textarea
              value={slide.speakerNotes}
              onChange={(e) => update({ speakerNotes: e.target.value })}
              rows={5}
            />
          </Field>
        </section>
      </div>
    </aside>
  );
}
