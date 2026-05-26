// src/components/views/DayView/DayCanvas.tsx
import { memo, useMemo } from "react";
import { EngineColumn, EngineBlock, GridConfig } from "../../../types/engine";
import { calculatePositions } from "../engine/gridEngine";
import { useCalendarStore } from "../../../store/appStore";
import { getGridMetrics } from "../engine/gridMetrics";

import GridColumn from "./GridColumn";
import TimeRuler from "./TimeRuler";
import CurrentTimeIndicator from "../../views/shared/CurrentTimeIndicator";

interface Props {
  columns: EngineColumn[];
  blocks: EngineBlock[];
  config: GridConfig;
}

const DayCanvas = memo(({ columns, blocks, config }: Props) => {
  // 1. Pull BOTH densities from the store
  const { columnDensity, timeDensity } = useCalendarStore();

  // 2. Physical Math: Get dynamic pixel heights based on user selection
  const { hourHeightPx } = getGridMetrics(timeDensity);

  // 3. Relative Math: Calculate overlapping clusters and percentages
  const renderableBlocksMap = useMemo(() => {
    return calculatePositions(blocks, config);
  }, [blocks, config]);

  // STRICT MATH: Calculate the exact width each column MUST be based on room density (e.g. 7)
  const columnWidth = `calc((100vw - 80px) / ${columnDensity})`;

  // STRICT MATH: Calculate exact grid height dynamically based on time density (e.g. 15min vs 60min)
  const totalHours = (config.endMinutes - config.startMinutes) / 60;
  const gridHeightPx = totalHours * hourHeightPx;

  return (
    <div className="relative w-full h-full overflow-auto bg-surface-alt flex custom-scrollbar">
      {/* ── THE TIME COLUMN ── */}
      {/* In RTL, the time column is on the right side. Using `start-0` locks it natively. */}
      <div className="sticky start-0 z-40 w-[60px] sm:w-[80px] flex-shrink-0">
        {/* Inner wrapper: handles background + explicit height */}
        <div
          className="bg-surface border-e border-border shadow-[var(--shadow-sm)]"
          style={{ minHeight: `${gridHeightPx + 40}px` }}
        >
          {/* Blank corner block that matches the column headers */}
          <div className="sticky top-0 z-50 h-10 bg-surface-alt border-b border-border"></div>

          <div className="relative w-full">
            {/* <CurrentTimeIndicator config={config} /> */}
            <TimeRuler config={config} />
          </div>
        </div>
      </div>

      {/* ── THE COLUMNS TRAY ── */}
      <div className="flex min-w-max">
        {columns.map((col) => {
          const columnBlocks = renderableBlocksMap[col.id] || [];
          return (
            // ── FIX: Swapped to border-e (logical) and forced exact minHeight ──
            <div
              key={col.id}
              className="flex flex-col border-e border-border"
              style={{
                width: columnWidth,
                minWidth: columnWidth,
                maxWidth: columnWidth,
                // Force the wrapper to match the exact physical height of the Time Ruler (Grid + 40px Header)
                minHeight: `${gridHeightPx + 40}px`,
              }}
            >
              <GridColumn column={col} blocks={columnBlocks} config={config} />
            </div>
          );
        })}

        {columns.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-text-muted font-medium">
            אין עמודות להצגה
          </div>
        )}
      </div>
    </div>
  );
});

export default DayCanvas;
