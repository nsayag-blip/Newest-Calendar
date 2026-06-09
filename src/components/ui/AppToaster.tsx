import { Toaster } from "sonner";

const DEFAULT_DURATION = 5000;

const TOAST_CLASS = [
  "w-[356px] max-w-[calc(100vw-2rem)]",
  "flex items-center gap-3",
  "rounded-[var(--radius-md)] px-4 py-3",
  "shadow-[var(--shadow-lg)] font-sans text-sm font-medium",
].join(" ");

export function AppToaster() {
  return (
    <Toaster
      dir="rtl"
      position="top-center"
      theme="light"
      closeButton
      duration={DEFAULT_DURATION}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: TOAST_CLASS,
          content: "flex-1",
          title: "leading-snug",
          icon: "flex-shrink-0 flex items-center",
          closeButton: "order-last flex-shrink-0 text-white/80 hover:text-white transition-colors",
          error: "bg-[var(--color-destructive)] text-white",
          success: "bg-[var(--color-success)] text-white",
        },
      }}
    />
  );
}
