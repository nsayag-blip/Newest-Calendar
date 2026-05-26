// src/components/ui/ModeToggle.tsx
import * as RadioGroup from "@radix-ui/react-radio-group";

interface ModeOption<T extends string> {
  value: T;
  label: string;
}

interface ModeToggleProps<T extends string> {
  options: ModeOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function ModeToggle<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: ModeToggleProps<T>) {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={(val) => onChange(val as T)}
      className={`inline-flex items-center bg-surface border border-border rounded-full p-[3px] shadow-sm gap-[2px] ${className}`}
    >
      {options.map((opt) => (
        <RadioGroup.Item
          key={opt.value}
          value={opt.value}
          className={`
            relative px-4 py-1.5 text-sm font-semibold rounded-full
            transition-all duration-150 select-none whitespace-nowrap
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand
            data-[state=checked]:bg-brand data-[state=checked]:text-text-inverse data-[state=checked]:shadow-sm
            data-[state=unchecked]:bg-transparent data-[state=unchecked]:text-text-secondary data-[state=unchecked]:hover:text-text-brand data-[state=unchecked]:hover:bg-brand-subtle
          `}
        >
          {opt.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

export default ModeToggle;
