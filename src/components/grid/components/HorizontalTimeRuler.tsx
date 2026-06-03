// src/components/grid/components/HorizontalTimeRuler.tsx
import { memo } from "react";
import { GridConfig } from "../../../types/engine";
import { useCalendarStore } from "../../../store/appStore";
import { getGridMetrics } from "../engine/gridMetrics";

interface Props {
  config: GridConfig;
}

const HorizontalTimeRuler = memo(({ config }: Props) => {
  const { timeDensity } = useCalendarStore();
  const { hourHeightPx: hourWidthPx } = getGridMetrics(timeDensity);

  const totalMinutes = config.endMinutes - config.startMinutes;
  const totalHours = totalMinutes / 60;

  const hourMarkers = Array.from({ length: totalHours }, (_, i) => {
    const currentMinutes = config.startMinutes + i * 60;
    const hour = Math.floor(currentMinutes / 60);
    return {
      id: `ruler_hour_${i}`,
      label: `${String(hour).padStart(2, "0")}:00`,
      startPx: i * hourWidthPx,
    };
  });

  return (
    <div className="relative w-full h-full min-h-[48px]">
      {hourMarkers.map(({ id, label, startPx }) => (
        <div
          key={id}
          className="absolute h-full flex items-center justify-start ps-2 border-e border-border/50"
          style={{
            insetInlineStart: `${startPx}px`,
            width: `${hourWidthPx}px`,
          }}
        >
          <span className="text-[12px] text-text-muted font-bold tabular-nums">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
});

export default HorizontalTimeRuler;
