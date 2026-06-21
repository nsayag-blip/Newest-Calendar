// // src/components/modals/ShiftDraftModal.tsx
// import { memo } from "react";
// import { Modal } from "../ui/Modal";

// export interface DraftPayload {
//   columnId: string;
//   columnName: string;
//   startMinutes: number;
//   endMinutes: number;
//   type: "shift" | "appointment";
// }

// interface ShiftDraftModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   payload: DraftPayload | null;
// }

// const formatMins = (mins: number) => {
//   const h = Math.floor(mins / 60).toString().padStart(2, "0");
//   const m = (mins % 60).toString().padStart(2, "0");
//   return `${h}:${m}`;
// };

// const ShiftDraftModal = memo(({ isOpen, onClose, payload }: ShiftDraftModalProps) => {
//   if (!payload) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} className="max-w-[420px]">
//       <Modal.Header title="יצירת משמרת חדשה" onClose={onClose} />

//       <Modal.Body className="flex flex-col gap-5 p-6">
//         <div className="bg-brand-subtle border border-brand-border rounded-lg p-3 flex items-center gap-3">
//           <div className="bg-brand text-text-inverse p-2 rounded-md">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-bold text-brand">{payload.columnName}</span>
//             <span className="text-xs text-brand/80" dir="ltr">
//               {formatMins(payload.startMinutes)} - {formatMins(payload.endMinutes)}
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-text-secondary">מיקום / חדר</label>
//             <input 
//               type="text" 
//               disabled 
//               value={payload.columnName}
//               className="w-full px-3 py-2 bg-surface-alt border border-border rounded-md text-sm text-text-muted cursor-not-allowed"
//             />
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-text-secondary">סוג עבודה</label>
//             <select className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-brand">
//               <option value="regular">רגיל</option>
//               <option value="injections">הזרקות</option>
//               <option value="first_aid">עזרה ראשונה</option>
//             </select>
//           </div>

//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-bold text-text-secondary">הערות</label>
//             <textarea 
//               rows={3} 
//               placeholder="הוסף הערות למשמרת..."
//               className="w-full px-3 py-2 bg-surface border border-border rounded-md text-sm text-text-primary focus:outline-none focus:border-brand resize-none"
//             />
//           </div>
//         </div>
//       </Modal.Body>

//       <Modal.Footer>
//         <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
//           ביטול
//         </button>
//         <button onClick={() => { alert("Save functionality coming soon!"); onClose(); }} className="flex items-center gap-2 px-6 py-2 bg-brand text-text-inverse rounded-full font-bold text-sm hover:bg-brand-hover transition-colors shadow-sm">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//           שמירה
//         </button>
//       </Modal.Footer>
//     </Modal>
//   );
// });

// export default ShiftDraftModal;





// src/components/modals/ShiftDraftModal.tsx
import { memo } from "react";
import { Modal } from "../ui/Modal";

export interface DraftPayload {
  columnId: string;
  columnName: string;
  startMinutes: number;
  endMinutes: number;
  type: "shift" | "appointment";
}

interface ShiftDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: DraftPayload | null;
}

const formatMins = (mins: number) => {
  const h = Math.floor(mins / 60).toString().padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

const IconClock = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconSave = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

const ShiftDraftModal = memo(({ isOpen, onClose, payload }: ShiftDraftModalProps) => {
  if (!payload) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header 
        title="יצירת משמרת חדשה" 
        subtitle="הגדרת זמנים ופרטים למשמרת"
        onClose={onClose} 
      />

      <Modal.Body>
        <div className="flex items-center justify-between bg-brand-subtle border border-brand-border rounded-xl p-2.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-brand text-text-inverse p-1.5 rounded-lg flex-shrink-0">
              <IconClock />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[15px] font-bold text-brand truncate">{payload.columnName}</span>
              <span className="text-[13px] font-semibold text-brand/80 text-right w-full" dir="ltr">
                {formatMins(payload.startMinutes)} - {formatMins(payload.endMinutes)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-secondary">מיקום / חדר</label>
            <input 
              type="text" 
              disabled 
              value={payload.columnName}
              className="w-full px-3 py-2 bg-surface-alt border border-border rounded-lg text-[13px] font-medium text-text-muted cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-secondary">סוג עבודה</label>
            <select className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-[13px] font-medium text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-shadow">
              <option value="regular">רגיל</option>
              <option value="injections">הזרקות</option>
              <option value="first_aid">עזרה ראשונה</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-text-secondary">הערות</label>
            <textarea 
              rows={3} 
              placeholder="הוסף הערות למשמרת..."
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-[13px] font-medium text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-shadow resize-none"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button onClick={onClose} className="px-3 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors">
          ביטול
        </button>
        <button onClick={() => { alert("Save functionality coming soon!"); onClose(); }} className="flex items-center gap-1.5 px-5 py-1.5 bg-brand text-text-inverse rounded-full font-bold text-xs hover:bg-brand-hover transition-colors shadow-sm">
          <IconSave />
          שמירת משמרת
        </button>
      </Modal.Footer>
    </Modal>
  );
});

export default ShiftDraftModal;