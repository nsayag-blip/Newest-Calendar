// src/components/views/ClinicSelector/ClinicSelector.tsx
import { useCalendarStore } from "../../store/appStore";
import { useClinics } from "../../hooks/useScheduling";

export default function ClinicSelector() {
  const setActiveClinicId = useCalendarStore(
    (state) => state.setActiveClinicId,
  );
  const { data: clinics = [], isLoading, isError } = useClinics();

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-surface-alt flex items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-screen h-screen bg-surface-alt flex items-center justify-center font-sans text-destructive">
        שגיאה בטעינת המרפאות. אנא נסה שוב.
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-surface-alt flex flex-col items-center justify-center font-sans">
      <div className="bg-surface p-8 rounded-2xl shadow-xl border border-border max-w-lg w-full">
        <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">
          ברוכים הבאים
        </h1>
        <p className="text-text-muted mb-8 text-center">
          אנא בחר מרפאה כדי להציג את יומן החדרים
        </p>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pe-2 custom-scrollbar">
          {clinics.map((clinic) => (
            <button
              key={clinic.Id}
              onClick={() => setActiveClinicId(clinic.Id)}
              className="w-full text-start px-6 py-4 bg-surface border-2 border-border text-text-primary rounded-xl hover:border-brand hover:bg-brand-subtle transition-all duration-200 shadow-sm font-medium text-lg group flex justify-between items-center"
            >
              <span>{clinic.Name}</span>
              <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                ←
              </span>
            </button>
          ))}

          {clinics.length === 0 && (
            <div className="text-center text-text-muted py-4">
              לא נמצאו מרפאות פעילות במערכת.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
