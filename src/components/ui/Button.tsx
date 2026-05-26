// src/components/ui/Button.tsx
import { forwardRef } from "react";

// ── Types ─────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Renders a leading icon (e.g. a + SVG). Receives className from Button. */
    icon?: React.ReactNode;
    /** Shows a loading spinner and disables interaction */
    loading?: boolean;
    /** Forces a square aspect ratio — for icon-only buttons */
    iconOnly?: boolean;
}

// ── Style Maps ────────────────────────────────────────────

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: [
        "bg-[var(--color-brand)] text-[var(--color-text-inverse)]",
        "border border-[var(--color-brand)]",
        "hover:bg-[var(--color-brand-hover)] hover:border-[var(--color-brand-hover)]",
        "active:bg-[var(--color-brand-active)]",
        "disabled:bg-[var(--color-border)] disabled:border-[var(--color-border)] disabled:text-[var(--color-text-muted)]",
    ].join(" "),

    secondary: [
        "bg-[var(--color-surface)] text-[var(--color-text-brand)]",
        "border border-[var(--color-border)]",
        "hover:bg-[var(--color-brand-subtle)] hover:border-[var(--color-brand-border)]",
        "active:bg-[var(--color-brand-subtle)]",
        "disabled:text-[var(--color-text-muted)] disabled:border-[var(--color-border)]",
    ].join(" "),

    ghost: [
        "bg-transparent text-[var(--color-text-secondary)]",
        "border border-transparent",
        "hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text-primary)]",
        "active:bg-[var(--color-border)]",
        "disabled:text-[var(--color-text-muted)]",
    ].join(" "),

    destructive: [
        "bg-[var(--color-destructive)] text-[var(--color-text-inverse)]",
        "border border-[var(--color-destructive)]",
        "hover:bg-[var(--color-destructive-hover)] hover:border-[var(--color-destructive-hover)]",
        "disabled:bg-[var(--color-border)] disabled:border-[var(--color-border)] disabled:text-[var(--color-text-muted)]",
    ].join(" "),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
    sm: "h-7  px-3    text-xs  gap-1.5",
    md: "h-8  px-4    text-sm  gap-2",
    lg: "h-10 px-5    text-base gap-2",
};

const ICON_ONLY_SIZE: Record<ButtonSize, string> = {
    sm: "h-7  w-7  p-0",
    md: "h-8  w-8  p-0",
    lg: "h-10 w-10 p-0",
};

// ── Component ─────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "secondary",
            size = "md",
            icon,
            loading = false,
            iconOnly = false,
            disabled,
            children,
            className = "",
            ...rest
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        const base = [
            "inline-flex items-center justify-center",
            "font-semibold rounded-[var(--radius-sm)]",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]",
            "disabled:cursor-not-allowed",
            "select-none",
        ].join(" ");

        const sizeClass = iconOnly ? ICON_ONLY_SIZE[size] : SIZE_CLASSES[size];

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={`${base} ${VARIANT_CLASSES[variant]} ${sizeClass} ${className}`}
                {...rest}
            >
                {loading ? (
                    <Spinner size={size} />
                ) : (
                    <>
                        {icon && (
                            <span className="flex-shrink-0 flex items-center justify-center">
                                {icon}
                            </span>
                        )}
                        {!iconOnly && children}
                    </>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

// ── Inline Spinner (avoids a separate import) ─────────────

const SPINNER_SIZE = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

function Spinner({ size }: { size: ButtonSize }) {
    return (
        <svg
            className={`${SPINNER_SIZE[size]} animate-spin`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
}

export default Button;