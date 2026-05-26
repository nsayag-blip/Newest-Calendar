// src/hooks/useGridPipeline.ts
// Responsible for ONE thing: transforming raw SF data into render-ready engine blocks.

import { useMemo } from "react";
import { useCalendarStore } from "../store/appStore";
import { addDays, format, parse } from "date-fns";
import {
  adaptToShiftMode,
  adaptToAppointmentMode,
  adaptToRangeMode,
} from "../components/grid/engine/gridAdapters";
import { useCalendarFetch } from "./useCalendarFetch";
import { applyFilters } from "../utils/filters";

export function useGridPipeline() {
  const { appMode, selectedDate, activeClinicId, viewType, filters } =
    useCalendarStore();
  const {
    rooms,
    resources,
    shifts,
    appointments,
    shiftWorkTopics,
    isFetching,
  } = useCalendarFetch();

  const isRange = viewType === "range";

  const activeDates = useMemo(() => {
    if (!isRange) return [selectedDate];
    const start = parse(selectedDate, "yyyy-MM-dd", new Date());
    return Array.from({ length: 30 }, (_, i) =>
      format(addDays(start, i), "yyyy-MM-dd"),
    );
  }, [selectedDate, isRange]);

  const { columns, groups, blocks } = useMemo(() => {
    if (isFetching || !activeClinicId)
      return { columns: [], groups: [], blocks: [] };

    // Pass shiftWorkTopics so work type filter checks ShiftWorkTopic records
    const filteredShifts = applyFilters(shifts, filters, shiftWorkTopics);
    const filteredAppointments = applyFilters(
      appointments,
      filters,
      shiftWorkTopics,
    );

    if (isRange) {
      const itemsToMap =
        appMode === "shift" ? filteredShifts : filteredAppointments;
      const { groups, blocks } = adaptToRangeMode(
        itemsToMap,
        activeDates,
        appMode,
        rooms,
        resources,
      );
      return { columns: [], groups, blocks };
    }

    if (appMode === "shift") {
      const { columns, blocks } = adaptToShiftMode(
        filteredShifts,
        rooms,
        selectedDate,
      );
      return { columns, groups: [], blocks };
    }

    const { columns, blocks } = adaptToAppointmentMode(
      filteredAppointments,
      filteredShifts,
      rooms,
      resources,
      selectedDate,
    );
    return { columns, groups: [], blocks };
  }, [
    appMode,
    selectedDate,
    shifts,
    appointments,
    rooms,
    resources,
    shiftWorkTopics,
    isFetching,
    activeClinicId,
    isRange,
    activeDates,
    filters,
  ]);

  return { isFetching, activeClinicId, viewType, columns, groups, blocks };
}
