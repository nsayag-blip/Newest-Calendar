import { useEffect } from "react";
import { useToastStore, ToastType } from "../../store/toastStore";

// Modern SaaS colors (soft backgrounds, dark text)
const TOAST_STYLES: Record<ToastType, string> = {
  error: "bg-red-50 text-red-900 border-red-200",
  success: "bg-green-50 text-green-900 border-green-200",
  warning: "bg-amber-50 text-amber-900 border-amber-200",
  info: "bg-blue-50 text-blue-900 border-blue-200",
};

// Clean, borderless icons
const TOAST_ICONS: Record<ToastType, React.ReactNode> = {
  error: (
    <svg
      className="w-5 h-5 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      className="w-5 h-5 text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="w-5 h-5 text-amber-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  info: (
    <svg
      className="w-5 h-5 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

function ToastItem({
  id,
  message,
  type,
}: {
  id: string;
  message: string;
  type: ToastType;
}) {
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <div
      // Slimmer padding (px-4 py-3), centered items, sliding from top
      className={`relative w-full px-4 py-3 rounded-md shadow-md border flex items-center justify-between gap-4 transition-all transform duration-300 ease-out animate-in slide-in-from-top-2 ${TOAST_STYLES[type]}`}
      dir="rtl"
      role="alert"
    >
      <div className="flex items-center gap-3 w-full overflow-hidden">
        {/* Icon */}
        <div className="flex-shrink-0">{TOAST_ICONS[type]}</div>

        {/* Message with dir="auto" for mixed languages, vertically centered */}
        <div
          className="flex-1 text-[14px] font-semibold leading-snug"
          dir="auto"
        >
          {message}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => removeToast(id)}
        className="flex-shrink-0 p-1 opacity-60 hover:opacity-100 transition-opacity rounded focus:outline-none focus:ring-2 focus:ring-offset-1"
        aria-label="סגור"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    // Top-center position, 600px wide
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full max-w-[600px] px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full">
          <ToastItem {...toast} />
        </div>
      ))}
    </div>
  );
}
