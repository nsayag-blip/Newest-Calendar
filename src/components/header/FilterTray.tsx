// // src/components/header/FilterTray.tsx
// import { useEffect, useMemo } from "react";
// import { useCalendarStore } from "../../store/appStore";
// import { useResources, useWorkTypes } from "../../hooks/useScheduling";
// import { SHIFT_STATUS_LABEL } from "../../constants/theme";
// import type { ShiftStatus } from "../../types/sf";

// // UI Components
// import FilterDropdown from "../ui/FilterDropdown";
// import Badge from "../ui/Badge";

// // The three statuses users can filter by in the shift calendar (per spec)
// const FILTERABLE_STATUSES: ShiftStatus[] = [
//   "Published",
//   "Confirmed",
//   "Tentative",
// ];

// export default function FilterTray() {
//   const {
//     filters,
//     toggleResourceFilter,
//     toggleWorkTypeFilter,
//     toggleShiftStatusFilter,
//     clearFilters,
//     viewType,
//     activeClinicId,
//   } = useCalendarStore();

//   const isRange = viewType === "range";

//   const { data: resources = [], isLoading: isLoadingResources } =
//     useResources(activeClinicId);
//   const { data: workTypes = [], isLoading: isLoadingWorkTypes } =
//     useWorkTypes(activeClinicId);

//   //console.log(JSON.stringify(resources, null, 2));

//   // ── Dropdown options ──────────────────────────────────────────────────────

//   const staffOptions = useMemo(
//     () =>
//       resources.map((r) => {
//         //const type = r.ResourceType?.toLowerCase() ?? "";
//         // let prefix = 'ד"ר';
//         // if (type.includes("specialist") || type.includes("מומחה"))
//         //   prefix = "מומחה";
//         // else if (type.includes("hygienist") || type.includes("שיננית"))
//         //   prefix = "מר'/גב'";
//         return { id: r.Id, label: `${r.Name}` };
//       }),
//     [resources],
//   );

//   // const RESOURCE_TYPE_PREFIX: Record<string, string> = {
//   //   T: 'ד"ר', // Technician — doctor
//   //   D: 'ד"ר', // Doctor (custom) — check your org
//   //   P: "פיזיו", // Physiotherapist? — check your org
//   //   C: "צוות", // Crew
//   //   S: "צוות", // Service Crew Member
//   //   A: "ציוד", // Asset — non-human
//   // };

//   // const staffOptions = useMemo(
//   //   () =>
//   //     resources.map((r) => {
//   //       const prefix = RESOURCE_TYPE_PREFIX[r.ResourceType ?? "T"] ?? 'ד"ר';
//   //       return { id: r.Id, label: `${prefix} ${r.Name}` };
//   //     }),
//   //   [resources],
//   // );

//   const workTypeOptions = useMemo(
//     () => workTypes.map((wt) => ({ id: wt.Id, label: wt.Name })),
//     [workTypes],
//   );

//   const statusOptions = useMemo(
//     () =>
//       FILTERABLE_STATUSES.map((s) => ({ id: s, label: SHIFT_STATUS_LABEL[s] })),
//     [],
//   );

//   // ── Fast lookup maps for pills ────────────────────────────────────────────

//   const staffMap = useMemo(
//     () => new Map(staffOptions.map((s) => [s.id, s])),
//     [staffOptions],
//   );
//   const workTypeMap = useMemo(
//     () => new Map(workTypeOptions.map((w) => [w.id, w])),
//     [workTypeOptions],
//   );
//   const statusMap = useMemo(
//     () => new Map(statusOptions.map((s) => [s.id, s])),
//     [statusOptions],
//   );

//   // ── Cleanup stale filters when clinic changes ─────────────────────────────

//   useEffect(() => {
//     if (!staffOptions.length) return;
//     const validIds = new Set(staffOptions.map((s) => s.id));
//     filters.resourceIds
//       .filter((id) => !validIds.has(id))
//       .forEach((id) => toggleResourceFilter(id));
//   }, [staffOptions, filters.resourceIds, toggleResourceFilter]);

//   useEffect(() => {
//     if (!workTypeOptions.length) return;
//     const validIds = new Set(workTypeOptions.map((w) => w.id));
//     filters.workTypeIds
//       .filter((id) => !validIds.has(id))
//       .forEach((id) => toggleWorkTypeFilter(id));
//   }, [workTypeOptions, filters.workTypeIds, toggleWorkTypeFilter]);

