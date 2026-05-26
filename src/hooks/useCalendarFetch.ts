// src/hooks/useCalendarFetch.ts
// Responsible for ONE thing: fetching raw SF data and reporting loading state.
// No transforms, no business logic — just data in, loading state out.

import { useCalendarStore } from "../store/appStore";
import {
  useRooms, useResources, useShifts,
  useAppointments, useWorkTypes, useShiftWorkTopics,
} from "./useScheduling";

export function useCalendarFetch() {
  const { activeClinicId, appMode, selectedDate, viewType } = useCalendarStore();

  const isRange = viewType === "range";

  const { data: rooms        = [], isLoading: loadingRooms      } = useRooms(activeClinicId);
  const { data: resources    = [], isLoading: loadingResources  } = useResources(activeClinicId);
  const { data: shifts       = [], isLoading: loadingShifts     } = useShifts(activeClinicId, selectedDate, isRange);
  const { data: appointments = [], isLoading: loadingAppts      } = useAppointments(activeClinicId, selectedDate, isRange);
  const { data: workTypes    = [], isLoading: loadingWorkTypes  } = useWorkTypes(activeClinicId);
  const { data: shiftWorkTopics = [], isLoading: loadingTopics  } = useShiftWorkTopics(activeClinicId, selectedDate, isRange);

  // Appointment mode needs resources (to resolve doctor names). Shift mode does not.
  const shiftModeReady       = !loadingRooms && !loadingShifts && !loadingTopics;
  const appointmentModeReady = !loadingRooms && !loadingResources && !loadingShifts && !loadingAppts && !loadingTopics;
  const isFetching = appMode === "shift" ? !shiftModeReady : !appointmentModeReady;

  return { rooms, resources, shifts, appointments, workTypes, shiftWorkTopics, isFetching };
}