// src/components/header/CalendarPicker.tsx
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setMonth,
  setYear,
} from "date-fns";
import { he } from "date-fns/locale";
import { useLabels } from "../../hooks/useLabels";

interface Props {
  selected: Date;
  onSelect: (day: Date) => void;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2024, i, 1);
  return { value: i, label: format(d, "MMMM", { locale: he }) };
});

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 15 }, (_, i) => currentYear - 5 + i);

export default function CalendarPicker({ selected, onSelect }: Props) {
  const labels = useLabels();
  const dayLabels = labels.CAL_PICKER_WEEKDAYS.split("|");
  const [viewMonth, setViewMonth] = useState(startOfMonth(selected));
  const [pickerMode, setPickerMode] = useState<"days" | "months" | "years">(
    "days",
  );

  const today = new Date();

  // Navigation Handlers
  const handlePrevMonth = () => setViewMonth(subMonths(viewMonth, 1));
  const handleNextMonth = () => setViewMonth(addMonths(viewMonth, 1));

  // Mode Selection Handlers
  const selectMonth = (monthIndex: number) => {
    setViewMonth(setMonth(viewMonth, monthIndex));
    setPickerMode("days");
  };

  const selectYear = (year: number) => {
    setViewMonth(setYear(viewMonth, year));
    setPickerMode("months"); // Usually flows Year -> Month -> Day
  };

  // Grid Data
  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  return (
    <div
      className="w-[280px] p-4 bg-white rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header Navigation ── */}
      <div className="flex items-center justify-between mb-4">
        {/* Right Arrow (Prev Month in RTL) */}
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={pickerMode !== "days"}
          className="p-1.5 text-gray-500 hover:text-brand hover:bg-brand-subtle rounded-md transition-colors disabled:opacity-0"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Mode Switchers */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              setPickerMode(pickerMode === "months" ? "days" : "months")
            }
            className={`px-2 py-1 text-sm font-bold rounded-md transition-colors ${
              pickerMode === "months"
                ? "bg-brand-subtle text-brand"
                : "text-text-primary hover:bg-surface-alt"
            }`}
          >
            {format(viewMonth, "MMMM", { locale: he })}
          </button>
          <button
            type="button"
            onClick={() =>
              setPickerMode(pickerMode === "years" ? "days" : "years")
            }
            className={`px-2 py-1 text-sm font-bold rounded-md transition-colors ${
              pickerMode === "years"
                ? "bg-brand-subtle text-brand"
                : "text-text-primary hover:bg-surface-alt"
            }`}
          >
            {viewMonth.getFullYear()}
          </button>
        </div>

        {/* Left Arrow (Next Month in RTL) */}
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={pickerMode !== "days"}
          className="p-1.5 text-gray-500 hover:text-brand hover:bg-brand-subtle rounded-md transition-colors disabled:opacity-0"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* ── View: Days ── */}
      {pickerMode === "days" && (
        <>
          <div className="grid grid-cols-7 mb-2">
            {dayLabels.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-semibold text-gray-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isSelected = isSameDay(day, selected);
              const isCurrentMonth = isSameMonth(day, viewMonth);
              const isTodayDate = isSameDay(day, today);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => onSelect(day)}
                  className={`
                    h-8 w-full rounded-md text-[13px] font-medium transition-all
                    ${
                      isSelected
                        ? "bg-brand text-white shadow-sm font-bold"
                        : isTodayDate
                          ? "border border-brand text-brand hover:bg-brand-subtle font-bold"
                          : isCurrentMonth
                            ? "text-text-primary hover:bg-surface-alt"
                            : "text-gray-300 hover:bg-surface-alt"
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setViewMonth(startOfMonth(today));
                onSelect(today);
              }}
              className="w-full text-xs font-bold text-brand hover:text-brand-hover transition-colors text-center py-1"
            >
              {labels.CAL_NAV_GO_TODAY}
            </button>
          </div>
        </>
      )}

      {/* ── View: Months ── */}
      {pickerMode === "months" && (
        <div className="grid grid-cols-3 gap-2 py-2">
          {MONTHS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => selectMonth(m.value)}
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                viewMonth.getMonth() === m.value
                  ? "bg-brand text-white shadow-sm"
                  : "text-text-primary hover:bg-surface-alt"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* ── View: Years ── */}
      {pickerMode === "years" && (
        <div className="grid grid-cols-3 gap-2 py-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => selectYear(y)}
              className={`py-2 text-sm font-medium rounded-md transition-colors ${
                viewMonth.getFullYear() === y
                  ? "bg-brand text-white shadow-sm"
                  : "text-text-primary hover:bg-surface-alt"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
