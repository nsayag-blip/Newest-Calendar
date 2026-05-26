// src/components/header/DateNavigator.tsx
import { useState, useCallback } from "react";
import { useCalendarStore } from "../../store/appStore";
import {
  format,
  parse,
  addDays,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { he } from "date-fns/locale";

// UI Components
import Button from "../ui/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";

// ── Formatting Utilities (Figma Match) ──
const toDisplayDate = (dateStr: string): string => {
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return format(date, "EEEE, d בMMMM yyyy", { locale: he });
};

// ── Internal Calendar Picker Component (Untouched Logic!) ──
const CalendarPicker = ({
  selected,
  onSelect,
}: {
  selected: Date;
  onSelect: (day: Date) => void;
}) => {
  const [viewMonth, setViewMonth] = useState(
    new Date(selected.getFullYear(), selected.getMonth(), 1),
  );

  const monthLabel = new Intl.DateTimeFormat("he-IL", {
    month: "long",
    year: "numeric",
  }).format(viewMonth);

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const today = new Date();
  const DAY_LABELS = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];

  const goToPrevMonth = () =>
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1),
    );
  const goToNextMonth = () =>
    setViewMonth(
      new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1),
    );

  return (
    <div className="w-[280px] p-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" iconOnly size="sm" onClick={goToNextMonth}>
          <svg
            className="w-4 h-4"
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
        </Button>

        <span className="text-sm font-bold text-text-primary">
          {monthLabel}
        </span>

        <Button variant="ghost" iconOnly size="sm" onClick={goToPrevMonth}>
          <svg
            className="w-4 h-4"
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
        </Button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-semibold text-text-muted py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1">
        {days.map((day) => {
          const isSelected = isSameDay(day, selected);
          const isCurrentMonth = isSameMonth(day, viewMonth);
          const isTodayDate = isSameDay(day, today);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelect(day)}
              className={`
                h-8 w-full rounded-sm text-xs font-medium transition-all
                ${isSelected
                  ? "bg-brand text-text-inverse font-bold shadow-sm"
                  : isTodayDate
                    ? "border border-brand text-brand font-bold hover:bg-brand-subtle"
                    : isCurrentMonth
                      ? "text-text-primary hover:bg-surface-alt"
                      : "text-text-muted hover:bg-surface-alt opacity-50"
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Jump to Today */}
      <div className="mt-4 pt-3 border-t border-border">
        <button
          onClick={() => onSelect(today)}
          className="w-full text-xs font-bold text-brand hover:text-brand-hover transition-colors text-center"
        >
          עבור להיום
        </button>
      </div>
    </div>
  );
};

export default function DateNavigator() {
  const { selectedDate, setSelectedDate, nextDay, prevDay, viewType } =
    useCalendarStore();

  const isRange = viewType === "range";
  const parsedDate = parse(selectedDate, "yyyy-MM-dd", new Date());
  const isTodaySelected = isToday(parsedDate);

  const rangeEndDate = addDays(parsedDate, 30);
  const rangeFormatted = `${format(rangeEndDate, "d.M")} - ${format(parsedDate, "d.M")}`;

  const handleDaySelect = (day: Date) => {
    setSelectedDate(format(day, "yyyy-MM-dd"));
  };

  const handleGoToToday = () => {
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
  };

  return (
    <div className="flex items-center gap-3 h-10">
      {/* 1. Today Button (Figma style - blue text link) */}
      <button
        onClick={handleGoToToday}
        disabled={isTodaySelected}
        className="text-brand font-bold text-[15px] hover:underline transition-all disabled:opacity-50 disabled:no-underline disabled:cursor-default"
      >
        היום
      </button>

      {/* 2. Arrows (Figma style - pure blue chevrons) */}
      <div className="flex items-center gap-1">
        <button
          onClick={prevDay}
          className="p-1 text-brand hover:bg-brand-subtle rounded transition-colors"
          title="יום קודם"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          onClick={nextDay}
          className="p-1 text-brand hover:bg-brand-subtle rounded transition-colors"
          title="יום הבא"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* 3. Date Readout & Picker Dropdown (Figma style - text + solid chevron) */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            disabled={isRange}
            className={`
              group flex items-center gap-2 px-2 py-1 rounded-sm transition-colors
              ${isRange
                ? "cursor-default opacity-90"
                : "hover:bg-surface-alt cursor-pointer focus-visible:outline-2 focus-visible:outline-brand"
              }
            `}
          >
            <span className="font-bold text-[17px] text-text-primary leading-none tracking-tight">
              {isRange
                ? `מציג תאריכים: ${rangeFormatted}`
                : toDisplayDate(selectedDate)}
            </span>

            {!isRange && (
              <svg
                className="w-4 h-4 text-brand transition-transform duration-200 group-data-[state=open]:rotate-180"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent align="center" sideOffset={8}>
          <CalendarPicker selected={parsedDate} onSelect={handleDaySelect} />
        </PopoverContent>
      </Popover>
    </div>
  );
}