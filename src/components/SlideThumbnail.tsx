import type { Slide } from '../types';
import { SlideView } from './SlideView';

interface SlideThumbnailProps {
  slide: Slide;
  label?: string;
  onClick?: () => void;
  size?: 'large' | 'small';
}

export function SlideThumbnail({ slide, label, onClick, size = 'small' }: SlideThumbnailProps) {
  const content = (
    <div className={`slide-thumbnail slide-thumbnail--${size}`}>
      {label && <span className="slide-thumbnail__label">{label}</span>}
      <div className="slide-thumbnail__frame">
        <SlideView slide={slide} fitToScreen />
      </div>
    </div>
  );

  if (!onClick) return content;

  return (
    <button type="button" className="slide-thumbnail__button" onClick={onClick} aria-label={label}>
      {content}
    </button>
  );
}
