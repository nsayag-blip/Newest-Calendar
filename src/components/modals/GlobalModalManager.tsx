// src/components/modals/GlobalModalManager.tsx
import { useCalendarStore } from "../../store/appStore";
import ShiftViewModal from "./ShiftViewModal";
import ShiftDraftModal from "./ShiftDraftModal";
// import AppointmentDraftModal from "./AppointmentDraftModal";

export default function GlobalModalManager() {
  const { activeModal, modalPayload, closeModal } = useCalendarStore();

  if (!activeModal) return null;

  return (
    <>
      {activeModal === "shiftView" && (
        <ShiftViewModal isOpen={true} shift={modalPayload} onClose={closeModal} />
      )}
      
      {activeModal === "draftShift" && (
        <ShiftDraftModal isOpen={true} payload={modalPayload} onClose={closeModal} />
      )}

      {/* {activeModal === "draftAppointment" && (
        <AppointmentDraftModal isOpen={true} payload={modalPayload} onClose={closeModal} />
      )} */}
    </>
  );
}