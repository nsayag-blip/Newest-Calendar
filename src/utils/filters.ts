// src/utils/filters.ts
import type { Shift, ServiceAppointment, ShiftWorkTopic } from "../types/sf";
import type { FilterState } from "../types/calendar";

/**
 * Builds a Set of ShiftIds that have at least one of the selected WorkTypeIds
 * in their ShiftWorkTopic records. Used to power the treatment type filter.
 */
export const buildShiftIdsByWorkType = (
  shiftWorkTopics: ShiftWorkTopic[],
  selectedWorkTypeIds: string[],
): Set<string> => {
  if (!selectedWorkTypeIds.length) return new Set();
  const selected = new Set(selectedWorkTypeIds);
  const result = new Set<string>();
  for (const topic of shiftWorkTopics) {
    if (selected.has(topic.WorkTypeId)) result.add(topic.ShiftId);
  }
  return result;
};

export const applyFilters = <T extends Shift | ServiceAppointment>(
  items: T[],
  filters: FilterState,
  shiftWorkTopics: ShiftWorkTopic[] = [],
): T[] => {
  const { resourceIds, workTypeIds, shiftStatuses } = filters;

  if (!resourceIds.length && !workTypeIds.length && !shiftStatuses.length) {
    return items;
  }

  // Pre-compute the set once — not inside the loop
  const shiftIdsByWorkType = buildShiftIdsByWorkType(
    shiftWorkTopics,
    workTypeIds,
  );

  return items.filter((item) => {
    const isShift = "ShiftNumber" in item;

    // 1. Filter by Resource (Doctor)
    if (resourceIds.length > 0) {
      const resourceId = isShift
        ? (item as Shift).ServiceResourceId
        : (item as ServiceAppointment).Shift__r?.ServiceResourceId;
      if (!resourceId || !resourceIds.includes(resourceId)) return false;
    }

    // 2. Filter by Status (Shifts only)
    if (isShift && shiftStatuses.length > 0) {
      if (!shiftStatuses.includes((item as Shift).Status)) return false;
    }

    // 3. Filter by Work Type — checks ShiftWorkTopic, not shift.WorkTypeId
    if (workTypeIds.length > 0) {
      if (isShift) {
        // A shift passes if it has at least one matching ShiftWorkTopic
        if (!shiftIdsByWorkType.has((item as Shift).Id)) return false;
      } else {
        // An appointment passes if its WorkTypeId is directly selected
        const workTypeId = (item as ServiceAppointment).WorkTypeId;
        if (!workTypeId || !workTypeIds.includes(workTypeId)) return false;
      }
    }

    return true;
  });
};
