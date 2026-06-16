// src/components/modals/CreateShiftModal.tsx
import { useCalendarStore } from "../../store/appStore";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { formatMinutesToTime } from "../grid/engine/gridMetrics";

export default function CreateShiftModal() {
  const { draftPayload, closeDraftModal } = useCalendarStore();

  if (!draftPayload) return null;

  const isShift = draftPayload.type === "shift";
  const title = isShift ? "יצירת משמרת חדשה" : "קביעת תור חדש";

  return (
    <Modal
      isOpen={!!draftPayload}
      onClose={closeDraftModal}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={closeDraftModal}>ביטול</Button>
          <Button variant="primary">שמור</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4 text-sm text-[var(--color-text-primary)]">
        <p className="text-[var(--color-text-secondary)]">
          זהו אזור זמני לטופס! להלן הנתונים שנתפסו מגרירת העכבר:
        </p>
        
        <div className="bg-[var(--color-brand-subtle)] p-4 rounded-md border border-[var(--color-brand-border)] text-[var(--color-text-brand)] font-medium leading-relaxed">
          <div><strong>חדר:</strong> {draftPayload.columnName}</div>
          <div><strong>שעת התחלה:</strong> {formatMinutesToTime(draftPayload.startMinutes)}</div>
          <div><strong>שעת סיום:</strong> {formatMinutesToTime(draftPayload.endMinutes)}</div>
          <div><strong>סוג:</strong> {isShift ? "משמרת" : "תור"}</div>
        </div>
      </div>
    </Modal>
  );
}