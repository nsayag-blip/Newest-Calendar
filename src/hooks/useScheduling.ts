// src/hooks/useScheduling.ts
import { useQuery } from "@tanstack/react-query";
import { salesforceApi } from "../api/client";
import { addDays, format, parse } from "date-fns";

// ── NEW HELPER: Single source of truth for date calculations ──
const calculateDateRange = (baseDate: string, isRange: boolean) => {
  return isRange
    ? format(
        addDays(parse(baseDate, "yyyy-MM-dd", new Date()), 30),
        "yyyy-MM-dd",
      )
    : baseDate;
};

export function useClinics() {
  return useQuery({
    queryKey: ["clinics"],
    queryFn: () => salesforceApi.getClinics(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useRooms(clinicId: string | null) {
  return useQuery({
    queryKey: ["rooms", clinicId],
    queryFn: () => salesforceApi.getRooms(clinicId!),
    enabled: !!clinicId,
    staleTime: 1000 * 60 * 60,
  });
}

export function useResources(clinicId: string | null) {
  return useQuery({
    queryKey: ["resources", clinicId],
    queryFn: () => salesforceApi.getServiceResources(clinicId!),
    enabled: !!clinicId,
    staleTime: 1000 * 60 * 60,
  });
}

export function useShifts(
  clinicId: string | null,
  date: string,
  isRange: boolean,
) {
  return useQuery({
    queryKey: ["shifts", clinicId, date, isRange ? "range" : "daily"],
    queryFn: () =>
      salesforceApi.getShifts(
        clinicId!,
        date,
        calculateDateRange(date, isRange),
      ),
    enabled: !!clinicId && !!date,
    staleTime: 1000 * 60, // 60 seconds buffer to prevent API spam
    retry: false,
  });
}

export function useAppointments(
  clinicId: string | null,
  date: string,
  isRange: boolean,
) {
  return useQuery({
    queryKey: ["appointments", clinicId, date, isRange ? "range" : "daily"],
    queryFn: () =>
      salesforceApi.getAppointments(
        clinicId!,
        date,
        calculateDateRange(date, isRange),
      ),
    enabled: !!clinicId && !!date,
    staleTime: 1000 * 60, // 60 seconds buffer to prevent API spam
    retry: false, //
  });
}

/** WorkTypes available in this clinic's rooms — used to populate the treatment filter dropdown. */
export function useWorkTypes(clinicId: string | null) {
  return useQuery({
    queryKey: ["workTypes", clinicId],
    queryFn: () => salesforceApi.getWorkTypes(clinicId!),
    enabled: !!clinicId,
    staleTime: 1000 * 60 * 60, // Treatment types rarely change
  });
}

/** ShiftWorkTopic records for the date range — needed to filter shifts by treatment type. */
export function useShiftWorkTopics(
  clinicId: string | null,
  date: string,
  isRange: boolean,
) {
  return useQuery({
    queryKey: ["shiftWorkTopics", clinicId, date, isRange ? "range" : "daily"],
    queryFn: () =>
      salesforceApi.getShiftWorkTopics(
        clinicId!,
        date,
        calculateDateRange(date, isRange),
      ),
    enabled: !!clinicId && !!date,
    staleTime: 1000 * 60, // 60 seconds buffer to prevent API spam
  });
}
