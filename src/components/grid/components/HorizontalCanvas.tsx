// src/components/grid/components/HorizontalCanvas.tsx
import { memo, useMemo } from "react";
import { format, parse } from "date-fns";
import { he } from "date-fns/locale";
import {
  EngineColumn,
  RangeGroup,
  EngineBlock,
  GridConfig,
} from "../../../types/engine";
import { calculatePositions } from "../engine/gridEngine";
import { useCalendarStore } from "../../../store/appStore";
import { getGridMetrics } from "../engine/gridMetrics";

import HorizontalRow from "./HorizontalRow";
import HorizontalTimeRuler from "./HorizontalTimeRuler";

interface Props {
  columns: EngineColumn[];
  groups: RangeGroup[];
  blocks: EngineBlock[];
  config: GridConfig;
}

const HorizontalCanvas = memo(({ columns, groups, blocks, config }: Props) => {
  const { timeDensity } = useCalendarStore();
  const { hourHeightPx: hourWidthPx } = getGridMetrics(timeDensity);

  // If coming from day-mode pipeline: columns are populated, groups is [].
  // Wrap into a synthetic group so the layout logic below is uniform.
  const activeGroups = useMemo(() => {
    if (groups.length > 0) return groups;
    if (columns.length === 0) return [];
    return [
      {
        id: `group_${columns[0].date}`,
        date: columns[0].date,
        label: "",
        columns,
      },
    ];
  }, [columns, groups]);

  const renderableBlocksMap = useMemo(
    () => calculatePositions(blocks, config),
    [blocks, config],
  );

  const totalHours = (config.endMinutes - config.startMinutes) / 60;
  const gridWidthPx = totalHours * hourWidthPx;

  return (
    <div className="relative w-full h-full overflow-auto bg-surface-alt custom-scrollbar">

      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-[60] flex w-min min-w-full bg-surface-alt border-b border-border shadow-sm">
        {/* Pinned corner: date col + resource col */}
        <div className="sticky start-0 z-[70] flex w-[260px] flex-shrink-0 border-e border-border bg-surface-alt">
          <div className="w-[80px] border-e border-border p-3 font-bold text-sm text-text-primary text-center">
            תאריך
          </div>
          <div className="flex-1 p-3 font-bold text-sm text-text-primary">
            עובד, חדר
          </div>
        </div>

        {/* Time ruler */}
        <div style={{ width: `${gridWidthPx}px`, minWidth: `${gridWidthPx}px` }}>
          <HorizontalTimeRuler config={config} />
        </div>
      </div>

      {/* ── DATA GROUPS ── */}
      <div className="flex flex-col w-min min-w-full">
        {activeGroups.map((group) => {
          const dateObj = parse(group.date, "yyyy-MM-dd", new Date());
          const displayDate = format(dateObj, "E dd/MM", { locale: he });

          return (
            <div
              key={group.id}
              className="flex border-b-[3px] border-border-strong w-full"
            >
              {/* Spanning date column — sticky, spans all rows of this group */}
              <div className="sticky start-0 z-[50] w-[80px] flex-shrink-0 border-e border-border bg-surface flex flex-col shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                <div className="sticky top-[40px] p-2 text-[13px] font-bold text-text-secondary text-center leading-tight">
                  {displayDate}
                </div>
              </div>

              {/* Stack of rows for this date */}
              <div className="flex-1 flex flex-col">
                {group.columns.map((col) => (
                  <HorizontalRow
                    key={col.id}
                    column={col}
                    blocks={renderableBlocksMap[col.id] || []}
                    config={config}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {activeGroups.length === 0 && (
          <div className="sticky start-0 w-full flex items-center justify-center p-10 text-text-muted font-medium">
            אין נתונים להצגה
          </div>
        )}
      </div>
    </div>
  );
});

export default HorizontalCanvas;
