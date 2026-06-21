// // src/components/ui/Modal.tsx
// import { useEffect } from "react";
// import { createPortal } from "react-dom";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// export function Modal({ isOpen, onClose, children, className = "max-w-lg" }: ModalProps) {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (isOpen) window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, onClose]);

//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//       {/* Click backdrop to close */}
//       <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

//       {/* Modal Container */}
//       <div
//         className={`relative bg-surface w-full rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] ${className}`}
//         role="dialog"
//         aria-modal="true"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {children}
//       </div>
//     </div>,
//     document.body,
//   );
// }

// // ── Slot-style sub-components ──

// Modal.Header = function ModalHeader({
//   title,
//   badge,
//   onClose,
// }: {
//   title: string;
//   badge?: React.ReactNode;
//   onClose?: () => void;
// }) {
//   return (
//     <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-alt">
//       <div className="flex items-center gap-3">
//         <h2 className="text-lg font-bold text-text-primary">{title}</h2>
//         {badge}
//       </div>
//       {onClose && (
//         <button
//           onClick={onClose}
//           aria-label="סגור"
//           className="flex items-center justify-center w-8 h-8 text-text-muted hover:text-text-primary hover:bg-surface rounded-full transition-colors border border-transparent hover:border-border"
//         >
//           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// Modal.Body = function ModalBody({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div className={`p-6 overflow-y-auto custom-scrollbar flex-1 ${className}`}>
//       {children}
//     </div>
//   );
// };

// Modal.Footer = function ModalFooter({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="px-6 py-4 border-t border-border bg-surface-alt flex items-center justify-between gap-3">
//       {children}
//     </div>
//   );
// };

// export default Modal;




// src/components/ui/Modal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; // Still allows overriding max-width if a future modal needs to be wide
}

export function Modal({ isOpen, onClose, children, className = "max-w-[380px]" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div
        className={`relative bg-surface w-full rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] ${className}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

// ── Slot-style sub-components ──

Modal.Header = function ModalHeader({
  title,
  subtitle,
  badge,
  onClose,
}: {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="relative flex flex-col gap-1 px-5 pt-5 pb-4 border-b border-border bg-surface">
      {onClose && (
        <button
          onClick={onClose}
          aria-label="סגור"
          className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full border border-border text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* pr-10 avoids overlapping the absolute X button */}
      <div className="flex items-center gap-2 pr-10">
        <h2 className="text-lg font-bold text-text-primary">{title}</h2>
        {badge}
      </div>

      {subtitle && (
        <span className="text-xs text-text-muted pr-10">
          {subtitle}
        </span>
      )}
    </div>
  );
};

Modal.Body = function ModalBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-5 flex flex-col gap-5 overflow-y-auto custom-scrollbar flex-1 ${className}`}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 border-t border-border bg-surface flex items-center justify-between gap-3">
      {children}
    </div>
  );
};

export default Modal;