//   // ── Active filter state ───────────────────────────────────────────────────

//   const hasActiveFilters =
//     isRange &&
//     (filters.resourceIds.length > 0 ||
//       filters.workTypeIds.length > 0 ||
//       filters.shiftStatuses.length > 0);

//   return (
//     <div className="flex flex-col gap-3 px-6 py-3 bg-white border-b border-border shadow-sm">
//       {/* ── Top Controls ── */}
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div className="flex flex-wrap items-center gap-3">
//           <span className="text-sm font-bold text-text-secondary flex items-center gap-1.5 pe-2">
//             <svg
//               className="w-4 h-4 text-text-muted"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//               />
//             </svg>
//             סינון:
//           </span>

//           <FilterDropdown
//             label={isLoadingResources ? "טוען..." : "איש צוות"}
//             options={staffOptions}
//             selectedIds={filters.resourceIds}
//             onToggle={toggleResourceFilter}
//           />

//           <FilterDropdown
//             label={isLoadingWorkTypes ? "טוען..." : "סוג טיפול"}
//             options={workTypeOptions}
//             selectedIds={filters.workTypeIds}
//             onToggle={toggleWorkTypeFilter}
//           />

//           <FilterDropdown
//             label="סטטוס משמרת"
//             options={statusOptions}
//             selectedIds={filters.shiftStatuses}
//             onToggle={toggleShiftStatusFilter}
//           />
//         </div>

//         {hasActiveFilters && (
//           <button
//             onClick={clearFilters}
//             className="text-sm font-semibold text-destructive hover:text-destructive-hover hover:underline transition-colors"
//           >
//             נקה הכל
//           </button>
//         )}
//       </div>

//       {hasActiveFilters && (
//         <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border border-dashed">
//           {filters.resourceIds.map((id) => {
//             const doc = staffMap.get(id);
//             if (!doc) return null;
//             return (
//               <Badge
//                 key={`res_${id}`}
//                 color="staff"
//                 variant="pill"
//                 onRemove={() => toggleResourceFilter(id)}
//               >
//                 {doc.label}
//               </Badge>
//             );
//           })}

//           {filters.workTypeIds.map((id) => {
//             const wt = workTypeMap.get(id);
//             if (!wt) return null;
//             return (
//               <Badge
//                 key={`wt_${id}`}
//                 color="treatment"
//                 variant="pill"
//                 onRemove={() => toggleWorkTypeFilter(id)}
//               >
//                 {wt.label}
//               </Badge>
//             );
//           })}

//           {filters.shiftStatuses.map((id) => {
//             const status = statusMap.get(id as ShiftStatus);
//             if (!status) return null;
//             return (
//               <Badge
//                 key={`stat_${id}`}
//                 color="status"
//                 variant="pill"
//                 onRemove={() => toggleShiftStatusFilter(id)}
//               >
//                 {status.label}
//               </Badge>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/header/FilterTray.tsx
import { useEffect, useMemo } from "react";
import { useCalendarStore } from "../../store/appStore";
import { useResources, useWorkTypes } from "../../hooks/useScheduling";
import { SHIFT_STATUS_LABEL } from "../../constants/theme";
import type { ShiftStatus } from "../../types/sf";

// UI Components
import FilterDropdown from "../ui/FilterDropdown";
import Badge from "../ui/Badge";
import { decodeHtml } from "../../utils/string";

// The three statuses users can filter by in the shift calendar (per spec)
const FILTERABLE_STATUSES: ShiftStatus[] = [
  "Published",
  "Confirmed",
  "Tentative",
];

