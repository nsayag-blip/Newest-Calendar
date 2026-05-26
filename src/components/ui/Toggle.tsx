// src/components/ui/Toggle.tsx
import * as Switch from "@radix-ui/react-switch";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelSide?: "right" | "left";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  labelSide = "right",
  disabled = false,
  className = "",
  ariaLabel,
}: ToggleProps) {
  const labelEl = label && (
    <span
      className={`text-sm select-none transition-colors ${
        disabled
          ? "text-text-muted cursor-not-allowed"
          : "text-text-secondary cursor-pointer group-hover:text-text-primary"
      }`}
    >
      {label}
    </span>
  );

  return (
    <label
      className={`group inline-flex items-center gap-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {labelSide === "right" && labelEl}

      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel || label}
        className={`
          relative inline-flex items-center flex-shrink-0
          w-9 h-5 rounded-full
          transition-colors duration-200
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand
          ${checked ? "bg-brand" : "bg-border-strong"}
          ${disabled ? "opacity-50" : ""}
        `}
      >
        <Switch.Thumb
          className={`
            block w-4 h-4 rounded-full bg-white
            shadow-sm transition-transform duration-200
            ${checked ? "translate-x-[-1.1rem]" : "translate-x-[-0.125rem]"}
          `}
        />
      </Switch.Root>

      {labelSide === "left" && labelEl}
    </label>
  );
}

export default Toggle;
