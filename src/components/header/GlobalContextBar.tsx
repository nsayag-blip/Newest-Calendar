// src/components/layout/GlobalContextBar.tsx
import { useMemo } from "react";
import { parse } from "date-fns";
import { HDate } from "@hebcal/core"; // 👈 Import Hebcal
import { useCalendarStore } from "../../store/appStore";
import DateNavigator from "./DateNavigator";
import ClinicDropdown from "./ClinicDropdown";
import ModeToggle from "../ui/ModeToggle";
import Toggle from "../ui/Toggle";

export default function GlobalContextBar() {
  const { appMode, setAppMode, showHebrewDate, toggleHebrewDate, selectedDate } =
    useCalendarStore();

  // ── Hebcal Hebrew Date Calculation ──
  const hebrewDateStr = useMemo(() => {
    // 1. Convert your YYYY-MM-DD string into a real Date object
    const dateObj = parse(selectedDate, "yyyy-MM-dd", new Date());

    // 2. Create an HDate object
    const hdate = new HDate(dateObj);

    // 3. Render in Hebrew letters (Gematria). 
    // Passing 'true' adds the standard quotation marks (e.g., י״ט באייר תשפ״ו)
    return hdate.renderGematriya(true);
  }, [selectedDate]);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-border">
      <div className="flex items-center gap-5">
        <ClinicDropdown />

        <div className="w-px h-6 bg-border" />

        <DateNavigator />

        <div className="w-px h-6 bg-border" />

        <div className="flex items-center gap-3">
          <Toggle
            checked={showHebrewDate}
            onChange={toggleHebrewDate}
            label="תאריך עברי"
            labelSide="right"
          />
          {showHebrewDate && (
            <div className="px-3 py-1 text-[13px] font-medium text-text-secondary border border-border rounded-sm bg-surface shadow-sm">
              {hebrewDateStr}
            </div>
          )}
        </div>
      </div>

      <ModeToggle<"shift" | "appointment">
        value={appMode}
        onChange={setAppMode}
        options={[
          { value: "shift", label: "יומן משמרות" },
          { value: "appointment", label: "יומן תורים" },
        ]}
      />
    </div>
  );
}