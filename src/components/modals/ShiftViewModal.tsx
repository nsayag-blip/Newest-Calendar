// // src/components/modals/ShiftViewModal.tsx
// import { memo } from "react";
// import { Modal } from "../ui/Modal";
// import { Shift } from "../../types/sf";
// import { SHIFT_STATUS_BG, SHIFT_STATUS_BORDER } from "../../constants/theme";

// interface ShiftViewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   shift: Shift | null;
// }

// const SHIFT_STATUS_LABEL = 
// {
//   Published: "פורסם",
//   Confirmed: "מאושר",
//   Tentative: "טיוטה",
// };

// // ── Helpers ──

// const formatTime = (value: string | Date) =>
//   new Date(value).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });

// const formatDate = (value: string | Date) =>
//   new Date(value).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });

// // ── Small building blocks ──

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return <span className="text-sm font-bold text-text-secondary">{children}</span>;
// }

// function InfoCell({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     // FIX: Changed from items-end to items-start for native RTL alignment
//     <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
//       <div className="flex items-center gap-1 text-text-muted">
//         {icon}
//         <span className="text-[11px]">{label}</span>
//       </div>
//       {/* FIX: Added text-right to ensure LTR content aligns right */}
//       <span className="text-[13px] font-semibold text-text-primary truncate w-full text-right" dir="ltr">
//         {value}
//       </span>
//     </div>
//   );
// }

// function CellDivider() {
//   return <div className="w-px h-8 bg-border mx-2 flex-shrink-0" />;
// }

// // ── Icons ──

// const IconCalendar = () => (
//   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
// );
// const IconClock = () => (
//   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
// );
// const IconRoom = () => (
//   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
// );
// const IconClinic = () => (
//   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
// );
// const IconTreatment = () => (
//   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
// );
// const IconDoctor = () => (
//   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" /></svg>
// );
// const IconCheck = () => (
//   <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
// );
// const IconTrash = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
// );
// const IconEdit = () => (
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
// );

// // ── Main component ──

// const ShiftViewModal = memo(({ isOpen, onClose, shift }: ShiftViewModalProps) => {
//   if (!shift) return null;

//   const statusLabel = SHIFT_STATUS_LABEL[shift.Status] ?? shift.Status;
//   const badgeBg = SHIFT_STATUS_BG[shift.Status] ?? "var(--color-surface-alt)";
//   const badgeBorder = SHIFT_STATUS_BORDER[shift.Status] ?? "var(--color-border)";

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} className="max-w-[380px]">
//       <div className="relative flex flex-col gap-1 px-5 pt-5 pb-4 border-b border-border">
//         {/* FIX: Set explicitly to right-5 to keep it on the physical right in RTL */}
//         <button
//           onClick={onClose}
//           aria-label="סגור"
//           className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 rounded-full border border-border text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* FIX: Add padding-right to avoid colliding with the X button */}
//         <div className="flex items-center gap-2 pr-10">
//           <h2 className="text-lg font-bold text-text-primary">פרטי משמרת</h2>
//           <span
//             className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
//             style={{ backgroundColor: badgeBg, color: badgeBorder }}
//           >
//             <IconCheck />
//             {statusLabel}
//           </span>
//         </div>

//         <span className="text-xs text-text-muted pr-10">
//           {shift.Type ?? "זימון תורים"}
//         </span>
//       </div>

//       <Modal.Body className="flex flex-col gap-5 p-5">
//         <div className="flex flex-col gap-2">
//           <SectionLabel>נותן שירות</SectionLabel>
//           <div className="flex items-center justify-between bg-brand-subtle border border-brand-border rounded-xl p-2.5">
//             <div className="flex items-center gap-3 min-w-0">
//               <div className="bg-brand text-text-inverse p-1.5 rounded-lg flex-shrink-0">
//                 <IconDoctor />
//               </div>
//               <span className="text-[15px] font-bold text-brand truncate">
//                 {shift.ServiceResourceId ? `מזהה: ${shift.ServiceResourceId}` : "לא צוין"}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3">
//           <SectionLabel>פרטי טיפול</SectionLabel>

//           <div className="flex items-center">
//             <InfoCell
//               icon={<IconRoom />}
//               label="חדר"
//               value={shift.ServiceTerritoryId ? `מזהה: ${shift.ServiceTerritoryId}` : "לא צוין"}
//             />
//             <CellDivider />
//             <InfoCell icon={<IconClinic />} label="מרפאה" value="—" />
//           </div>

//           <div className="flex items-center">
//             <InfoCell icon={<IconClock />} label="סיום" value={formatTime(shift.EndTime)} />
//             <CellDivider />
//             <InfoCell icon={<IconClock />} label="התחלה" value={formatTime(shift.StartTime)} />
//             <CellDivider />
//             <InfoCell icon={<IconCalendar />} label="תאריך" value={formatDate(shift.StartTime)} />
//           </div>
//         </div>

