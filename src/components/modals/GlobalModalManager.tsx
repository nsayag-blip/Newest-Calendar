// src/components/modals/GlobalModalManager.tsx
import { useCalendarStore } from "../../store/appStore";
import ShiftViewModal from "./ShiftViewModal";
import ShiftDraftModal from "./ShiftDraftModal";

export default function GlobalModalManager() {
  const { modal, closeModal } = useCalendarStore();

  if (modal.type === null) return null;

  switch (modal.type) {
    case "shiftView":
      return <ShiftViewModal isOpen shift={modal.payload} onClose={closeModal} />;
    case "draftShift":
      return <ShiftDraftModal isOpen payload={modal.payload} onClose={closeModal} />;
    default:
      return null;
  }
}