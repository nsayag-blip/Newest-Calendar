// // src/components/views/RangeView/RangeCanvas.tsx
// import { memo, useMemo } from "react";
// import { RangeGroup, EngineBlock, GridConfig } from "../../../types/engine";
// import { calculatePositions } from "../../../utils/gridEngine";
// import { useCalendarStore } from "../../../store/appStore";

// // UI Components shifted to their new modular homes
// import GridColumn from "../shared/GridColumn";
// import TimeRuler from "../shared/TimeRuler";
// import CurrentTimeIndicator from "../shared/CurrentTimeIndicator";

// interface Props {
//   groups: RangeGroup[];
//   blocks: EngineBlock<any>[];
//   config: GridConfig;
// }

// const HOUR_HEIGHT_PX = 64;

// const RangeCanvas = memo(({ groups, blocks, config }: Props) => {
//   const { columnDensity } = useCalendarStore();

//   // 1. Math layer remains identical! We pass the flat blocks directly to your engine.
//   const renderableBlocksMap = useMemo(() => {
//     return calculatePositions(blocks, config);
//   }, [blocks, config]);

//   // Calculate strict pixel width based on user density settings
//   const columnWidth = `calc((100vw - 80px) / ${columnDensity})`;

//   // Calculate exact grid height so the time column matches the grid columns pixel-perfectly
//   const totalHours = (config.endMinutes - config.startMinutes) / 60;
//   const gridHeightPx = totalHours * HOUR_HEIGHT_PX;

//   return (
//     <div
//       className="relative w-full h-full overflow-auto bg-gray-100 flex custom-scrollbar"
//     >
//       {/* THE TIME COLUMN */}
//       <div className="sticky right-0 z-40 w-[60px] sm:w-[80px] flex-shrink-0">
//         {/* Inner wrapper: handles background + explicit height matching the double-header */}
//         <div
//           className="bg-white border-l border-gray-300 shadow-[-4px_0_12px_rgba(0,0,0,0.05)]"
//           style={{ minHeight: `${gridHeightPx + 64}px` }}
//         >
//           {/* We make the corner block h-16 (64px) to account for the double header (24px + 40px) */}
//           <div className="h-16 bg-gray-50 border-b border-gray-200 sticky top-0 z-50"></div>
//           <div className="relative w-full">
//             <CurrentTimeIndicator config={config} />
//             <TimeRuler config={config} />
//           </div>
//         </div>
//       </div>

//       {/* THE COLUMNS TRAY */}
//       <div className="flex flex-grow min-w-max">
//         {groups.map((group, groupIndex) => (
//           // THE DAY WRAPPER (Notice the Red separator line on the right for index > 0!)
//           <div
//             key={group.id}
//             className={`flex flex-col ${groupIndex > 0 ? "border-r-2 border-red-500" : ""}`}
//           >
//             {/* The Super Header (Spans across all sub-columns in this day) */}
//             <div className="sticky top-0 z-40 h-6 w-full bg-gray-100 border-b border-gray-200 flex items-center justify-center shadow-sm">
//               <span className="text-xs font-bold text-gray-700 tracking-wide">
//                 {group.label}
//               </span>
//             </div>

//             {/* The Sub-Columns */}
//             <div className="flex flex-1">
//               {group.columns.map((col) => {
//                 const columnBlocks = renderableBlocksMap[col.id] || [];
//                 return (
//                   // Force exact column density width here!
//                   <div
//                     key={col.id}
//                     style={{
//                       width: columnWidth,
//                       minWidth: columnWidth,
//                       maxWidth: columnWidth,
//                     }}
//                   >
//                     <GridColumn
//                       column={col}
//                       blocks={columnBlocks}
//                       config={config}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}

//         {groups.length === 0 && (
//           <div className="flex-1 flex items-center justify-center text-gray-400">
//             אין נתונים להצגה
//           </div>
//         )}
//       </div>
//     </div>
//   );
// });

// export default RangeCanvas;

// src/components/views/RangeView/RangeCanvas.tsx
import { memo, useMemo } from "react";
import { RangeGroup, EngineBlock, GridConfig } from "../../../types/engine";
import { calculatePositions } from "../engine/gridEngine";
import { useCalendarStore } from "../../../store/appStore";
import { getGridMetrics } from "../engine/gridMetrics";

import GridColumn from "./GridColumn";
import TimeRuler from "./TimeRuler";
import CurrentTimeIndicator from "../../views/shared/CurrentTimeIndicator";

interface Props {
  groups: RangeGroup[];
  blocks: EngineBlock<any>[];
  config: GridConfig;
}

const RangeCanvas = memo(({ groups, blocks, config }: Props) => {
  // 1. Pull BOTH densities from the store
  const { columnDensity, timeDensity } = useCalendarStore();

  // 2. Physical Math: Get dynamic pixel heights based on user selection
  const { hourHeightPx } = getGridMetrics(timeDensity);

  const renderableBlocksMap = useMemo(() => {
    return calculatePositions(blocks, config);
  }, [blocks, config]);

  const columnWidth = `calc((100vw - 80px) / ${columnDensity})`;

  // STRICT MATH: Calculate exact grid height dynamically based on time density
  const totalHours = (config.endMinutes - config.startMinutes) / 60;
  const gridHeightPx = totalHours * hourHeightPx;

  return (
    <div className="relative w-full h-full overflow-auto bg-surface-alt flex custom-scrollbar">
      {/* ── THE TIME COLUMN ── */}
      <div className="sticky start-0 z-40 w-[60px] sm:w-[80px] flex-shrink-0">
        <div
          className="bg-surface border-e border-border shadow-[var(--shadow-sm)]"
          // In Range view, the super-header is 24px and the sub-header is 40px = 64px total
          style={{ minHeight: `${gridHeightPx + 64}px` }}
        >
          <div className="h-16 bg-surface-alt border-b border-border sticky top-0 z-50"></div>
          <div className="relative w-full">
            {/* <CurrentTimeIndicator config={config} /> */}
            <TimeRuler config={config} />
          </div>
        </div>
      </div>

      {/* ── THE COLUMNS TRAY ── */}
      <div className="flex flex-grow min-w-max">
        {groups.map((group, groupIndex) => (
          // ── FIX: Added exact minHeight and swapped border-r-2 for border-s-2 ──
          <div
            key={group.id}
            className={`flex flex-col ${
              groupIndex > 0 ? "border-s-2 border-destructive" : ""
            }`}
            style={{ minHeight: `${gridHeightPx + 64}px` }}
          >
            {/* The Super Header (Spans across all sub-columns in this day) */}
            <div className="sticky top-0 z-40 h-6 w-full bg-surface-alt border-b border-border flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-text-primary tracking-wide">
                {group.label}
              </span>
            </div>

            {/* The Sub-Columns */}
            <div className="flex flex-1">
              {group.columns.map((col) => {
                const columnBlocks = renderableBlocksMap[col.id] || [];
                return (
                  <div
                    key={col.id}
                    className="border-e border-border"
                    style={{
                      width: columnWidth,
                      minWidth: columnWidth,
                      maxWidth: columnWidth,
                      minHeight: `${gridHeightPx + 40}px`,
                    }}
                  >
                    <GridColumn
                      column={col}
                      blocks={columnBlocks}
                      config={config}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-text-muted font-medium">
            אין נתונים להצגה
          </div>
        )}
      </div>
    </div>
  );
});

export default RangeCanvas;