//         <div className="flex items-center gap-1.5 text-[11px] text-text-muted mt-2">
//           <IconTreatment />
//           <span>סוגי טיפול במשמרת:</span>
//           <span className="font-semibold text-text-primary">{shift.Type ?? "זימון תורים"}</span>
//         </div>
//       </Modal.Body>

//       <Modal.Footer>
//         <button
//           onClick={() => console.log("Delete clicked", shift.Id)}
//           className="flex items-center gap-1.5 px-3 py-1.5 border border-destructive text-destructive rounded-full font-bold text-xs hover:bg-destructive-subtle transition-colors"
//         >
//           <IconTrash />
//           מחיקת משמרת
//         </button>

//         <button
//           onClick={() => console.log("Edit clicked", shift.Id)}
//           className="flex items-center gap-1.5 px-5 py-1.5 bg-brand text-text-inverse rounded-full font-bold text-xs hover:bg-brand-hover transition-colors shadow-sm"
//         >
//           <IconEdit />
//           עריכת משמרת
//         </button>
//       </Modal.Footer>
//     </Modal>
//   );
// });

// export default ShiftViewModal;




// src/components/modals/ShiftViewModal.tsx
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Shift } from "../../types/sf";
import { SHIFT_STATUS_BG, SHIFT_STATUS_BORDER } from "../../constants/theme";
import {
  IconCalendar, IconClock, IconRoom, IconClinic,
  IconTreatment, IconDoctor, IconCheck, IconTrash, IconEdit,
} from "../ui/Icons";

interface ShiftViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: Shift | null;
}

const SHIFT_STATUS_LABEL: Record<string, string> = {
  Published: "פורסם",
  Confirmed: "מאושר",
  Tentative: "טיוטה",
};

const formatTime = (value: string | Date) => new Date(value).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
const formatDate = (value: string | Date) => new Date(value).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "numeric" });

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-bold text-text-secondary">{children}</span>;
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; }) {
  return (
    <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
      <div className="flex items-center gap-1 text-text-muted">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <span className="text-[13px] font-semibold text-text-primary truncate w-full text-right" dir="ltr">
        {value}
      </span>
    </div>
  );
}

function CellDivider() {
  return <div className="w-px h-8 bg-border mx-2 flex-shrink-0" />;
}

export default function ShiftViewModal({ isOpen, onClose, shift }: ShiftViewModalProps) {
  if (!shift) return null;

  const statusLabel = SHIFT_STATUS_LABEL[shift.Status] ?? shift.Status;
  const badgeBg = SHIFT_STATUS_BG[shift.Status] ?? "var(--color-surface-alt)";
  const badgeBorder = SHIFT_STATUS_BORDER[shift.Status] ?? "var(--color-border)";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header 
        title="פרטי משמרת"
        subtitle={shift.Type ?? "זימון תורים"}
        onClose={onClose}
        badge={
          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: badgeBg, color: badgeBorder }}>
            <IconCheck />
            {statusLabel}
          </span>
        }
      />

      <Modal.Body>
        <div className="flex flex-col gap-2">
          <SectionLabel>נותן שירות</SectionLabel>
          <div className="flex items-center justify-between bg-brand-subtle border border-brand-border rounded-xl p-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-brand text-text-inverse p-1.5 rounded-lg flex-shrink-0">
                <IconDoctor />
              </div>
              <span className="text-[15px] font-bold text-brand truncate">
                {shift.ServiceResourceId ? `מזהה: ${shift.ServiceResourceId}` : "לא צוין"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SectionLabel>פרטי טיפול</SectionLabel>
          <div className="flex items-center">
            <InfoCell icon={<IconRoom />} label="חדר" value={shift.ServiceTerritoryId ? `מזהה: ${shift.ServiceTerritoryId}` : "לא צוין"} />
            <CellDivider />
            <InfoCell icon={<IconClinic />} label="מרפאה" value="—" />
          </div>
          <div className="flex items-center">
            <InfoCell icon={<IconClock />} label="סיום" value={formatTime(shift.EndTime)} />
            <CellDivider />
            <InfoCell icon={<IconClock />} label="התחלה" value={formatTime(shift.StartTime)} />
            <CellDivider />
            <InfoCell icon={<IconCalendar />} label="תאריך" value={formatDate(shift.StartTime)} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-text-muted mt-2">
          <IconTreatment />
          <span>סוגי טיפול במשמרת:</span>
          <span className="font-semibold text-text-primary">{shift.Type ?? "זימון תורים"}</span>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="destructive"
          size="sm"
          icon={<IconTrash />}
          onClick={() => console.log("Delete clicked", shift.Id)}
        >
          מחיקת משמרת
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={<IconEdit />}
          onClick={() => console.log("Edit clicked", shift.Id)}
        >
          עריכת משמרת
        </Button>
      </Modal.Footer>
    </Modal>
  );
}