// src/api/salesforce.ts
import { invokeRemote } from "../salesforce/utils/remote";
import {
  Shift,
  ServiceAppointment,
  ServiceTerritory,
  ServiceResource,
  ShiftWorkTopic,
  WorkType,
} from "../types/sf";

const CONTROLLER = "Calendar_Ctrl";

export const CalendarApi = {

  getClinics(): Promise<ServiceTerritory[]> {
    return invokeRemote<ServiceTerritory[]>(`${CONTROLLER}.getClinics`);
  },

  getRooms(clinicId: string): Promise<ServiceTerritory[]> {
    return invokeRemote<ServiceTerritory[]>(`${CONTROLLER}.getRooms`, clinicId);
  },

  getResources(clinicId: string): Promise<ServiceResource[]> {
    return invokeRemote<ServiceResource[]>(`${CONTROLLER}.getResources`, clinicId);
  },

  getShifts(clinicId: string, startDate: string, endDate: string): Promise<Shift[]> {
    return invokeRemote<Shift[]>(`${CONTROLLER}.getShifts`, clinicId, startDate, endDate);
  },

  getAppointments(clinicId: string, startDate: string, endDate: string): Promise<ServiceAppointment[]> {
    return invokeRemote<ServiceAppointment[]>(`${CONTROLLER}.getAppointments`, clinicId, startDate, endDate);
  },

  /** Fetches WorkType records available in this clinic's rooms via ServiceTerritoryWorkType. */
  getWorkTypes(clinicId: string): Promise<WorkType[]> {
    return invokeRemote<WorkType[]>(`${CONTROLLER}.getWorkTypes`, clinicId);
  },

  /** Fetches ShiftWorkTopic records for shifts in the given date range. */
  getShiftWorkTopics(clinicId: string, startDate: string, endDate: string): Promise<ShiftWorkTopic[]> {
    return invokeRemote<ShiftWorkTopic[]>(`${CONTROLLER}.getShiftWorkTopics`, clinicId, startDate, endDate);
  },
};