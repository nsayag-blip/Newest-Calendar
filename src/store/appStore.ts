// src/store/appStore.ts
import { create } from "zustand";
import { addDays, subDays, format, parse } from "date-fns";
import type {
  ViewType,
  AppMode,
  TimeDensity,
  ColumnDensity,
  FilterState,
  DraftPayload,
} from "../types/calendar";
import type { Shift, ServiceAppointment } from "../types/sf";
import {
  TIME_DENSITY_DEFAULT,
  COLUMN_DENSITY_DEFAULT,
} from "../constants/theme";

// ── Pure helpers (no Zustand dependency) ─────────────────

// Utility to toggle an item in an array (add if missing, remove if present)
const toggleArrayItem = <T>(arr: T[], item: T): T[] =>
  arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

const hasActiveFilters = (filters: FilterState): boolean =>
  filters.resourceIds.length > 0 ||
  filters.workTypeIds.length > 0 ||
  filters.shiftStatuses.length > 0;

// When any filter is active, switch to range view so results are visible.
const resolveViewType = (filters: FilterState, current: ViewType): ViewType => {
  if (hasActiveFilters(filters) && current !== "horizontal") return "range";
  if (!hasActiveFilters(filters) && current === "range") return "day";
  return current;
};

// ── State interface ───────────────────────────────────────

interface CalendarState {
  // ── Core Context ──
  activeClinicId: string | null;
  appMode: AppMode;
  selectedDate: string; // "YYYY-MM-DD"

  // ── View & Display Settings ──
  viewType: ViewType;
  showHebrewDate: boolean;
  timeDensity: TimeDensity;
  columnDensity: ColumnDensity;
  isFilterTrayOpen: boolean;

  // ── Filters ──
  filters: FilterState;

  // ── Actions ──
  setActiveClinicId: (id: string) => void;
  setAppMode: (mode: AppMode) => void;
  setSelectedDate: (date: string) => void;
  setViewType: (view: ViewType) => void;
  nextDay: () => void;
  prevDay: () => void;
  setShowHebrewDate: (show: boolean) => void;
  setTimeDensity: (density: TimeDensity) => void;
  setColumnDensity: (density: ColumnDensity) => void;
  toggleFilterTray: () => void;
  toggleHebrewDate: () => void;
  toggleResourceFilter: (resourceId: string) => void;
  toggleWorkTypeFilter: (workTypeId: string) => void;
  toggleShiftStatusFilter: (status: string) => void;
  clearFilters: () => void;

  // modal state
  modal: ModalState;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
}

const EMPTY_FILTERS: FilterState = {
  resourceIds: [],
  workTypeIds: [],
  shiftStatuses: [],
};

export type ModalState =
  | { type: null }
  | { type: "shiftView"; payload: Shift }
  | { type: "appointmentView"; payload: ServiceAppointment }
  | { type: "draftShift"; payload: DraftPayload }
  | { type: "draftAppointment"; payload: DraftPayload };

// ── Store ─────────────────────────────────────────────────

export const useCalendarStore = create<CalendarState>((set) => ({
  // ── Initial State ──
  activeClinicId: null,
  appMode: "shift",
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  viewType: "day",
  showHebrewDate: false,
  timeDensity: TIME_DENSITY_DEFAULT,
  columnDensity: COLUMN_DENSITY_DEFAULT,
  isFilterTrayOpen: false,
  filters: EMPTY_FILTERS,

  // ── Actions ──
  setActiveClinicId: (id) => set({ activeClinicId: id }),
  setAppMode: (mode) => set({ appMode: mode }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setViewType: (view) => set({ viewType: view }),

  nextDay: () =>
    set((state) => ({
      selectedDate: format(
        addDays(parse(state.selectedDate, "yyyy-MM-dd", new Date()), 1),
        "yyyy-MM-dd",
      ),
    })),

  prevDay: () =>
    set((state) => ({
      selectedDate: format(
        subDays(parse(state.selectedDate, "yyyy-MM-dd", new Date()), 1),
        "yyyy-MM-dd",
      ),
    })),

  setShowHebrewDate: (show) => set({ showHebrewDate: show }),
  setTimeDensity: (density) => set({ timeDensity: density }),
  setColumnDensity: (density) => set({ columnDensity: density }),
  toggleFilterTray: () =>
    set((state) => ({ isFilterTrayOpen: !state.isFilterTrayOpen })),
  toggleHebrewDate: () =>
    set((state) => ({ showHebrewDate: !state.showHebrewDate })),

  toggleResourceFilter: (resourceId) =>
    set((state) => {
      const newFilters = {
        ...state.filters,
        resourceIds: toggleArrayItem(state.filters.resourceIds, resourceId),
      };
      return {
        filters: newFilters,
        viewType: resolveViewType(newFilters, state.viewType),
      };
    }),

  toggleWorkTypeFilter: (workTypeId) =>
    set((state) => {
      const newFilters = {
        ...state.filters,
        workTypeIds: toggleArrayItem(state.filters.workTypeIds, workTypeId),
      };
      return {
        filters: newFilters,
        viewType: resolveViewType(newFilters, state.viewType),
      };
    }),

  toggleShiftStatusFilter: (status) =>
    set((state) => {
      const newFilters = {
        ...state.filters,
        shiftStatuses: toggleArrayItem(state.filters.shiftStatuses, status),
      };
      return {
        filters: newFilters,
        viewType: resolveViewType(newFilters, state.viewType),
      };
    }),

  clearFilters: () => set({ filters: EMPTY_FILTERS, viewType: "day" }),

  modal: { type: null },
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: { type: null } }),
}));
