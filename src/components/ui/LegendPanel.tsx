// src/components/ui/LegendPanel.tsx
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import {
  SHIFT_STATUS_BG,
  SHIFT_STATUS_BORDER,
  SHIFT_STATUS_LABEL,
  APPOINTMENT_STATUS_BG,
  APPOINTMENT_STATUS_LABEL,
  SHIFT_TYPE_BG,
} from "../../constants/theme";

// ── Types ─────────────────────────────────────────────────

interface LegendPanelProps {
  /** Which calendar's legend to show */
  appMode: "shift" | "appointment";
}

interface LegendRowProps {
  bg:     string;
  border: string;
  label:  string;
}

// ── Sub-components ────────────────────────────────────────

function LegendSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">
        {children}
      </div>
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
      title="מקרא צבעים"
      aria-label="פתח מקרא צבעים"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  );
}

// ── Main Component ────────────────────────────────────────

export function LegendPanel({ appMode }: LegendPanelProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <LegendTrigger />
      </PopoverTrigger>

      <PopoverContent align="end" minWidth={260}>
        <div className="p-4 flex flex-col gap-5">

          {/* Header */}
          <div>
            <p className="text-base font-bold text-[var(--color-text-primary)]">
              מקרא צבעים
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {appMode === "shift" ? "יומן משמרות" : "יומן תורים"}
            </p>
          </div>

          {/* ── Shift calendar legend ── */}
          {appMode === "shift" && (
            <LegendSection title="סטטוס משמרת">
              {(Object.keys(SHIFT_STATUS_LABEL) as Array<keyof typeof SHIFT_STATUS_LABEL>).map((status) => (
                <LegendRow
                  key={status}
                  bg={SHIFT_STATUS_BG[status]     ?? "#FFFFFF"}
                  border={SHIFT_STATUS_BORDER[status] ?? "#9E9E9E"}
                  label={SHIFT_STATUS_LABEL[status]}
                />
              ))}
            </LegendSection>
          )}

          {/* ── Appointment calendar legend ── */}
          {appMode === "appointment" && (
            <>
              <LegendSection title="סטטוס תור">
                {(Object.keys(APPOINTMENT_STATUS_LABEL) as Array<keyof typeof APPOINTMENT_STATUS_LABEL>).map((status) => (
                  <LegendRow
                    key={status}
                    bg={APPOINTMENT_STATUS_BG[status] ?? "#FFFFFF"}
                    border={APPOINTMENT_STATUS_BG[status] ?? "#9E9E9E"}
                    label={APPOINTMENT_STATUS_LABEL[status]}
                  />
                ))}
              </LegendSection>

              <LegendSection title="סוג משמרת">
                {(Object.keys(SHIFT_TYPE_BG) as Array<keyof typeof SHIFT_TYPE_BG>).map((type) => (
                  <LegendRow
                    key={type}
                    bg={SHIFT_TYPE_BG[type]}
                    border={SHIFT_TYPE_BG[type]}
                    label={type}
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
