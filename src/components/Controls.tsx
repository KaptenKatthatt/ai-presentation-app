import { ChevronLeft, ChevronRight, Maximize2, Minimize2, MonitorUp, PanelRightOpen, Presentation } from 'lucide-react';

interface ControlsProps {
  current: number;
  total: number;
  presenterMode: boolean;
  overviewMode: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onTogglePresenter: () => void;
  onToggleOverview: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onOpenPresentation: () => void;
}

export function Controls({
  current,
  total,
  presenterMode,
  overviewMode,
  onPrevious,
  onNext,
  onTogglePresenter,
  onToggleOverview,
  onToggleFullscreen,
  isFullscreen,
  onOpenPresentation,
}: ControlsProps) {
  return (
    <nav className="controls" aria-label="Presentationskontroller">
      <button onClick={onPrevious} disabled={current === 0} aria-label="Föregående slide">
        <ChevronLeft size={18} />
        Föregående
      </button>

      <button onClick={onToggleOverview} aria-pressed={overviewMode} aria-label="Visa slideöversikt">
        <MonitorUp size={18} />
        Översikt
      </button>

      <button onClick={onTogglePresenter} aria-pressed={presenterMode} aria-label="Visa manusläge">
        <PanelRightOpen size={18} />
        Manus
      </button>

      <button onClick={onOpenPresentation} aria-label="Öppna presentationsvy utan manus">
        <Presentation size={18} />
        Presentationsvy
      </button>

      <span className="controls__counter">{current + 1} / {total}</span>

      <button onClick={onToggleFullscreen} aria-label="Växla fullskärm">
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        Fullskärm
      </button>

      <button onClick={onNext} disabled={current === total - 1} aria-label="Nästa slide">
        Nästa
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
