// src/components/layout/DateNavigator.tsx
import { useCalendarStore } from "../../store/appStore";
import { format, parse, addDays, isToday } from "date-fns";
import { he } from "date-fns/locale";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import CalendarPicker from "./CalendarPicker";

const toDisplayDate = (dateStr: string): string => {
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return format(date, "EEEE, d בMMMM yyyy", { locale: he });
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
      <button
        type="button"
        onClick={handleGoToToday}
        disabled={isTodaySelected}
        className="text-brand font-bold text-[15px] hover:underline transition-all disabled:opacity-50 disabled:no-underline disabled:cursor-default"
      >
        היום
      </button>

      <div className="flex items-center gap-1">
        <button
          type="button"
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
          type="button"
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

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={isRange}
            className={`
              group flex items-center gap-2 px-2 py-1 rounded-sm transition-colors
              ${
                isRange
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
