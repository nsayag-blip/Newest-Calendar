// src/types/calendar.ts
// Grid engine output types — what gets rendered.
// Derived from SF types after column-merge logic runs.

import type { Shift, ServiceResource, ServiceAppointment } from "./sf";

// ── View / display config ─────────────────────────────────

export type ViewType = "day" | "range" | "horizontal";
export type AppMode = "shift" | "appointment";
export type TimeDensity = 5 | 10 | 15 | 30 | 60;
export type ColumnDensity = 1 | 5 | 7 | 13;

export type DayCharacter =
  | "regular"  // grey — weekday
  | "special"  // yellow — חג / ערב חג / חול המועד / צום
  | "saturday"; // שבת (only ER clinics show this)

/**
 * A resolved grid column — output of the column-merge logic.
 *
 * Merge rules (from spec):
 *   - Shift cal:  same doctor + same room on same day → SAME column
 *   - Apt cal:    same doctor + same room → SAME column
 *   - Apt cal:    same doctor + different rooms → DIFFERENT columns
 *   - Apt cal:    different doctors + same room → DIFFERENT columns
 *   - Multi-day:  columns also split by date
 */
export interface Column {
  /** Stable key: "{date}__{territoryId}__{resourceId}" */
  id: string;
  date: string; // "YYYY-MM-DD"
  dayCharacter: DayCharacter;
  roomId: string;
  roomName: string;
  roomNumber: number | null;
  serviceResourceId: string | null;
  serviceResource: ServiceResource | null;
  shifts: Shift[];
  headerLabel: string;
  isToday: boolean;
}

export interface TimeSlot {
  label: string;   // "08:00"
  minutes: number; // minutes from midnight (480 for 08:00)
}

export interface Grid {
  columns: Column[];
  timeSlots: TimeSlot[];
  startHour: number;
  endHour: number;
}

// ── Positioning ───────────────────────────────────────────

export interface BlockPosition {
  top: number;    // percentage from grid top
  height: number; // percentage of total grid height
}

// ── Grid interaction events ───────────────────────────────

export interface CellClickEvent {
  date: string;
  time: string; // "HH:mm" — snapped to timeDensity grid
  column: Column;
  isInsideActiveShift: boolean;
}

export interface ShiftClickEvent {
  shift: Shift;
  column: Column;
}

export interface AppointmentClickEvent {
  appointment: ServiceAppointment;
  column: Column;
}

export interface ShiftDropEvent {
  shift: Shift;
  sourceColumn: Column;
  targetColumn: Column;
}

// ── Filter state ──────────────────────────────────────────

export interface FilterState {
  resourceIds: string[];
  workTypeIds: string[];
  shiftStatuses: string[];
}