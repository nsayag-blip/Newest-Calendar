// src/data/mockSalesforce.ts
import type {
  ServiceTerritory, ServiceResource,
  Shift, ServiceAppointment,
  WorkType, ShiftWorkTopic,
} from "../types/sf";
import { format, addDays } from "date-fns";

const TODAY = new Date();
export const MOCK_DATE            = format(TODAY, "yyyy-MM-dd");
export const NEXT_MOCK_DATE       = format(addDays(TODAY, 1), "yyyy-MM-dd");
export const NEXT_NEXT_MOCK_DATE  = format(addDays(TODAY, 2), "yyyy-MM-dd");

// ── Rooms ─────────────────────────────────────────────────────────────────────

export const mockRooms: ServiceTerritory[] = [
  { Id: "room_1",  Name: "חדר 1",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 1,  Room_Code__c: "01", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_2",  Name: "חדר 2",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 2,  Room_Code__c: "02", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_3",  Name: "חדר 3",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 3,  Room_Code__c: "03", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_4",  Name: "חדר 4",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 4,  Room_Code__c: "04", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_5",  Name: "חדר 5",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 5,  Room_Code__c: "05", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_6",  Name: "חדר 6",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 6,  Room_Code__c: "06", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_7",  Name: "חדר 7",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 7,  Room_Code__c: "07", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_8",  Name: "חדר 8",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 8,  Room_Code__c: "08", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_9",  Name: "חדר 9",  Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 9,  Room_Code__c: "09", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_10", Name: "חדר 10", Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 10, Room_Code__c: "10", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_11", Name: "חדר 11", Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 11, Room_Code__c: "11", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_12", Name: "חדר 12", Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 12, Room_Code__c: "12", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
  { Id: "room_13", Name: "חדר 13", Type__c: "Room", ParentTerritoryId: "clinic_1", Branch_Code__c: "10", Healthcare_Provider__c: "hp_1", Room_Number__c: 13, Room_Code__c: "13", Room_Type__c: "Regular", First_Aid__c: false, IsActive: true },
];

// ── Resources (Doctors) ───────────────────────────────────────────────────────

export const mockResources: ServiceResource[] = [
  { Id: "dr_cohen",   Name: "כהן",   ResourceType: "Technician", IsActive: true, RelatedRecordId: "u1", Description: "רופא כללי"   },
  { Id: "dr_levi",    Name: "לוי",   ResourceType: "Technician", IsActive: true, RelatedRecordId: "u2", Description: "רופא מומחה"  },
  { Id: "dr_saar",    Name: "סער",   ResourceType: "Technician", IsActive: true, RelatedRecordId: "u3", Description: "רופא ילדים"  },
  { Id: "dr_mizrahi", Name: "מזרחי", ResourceType: "Technician", IsActive: true, RelatedRecordId: "u4", Description: "רופא שיניים" },
];

// ── Work Types ────────────────────────────────────────────────────────────────

export const mockWorkTypes: WorkType[] = [
  { Id: "wt_checkup",    Name: "בדיקה שגרתית",  EstimatedDuration: 30 },
  { Id: "wt_filling",    Name: "סתימה",          EstimatedDuration: 45 },
  { Id: "wt_rootcanal",  Name: "טיפול שורש",     EstimatedDuration: 60 },
  { Id: "wt_injection",  Name: "הזרקה",          EstimatedDuration: 15 },
  { Id: "wt_whitening",  Name: "הלבנה",          EstimatedDuration: 90 },
  { Id: "wt_firstaid",   Name: "עזרה ראשונה",    EstimatedDuration: 20 },
];

// ── Shifts ────────────────────────────────────────────────────────────────────
// Statuses vary to enable testing the status filter.
// WorkTypeId is null on Shift — treatment types live on ShiftWorkTopic (see below).

export const mockShifts: Shift[] = [
  // Today
  { Id: "shift_1",  ShiftNumber: "S-001", Label: "משמרת בוקר",   StartTime: `${MOCK_DATE}T06:00:00.000Z`, EndTime: `${MOCK_DATE}T10:00:00.000Z`, Status: "Published",  Type: "Regular", ServiceTerritoryId: "room_1", ServiceResourceId: "dr_cohen",   WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_2",  ShiftNumber: "S-002", Label: "משמרת צהריים",  StartTime: `${MOCK_DATE}T09:00:00.000Z`, EndTime: `${MOCK_DATE}T13:00:00.000Z`, Status: "Published",  Type: "Regular", ServiceTerritoryId: "room_1", ServiceResourceId: "dr_levi",    WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_3",  ShiftNumber: "S-003", Label: "משמרת בוקר",   StartTime: `${MOCK_DATE}T08:00:00.000Z`, EndTime: `${MOCK_DATE}T14:00:00.000Z`, Status: "Confirmed",  Type: "Regular", ServiceTerritoryId: "room_3", ServiceResourceId: "dr_saar",    WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_4",  ShiftNumber: "S-004", Label: "משמרת מלאה",   StartTime: `${MOCK_DATE}T09:00:00.000Z`, EndTime: `${MOCK_DATE}T15:00:00.000Z`, Status: "Confirmed",  Type: "Regular", ServiceTerritoryId: "room_4", ServiceResourceId: "dr_mizrahi", WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_5",  ShiftNumber: "S-005", Label: "משמרת צהריים",  StartTime: `${MOCK_DATE}T10:00:00.000Z`, EndTime: `${MOCK_DATE}T16:00:00.000Z`, Status: "Tentative",  Type: "Regular", ServiceTerritoryId: "room_5", ServiceResourceId: "dr_levi",    WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_5b", ShiftNumber: "S-005B", Label: "משמרת הזרקות", StartTime: `${MOCK_DATE}T07:00:00.000Z`, EndTime: `${MOCK_DATE}T11:00:00.000Z`, Status: "Published",  Type: "Regular", ServiceTerritoryId: "room_6", ServiceResourceId: "dr_cohen",   WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  // Tomorrow
  { Id: "shift_6",  ShiftNumber: "S-006", Label: "משמרת בוקר",   StartTime: `${NEXT_MOCK_DATE}T06:00:00.000Z`, EndTime: `${NEXT_MOCK_DATE}T10:00:00.000Z`, Status: "Published",  Type: "Regular", ServiceTerritoryId: "room_2", ServiceResourceId: "dr_cohen",   WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_7",  ShiftNumber: "S-007", Label: "משמרת צהריים",  StartTime: `${NEXT_MOCK_DATE}T09:00:00.000Z`, EndTime: `${NEXT_MOCK_DATE}T13:00:00.000Z`, Status: "Published",  Type: "Regular", ServiceTerritoryId: "room_2", ServiceResourceId: "dr_levi",    WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_8",  ShiftNumber: "S-008", Label: "משמרת בוקר",   StartTime: `${NEXT_MOCK_DATE}T08:00:00.000Z`, EndTime: `${NEXT_MOCK_DATE}T14:00:00.000Z`, Status: "Confirmed",  Type: "Regular", ServiceTerritoryId: "room_3", ServiceResourceId: "dr_saar",    WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  // Day after tomorrow
  { Id: "shift_9",  ShiftNumber: "S-009", Label: "משמרת מלאה",   StartTime: `${NEXT_NEXT_MOCK_DATE}T09:00:00.000Z`, EndTime: `${NEXT_NEXT_MOCK_DATE}T15:00:00.000Z`, Status: "Tentative",  Type: "Regular", ServiceTerritoryId: "room_4", ServiceResourceId: "dr_mizrahi", WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
  { Id: "shift_10", ShiftNumber: "S-010", Label: "משמרת צהריים",  StartTime: `${NEXT_NEXT_MOCK_DATE}T10:00:00.000Z`, EndTime: `${NEXT_NEXT_MOCK_DATE}T16:00:00.000Z`, Status: "Published",  Type: "Regular", ServiceTerritoryId: "room_5", ServiceResourceId: "dr_levi",    WorkTypeId: null, TimeSlotType: "Normal", RecurrencePattern: null, BackgroundColor: null },
];

// ── Shift Work Topics ─────────────────────────────────────────────────────────
// Each row says: "this shift supports this work type".
// A shift can have multiple topics (multiple treatment types available).
// This is what powers the treatment type filter.

export const mockShiftWorkTopics: ShiftWorkTopic[] = [
  // shift_1 (dr_cohen, room_1): checkup + filling
  { Id: "swt_1a", ShiftId: "shift_1", WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 8,  MaxAppointments: 10 },
  { Id: "swt_1b", ShiftId: "shift_1", WorkTypeId: "wt_filling",   WorkTypeGroupId: null, ServiceAppointmentLimit: 4,  MaxAppointments: 5  },

  // shift_2 (dr_levi, room_1): checkup + root canal
  { Id: "swt_2a", ShiftId: "shift_2", WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 6,  MaxAppointments: 8  },
  { Id: "swt_2b", ShiftId: "shift_2", WorkTypeId: "wt_rootcanal", WorkTypeGroupId: null, ServiceAppointmentLimit: 3,  MaxAppointments: 4  },

  // shift_3 (dr_saar, room_3): checkup only
  { Id: "swt_3a", ShiftId: "shift_3", WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 10, MaxAppointments: 12 },

  // shift_4 (dr_mizrahi, room_4): filling + root canal
  { Id: "swt_4a", ShiftId: "shift_4", WorkTypeId: "wt_filling",   WorkTypeGroupId: null, ServiceAppointmentLimit: 5,  MaxAppointments: 6  },
  { Id: "swt_4b", ShiftId: "shift_4", WorkTypeId: "wt_rootcanal", WorkTypeGroupId: null, ServiceAppointmentLimit: 2,  MaxAppointments: 3  },

  // shift_5 (dr_levi, room_5): checkup only (tentative)
  { Id: "swt_5a", ShiftId: "shift_5", WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 6,  MaxAppointments: 8  },

  // shift_5b (dr_cohen, room_6): injections only
  { Id: "swt_5c", ShiftId: "shift_5b", WorkTypeId: "wt_injection", WorkTypeGroupId: null, ServiceAppointmentLimit: 12, MaxAppointments: 15 },

  // Tomorrow's shifts
  { Id: "swt_6a", ShiftId: "shift_6",  WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 8,  MaxAppointments: 10 },
  { Id: "swt_6b", ShiftId: "shift_6",  WorkTypeId: "wt_whitening", WorkTypeGroupId: null, ServiceAppointmentLimit: 2,  MaxAppointments: 2  },
  { Id: "swt_7a", ShiftId: "shift_7",  WorkTypeId: "wt_rootcanal", WorkTypeGroupId: null, ServiceAppointmentLimit: 4,  MaxAppointments: 5  },
  { Id: "swt_8a", ShiftId: "shift_8",  WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 10, MaxAppointments: 12 },

  // Day after tomorrow
  { Id: "swt_9a",  ShiftId: "shift_9",  WorkTypeId: "wt_filling",   WorkTypeGroupId: null, ServiceAppointmentLimit: 5, MaxAppointments: 6 },
  { Id: "swt_10a", ShiftId: "shift_10", WorkTypeId: "wt_checkup",   WorkTypeGroupId: null, ServiceAppointmentLimit: 8, MaxAppointments: 10 },
  { Id: "swt_10b", ShiftId: "shift_10", WorkTypeId: "wt_injection", WorkTypeGroupId: null, ServiceAppointmentLimit: 6, MaxAppointments: 8  },
];

// ── Appointments ──────────────────────────────────────────────────────────────

export const mockAppointments: ServiceAppointment[] = [
  { Id: "appt_1",        AppointmentNumber: "A-001", SchedStartTime: `${MOCK_DATE}T07:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T07:30:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_1",       WorkTypeId: "wt_checkup",   CancellationReason: null,              ServiceNote: "בדיקת שיניים",      Description: "חזרה לטיפול שורש",       Subject: null, Shift__c: "shift_1", Shift__r: { ServiceResourceId: "dr_cohen",   ServiceTerritoryId: "room_1" } },
  { Id: "appt_2",        AppointmentNumber: "A-002", SchedStartTime: `${MOCK_DATE}T07:45:00.000Z`, SchedEndTime: `${MOCK_DATE}T08:15:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_2",       WorkTypeId: "wt_filling",   CancellationReason: null,              ServiceNote: "בדיקת לחץ דם",      Description: "המשך מעקב לחץ דם",       Subject: null, Shift__c: "shift_1", Shift__r: { ServiceResourceId: "dr_cohen",   ServiceTerritoryId: "room_1" } },
  { Id: "appt_3",        AppointmentNumber: "A-003", SchedStartTime: `${MOCK_DATE}T09:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T09:30:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_3",       WorkTypeId: "wt_checkup",   CancellationReason: null,              ServiceNote: "הערכה ראשונית",      Description: "פגישת ייעוץ",            Subject: null, Shift__c: "shift_2", Shift__r: { ServiceResourceId: "dr_levi",    ServiceTerritoryId: "room_1" } },
  { Id: "appt_4",        AppointmentNumber: "A-004", SchedStartTime: `${MOCK_DATE}T09:45:00.000Z`, SchedEndTime: `${MOCK_DATE}T10:15:00.000Z`, Status: "examination",  StatusCategory: "Published", AccountId: "patient_4",       WorkTypeId: "wt_rootcanal", CancellationReason: null,              ServiceNote: "בדיקת שיניים",      Description: "הכנה להנחת כתרים",       Subject: null, Shift__c: "shift_2", Shift__r: { ServiceResourceId: "dr_levi",    ServiceTerritoryId: "room_1" } },
  { Id: "appt_5",        AppointmentNumber: "A-005", SchedStartTime: `${MOCK_DATE}T08:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T08:30:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_5",       WorkTypeId: "wt_checkup",   CancellationReason: null,              ServiceNote: "טיפת חיסון",         Description: "חיסון שגרה",             Subject: null, Shift__c: "shift_3", Shift__r: { ServiceResourceId: "dr_saar",    ServiceTerritoryId: "room_3" } },
  { Id: "appt_6",        AppointmentNumber: "A-006", SchedStartTime: `${MOCK_DATE}T09:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T09:45:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_6",       WorkTypeId: "wt_checkup",   CancellationReason: null,              ServiceNote: "בדיקת תינוק",        Description: "מבחן שמיעה",             Subject: null, Shift__c: "shift_3", Shift__r: { ServiceResourceId: "dr_saar",    ServiceTerritoryId: "room_3" } },
  { Id: "appt_7",        AppointmentNumber: "A-007", SchedStartTime: `${MOCK_DATE}T09:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T10:30:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_7",       WorkTypeId: "wt_filling",   CancellationReason: null,              ServiceNote: "בדיקת פה",           Description: "טיפול חירום שיניים",    Subject: null, Shift__c: "shift_4", Shift__r: { ServiceResourceId: "dr_mizrahi", ServiceTerritoryId: "room_4" } },
  { Id: "appt_8",        AppointmentNumber: "A-008", SchedStartTime: `${MOCK_DATE}T10:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T11:30:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_8",       WorkTypeId: "wt_rootcanal", CancellationReason: null,              ServiceNote: "המשך טיפול",         Description: "בדיקת מעקב",             Subject: null, Shift__c: "shift_5", Shift__r: { ServiceResourceId: "dr_levi",    ServiceTerritoryId: "room_5" } },
  { Id: "appt_cancelled",AppointmentNumber: "A-009", SchedStartTime: `${MOCK_DATE}T11:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T11:30:00.000Z`, Status: "cancelled",    StatusCategory: "Cancelled", AccountId: "patient_9",       WorkTypeId: "wt_checkup",   CancellationReason: "המטופל ביטל",    ServiceNote: "ביטול בדיעבד",      Description: "תור מבוטל",             Subject: null, Shift__c: "shift_3", Shift__r: { ServiceResourceId: "dr_saar",    ServiceTerritoryId: "room_3" } },
  { Id: "appt_blocker",  AppointmentNumber: "A-010", SchedStartTime: `${MOCK_DATE}T12:00:00.000Z`, SchedEndTime: `${MOCK_DATE}T13:00:00.000Z`, Status: "blocker",      StatusCategory: "Blocked",   AccountId: "patient_blocker", WorkTypeId: null,            CancellationReason: null,              ServiceNote: "חסום לשינויים",     Description: "חסום זמן עבור ניקוי חדר", Subject: null, Shift__c: "shift_4", Shift__r: { ServiceResourceId: "dr_mizrahi", ServiceTerritoryId: "room_4" } },
  { Id: "appt_overlap_1",AppointmentNumber: "A-011", SchedStartTime: `${MOCK_DATE}T08:30:00.000Z`, SchedEndTime: `${MOCK_DATE}T09:00:00.000Z`, Status: "Scheduled",    StatusCategory: "Published", AccountId: "patient_11",      WorkTypeId: "wt_filling",   CancellationReason: null,              ServiceNote: "בדיקה דחופה",        Description: "טיפול חירום",            Subject: null, Shift__c: "shift_1", Shift__r: { ServiceResourceId: "dr_cohen",   ServiceTerritoryId: "room_1" } },
  { Id: "appt_12",       AppointmentNumber: "A-012", SchedStartTime: `${NEXT_MOCK_DATE}T07:00:00.000Z`, SchedEndTime: `${NEXT_MOCK_DATE}T07:30:00.000Z`, Status: "Scheduled", StatusCategory: "Published", AccountId: "patient_12", WorkTypeId: "wt_checkup",   CancellationReason: null,              ServiceNote: "בדיקת שיניים",      Description: "בדיקת שיניים דחופה",    Subject: null, Shift__c: "shift_6", Shift__r: { ServiceResourceId: "dr_cohen",   ServiceTerritoryId: "room_2" } },
];