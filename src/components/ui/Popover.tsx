// // src/components/ui/Popover.tsx
// import * as RadixPopover from "@radix-ui/react-popover";

// type PopoverAlign = "start" | "center" | "end";
// type PopoverSide = "bottom" | "top" | "right" | "left";

// interface PopoverProps {
//   children: React.ReactNode;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
// }

// interface PopoverTriggerProps {
//   children: React.ReactNode;
//   asChild?: boolean;
// }

// interface PopoverContentProps {
//   children: React.ReactNode;
//   align?: PopoverAlign;
//   side?: PopoverSide;
//   sideOffset?: number;
//   className?: string;
//   minWidth?: number;
//   maxHeight?: number; // new — lets consumers cap height for scrollable lists
// }

// export function Popover({ children, open, onOpenChange }: PopoverProps) {
//   return (
//     <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
//       {children}
//     </RadixPopover.Root>
//   );
// }

// export function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
//   return (
//     <RadixPopover.Trigger asChild={asChild}>{children}</RadixPopover.Trigger>
//   );
// }

// export function PopoverContent({
//   children,
//   align = "start",
//   side = "bottom",
//   sideOffset = 6,
//   className = "",
//   minWidth,
//   maxHeight,
// }: PopoverContentProps) {
//   return (
//     <RadixPopover.Portal>
//       <RadixPopover.Content
//         align={align}
//         side={side}
//         sideOffset={sideOffset}
//         collisionPadding={8}  // keeps the panel 8px from viewport edges inside the SF iframe
//         className={`z-[100] bg-surface border border-border rounded-lg shadow-lg outline-none ${className}`}
//         style={{ minWidth, maxHeight }}
//       >
//         {children}
//       </RadixPopover.Content>
//     </RadixPopover.Portal>
//   );
// }

// export default Popover;



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
  maxHeight?: number;
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
        // Keeps the panel away from viewport edges — important since the app
        // renders inside a Salesforce VF iframe with limited space.
        collisionPadding={8}
        className={`
          z-50 bg-[var(--color-surface)] border border-[var(--color-border)] 
          rounded-xl shadow-lg overflow-hidden
          origin-top-right transition-all duration-200 ease-out
          data-[state=closed]:scale-95 data-[state=closed]:opacity-0
          data-[state=open]:scale-100 data-[state=open]:opacity-100
          ${className}
        `}
        style={{
          minWidth: minWidth ? `${minWidth}px` : "var(--radix-popover-trigger-width)",
          maxHeight: maxHeight ? `${maxHeight}px` : "auto",
        }}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}