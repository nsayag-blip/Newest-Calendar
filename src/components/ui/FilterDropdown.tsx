// src/components/ui/FilterDropdown.tsx
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

// ── Types ─────────────────────────────────────────────────

export interface FilterOption {
    id: string;
    label: string;
}

interface FilterDropdownProps {
    label: string;
    options: FilterOption[];
    selectedIds: string[];
    onToggle: (id: string) => void;
    className?: string;
}

// ── Component ─────────────────────────────────────────────

export function FilterDropdown({
    label,
    options,
    selectedIds,
    onToggle,
    className = "",
}: FilterDropdownProps) {
    const hasSelection = selectedIds.length > 0;
    const countLabel = hasSelection ? ` (${selectedIds.length})` : "";

    return (
        <Popover>
            {/* ── Trigger ── */}
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={`
            inline-flex items-center gap-1.5
            h-8 px-3
            text-sm font-semibold
            bg-[var(--color-surface)]
            border rounded-[var(--radius-sm)]
            transition-colors duration-150
            focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-[var(--color-brand)]
            select-none
            ${hasSelection
                            ? "border-[var(--color-brand-border)] text-[var(--color-text-brand)] bg-[var(--color-brand-subtle)]"
                            : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-border-strong)]"
                        }
            ${className}
          `}
                >
                    <span>{label}{countLabel}</span>
                    {/* Chevron */}
                    <svg
                        className="w-3.5 h-3.5 flex-shrink-0 text-[var(--color-text-muted)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </PopoverTrigger>

            {/* ── Dropdown panel ── */}
            <PopoverContent align="start" minWidth={200}>
                <div className="py-1" role="listbox" aria-multiselectable="true">

                    {/* Header */}
                    <div className="px-3 py-2 border-b border-[var(--color-border)]">
                        <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                            {label}
                        </span>
                    </div>

                    {/* Options */}
                    {options.length === 0 && (
                        <div className="px-3 py-3 text-sm text-[var(--color-text-muted)] text-center">
                            אין אפשרויות
                        </div>
                    )}

                    {options.map((opt) => {
                        const isSelected = selectedIds.includes(opt.id);
                        return (
                            <label
                                key={opt.id}
                                role="option"
                                aria-selected={isSelected}
                                className={`
                  flex items-center gap-2.5
                  px-3 py-2
                  cursor-pointer
                  text-sm text-[var(--color-text-primary)]
                  transition-colors duration-100
                  ${isSelected
                                        ? "bg-[var(--color-brand-subtle)]"
                                        : "hover:bg-[var(--color-surface-alt)]"
                                    }
                `}
                            >
                                {/* Custom checkbox */}
                                <span
                                    className={`
                    flex-shrink-0 w-4 h-4 rounded-[3px] border
                    flex items-center justify-center
                    transition-colors duration-100
                    ${isSelected
                                            ? "bg-[var(--color-brand)] border-[var(--color-brand)]"
                                            : "bg-white border-[var(--color-border-strong)]"
                                        }
                  `}
                                >
                                    {isSelected && (
                                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </span>

                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onToggle(opt.id)}
                                    className="sr-only"
                                />

                                <span className="flex-1 leading-snug">{opt.label}</span>
                            </label>
                        );
                    })}

                    {/* Footer: clear selection */}
                    {hasSelection && (
                        <div className="px-3 py-2 border-t border-[var(--color-border)]">
                            <button
                                type="button"
                                onClick={() => selectedIds.forEach(onToggle)}
                                className="text-xs font-semibold text-[var(--color-destructive)] hover:underline"
                            >
                                נקה בחירה
                            </button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default FilterDropdown;