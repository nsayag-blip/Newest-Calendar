// // src/App.tsx
// import { useCalendarStore } from "./store/appStore";
// import ClinicSelector from "./components/clinicSelector/ClinicSelector";
// import CalendarApp from "./CalendarApp";

// function App() {
//   const activeClinicId = useCalendarStore((state) => state.activeClinicId);

//   // Clean Routing: If no clinic is selected, show the full-screen selector
//   if (!activeClinicId) {
//     return <ClinicSelector />;
//   }

//   // Otherwise, render the main app!
//   return <CalendarApp />;
// }

// export default App;

// src/App.tsx
import { useSession } from "./hooks/useSession";
import { useUserClinics } from "./hooks/useUserClinics";
import { useCalendarStore } from "./store/appStore";
import ClinicSelector from "./components/clinicSelector/ClinicSelector";
import CalendarApp from "./CalendarApp";

export default function App() {
  const {
    data: userContext,
    isLoading: loadingSession,
    isError,
  } = useSession();
  const { availableClinics, isLoadingClinics } = useUserClinics(userContext);
  const activeClinicId = useCalendarStore((state) => state.activeClinicId);

  console.log("User Context:", userContext);
  console.log("Available Clinics:", availableClinics);

  // ── 1. LOADING STATE ──
  if (loadingSession || isLoadingClinics) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-surface-alt font-sans">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-text-secondary font-medium">טוען נתונים</p>
      </div>
    );
  }

  // ── 2. ERROR STATE ──
  if (isError || !userContext) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-surface-alt font-sans">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-destructive flex flex-col items-center text-center max-w-sm">
          <h3 className="text-lg font-bold text-destructive mb-2">
            שגיאת התחברות
          </h3>
          <p className="text-sm text-text-secondary">
            לא ניתן היה לאמת את הרשאות המשתמש. אנא רענן את העמוד.
          </p>
        </div>
      </div>
    );
  }

  // ── 3. ROUTING ──
  if (!activeClinicId) {
    return <ClinicSelector availableClinics={availableClinics} />;
  }

  return <CalendarApp />;
}
