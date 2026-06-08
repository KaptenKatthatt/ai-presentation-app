import { useEffect, useRef, type ReactNode } from 'react';

const DESIGN_WIDTH = 1000;
const VIEWPORT_PADDING = 40;

interface FitToScreenProps {
  children: ReactNode;
  className?: string;
  contentKey: string;
}

export function FitToScreen({ children, className, contentKey }: FitToScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const fit = () => {
      const containerRect = container.getBoundingClientRect();
      const availableWidth = Math.max(containerRect.width - VIEWPORT_PADDING * 2, 0);
      const availableHeight = Math.max(containerRect.height - VIEWPORT_PADDING * 2, 0);
      if (!availableWidth || !availableHeight) return;

      inner.style.width = `${DESIGN_WIDTH}px`;
      inner.style.transform = 'translate(-50%, -50%) scale(1)';

      const contentWidth = inner.scrollWidth;
      const contentHeight = inner.scrollHeight;
      if (!contentWidth || !contentHeight) return;

      let scale = Math.min(availableWidth / contentWidth, availableHeight / contentHeight, 1);
      inner.style.transform = `translate(-50%, -50%) scale(${scale})`;

      for (let attempt = 0; attempt < 8; attempt += 1) {
        const innerRect = inner.getBoundingClientRect();
        if (!innerRect.width || !innerRect.height) break;

        const widthOverflow = innerRect.width / containerRect.width;
        const heightOverflow = innerRect.height / containerRect.height;
        const overflow = Math.max(widthOverflow, heightOverflow);

        if (overflow <= 0.995) break;

        scale *= 0.995 / overflow;
        inner.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    };

    const scheduleFit = () => {
      fit();
      requestAnimationFrame(fit);
    };

    scheduleFit();
    const delays = [0, 50, 150, 400, 800].map((ms) => window.setTimeout(scheduleFit, ms));

    const observer = new ResizeObserver(scheduleFit);
    observer.observe(container);
    observer.observe(inner);

    const images = inner.querySelectorAll('img');
    const imageCleanups = Array.from(images).map((image) => {
      const onImageReady = () => scheduleFit();
      image.addEventListener('load', onImageReady);
      image.addEventListener('error', onImageReady);
      if (image.complete) onImageReady();
      return () => {
        image.removeEventListener('load', onImageReady);
        image.removeEventListener('error', onImageReady);
      };
    });

    window.addEventListener('resize', scheduleFit);
    document.addEventListener('fullscreenchange', scheduleFit);
    void document.fonts.ready.then(scheduleFit);

    return () => {
      delays.forEach((id) => window.clearTimeout(id));
      imageCleanups.forEach((cleanup) => cleanup());
      observer.disconnect();
      window.removeEventListener('resize', scheduleFit);
      document.removeEventListener('fullscreenchange', scheduleFit);
    };
  }, [contentKey]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={innerRef} className="fit-to-screen__inner">
        {children}
      </div>
    </div>
  );
}
