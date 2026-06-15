// src/components/layout/TopBar.tsx
import { useMemo } from "react";
import { parse } from "date-fns";
import { HDate } from "@hebcal/hdate";
import { useCalendarStore } from "../../store/appStore";
import { useLabels } from "../../hooks/useLabels";
import DateNavigator from "./DateNavigator";
import ClinicDropdown from "./ClinicDropdown";
import ModeToggle from "../ui/ModeToggle";
import Toggle from "../ui/Toggle";
import { notify } from "../../utils/notifications"; // TEST: remove
import { getErrorMessage } from "../../utils/errors"; // TEST: remove

// ── Sub-components ────────────────────────────────────────

function Divider() {
  return <div className="w-px h-6 bg-border" />;
}

function HebrewDateToggle({ selectedDate }: { selectedDate: string }) {
  const { showHebrewDate, toggleHebrewDate } = useCalendarStore();
  const labels = useLabels();

  const hebrewDateStr = useMemo(() => {
    const dateObj = parse(selectedDate, "yyyy-MM-dd", new Date());
    const hdate = new HDate(dateObj);
    return hdate.renderGematriya(true);
  }, [selectedDate]);

  return (
    <div className="flex items-center gap-3">
      <Toggle
        checked={showHebrewDate}
        onChange={() => {

          // TEST: action-path check — handler error → toast, no blank screen. Remove this block.
          try {
            throw new Error("test");
          } catch (err) {
            notify.error(getErrorMessage(err, "בדיקה: שגיאה בהחלפת תאריך עברי"));
          }
          
          toggleHebrewDate();
        }}
        label={labels.CAL_TOPBAR_HEBREW_DATE}
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
  const labels = useLabels();

  return (
    <ModeToggle<"shift" | "appointment">
      value={appMode}
      onChange={setAppMode}
      options={[
        { value: "appointment", label: labels.CAL_MODE_APPOINTMENTS },
        { value: "shift", label: labels.CAL_MODE_SHIFTS },
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
