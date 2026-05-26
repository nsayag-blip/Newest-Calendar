// src/components/layout/ActionBar.tsx
import { useCalendarStore } from "../../store/appStore";
import {
  TIME_DENSITY_OPTIONS,
  COLUMN_DENSITY_OPTIONS,
} from "../../constants/theme";
import type { TimeDensity, ColumnDensity } from "../../types/calendar";
import Button from "../ui/Button";
import DensityControl from "../ui/DensityControl";

export default function ActionBar() {
  const {
    appMode,
    viewType,
    setViewType,
    timeDensity,
    setTimeDensity,
    columnDensity,
    setColumnDensity,
    isFilterTrayOpen,
    toggleFilterTray,
  } = useCalendarStore();

  const isRange = viewType === "range";
  const primaryActionText = appMode === "shift" ? "יצירת משמרת" : "קביעת תור";

  return (
    <div className="flex items-center justify-between px-6 h-14 bg-surface border-b border-border">
      <div className="flex items-center h-full gap-4">
        <div className="flex h-full">
          <button
            onClick={() => setViewType("day")}
            className={`flex items-center gap-2 h-full px-4 text-[15px] font-bold border-b-[3px] transition-colors pt-0.5 ${viewType === "day"
              ? "text-brand border-brand"
              : "text-text-secondary border-transparent hover:text-text-primary hover:border-border-strong"
              }`}
          >
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            יום
          </button>

          <button
            onClick={() => setViewType("horizontal")}
            className={`flex items-center gap-2 h-full px-4 text-[15px] font-bold border-b-[3px] transition-colors pt-0.5 ${viewType === "horizontal"
              ? "text-brand border-brand"
              : "text-text-secondary border-transparent hover:text-text-primary hover:border-border-strong"
              }`}
          >
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            ציר זמן
          </button>
        </div>

        <div className="w-px h-7 bg-border" />

        <DensityControl
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h5a2 2 0 012 2v8a2 2 0 01-2 2H4V7zm11 0h5a2 2 0 012 2v4a2 2 0 01-2 2h-5V7z"
              />
            </svg>
          }
          unit="חדרים"
          options={COLUMN_DENSITY_OPTIONS}
          value={columnDensity}
          onChange={(value) => setColumnDensity(value as ColumnDensity)}
        />

        <DensityControl
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          unit="דק'"
          options={TIME_DENSITY_OPTIONS}
          value={timeDensity}
          onChange={(value) => setTimeDensity(value as TimeDensity)}
        />

        <div className="w-px h-7 bg-border" />

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={isFilterTrayOpen || isRange ? "primary" : "secondary"}
            size="md"
            iconOnly
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
            }
            onClick={toggleFilterTray}
            aria-label="הצג מסננים"
          />

          <Button
            type="button"
            variant="ghost"
            size="md"
            iconOnly
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            }
            aria-label="הצג מקרא"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="md"
          iconOnly
          icon={
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          }
          className="border border-transparent hover:border-border"
          aria-label="רענן נתונים"
        />

        <Button
          variant="primary"
          size="lg"
          className="rounded-full px-5"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          {primaryActionText}
        </Button>
      </div>
    </div>
  );
}
