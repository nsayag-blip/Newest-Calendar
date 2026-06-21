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
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, children, className = "max-w-[380px]" }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-black/50" />

        <Dialog.Content
          className={`fixed z-[var(--z-modal)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface w-[calc(100%-2rem)] rounded-[var(--radius-lg)] shadow-[0_2px_16px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden max-h-[90vh] ${className}`}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
    <div className="relative flex flex-col gap-0.5 px-4 py-3 border-b border-border bg-surface-alt">
      {onClose && (
        <Dialog.Close asChild>
          <button
            onClick={onClose}
            aria-label="סגור"
            className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full border border-border text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Dialog.Close>
      )}

      <div className="flex items-center gap-2 pl-9">
        <Dialog.Title className="text-base font-bold text-text-primary leading-snug">
          {title}
        </Dialog.Title>
        {badge}
      </div>

      {subtitle && (
        <Dialog.Description className="text-xs text-text-muted pl-9">
          {subtitle}
        </Dialog.Description>
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
    <div className={`p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1 ${className}`}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-4 py-3 border-t border-border bg-surface-alt flex items-center justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default Modal;