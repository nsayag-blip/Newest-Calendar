// src/constants/theme.ts
import type { ShiftStatus, ShiftType, AppointmentStatus } from "../types/sf";
import type { TimeDensity, ColumnDensity } from "../types/calendar";

// ── Shift calendar — block colors by Status ───────────────

export const SHIFT_STATUS_BG: Record<ShiftStatus, string> = {
  Published: "#EAF4FF",  // blue tint  — confirmed, visible to staff
  Confirmed: "#E8F5E9",  // green tint — locked in
  Tentative: "#FFFDE7",  // yellow tint — not yet confirmed
};

export const SHIFT_STATUS_BORDER: Record<ShiftStatus, string> = {
  Published: "#0070D2",  // brand blue
  Confirmed: "#2E7D32",  // green
  Tentative: "#F9A825",  // amber
};

export const SHIFT_STATUS_LABEL: Record<ShiftStatus, string> = {
  Published: "Published",
  Confirmed: "Confirmed",
  Tentative: "Tentative",
};

// ── Appointment calendar — shift background colors ────────
// (Used to color the shift lane behind appointments)

export const SHIFT_TYPE_BG: Record<ShiftType, string> = {
  Regular: "#FFFFFF",
  regular: "#FFFFFF",
  injections: "#B3E5FC",  // light blue
  whitening: "#FFE0B2",  // orange
  first_aid: "#FCE4EC",  // pink
};

// ── Appointment calendar — appointment block colors ───────

export const APPOINTMENT_STATUS_BG: Record<AppointmentStatus, string> = {
  Scheduled: "var(--color-brand-subtle)",
  active: "#C8E6C9",  // green
  examination: "#DCEDC8",  // olive green
  lab_returned: "#B3E5FC",  // light blue
  cancelled: "#FFCDD2",  // red
  blocker: "#EF9A9A",  // burgundy
  standby: "#E1BEE7",  // purple
};

export const APPOINTMENT_STATUS_LABEL: Record<AppointmentStatus, string> = {
  Scheduled: "נקבע",
  active: "פעיל",
  examination: "בדיקה",
  lab_returned: "עבודה חזרה ממעבדה",
  cancelled: "בוטל",
  blocker: "חסימה",
  standby: "רשימת המתנה",
};

// ── Time density options ──────────────────────────────────

export const TIME_DENSITY_OPTIONS: TimeDensity[] = [5, 10, 15, 30, 60];
export const TIME_DENSITY_DEFAULT: TimeDensity = 60;

// ── Column density options ────────────────────────────────

export const COLUMN_DENSITY_OPTIONS: ColumnDensity[] = [1, 5, 7, 13];
export const COLUMN_DENSITY_DEFAULT: ColumnDensity = 7;
export const COLUMN_DENSITY_MIN = 3;
export const COLUMN_DENSITY_MAX = 13;

// ── Day separator colors ──────────────────────────────────

export const DAY_SEPARATOR_COLOR = "#F44336";  // red   — between days
export const WEEK_SEPARATOR_COLOR = "#212121";  // black — between weeks