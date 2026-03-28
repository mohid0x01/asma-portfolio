import { useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";

interface DragSortListProps<T extends { id: string }> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function DragSortList<T extends { id: string }>({ items, onReorder, renderItem, className = "" }: DragSortListProps<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    dragItem.current = index;
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setOverIndex(index);
  }, []);

  const handleDrop = useCallback((index: number) => {
    if (dragItem.current === null || dragItem.current === index) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const reordered = [...items];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(index, 0, moved);
    onReorder(reordered);
    dragItem.current = null;
    setDragIndex(null);
    setOverIndex(null);
  }, [items, onReorder]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
    dragItem.current = null;
  }, []);

  return (
    <div className={className}>
      {items.map((item, i) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-2 transition-all ${dragIndex === i ? "opacity-40" : ""} ${overIndex === i ? "border-t-2 border-primary" : ""}`}
        >
          <div className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground shrink-0">
            <GripVertical size={16} />
          </div>
          <div className="flex-1 min-w-0">{renderItem(item, i)}</div>
        </div>
      ))}
    </div>
  );
}

export default DragSortList;
