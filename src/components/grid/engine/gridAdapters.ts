// src/components/grid/engine/gridAdapters.ts
import { EngineColumn, EngineBlock, RangeGroup } from "../../../types/engine";
import {
  Shift,
  ServiceAppointment,
  ServiceTerritory,
  ServiceResource,
} from "../../../types/sf";
import {
  SHIFT_STATUS_BG,
  SHIFT_STATUS_BORDER,
  APPOINTMENT_STATUS_BG,
  SHIFT_STATUS_LABEL_KEY,
  APPOINTMENT_STATUS_LABEL_KEY,
} from "../../../constants/theme";
import type { Labels } from "../../../constants/labels";

import { decodeHtml } from "../../../utils/string";


// ── Helpers ───────────────────────────────────────────────

// SF remoting can return DateTime as either an ISO string or a JS Date object.
// We normalise to Date here so every helper is safe regardless.
const toDate = (value: string | Date): Date =>
  value instanceof Date ? value : new Date(value);

const extractMinutes = (value: string | Date): number => {
  const d = toDate(value);
  return d.getHours() * 60 + d.getMinutes();
};

const formatTimeRange = (start: string | Date, end: string | Date): string => {
  const fmt = (v: string | Date) => {
    const d = toDate(v);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
};
const formatResourceLabel = (
  resource: ServiceResource | undefined,
  labels: Labels,
): string => {
  if (!resource) return labels.CAL_GRID_DEFAULT_RESOURCE;
  return `${resource.Name}`;
};

// "חדר 3" style room label, using the (overridable) room prefix label.
const formatRoomLabel = (room: ServiceTerritory | undefined, roomId: string, labels: Labels): string => {
  const prefix = labels.CAL_GRID_ROOM_PREFIX;
  if (room?.Room_Number__c) return `${prefix} ${room.Room_Number__c}`;
  return room?.Name ?? `${prefix} ${roomId}`;
};

// ── Room + Doctor resolution ──────────────────────────────
// For appointments, room and doctor come via Shift__r relationship

const getAppointmentRoomId = (appt: ServiceAppointment): string | null =>
  appt.Shift__r?.ServiceTerritoryId ?? null;

const getAppointmentDoctorId = (appt: ServiceAppointment): string | null =>
  appt.Shift__r?.ServiceResourceId ?? null;

// ── Display Factories ─────────────────────────────────────

const buildShiftDisplay = (shift: Shift, labels: Labels, resource?: ServiceResource) => {
  const statusLabel = labels[SHIFT_STATUS_LABEL_KEY[shift.Status]] ?? shift.Status;
  const timeStr = formatTimeRange(shift.StartTime, shift.EndTime);

  return {
    title: formatResourceLabel(resource, labels),
    subtitle: `${statusLabel} · ${timeStr}`,
    timeRange: timeStr,
    statusText: statusLabel,
    bgColor: shift.BackgroundColor ?? SHIFT_STATUS_BG[shift.Status] ?? "#F3F2F2",
    borderColor: SHIFT_STATUS_BORDER[shift.Status] ?? "#DDDBDA",
  };
};

const buildAppointmentDisplay = (appt: ServiceAppointment, labels: Labels) => {
  const statusLabel = labels[APPOINTMENT_STATUS_LABEL_KEY[appt.Status]] ?? appt.Status;
  return {
    title: appt.Description ?? appt.Subject ?? labels.CAL_GRID_DEFAULT_APPOINTMENT,
    subtitle: `${statusLabel} · ${formatTimeRange(appt.SchedStartTime, appt.SchedEndTime)}`,
    bgColor: APPOINTMENT_STATUS_BG[appt.Status] ?? "#FFFFFF",
    borderColor: APPOINTMENT_STATUS_BG[appt.Status] ?? "#9E9E9E",
  };
};

const getLocalDateString = (value: string | Date): string => {
  const d = toDate(value);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};





// ── Shift Mode Adapter ────────────────────────────────────

export const adaptToShiftMode = (
  shifts: Shift[],
  rooms: ServiceTerritory[],
  resources: ServiceResource[],
  date: string,
  labels: Labels,
) => {

  const resourceMap = new Map(resources.map((r) => [r.Id, r]));

  const todaysShifts = shifts.filter(
    (s) => getLocalDateString(s.StartTime) === date,
  );

  // All rooms are always shown as columns — even ones with no shifts today.
  // This is intentional: empty columns tell staff that a room is available.
  const columns: EngineColumn[] = rooms.map((room) => {
    const headerLabel = `${labels.CAL_GRID_ROOM_PREFIX} ${decodeHtml(room.Room_Number__c?.toString() ?? "")}`;
    return {
      id: `room_${room.Id}`,
      date,
      headerLabel,
      isHighlight: false,
    };
  });

  const blocks: EngineBlock<Shift>[] = todaysShifts.map((shift) => ({
    id: shift.Id,
    columnId: `room_${shift.ServiceTerritoryId}`,
    startMinutes: extractMinutes(shift.StartTime),
    endMinutes: extractMinutes(shift.EndTime),
    itemType: "shift",
    payload: shift,
    display: buildShiftDisplay(shift, labels, resourceMap.get(shift.ServiceResourceId)),
  }));
  return { columns, blocks };
};

// ── Appointment Mode Adapter ──────────────────────────────

export const adaptToAppointmentMode = (
  appointments: ServiceAppointment[],
  shifts: Shift[],
  rooms: ServiceTerritory[],
  resources: ServiceResource[],
  date: string,
  labels: Labels,
) => {
  const todaysShifts = shifts.filter(
    (s) => getLocalDateString(s.StartTime) === date,
  );
  const todaysAppointments = appointments.filter(
    (a) => getLocalDateString(a.SchedStartTime) === date,
  );

  const roomMap = new Map(rooms.map((r) => [r.Id, r]));
  const resourceMap = new Map(resources.map((r) => [r.Id, r]));
  const columnsMap = new Map<string, EngineColumn>();

  todaysShifts.forEach((shift) => {
    const roomId = shift.ServiceTerritoryId;
    const doctorId = shift.ServiceResourceId;
    if (!roomId || !doctorId) return;

    const comboId = `combo_${roomId}_${doctorId}`;
    if (!columnsMap.has(comboId)) {
      const room = roomMap.get(roomId);
      const roomName = formatRoomLabel(room, roomId, labels);
      const resource = resourceMap.get(doctorId);
      columnsMap.set(comboId, {
        id: comboId,
        date,
        headerLabel: `${formatResourceLabel(resource, labels)}, ${roomName}`,
        isHighlight: false,
      });
    }
  });

  const columns = Array.from(columnsMap.values());

  const blocks: EngineBlock<ServiceAppointment>[] = todaysAppointments
    .map((appt) => {
      const roomId = getAppointmentRoomId(appt);
      const doctorId = getAppointmentDoctorId(appt);
      return {
        id: appt.Id,
        columnId: `combo_${roomId}_${doctorId}`,
        startMinutes: extractMinutes(appt.SchedStartTime),
        endMinutes: extractMinutes(appt.SchedEndTime),
        itemType: "appointment" as const,
        payload: appt,
        display: buildAppointmentDisplay(appt, labels),
      };
    })
    // Only keep appointments that belong to a shift column we built above.
    // Appointments with no matching shift (orphaned data) are silently dropped.
    .filter((block) => columnsMap.has(block.columnId));

  return { columns, blocks };
};

const dayNameFormatter = new Intl.DateTimeFormat("he-IL", { weekday: "long" });
const dayMonthFormatter = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "numeric",
});

