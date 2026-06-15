// src/components/ui/LegendPanel.tsx
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import {
  SHIFT_STATUS_BG,
  SHIFT_STATUS_BORDER,
  SHIFT_STATUS_LABEL_KEY,
  APPOINTMENT_STATUS_BG,
  APPOINTMENT_STATUS_LABEL_KEY,
  SHIFT_TYPE_BG,
  SHIFT_TYPE_LABEL_KEY,
} from "../../constants/theme";
import { useLabels } from "../../hooks/useLabels";

// ── Types ─────────────────────────────────────────────────

interface LegendPanelProps {
  /** Which calendar's legend to show */
  appMode: "shift" | "appointment";
}

interface LegendRowProps {
  bg: string;
  border: string;
  label: string;
}

// ── Sub-components ────────────────────────────────────────

function LegendSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function LegendRow({ bg, border, label }: LegendRowProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Color swatch — matches the GenericBlock visual exactly */}
      <span
        className="flex-shrink-0 w-4 h-4 rounded-[3px]"
        style={{
          backgroundColor: bg,
          borderRight: `3px solid ${border}`,
          border: `1px solid ${border}`,
          borderRightWidth: "3px",
        }}
      />
      <span className="text-sm text-[var(--color-text-primary)]">{label}</span>
    </div>
  );
}

// ── Trigger Button ────────────────────────────────────────
// Extracted so it can carry its own active state styling

function LegendTrigger() {
  const labels = useLabels();
  return (
    <button
      type="button"
      className={`
        flex items-center justify-center
        w-8 h-8
        rounded-[var(--radius-sm)]
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        text-[var(--color-text-muted)]
        shadow-[var(--shadow-sm)]
        transition-colors duration-150
        hover:text-[var(--color-text-brand)]
        hover:border-[var(--color-brand-border)]
        hover:bg-[var(--color-brand-subtle)]
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-[var(--color-brand)]
      `}
      title={labels.CAL_LEGEND_TITLE}
      aria-label={labels.CAL_LEGEND_OPEN}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
}

// ── Main Component ────────────────────────────────────────

export function LegendPanel({ appMode }: LegendPanelProps) {
  const labels = useLabels();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <LegendTrigger />
      </PopoverTrigger>

      <PopoverContent align="end" minWidth={260} maxHeight={400}>
        <div
          className="p-4 flex flex-col gap-5 overflow-y-auto custom-scrollbar"
          style={{ maxHeight: 368 }}
        >
          {/* Header */}
          <div>
            <p className="text-base font-bold text-[var(--color-text-primary)]">
              {labels.CAL_LEGEND_TITLE}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {appMode === "shift" ? labels.CAL_MODE_SHIFTS : labels.CAL_MODE_APPOINTMENTS}
            </p>
          </div>

          {/* ── Shift calendar legend ── */}
          {appMode === "shift" && (
            <LegendSection title={labels.CAL_FILTER_SHIFT_STATUS}>
              {(
                Object.keys(SHIFT_STATUS_LABEL_KEY) as Array<
                  keyof typeof SHIFT_STATUS_LABEL_KEY
                >
              ).map((status) => (
                <LegendRow
                  key={status}
                  bg={SHIFT_STATUS_BG[status] ?? "#FFFFFF"}
                  border={SHIFT_STATUS_BORDER[status] ?? "#9E9E9E"}
                  label={labels[SHIFT_STATUS_LABEL_KEY[status]]}
                />
              ))}
            </LegendSection>
          )}

          {/* ── Appointment calendar legend ── */}
          {appMode === "appointment" && (
            <>
              <LegendSection title={labels.CAL_LEGEND_APPT_STATUS}>
                {(
                  Object.keys(APPOINTMENT_STATUS_LABEL_KEY) as Array<
                    keyof typeof APPOINTMENT_STATUS_LABEL_KEY
                  >
                ).map((status) => (
                  <LegendRow
                    key={status}
                    bg={APPOINTMENT_STATUS_BG[status] ?? "#FFFFFF"}
                    border={APPOINTMENT_STATUS_BG[status] ?? "#9E9E9E"}
                    label={labels[APPOINTMENT_STATUS_LABEL_KEY[status]]}
                  />
                ))}
              </LegendSection>

              <LegendSection title={labels.CAL_LEGEND_SHIFT_TYPE}>
                {(
                  Object.keys(SHIFT_TYPE_BG) as Array<
                    keyof typeof SHIFT_TYPE_BG
                  >
                ).map((type) => (
                  <LegendRow
                    key={type}
                    bg={SHIFT_TYPE_BG[type]}
                    border={SHIFT_TYPE_BG[type]}
                    label={labels[SHIFT_TYPE_LABEL_KEY[type]]}
                  />
                ))}
              </LegendSection>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LegendPanel;
