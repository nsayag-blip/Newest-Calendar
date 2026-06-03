// src/components/grid/engine/gridMetrics.ts

/**
 * Calculates the physical pixel dimensions of the grid based on the current time density.
 */
export const getGridMetrics = (timeDensity: number) => {
  const PIXELS_PER_BLOCK = 48;
  const pixelsPerMinute = PIXELS_PER_BLOCK / timeDensity;
  const hourHeightPx = pixelsPerMinute * 60;

  return {
    pixelsPerMinute,
    hourHeightPx,
    blockHeightPx: PIXELS_PER_BLOCK,
  };
};

/**
 * Translates a physical mouse Y-coordinate into a snapped logical time.
 */
export const calculateSnappedTime = (
  offsetY: number,
  timeDensity: number,
  pixelsPerMinute: number,
  gridStartMinutes: number,
) => {
  // 1. Convert pixels to raw minutes since the start of the grid
  const rawMinutesFromStart = offsetY / pixelsPerMinute;

  // 2. Snap down to the nearest density block (e.g., 17 mins snaps to 15 mins)
  const snappedMinutes =
    Math.floor(rawMinutesFromStart / timeDensity) * timeDensity;

  // 3. Add the grid's start time (e.g., 07:00 = 420 mins) to get the absolute time
  return gridStartMinutes + snappedMinutes;
};

/**
 * Helper to convert total minutes into a formatted "HH:MM" string for the Ghost Block UI
 */
export const formatMinutesToTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};