export default function FilterTray() {
  const {
    filters,
    toggleResourceFilter,
    toggleWorkTypeFilter,
    toggleShiftStatusFilter,
    clearFilters,
    viewType,
    activeClinicId,
  } = useCalendarStore();

  const isRange = viewType === "range";

  const { data: resources = [], isLoading: isLoadingResources } =
    useResources(activeClinicId);
  const { data: workTypes = [], isLoading: isLoadingWorkTypes } =
    useWorkTypes(activeClinicId);

  // ── Dropdown options ──────────────────────────────────────────────────────

  const staffOptions = useMemo(
    () =>
      resources.map((r) => {
        const type = r.ResourceType?.toLowerCase() ?? "";
        let prefix = 'ד"ר';
        if (type.includes("specialist") || type.includes("מומחה"))
          prefix = "מומחה";
        else if (type.includes("hygienist") || type.includes("שיננית"))
          prefix = "מר'/גב'";
        return { id: r.Id, label: `${prefix} ${decodeHtml(r.Name)}` };
      }),
    [resources],
  );

  const workTypeOptions = useMemo(
    () => workTypes.map((wt) => ({ id: wt.Id, label: decodeHtml(wt.Name) })),
    [workTypes],
  );

  const statusOptions = useMemo(
    () =>
      FILTERABLE_STATUSES.map((s) => ({ id: s, label: SHIFT_STATUS_LABEL[s] })),
    [],
  );

  // ── Fast lookup maps for pills ────────────────────────────────────────────

  const staffMap = useMemo(
    () => new Map(staffOptions.map((s) => [s.id, s])),
    [staffOptions],
  );
  const workTypeMap = useMemo(
    () => new Map(workTypeOptions.map((w) => [w.id, w])),
    [workTypeOptions],
  );
  const statusMap = useMemo(
    () => new Map(statusOptions.map((s) => [s.id, s])),
    [statusOptions],
  );

  // ── Cleanup stale filters when clinic changes ─────────────────────────────

  useEffect(() => {
    if (!staffOptions.length) return;
    const validIds = new Set(staffOptions.map((s) => s.id));
    filters.resourceIds
      .filter((id) => !validIds.has(id))
      .forEach((id) => toggleResourceFilter(id));
  }, [staffOptions, filters.resourceIds, toggleResourceFilter]);

  useEffect(() => {
    if (!workTypeOptions.length) return;
    const validIds = new Set(workTypeOptions.map((w) => w.id));
    filters.workTypeIds
      .filter((id) => !validIds.has(id))
      .forEach((id) => toggleWorkTypeFilter(id));
  }, [workTypeOptions, filters.workTypeIds, toggleWorkTypeFilter]);

  // ── Active filter state ───────────────────────────────────────────────────

  const hasActiveFilters =
    isRange &&
    (filters.resourceIds.length > 0 ||
      filters.workTypeIds.length > 0 ||
      filters.shiftStatuses.length > 0);

  return (
    <div className="flex flex-col gap-3 px-6 py-3 bg-white border-b border-border shadow-sm">
      {/* ── Top Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-text-secondary flex items-center gap-1.5 pe-2">
            <svg
              className="w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            סינון:
          </span>

          <FilterDropdown
            label={isLoadingResources ? "טוען..." : "איש צוות"}
            options={staffOptions}
            selectedIds={filters.resourceIds}
            onToggle={toggleResourceFilter}
            onClear={() => filters.resourceIds.forEach(toggleResourceFilter)}
          />

          <FilterDropdown
            label={isLoadingWorkTypes ? "טוען..." : "סוג טיפול"}
            options={workTypeOptions}
            selectedIds={filters.workTypeIds}
            onToggle={toggleWorkTypeFilter}
            onClear={() => filters.workTypeIds.forEach(toggleWorkTypeFilter)}
          />

          <FilterDropdown
            label="סטטוס משמרת"
            options={statusOptions}
            selectedIds={filters.shiftStatuses}
            onToggle={toggleShiftStatusFilter}
            onClear={() =>
              filters.shiftStatuses.forEach(toggleShiftStatusFilter)
            }
          />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-destructive hover:text-destructive-hover hover:underline transition-colors"
          >
            נקה הכל
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border border-dashed">
          {filters.resourceIds.map((id) => {
            const doc = staffMap.get(id);
            if (!doc) return null;
            return (
              <Badge
                key={`res_${id}`}
                color="staff"
                variant="pill"
                onRemove={() => toggleResourceFilter(id)}
              >
                {doc.label}
              </Badge>
            );
          })}

          {filters.workTypeIds.map((id) => {
            const wt = workTypeMap.get(id);
            if (!wt) return null;
            return (
              <Badge
                key={`wt_${id}`}
                color="treatment"
                variant="pill"
                onRemove={() => toggleWorkTypeFilter(id)}
              >
                {wt.label}
              </Badge>
            );
          })}

          {filters.shiftStatuses.map((id) => {
            const status = statusMap.get(id as ShiftStatus);
            if (!status) return null;
            return (
              <Badge
                key={`stat_${id}`}
                color="status"
                variant="pill"
                onRemove={() => toggleShiftStatusFilter(id)}
              >
                {status.label}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
