import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import type { Slide } from '../types';

type PresenterTab = 'notes' | 'tools';

interface PresenterPanelProps {
  currentSlide: Slide;
  index: number;
  total: number;
}

const MIN_NOTES_SCALE = 0.85;
const MAX_NOTES_SCALE = 1.45;
const NOTES_SCALE_STEP = 0.1;

export function PresenterPanel({ currentSlide, index, total }: PresenterPanelProps) {
  const [activeTab, setActiveTab] = useState<PresenterTab>('notes');
  const [notesScale, setNotesScale] = useState(1);

  const decreaseNotes = () => setNotesScale((value) => Math.max(MIN_NOTES_SCALE, value - NOTES_SCALE_STEP));
  const increaseNotes = () => setNotesScale((value) => Math.min(MAX_NOTES_SCALE, value + NOTES_SCALE_STEP));

  return (
    <aside className="presenter" aria-label="Stödanteckningar och publikverktyg">
      <div className="presenter__tabs" role="tablist" aria-label="Presentatörspanel">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'tools'}
          className={activeTab === 'tools' ? 'is-active' : ''}
          onClick={() => setActiveTab('tools')}
        >
          Publikverktyg
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'notes'}
          className={activeTab === 'notes' ? 'is-active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          Stödanteckningar
        </button>
      </div>

      {activeTab === 'notes' ? (
        <div className="presenter__panel" role="tabpanel">
          <div className="presenter__panel-header">
            <span>Bild {index + 1} av {total}</span>
            <div className="presenter__text-controls" aria-label="Justera textstorlek">
              <button type="button" onClick={increaseNotes} aria-label="Öka textstorlek">
                <Plus size={16} />
              </button>
              <button type="button" onClick={decreaseNotes} aria-label="Minska textstorlek">
                <Minus size={16} />
              </button>
            </div>
          </div>

          <div className="presenter__notes" style={{ fontSize: `${notesScale}rem` }}>
            <p>{currentSlide.speakerNotes}</p>
          </div>
        </div>
      ) : (
        <div className="presenter__panel presenter__panel--tools" role="tabpanel">
          <div className="presenter__tools-section">
            <p className="eyebrow">Kortkommandon</p>
            <div className="shortcuts">
              <span>← / → byt slide</span>
              <span>M visa/dölj manusvy</span>
              <span>O översikt</span>
              <span>F fullskärm</span>
              <span>P öppna presentationsvy</span>
            </div>
          </div>

          <div className="presenter__tools-section">
            <p className="eyebrow">Presentationsvy</p>
            <p className="presenter__tools-copy">
              Öppna presentationsvyn från kontrollraden längst ner. Den synkar automatiskt med den bild du
              visar här.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
