// src/components/ui/DensityControl.tsx

// ── Types ─────────────────────────────────────────────────

interface DensityControlProps<T extends number> {
  /** Icon displayed on the left of the control */
  icon:      React.ReactNode;
  /** Unit label shown after the value e.g. "דק׳" or "חדרים" */
  unit:      string;
  /** All valid steps */
  options:   readonly T[];
  value:     T;
  onChange:  (value: T) => void;
  className?: string;
}

// ── Component ─────────────────────────────────────────────
// Generic over T (a numeric union) so TypeScript enforces
// that only valid steps can be passed — same pattern as ModeToggle.
//
// Why not a plain <select>?
// The Figma shows an icon + number + unit label — a select renders
// as a native OS widget that ignores all that styling.
// This component gives us full visual control while keeping
// accessibility (keyboard nav, aria attributes) correct.

export function DensityControl<T extends number>({
  icon,
  unit,
  options,
  value,
  onChange,
  className = "",
}: DensityControlProps<T>) {
  const currentIndex = options.indexOf(value);

  const stepDown = () => {
    if (currentIndex > 0) onChange(options[currentIndex - 1]);
  };

  const stepUp = () => {
    if (currentIndex < options.length - 1) onChange(options[currentIndex + 1]);
  };

  const isMin = currentIndex === 0;
  const isMax = currentIndex === options.length - 1;

  return (
    <div
      className={`
        inline-flex items-center gap-1.5
        h-8 px-2.5
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-[var(--radius-sm)]
        shadow-[var(--shadow-sm)]
        ${className}
      `}
    >
      {/* Icon */}
      <span className="flex-shrink-0 text-[var(--color-text-muted)] flex items-center">
        {icon}
      </span>

      {/* Step down (−) */}
      <StepButton onClick={stepDown} disabled={isMin} label="הפחת" dir="down" />

      {/* Value + unit label */}
      <div
        className="flex items-baseline gap-1 min-w-[3.5rem] justify-center select-none"
        aria-live="polite"
        aria-label={`${value} ${unit}`}
      >
        <span className="text-sm font-bold text-[var(--color-text-primary)] tabular-nums">
          {value}
        </span>
        <span className="text-xs text-[var(--color-text-muted)] font-medium">
          {unit}
        </span>
      </div>

      {/* Step up (+) */}
      <StepButton onClick={stepUp} disabled={isMax} label="הוסף" dir="up" />
    </div>
  );
}

// ── Step Button ───────────────────────────────────────────
// Extracted so the parent doesn't repeat the button boilerplate twice.

interface StepButtonProps {
  onClick:  () => void;
  disabled: boolean;
  label:    string;
  dir:      "up" | "down";
}

function StepButton({ onClick, disabled, label, dir }: StepButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        flex items-center justify-center
        w-5 h-5 rounded-[var(--radius-sm)]
        text-[var(--color-text-secondary)]
        transition-colors duration-100
        focus-visible:outline-2 focus-visible:outline-offset-1
        focus-visible:outline-[var(--color-brand)]
        ${disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-[var(--color-brand-subtle)] hover:text-[var(--color-text-brand)] cursor-pointer"
        }
      `}
    >
      {dir === "down" ? <MinusIcon /> : <PlusIcon />}
    </button>
  );
}

// ── Inline icons ──────────────────────────────────────────

function PlusIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  );
}

export default DensityControl;
