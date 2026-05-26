// src/App.tsx
import { useCalendarStore } from "./store/appStore";
import ClinicSelector from "./components/clinicSelector/ClinicSelector";
import CalendarApp from "./CalendarApp";

function App() {
  const activeClinicId = useCalendarStore((state) => state.activeClinicId);

  // Clean Routing: If no clinic is selected, show the full-screen selector
  if (!activeClinicId) {
    return <ClinicSelector />;
  }

  // Otherwise, render the main app!
  return <CalendarApp />;
}

export default App;
