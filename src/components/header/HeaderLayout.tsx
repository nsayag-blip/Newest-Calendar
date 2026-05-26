// src/components/layout/HeaderLayout.tsx
import { useCalendarStore } from "../../store/appStore";
import GlobalContextBar from "./GlobalContextBar";
import ActionBar from "./ActionBar";
import FilterTray from "./FilterTray";

export default function HeaderLayout() {
  const isFilterTrayOpen = useCalendarStore((state) => state.isFilterTrayOpen);
  const viewType = useCalendarStore((state) => state.viewType);
  const showTray = isFilterTrayOpen || viewType === "range";

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] flex flex-col bg-white border-b border-border shadow-sm">
      <GlobalContextBar />
      <ActionBar />
      {showTray && <FilterTray />}
    </header>
  );
}
