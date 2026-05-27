// src/components/header/HeaderLayout.tsx
import { useCalendarStore } from "../../store/appStore";
import TopBar from "./TopBar";
import ActionBar from "./ActionBar";
import FilterTray from "./FilterTray";

export default function HeaderLayout() {
  const isFilterTrayOpen = useCalendarStore((state) => state.isFilterTrayOpen);
  const viewType = useCalendarStore((state) => state.viewType);
  const showTray = isFilterTrayOpen || viewType === "range";

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] flex flex-col bg-white shadow-sm">
      <TopBar />
      <ActionBar />
      {showTray && <FilterTray />}
    </header>
  );
}
