// src/api/client.ts
import type {
  Shift,
  ServiceAppointment,
  ServiceTerritory,
  ServiceResource,
  ShiftWorkTopic,
  WorkType,
} from "../types/sf";
import {
  mockShifts,
  mockAppointments,
  mockRooms,
  mockResources,
  mockWorkTypes,
  mockShiftWorkTopics,
} from "../data/mockSalesforce";
import { CalendarApi } from "./salesforce";
import { UserContext } from "@/types/user";

const IS_LOCAL_DEV = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const salesforceApi = {
  async getClinics(): Promise<ServiceTerritory[]> {
    if (!IS_LOCAL_DEV) return CalendarApi.getClinics();
    await delay(300);
    return [
      {
        Id: "clinic_1",
        Name: "תל אביב מרכז (פיתוח)",
        Type__c: "Clinic" as const,
        ParentTerritoryId: null,
        Branch_Code__c: "10",
        Healthcare_Provider__c: null,
        IsActive: true,
        Room_Number__c: null,
        Room_Code__c: null,
        Room_Type__c: null,
        First_Aid__c: false,
      },
    ];
  },

  async getRooms(clinicId?: string): Promise<ServiceTerritory[]> {
    if (!IS_LOCAL_DEV && clinicId) return CalendarApi.getRooms(clinicId);
    await delay(400);
    return mockRooms;
  },

  async getServiceResources(clinicId?: string): Promise<ServiceResource[]> {
    if (!IS_LOCAL_DEV && clinicId)
      return CalendarApi.getServiceResources(clinicId);
    await delay(400);
    return mockResources;
  },

  async getShifts(
    clinicId: string,
    startDate: string,
    endDate: string,
  ): Promise<Shift[]> {
    const startIso = `${startDate}T00:00:00.000Z`;
    const endIso = `${endDate}T23:59:59.000Z`;
    if (!IS_LOCAL_DEV) return CalendarApi.getShifts(clinicId, startIso, endIso);
    await delay(800);
    return mockShifts.filter(
      (s) => s.StartTime >= startIso && s.StartTime <= endIso,
    );
  },

  async getAppointments(
    clinicId: string,
    startDate: string,
    endDate: string,
  ): Promise<ServiceAppointment[]> {
    if (!IS_LOCAL_DEV)
      return CalendarApi.getAppointments(clinicId, startDate, endDate);
    await delay(1200);
    return mockAppointments.filter(
      (a) =>
        a.SchedStartTime >= startDate &&
        a.SchedStartTime <= `${endDate}T23:59:59.000Z`,
    );
  },

  async getWorkTypes(clinicId: string): Promise<WorkType[]> {
    if (!IS_LOCAL_DEV) return CalendarApi.getWorkTypes(clinicId);
    await delay(300);
    return mockWorkTypes;
  },

  async getShiftWorkTopics(
    clinicId: string,
    startDate: string,
    endDate: string,
  ): Promise<ShiftWorkTopic[]> {
    const startIso = `${startDate}T00:00:00.000Z`;
    const endIso = `${endDate}T23:59:59.000Z`;
    if (!IS_LOCAL_DEV)
      return CalendarApi.getShiftWorkTopics(clinicId, startIso, endIso);
    await delay(400);
    // In mock mode, return topics for shifts in the date range
    const shiftsInRange = mockShifts.filter(
      (s) => s.StartTime >= startIso && s.StartTime <= endIso,
    );
    const shiftIds = new Set(shiftsInRange.map((s) => s.Id));
    return mockShiftWorkTopics.filter((t) => shiftIds.has(t.ShiftId));
  },

  async getCurrentUser(): Promise<UserContext> {
    if (!IS_LOCAL_DEV) {
      try {
        const data = await CalendarApi.getCurrentUser();
        // This log will print the exact JSON payload your Apex controller built!
        console.log("🌐 [API] Real Salesforce UserContext Returned:", JSON.parse(JSON.stringify(data)));
        return data;
      } catch (err) {
        console.error("🌐 [API] Real Salesforce ERROR:", err);
        throw err;
      }
    }

    // Simulate a network delay so we can see our loading spinner later
    await delay(600);

    // Return a perfectly typed mock user
    return {
      user: {
        Id: "u1",
        Name: "Local Admin",
        Email: "admin@test.com",
        ProfileId: "p1",
      },
      employee: null,
      profile: { Id: "p1", Name: "System Administrator", UserType: "Standard" },
      permissionSets: [],
      isSuperUser: true, // We will test as a Super User first
      mainClinic: null,
      tempClinics: [],
      nearClinics: [],
    };
  },



  // Inside src/api/client.ts
  async getAllClinics(): Promise<any[]> {
    console.log("🌐 [API] getAllClinics requested...");

    if (!IS_LOCAL_DEV) {
      // If hitting real Salesforce:
      try {
        const data = await CalendarApi.getAllClinics();
        console.log("🌐 [API] Real Salesforce returned:", data);
        return data;
      } catch (err) {
        console.error("🌐 [API] Real Salesforce ERROR:", err);
        throw err;
      }
    }
    
    // If using the local mock:
    await delay(300); 
    
    const mockData = [
      {
        Id: "clinic_1",
        Name: "תל אביב מרכז",
        Type__c: "Clinic",
        Branch_Code__c: "10",
        IsActive: true,
      },
      {
        Id: "clinic_2",
        Name: "חיפה והקריות",
        Type__c: "Clinic",
        Branch_Code__c: "20",
        IsActive: true,
      }
    ];

    console.log("🌐 [API] Local Mock returned:", mockData);
    return mockData;
  },
};
