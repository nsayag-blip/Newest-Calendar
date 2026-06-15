// src/types/engine.ts

export interface GridConfig {
  startMinutes: number;
  endMinutes: number;
}

export interface EngineColumn {
  id: string;
  date: string;
  headerLabel: string;
  isHighlight: boolean;
}

// The UI formatting rules
export interface BlockDisplayConfig {
  title: string;
  subtitle: string;
  statusText?: string;
  timeRange?: string;
  bgColor: string;
  borderColor: string;
  textColor?: string;
}

// The Engine Block proudly knows about its Display Config!
export interface EngineBlock<T = any> {
  id: string;
  columnId: string;
  startMinutes: number;
  endMinutes: number;
  itemType: "shift" | "appointment";
  payload: T;
  display: BlockDisplayConfig; // Baked right in
}

export interface RenderableBlock<T = any> extends EngineBlock<T> {
  position: {
    topPercent: number;
    heightPercent: number;
    widthPercent: number;
    leftPercent: number;
    zIndex: number;
  };
}

// Add to the bottom of src/types/engine.ts

export interface RangeGroup {
  id: string;
  date: string;
  label: string; // The Super-Header (e.g., "יום שלישי, 28.4")
  columns: EngineColumn[];
}
