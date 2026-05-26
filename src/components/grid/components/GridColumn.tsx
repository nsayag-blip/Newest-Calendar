// src/components/views/shared/GridColumn.tsx
import { memo, useMemo, useState, useCallback } from "react";
import {
  EngineColumn,
  RenderableBlock,
  GridConfig,
} from "../../../types/engine";
import { useCalendarStore } from "../../../store/appStore";
import {
  getGridMetrics,
  calculateSnappedTime,
  formatMinutesToTime,
} from "../engine/gridMetrics";
import GridBlock from "./GridBlock";

interface Props {
  column: EngineColumn;
  blocks: RenderableBlock<any>[];
  config: GridConfig;
}

const GridColumn = memo(({ column, blocks, config }: Props) => {
  const { timeDensity, appMode } = useCalendarStore();
  const { hourHeightPx, blockHeightPx, pixelsPerMinute } =
    getGridMetrics(timeDensity);

  // ── Interaction State ──
  const [hoveredMinutes, setHoveredMinutes] = useState<number | null>(null);
  const [dragStartMinutes, setDragStartMinutes] = useState<number | null>(null);

  // ── Event Handlers ──
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const offsetY = e.nativeEvent.offsetY;
      const snappedMinutes = calculateSnappedTime(
        offsetY,
        timeDensity,
        pixelsPerMinute,
        config.startMinutes,
      );

      if (snappedMinutes + timeDensity <= config.endMinutes) {
        setHoveredMinutes(snappedMinutes);
      }
    },
    [timeDensity, pixelsPerMinute, config.startMinutes, config.endMinutes],
  );

  const handleMouseDown = useCallback(() => {
    if (hoveredMinutes !== null) {
      setDragStartMinutes(hoveredMinutes);
    }
  }, [hoveredMinutes]);

  const handleMouseUp = useCallback(() => {
    // If they were dragging (or just clicked), we fire the payload!
    if (dragStartMinutes !== null && hoveredMinutes !== null) {
      // Math: Safely handle if they dragged UP instead of DOWN
      const start = Math.min(dragStartMinutes, hoveredMinutes);
      const end = Math.max(dragStartMinutes, hoveredMinutes) + timeDensity;

      const draftPayload = {
        columnId: column.id,
        columnName: column.headerLabel,
        startMinutes: start,
        endMinutes: end,
        type: appMode,
      };

      console.log(" Ghost Block Drag-Created:", draftPayload);
      // alert(
      //   `יצירת ${appMode === "shift" ? "משמרת" : "תור"} חדש\nחדר: ${draftPayload.columnName}\nהתחלה: ${formatMinutesToTime(start)}\nסיום: ${formatMinutesToTime(end)}`,
      // );

      // Reset the drag state after releasing
      setDragStartMinutes(null);
    }
  }, [
    dragStartMinutes,
    hoveredMinutes,
    timeDensity,
    column.id,
    column.headerLabel,
    appMode,
  ]);

  const handleMouseLeave = useCallback(() => {
    // Cancel everything if they drag out of bounds
    setHoveredMinutes(null);
    setDragStartMinutes(null);
  }, []);

  // ── Dynamic Ghost Math ──
  // Calculate exactly where the phantom block should render based on state
  const ghostStart =
    dragStartMinutes !== null && hoveredMinutes !== null
      ? Math.min(dragStartMinutes, hoveredMinutes)
      : hoveredMinutes;

  const ghostEnd =
    dragStartMinutes !== null && hoveredMinutes !== null
      ? Math.max(dragStartMinutes, hoveredMinutes) + timeDensity
      : hoveredMinutes !== null
        ? hoveredMinutes + timeDensity
        : null;

  // ── Background Grid CSS ──
  const gridBackground = useMemo((): React.CSSProperties => {
    return {
      backgroundImage: `
        linear-gradient(to bottom, var(--color-border-strong) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
      `,
      backgroundSize: `100% ${hourHeightPx}px, 100% ${blockHeightPx}px`,
      backgroundPosition: `0 0, 0 0`,
      backgroundRepeat: "repeat-y",
      minHeight: `${((config.endMinutes - config.startMinutes) / 60) * hourHeightPx}px`,
    };
  }, [hourHeightPx, blockHeightPx, config.endMinutes, config.startMinutes]);

  return (
    <div className="flex flex-col w-full flex-1 relative">
      {/* STICKY HEADER */}
      <div
        className={`sticky top-0 z-30 h-10 border-b border-border flex items-center justify-center shadow-sm ${
          column.isHighlight ? "bg-status-active-bg" : "bg-surface-alt"
        }`}
      >
        <span className="text-sm font-bold text-text-primary truncate px-4">
          {column.headerLabel}
        </span>
      </div>

      {/* GRID CANVAS */}
      <div
        className="relative flex-1 bg-surface overflow-hidden cursor-crosshair select-none"
        style={gridBackground}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {blocks.map((block) => (
          <GridBlock key={block.id} block={block} />
        ))}

        {/* THE GHOST BLOCK */}
        {ghostStart !== null && ghostEnd !== null && (
          <div
            className="absolute inset-x-0 z-20 pointer-events-none border-2 border-dashed border-brand bg-brand-subtle/40 flex items-start p-1 transition-all duration-75"
            style={{
              top: `${(ghostStart - config.startMinutes) * pixelsPerMinute}px`,
              height: `${(ghostEnd - ghostStart) * pixelsPerMinute}px`,
            }}
          >
            <span className="text-[10px] font-bold text-brand bg-surface/90 px-1 rounded-sm shadow-sm">
              {dragStartMinutes !== null
                ? `${formatMinutesToTime(ghostStart)} - ${formatMinutesToTime(ghostEnd)}`
                : formatMinutesToTime(ghostStart)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default GridColumn;
