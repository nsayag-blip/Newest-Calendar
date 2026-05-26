// src/components/ui/IconButton.tsx
import { forwardRef } from "react";

type IconButtonVariant = "base" | "brand" | "outline" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
}

const VARIANT_CLASSES: Record<IconButtonVariant, string> = {
    base: "text-text-secondary hover:bg-surface-alt hover:text-text-primary",
    brand: "text-brand hover:bg-brand-subtle",
    outline: "border border-border text-text-secondary hover:text-brand hover:border-brand-border",
    ghost: "text-text-secondary hover:text-brand",
};

const SIZE_CLASSES: Record<IconButtonSize, string> = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, variant = "base", size = "md", className = "", ...rest }, ref) => {
        return (
            <button
                ref={ref}
                className={`flex items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
                {...rest}
            >
                {icon}
            </button>
        );
    }
);

IconButton.displayName = "IconButton";
export default IconButton;