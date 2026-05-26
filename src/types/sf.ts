// src/types/sf.ts

export type ShiftStatus = "Published" | "Confirmed" | "Tentative";
export type ShiftType =
  | "Regular"
  | "regular"
  | "injections"
  | "whitening"
  | "first_aid";
export type AppointmentStatus =
  | "Scheduled"
  | "active"
  | "examination"
  | "lab_returned"
  | "cancelled"
  | "blocker"
  | "standby";
export type TerritoryType = "Clinic" | "Room";

export interface ServiceTerritory {
  Id: string;
  Name: string;
  Type__c: TerritoryType;
  ParentTerritoryId: string | null;
  Branch_Code__c: string | null;
  Healthcare_Provider__c: string | null;
  IsActive: boolean;
  Room_Number__c: number | null;
  Room_Code__c: string | null;
  Room_Type__c: string | null;
  First_Aid__c: boolean;
}

export interface ServiceResource {
  Id: string;
  Name: string;
  ResourceType: string | null;
  IsActive: boolean;
  RelatedRecordId: string | null;
  Description: string | null;
}

export interface Shift {
  Id: string;
  ShiftNumber: string;
  Label: string | null;
  StartTime: string | Date;
  EndTime: string | Date;
  Status: ShiftStatus;
  Type: ShiftType | null;
  ServiceResourceId: string;
  ServiceTerritoryId: string;
  WorkTypeId: string | null;
  TimeSlotType: string;
  RecurrencePattern: string | null;
  BackgroundColor: string | null;
}

export interface ServiceAppointment {
  Id: string;
  AppointmentNumber: string;
  SchedStartTime: string | Date;
  SchedEndTime: string | Date;
  AccountId: string | null;
  WorkTypeId: string | null;
  Status: AppointmentStatus;
  StatusCategory: string | null;
  CancellationReason: string | null;
  ServiceNote: string | null;
  Description: string | null;
  Subject: string | null;
  // Room + Doctor come through the parent Shift relationship
  Shift__c: string | null;
  Shift__r: {
    ServiceResourceId: string;
    ServiceTerritoryId: string;
  } | null;
}

export interface WorkType {
  Id: string;
  Name: string;
  EstimatedDuration: number;
}

export interface Holiday {
  Id: string;
  Name: string;
  ActivityDate: string;
}

export interface ServiceTerritoryMember {
  Id: string;
  ServiceResourceId: string;
  ServiceTerritoryId: string;
  EffectiveStartDate: string;
  EffectiveEndDate: string | null;
}

export interface ResourceAbsence {
  Id: string;
  ResourceId: string;
  Start: string;
  End: string;
  Type: string;
}
export interface ShiftWorkTopic {
  Id: string;
  ShiftId: string;
  WorkTypeId: string;
  WorkTypeGroupId: string | null;
  ServiceAppointmentLimit: number | null;
  MaxAppointments: number | null;
}
