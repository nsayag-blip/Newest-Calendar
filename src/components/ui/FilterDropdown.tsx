// src/components/ui/FilterDropdown.tsx
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { useLabels } from "../../hooks/useLabels";

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
    onClear: () => void; // explicit clear callback — avoids mutating state while iterating
    className?: string;
}

// ── Component ─────────────────────────────────────────────

export function FilterDropdown({
    label,
    options,
    selectedIds,
    onToggle,
    onClear,
    className = "",
}: FilterDropdownProps) {
    const labels = useLabels();
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
            {/* maxHeight caps the whole panel; inner list scrolls independently */}
            <PopoverContent align="start" minWidth={200} maxHeight={320}>

                {/* Sticky header — always visible while scrolling */}
                <div className="sticky top-0 z-10 px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] rounded-t-lg">
                    <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                        {label}
                    </span>
                </div>

                {/* Scrollable options list */}
                <div
                    className="overflow-y-auto custom-scrollbar"
                    style={{ maxHeight: 220 }} // leaves room for header (40px) + footer (52px)
                    role="listbox"
                    aria-multiselectable="true"
                >
                    {options.length === 0 && (
                        <div className="px-3 py-3 text-sm text-[var(--color-text-muted)] text-center">
                            {labels.CAL_FILTER_NO_OPTIONS}
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
                </div>

                {/* Sticky footer — always visible, clears all selections atomically */}
                {hasSelection && (
                    <div className="sticky bottom-0 z-10 px-3 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] rounded-b-lg">
                        <button
                            type="button"
                            onClick={onClear}
                            className="text-xs font-semibold text-[var(--color-destructive)] hover:underline"
                        >
                            {labels.CAL_FILTER_CLEAR_SELECTION}
                        </button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

export default FilterDropdown;