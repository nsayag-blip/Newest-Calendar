// src/components/layout/ClinicDropdown.tsx
import { useCalendarStore } from "../../store/appStore";
import { useSession } from "../../hooks/useSession";
import { useUserClinics } from "../../hooks/useUserClinics";
import { useLabels } from "../../hooks/useLabels";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";

export default function ClinicDropdown() {
  const { activeClinicId, setActiveClinicId } = useCalendarStore();
  const labels = useLabels();

  // 1. Pull from the React Query cache (zero network cost!)
  const { data: userContext } = useSession();
  const { availableClinics, isLoadingClinics } = useUserClinics(userContext);

  // 2. Find the active mapped clinic based on the ID
  const activeMappedClinic = availableClinics.find(
    (mc) => mc.clinic.Id === activeClinicId,
  );
  const activeClinic = activeMappedClinic?.clinic;

  const displayLabel = isLoadingClinics
    ? labels.CAL_GENERAL_LOADING_SHORT
    : activeClinic?.Name || labels.CAL_CLINIC_CHOOSE;

  return (
    <div className="flex flex-col items-start">
      <span className="text-[10px] font-bold text-text-muted mb-0.5 pe-1 tracking-wide">
        {labels.CAL_CLINIC_CURRENT}
      </span>

      <Popover>
        <PopoverTrigger asChild>
          <button
            disabled={isLoadingClinics}
            className="group flex items-center gap-1 py-1 ps-1 pe-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 transition-colors hover:bg-surface"
          >
            <span className="text-sm font-bold text-brand truncate max-w-[180px]">
              {displayLabel}
            </span>
            <svg
              className="w-3.5 h-3.5 text-brand transition-transform duration-200 group-data-[state=open]:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={4} minWidth={220}>
          <div
            className="py-1 max-h-[300px] overflow-y-auto custom-scrollbar"
            role="listbox"
          >
            {availableClinics.length === 0 && !isLoadingClinics && (
              <div className="px-3 py-2 text-sm text-text-muted">
                {labels.CAL_CLINIC_NONE_AVAILABLE}
              </div>
            )}

            {availableClinics.map(({ clinic, access }) => {
              const isActive = clinic.Id === activeClinicId;
              const isViewOnly = access === "VIEW";

              return (
                <button
                  key={clinic.Id}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setActiveClinicId(clinic.Id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 text-sm text-start transition-colors
                    ${
                      isActive
                        ? "bg-brand-subtle text-brand font-bold"
                        : "text-text-primary hover:bg-surface-alt"
                    }
                  `}
                >
                  <div className="flex flex-col">
                    <span className="truncate pe-2">{clinic.Name}</span>
                    {/* Visual indicator for View-Only access */}
                    {isViewOnly && (
                      <span className="text-[10px] text-amber-700 mt-0.5 pe-2">
                        {labels.CAL_CLINIC_VIEW_ONLY_PAREN}
                      </span>
                    )}
                  </div>

                  {/* Active Checkmark */}
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-brand flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
