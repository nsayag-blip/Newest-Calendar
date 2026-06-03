// src/components/grid/components/HorizontalRow.tsx
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
import HorizontalBlock from "./HorizontalBlock";

interface Props {
  column: EngineColumn;
  blocks: RenderableBlock<any>[];
  config: GridConfig;
}

const HorizontalRow = memo(({ column, blocks, config }: Props) => {
  const { timeDensity } = useCalendarStore();
  const {
    hourHeightPx: hourWidthPx,
    blockHeightPx: blockWidthPx,
    pixelsPerMinute,
  } = getGridMetrics(timeDensity);

  const [hoveredMinutes, setHoveredMinutes] = useState<number | null>(null);
  const [dragStartMinutes, setDragStartMinutes] = useState<number | null>(null);

  // RTL-aware: measure from the right edge of the element (start side in RTL)
  const calculateMinutesFromEvent = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetPx = rect.right - e.clientX;
      return calculateSnappedTime(
        offsetPx,
        timeDensity,
        pixelsPerMinute,
        config.startMinutes,
      );
    },
    [timeDensity, pixelsPerMinute, config.startMinutes],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const snappedMinutes = calculateMinutesFromEvent(e);
      if (snappedMinutes + timeDensity <= config.endMinutes) {
        setHoveredMinutes(snappedMinutes);
      }
    },
    [calculateMinutesFromEvent, timeDensity, config.endMinutes],
  );

  const handleMouseDown = useCallback(() => {
    if (hoveredMinutes !== null) setDragStartMinutes(hoveredMinutes);
  }, [hoveredMinutes]);

  const handleMouseUp = useCallback(() => {
    if (dragStartMinutes !== null && hoveredMinutes !== null) {
      const start = Math.min(dragStartMinutes, hoveredMinutes);
      const end = Math.max(dragStartMinutes, hoveredMinutes) + timeDensity;
      console.log("Ghost Block Drag-Created (Horizontal):", { columnId: column.id, start, end });
      setDragStartMinutes(null);
    }
  }, [dragStartMinutes, hoveredMinutes, timeDensity, column.id]);

  const handleMouseLeave = useCallback(() => {
    setHoveredMinutes(null);
    setDragStartMinutes(null);
  }, []);

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

  // Grid background — rotated 90° from GridColumn:
  // vertical stripes (repeat-x) instead of horizontal stripes (repeat-y)
  const gridBackground = useMemo((): React.CSSProperties => {
    return {
      backgroundImage: `
        linear-gradient(to left, var(--color-border-strong) 1px, transparent 1px),
        linear-gradient(to left, var(--color-border) 1px, transparent 1px)
      `,
      backgroundSize: `${hourWidthPx}px 100%, ${blockWidthPx}px 100%`,
      backgroundPosition: "top right",
      backgroundRepeat: "repeat-x",
    };
  }, [hourWidthPx, blockWidthPx]);

  const totalHours = (config.endMinutes - config.startMinutes) / 60;
  const gridWidthPx = totalHours * hourWidthPx;

  return (
    <div className="flex w-full group border-b border-border min-h-[64px]">
      {/* Pinned resource label — sticky start-[80px] accounts for the date column */}
      <div
        className="sticky start-[80px] z-[40] flex w-[180px] flex-shrink-0 items-center
                   border-e border-border bg-surface group-hover:bg-surface-alt
                   transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.02)] px-3"
      >
        <span className="text-[14px] font-bold text-text-primary leading-tight truncate">
          {column.headerLabel}
        </span>
      </div>

      {/* Timeline canvas */}
      <div
        className="relative bg-surface cursor-crosshair select-none flex-shrink-0"
        style={{
          ...gridBackground,
          width: `${gridWidthPx}px`,
          minWidth: `${gridWidthPx}px`,
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {blocks.map((block) => (
          <HorizontalBlock key={block.id} block={block} />
        ))}

        {/* Ghost block — same logic as GridColumn, axis-rotated */}
        {ghostStart !== null && ghostEnd !== null && (
          <div
            className="absolute inset-y-1 z-20 pointer-events-none border-2 border-dashed border-brand
                       bg-brand-subtle/40 flex items-center px-2 rounded transition-all duration-75"
            style={{
              insetInlineStart: `${(ghostStart - config.startMinutes) * pixelsPerMinute}px`,
              width: `${(ghostEnd - ghostStart) * pixelsPerMinute}px`,
            }}
          >
            <span className="text-[10px] font-bold text-brand bg-surface/90 px-1 rounded-sm shadow-sm whitespace-nowrap">
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

export default HorizontalRow;
