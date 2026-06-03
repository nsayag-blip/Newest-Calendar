// src/CalendarApp.tsx
import { useGridPipeline } from "./hooks/useGridPipeline";
import HeaderLayout from "./components/header/HeaderLayout";
import DayCanvas from "./components/grid/components/DayCanvas";
import RangeCanvas from "./components/grid/components/RangeCanvas";
import HorizontalCanvas from "./components/grid/components/HorizontalCanvas"; // <-- NEW
import { GRID_CONFIG } from "./constants/config";

function CalendarApp() {
  const { isFetching, activeClinicId, viewType, columns, groups, blocks } =
    useGridPipeline();

  const renderCanvas = () => {
    if (!activeClinicId || isFetching) return null;

    switch (viewType) {
      case "range":
        return (
          <RangeCanvas groups={groups} blocks={blocks} config={GRID_CONFIG} />
        );
      case "horizontal":
        // Feed it both columns and groups so it handles single-day or multi-day seamlessly
        return (
          <HorizontalCanvas
            columns={columns}
            groups={groups}
            blocks={blocks}
            config={GRID_CONFIG}
          />
        );
      case "day":
      default:
        return (
          <DayCanvas columns={columns} blocks={blocks} config={GRID_CONFIG} />
        );
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <HeaderLayout />

      <main className="flex-1 overflow-hidden bg-white relative">
        {isFetching && (
          <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">טוען נתונים...</p>
          </div>
        )}

        {renderCanvas()}
      </main>
    </div>
  );
}

export default CalendarApp;
