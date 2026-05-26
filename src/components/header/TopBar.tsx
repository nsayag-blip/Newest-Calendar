// src/components/layout/TopBar.tsx
import { useMemo } from "react";
import { parse } from "date-fns";
import { HDate } from "@hebcal/core";
import { useCalendarStore } from "../../store/appStore";
import DateNavigator from "./DateNavigator";
import ClinicDropdown from "./ClinicDropdown";
import ModeToggle from "../ui/ModeToggle";
import Toggle from "../ui/Toggle";

function Divider() {
  return <div className="w-px h-6 bg-border" />;
}

function HebrewDateToggle({ selectedDate }: { selectedDate: string }) {
  const { showHebrewDate, toggleHebrewDate } = useCalendarStore();

  const hebrewDateStr = useMemo(() => {
    const dateObj = parse(selectedDate, "yyyy-MM-dd", new Date());
    const hdate = new HDate(dateObj);
    return hdate.renderGematriya(true);
  }, [selectedDate]);

  return (
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
  );
}

function LeftSection({ selectedDate }: { selectedDate: string }) {
  return (
    <div className="flex items-center gap-5">
      <ClinicDropdown />
      <Divider />
      <DateNavigator />
      <Divider />
      <HebrewDateToggle selectedDate={selectedDate} />
    </div>
  );
}

function RightSection() {
  const { appMode, setAppMode } = useCalendarStore();

  return (
    <ModeToggle<"shift" | "appointment">
      value={appMode}
      onChange={setAppMode}
      options={[
        { value: "shift", label: "יומן משמרות" },
        { value: "appointment", label: "יומן תורים" },
      ]}
    />
  );
}

// ── Main Component ────────────────────────────────────────

export default function TopBar() {
  const selectedDate = useCalendarStore((state) => state.selectedDate);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6] bg-[#F8FBFE]">
      <LeftSection selectedDate={selectedDate} />
      <RightSection />
    </div>
  );
}
