// src/components/header/ActionBar.tsx
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
    <div className="flex items-center justify-between px-6 pt-2 pb-1 bg-white border-b border-border">
      <div className="flex items-center h-full gap-4">
        <div className="flex h-full">
          <button
            onClick={() => setViewType("day")}
            className={`flex items-center gap-2 h-full px-4 text-[15px] font-bold border-b-[3px] transition-colors pt-0.5 ${
              viewType === "day"
                ? "text-brand border-brand"
                : "text-text-secondary border-transparent hover:text-text-primary hover:border-border-strong"
            }`}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 520 520"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" // ← changed from #fff so it inherits the button's text color
            >
              <path d="M440 70h-50V50a30 30 0 1 0-60 0v20H190V50a30 30 0 1 0-60 0v20H80a40 40 0 0 0-40 40v25c0 8 7 15 15 15h410c8 0 15-7 15-15v-25a40 40 0 0 0-40-40m25 130H55c-8 0-15 7-15 15v245a40 40 0 0 0 40 40h360a40 40 0 0 0 40-40V215c0-8-7-15-15-15M290 420v2c0 8-10 18-20 18s-20-10-20-20V320l-15 16c-3 3-6 4-10 4-8 0-15-7-15-15 0-4 2-8 5-11l39-39a20 20 0 0 1 15-6c11 0 21 9 21 20z" />
            </svg>
            יום
          </button>

          <button
            onClick={() => setViewType("horizontal")}
            className={`flex items-center gap-2 h-full px-4 text-[15px] font-bold border-b-[3px] transition-colors pt-0.5 ${
              viewType === "horizontal"
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

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant={isFilterTrayOpen || isRange ? "primary" : "secondary"}
            size="md"
            iconOnly
            className="rounded-full"
            icon={
              <svg
                className="w-4 h-4"
                viewBox="0 0 520 520"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M483 40H39c-15 0-22 17-13 28l194 227c6 7 9 17 9 26v144c0 8 8 15 16 15h30c8 0 14-7 14-15V321c0-10 4-19 11-26L496 68c9-11 2-28-13-28" />
              </svg>
            }
            onClick={toggleFilterTray}
            aria-label="הצג מסננים"
          />
          <Button
            type="button"
            variant="secondary"
            size="md"
            iconOnly
            className="rounded-full"
            icon={
              <svg
                className="w-4 h-4"
                viewBox="0 0 52 52"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M26 2a24 24 0 1 0 0 48 24 24 0 1 0 0-48m0 42C16 44 8 36 8 26S16 8 26 8s18 8 18 18-8 18-18 18m0-29.9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3m5 21c0 .5-.4.9-1 .9h-8c-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1.5 0 1-.3 1-.9v-4c0-.5-.4-1.1-1-1.1-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1h6c.5 0 1 .5 1 1.1v8c0 .5.4.9 1 .9.5 0 1 .5 1 1.1z" />
              </svg>
            }
            aria-label="הצג מקרא"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center justify-center text-[#747474] hover:text-text-primary transition-colors"
          aria-label="רענן נתונים"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>

        <Button
          variant="primary"
          size="md"
          className="rounded-full"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          {primaryActionText}
        </Button>
      </div>
    </div>
  );
}
