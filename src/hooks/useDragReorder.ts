import { useCallback, useRef, useState } from 'react';

interface DragReorderHandlers {
  draggable: boolean;
  onDragStart: (event: React.DragEvent) => void;
  onDragEnd: () => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}

export function useDragReorder(onReorder: (fromIndex: number, toIndex: number) => void) {
  const dragIndexRef = useRef<number | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getDragProps = useCallback(
    (index: number): DragReorderHandlers => ({
      draggable: true,
      onDragStart: (event) => {
        dragIndexRef.current = index;
        setIsDragging(true);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(index));
      },
      onDragEnd: () => {
        dragIndexRef.current = null;
        setDropTarget(null);
        setIsDragging(false);
      },
      onDragOver: (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setDropTarget(index);
      },
      onDrop: (event) => {
        event.preventDefault();
        const from = dragIndexRef.current;
        if (from !== null && from !== index) {
          onReorder(from, index);
        }
        dragIndexRef.current = null;
        setDropTarget(null);
        setIsDragging(false);
      },
    }),
    [onReorder],
  );

  return { getDragProps, dropTarget, isDragging };
}
