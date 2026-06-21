// Default text for every user-facing string. The only place text is hardcoded.
// useLabels() merges Salesforce Custom Labels over these (a label whose name matches a key wins). 
// Keys mirror the Custom Label API names. Naming: CAL_<AREA>_<NAME>.

export const LABEL_DEFAULTS = {
  // General 
  CAL_GENERAL_LOADING: "טוען נתונים",
  CAL_GENERAL_LOADING_DATA: "טוען נתונים...",
  CAL_GENERAL_LOADING_SHORT: "טוען...",
  CAL_GENERAL_NO_DATA: "אין נתונים להצגה",
  CAL_GENERAL_NO_COLUMNS: "אין עמודות להצגה",
  CAL_GENERAL_CLEAR_ALL: "נקה הכל",

  // Clinic selection
  CAL_CLINIC_WELCOME: "ברוכים הבאים",
  CAL_CLINIC_SELECT_PROMPT: "אנא בחר מרפאה כדי להציג את יומן החדרים",
  CAL_CLINIC_NONE_ACTIVE: "לא נמצאו מרפאות פעילות במערכת.",
  CAL_CLINIC_CURRENT: "מרפאה נוכחית",
  CAL_CLINIC_CHOOSE: "בחר מרפאה",
  CAL_CLINIC_NONE_AVAILABLE: "אין מרפאות זמינות",
  CAL_CLINIC_VIEW_ONLY: "צפייה בלבד",
  CAL_CLINIC_VIEW_ONLY_PAREN: "(צפייה בלבד)",

  // Calendar mode toggle
  CAL_MODE_APPOINTMENTS: "יומן תורים",
  CAL_MODE_SHIFTS: "יומן משמרות",

  // Top bar
  CAL_TOPBAR_HEBREW_DATE: "תאריך עברי",

  // Action bar
  CAL_ACTION_CREATE_SHIFT: "יצירת משמרת",
  CAL_ACTION_CREATE_APPOINTMENT: "קביעת תור",
  CAL_ACTION_SHOW_FILTERS: "הצג מסננים",
  CAL_ACTION_SHOW_LEGEND: "הצג מקרא",
  CAL_ACTION_REFRESH: "רענן נתונים",
  CAL_VIEW_DAY: "יום",
  CAL_VIEW_TIMELINE: "ציר זמן",

  // Unit labels & stepper buttons (the +/- count controls)
  CAL_UNIT_ROOMS: "חדרים",
  CAL_UNIT_MINUTES: "דק'",
  CAL_STEPPER_DECREASE: "הפחת",
  CAL_STEPPER_INCREASE: "הוסף",

  // Date navigator
  CAL_NAV_TODAY: "היום",
  CAL_NAV_PREV_DAY: "יום קודם",
  CAL_NAV_NEXT_DAY: "יום הבא",
  CAL_NAV_SHOWING_DATES: "מציג תאריכים:",
  CAL_NAV_GO_TODAY: "עבור להיום",

  // Calendar picker weekday headers (Sun→Sat)
  CAL_PICKER_WEEKDAYS: "א'|ב'|ג'|ד'|ה'|ו'|ש'",

  // Filter tray
  CAL_FILTER_TITLE: "סינון:",
  CAL_FILTER_STAFF: "איש צוות",
  CAL_FILTER_TREATMENT: "סוג טיפול",
  CAL_FILTER_SHIFT_STATUS: "סטטוס משמרת",
  CAL_FILTER_NO_OPTIONS: "אין אפשרויות",
  CAL_FILTER_CLEAR_SELECTION: "נקה בחירה",
  CAL_FILTER_REMOVE: "הסר פילטר",

  // Resource (staff) name prefixes by type
  CAL_RESOURCE_PREFIX_DOCTOR: 'ד"ר',
  CAL_RESOURCE_PREFIX_SPECIALIST: "מומחה",
  CAL_RESOURCE_PREFIX_HYGIENIST: "מר'/גב'",

  // Legend
  CAL_LEGEND_TITLE: "מקרא צבעים",
  CAL_LEGEND_OPEN: "פתח מקרא צבעים",
  CAL_LEGEND_APPT_STATUS: "סטטוס תור",
  CAL_LEGEND_SHIFT_TYPE: "סוג משמרת",

  // Grid / blocks
  CAL_GRID_ROOM_PREFIX: "חדר",
  CAL_GRID_DEFAULT_RESOURCE: "צוות רפואי",
  CAL_GRID_DEFAULT_APPOINTMENT: "תור חולה",
  CAL_HORIZONTAL_DATE: "תאריך",
  CAL_HORIZONTAL_WORKER_ROOM: "עובד, חדר",
  CAL_BLOCK_BOOK_APPOINTMENTS: "זימון תורים",
  CAL_BLOCK_ACTIVE: "פעילה",

  // Shift statuses
  CAL_SHIFT_STATUS_PUBLISHED: "Published",
  CAL_SHIFT_STATUS_CONFIRMED: "Confirmed",
  CAL_SHIFT_STATUS_TENTATIVE: "Tentative",

  // Shift types
  CAL_SHIFT_TYPE_REGULAR: "Regular",
  CAL_SHIFT_TYPE_INJECTIONS: "injections",
  CAL_SHIFT_TYPE_WHITENING: "whitening",
  CAL_SHIFT_TYPE_FIRST_AID: "first_aid",

  // Appointment statuses
  CAL_APPT_STATUS_SCHEDULED: "נקבע",
  CAL_APPT_STATUS_ACTIVE: "פעיל",
  CAL_APPT_STATUS_EXAMINATION: "בדיקה",
  CAL_APPT_STATUS_LAB_RETURNED: "עבודה חזרה ממעבדה",
  CAL_APPT_STATUS_CANCELLED: "בוטל",
  CAL_APPT_STATUS_BLOCKER: "חסימה",
  CAL_APPT_STATUS_STANDBY: "רשימת המתנה",

  // Errors
  CAL_ERR_LOAD_DATA: "אירעה שגיאה בטעינת הנתונים. אנא רענן את העמוד.",
  CAL_ERR_GENERIC: "אירעה שגיאה. אנא נסה שוב.",
  CAL_ERR_SERVER: "אירעה שגיאה בשרת.",



  // Modal titles
  CAL_MODAL_CREATE_SHIFT: "יצירת משמרת חדשה",
  CAL_MODAL_EDIT_SHIFT: "עריכת משמרת",
  CAL_MODAL_CREATE_APPT: "קביעת תור חדש",
  CAL_MODAL_EDIT_APPT: "עריכת תור",
  CAL_MODAL_CANCEL: "ביטול",
  CAL_MODAL_SAVE: "שמירה",
} as const;

// The set of valid label keys.
export type LabelKey = keyof typeof LABEL_DEFAULTS;

// The fully-resolved labels object returned by useLabels() - same shape as the defaults.
export type Labels = typeof LABEL_DEFAULTS;

// The raw { name: value } map shape returned from Apex.
export type LabelMap = Record<string, string>;