export const adaptToRangeMode = (
  items: (Shift | ServiceAppointment)[],
  activeDates: string[],
  appMode: "shift" | "appointment",
  rooms: ServiceTerritory[],
  resources: ServiceResource[],
  labels: Labels,
) => {
  const roomMap = new Map(rooms.map((r) => [r.Id, r]));
  const resourceMap = new Map(resources.map((r) => [r.Id, r]));

  const groupsMap = new Map<string, RangeGroup>();
  const blocks: EngineBlock<Shift | ServiceAppointment>[] = [];

  // O(1) Lookup Set to replace the slow Array.find()
  const existingColumnIds = new Set<string>();

  items.forEach((item) => {
    const isShift = "ShiftNumber" in item;

    const startTimeStr = isShift
      ? (item as Shift).StartTime
      : (item as ServiceAppointment).SchedStartTime;
    const endTimeStr = isShift
      ? (item as Shift).EndTime
      : (item as ServiceAppointment).SchedEndTime;

    if (!startTimeStr || !endTimeStr) return;

    const dateStr = getLocalDateString(startTimeStr);
    if (!activeDates.includes(dateStr)) return;

    const roomId = isShift
      ? (item as Shift).ServiceTerritoryId
      : getAppointmentRoomId(item as ServiceAppointment);
    const doctorId = isShift
      ? (item as Shift).ServiceResourceId
      : getAppointmentDoctorId(item as ServiceAppointment);

    if (!roomId) return;

    let colId: string;
    let subLabel: string;

    if (appMode === "shift") {
      colId = `range_${dateStr}_room_${roomId}`;
      subLabel = formatRoomLabel(roomMap.get(roomId), roomId, labels);
    } else {
      if (!doctorId) return;
      colId = `range_${dateStr}_room_${roomId}_doc_${doctorId}`;
      const rName = formatRoomLabel(roomMap.get(roomId), roomId, labels);
      const resource = resourceMap.get(doctorId);
      subLabel = `${formatResourceLabel(resource, labels)}, ${rName}`;
    }

    // Create Group if it doesn't exist
    if (!groupsMap.has(dateStr)) {
      const dateObj = new Date(dateStr);
      groupsMap.set(dateStr, {
        id: `group_${dateStr}`,
        date: dateStr,
        label: `${dayNameFormatter.format(dateObj)}, ${dayMonthFormatter.format(dateObj)}`,
        columns: [],
      });
    }

    const group = groupsMap.get(dateStr)!;

    // O(1) Check using the Set!
    if (!existingColumnIds.has(colId)) {
      existingColumnIds.add(colId);
      group.columns.push({
        id: colId,
        date: dateStr,
        headerLabel: subLabel,
        isHighlight: false,
      });
    }

    const display = isShift
      ? buildShiftDisplay(
          item as Shift,
          labels,
          resourceMap.get((item as Shift).ServiceResourceId),
        )
      : buildAppointmentDisplay(item as ServiceAppointment, labels);

    blocks.push({
      id: isShift ? (item as Shift).Id : (item as ServiceAppointment).Id,
      columnId: colId,
      startMinutes: extractMinutes(startTimeStr),
      endMinutes: extractMinutes(endTimeStr),
      itemType: isShift ? "shift" : "appointment",
      payload: item,
      display,
    });
  });

  const groups = Array.from(groupsMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  groups.forEach((g) => {
    g.columns.sort((a, b) => a.headerLabel.localeCompare(b.headerLabel));
  });

  return { groups, blocks };
};
