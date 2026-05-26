// src/components/ui/Badge.tsx

// ── Types ─────────────────────────────────────────────────

type BadgeColor =
    | "brand"       // blue  — generic / default
    | "staff"       // purple — resource filter pills
    | "treatment"   // teal  — work type filter pills
    | "status"      // amber — shift status filter pills
    | "success"     // green — active appointment
    | "warning"     // yellow — active shift
    | "danger"      // red   — cancelled
    | "neutral";    // gray  — default/fallback

type BadgeVariant =
    | "pill"        // filter pill with optional remove button (used in FilterTray)
    | "count";      // small number bubble (used for standby badge on columns)

interface BadgeProps {
    color?: BadgeColor;
    variant?: BadgeVariant;
    /** Text label — the pill text or count number */
    children: React.ReactNode;
    /** Only for variant="pill" — renders an × button */
    onRemove?: () => void;
    /** Extra classes */
    className?: string;
}

// ── Style Maps ────────────────────────────────────────────

const COLOR_CLASSES: Record<BadgeColor, string> = {
    brand: "bg-[var(--color-brand-subtle)]     text-[var(--color-brand)]          border-[var(--color-brand-border)]",
    staff: "bg-purple-50                        text-purple-700                    border-purple-200",
    treatment: "bg-teal-50                          text-teal-700                      border-teal-200",
    status: "bg-amber-50                         text-amber-700                     border-amber-200",
    success: "bg-[var(--color-success-subtle)]    text-[var(--color-success)]        border-green-200",
    warning: "bg-yellow-50                        text-yellow-700                    border-yellow-200",
    danger: "bg-[var(--color-destructive-subtle)] text-[var(--color-destructive)]   border-red-200",
    neutral: "bg-[var(--color-surface-alt)]       text-[var(--color-text-secondary)] border-[var(--color-border)]",
};

// Hover color for the × button — must match the badge background
const REMOVE_HOVER: Record<BadgeColor, string> = {
    brand: "hover:bg-[var(--color-brand-border)]",
    staff: "hover:bg-purple-200",
    treatment: "hover:bg-teal-200",
    status: "hover:bg-amber-200",
    success: "hover:bg-green-200",
    warning: "hover:bg-yellow-200",
    danger: "hover:bg-red-200",
    neutral: "hover:bg-[var(--color-border)]",
};

// Count bubble has a solid fill instead of a tinted border
const COUNT_COLOR_CLASSES: Record<BadgeColor, string> = {
    brand: "bg-[var(--color-brand)]       text-white",
    staff: "bg-purple-600                  text-white",
    treatment: "bg-teal-600                    text-white",
    status: "bg-amber-500                   text-white",
    success: "bg-[var(--color-success)]      text-white",
    warning: "bg-yellow-500                  text-white",
    danger: "bg-[var(--color-destructive)]  text-white",
    neutral: "bg-[var(--color-text-muted)]   text-white",
};

// ── Component ─────────────────────────────────────────────

export function Badge({
    color = "neutral",
    variant = "pill",
    children,
    onRemove,
    className = "",
}: BadgeProps) {
    if (variant === "count") {
        return (
            <span
                className={`
          inline-flex items-center justify-center
          min-w-[1.25rem] h-5 px-1.5
          text-[11px] font-bold leading-none
          rounded-[var(--radius-full)]
          ${COUNT_COLOR_CLASSES[color]}
          ${className}
        `}
            >
                {children}
            </span>
        );
    }

    // variant === "pill"
    return (
        <span
            className={`
        inline-flex items-center gap-1.5
        px-2.5 py-[3px]
        text-xs font-semibold
        border rounded-[var(--radius-full)]
        shadow-[var(--shadow-sm)]
        ${COLOR_CLASSES[color]}
        ${className}
      `}
        >
            {children}

            {onRemove && (
                <button
                    onClick={onRemove}
                    aria-label="הסר פילטר"
                    className={`
            flex items-center justify-center
            w-3.5 h-3.5 rounded-full
            transition-colors duration-100
            focus:outline-none focus-visible:ring-1 focus-visible:ring-current
            ${REMOVE_HOVER[color]}
          `}
                >
                    {/* × icon */}
                    <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </span>
    );
}

export default Badge;