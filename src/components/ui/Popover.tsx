// src/components/ui/Popover.tsx
import * as RadixPopover from "@radix-ui/react-popover";

type PopoverAlign = "start" | "center" | "end";
type PopoverSide = "bottom" | "top" | "right" | "left";

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface PopoverContentProps {
  children: React.ReactNode;
  align?: PopoverAlign;
  side?: PopoverSide;
  sideOffset?: number;
  className?: string;
  minWidth?: number;
  maxHeight?: number; // new — lets consumers cap height for scrollable lists
}

export function Popover({ children, open, onOpenChange }: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixPopover.Root>
  );
}

export function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
  return (
    <RadixPopover.Trigger asChild={asChild}>{children}</RadixPopover.Trigger>
  );
}

export function PopoverContent({
  children,
  align = "start",
  side = "bottom",
  sideOffset = 6,
  className = "",
  minWidth,
  maxHeight,
}: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={8}  // keeps the panel 8px from viewport edges inside the SF iframe
        className={`z-[100] bg-surface border border-border rounded-lg shadow-lg outline-none ${className}`}
        style={{ minWidth, maxHeight }}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}

export default Popover;