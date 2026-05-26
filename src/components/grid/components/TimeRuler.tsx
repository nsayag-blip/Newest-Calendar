// src/components/views/shared/TimeRuler.tsx
import { memo } from "react";
import { GridConfig } from "../../../types/engine";
import { useCalendarStore } from "../../../store/appStore";
import { getGridMetrics } from "../engine/gridMetrics";

interface Props {
  config: GridConfig;
}

const TimeRuler = memo(({ config }: Props) => {
  const { timeDensity } = useCalendarStore();
  const { hourHeightPx } = getGridMetrics(timeDensity);

  const totalMinutes = config.endMinutes - config.startMinutes;
  const totalHours = totalMinutes / 60;
  const gridHeightPx = totalHours * hourHeightPx;

  const hourMarkers = Array.from({ length: totalHours }, (_, i) => {
    const currentMinutes = config.startMinutes + i * 60;
    const hour = Math.floor(currentMinutes / 60);
    return {
      id: `ruler_hour_${i}`,
      label: `${String(hour).padStart(2, "0")}:00`,
      topPx: i * hourHeightPx, // 👈 Now completely dynamic!
    };
  });

  return (
    <div className="relative w-full" style={{ height: `${gridHeightPx}px` }}>
      {hourMarkers.map(({ id, label, topPx }) => (
        <div
          key={id}
          className="absolute w-full flex items-center justify-end pe-4"
          style={{
            top: `${topPx}px`,
            transform: "translateY(-50%)",
          }}
        >
          <span className="text-[12px] text-text-muted font-bold tabular-nums leading-none">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
});

export default TimeRuler;
