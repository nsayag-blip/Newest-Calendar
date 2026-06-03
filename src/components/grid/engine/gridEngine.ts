// src/components/grid/engine/gridEngine.ts
import {
  EngineBlock,
  RenderableBlock,
  GridConfig,
} from "../../../types/engine";

export const calculatePositions = <T>(
  blocks: EngineBlock<T>[],
  config: GridConfig,
): Record<string, RenderableBlock<T>[]> => {
  const totalGridMinutes = config.endMinutes - config.startMinutes;

  // The dictionary we will return
  const renderableBlocksMap: Record<string, RenderableBlock<T>[]> = {};

  // 1. Group all blocks by their columnId (O(N) operation)
  const blocksByColumn = blocks.reduce(
    (acc, block) => {
      if (!acc[block.columnId]) acc[block.columnId] = [];
      acc[block.columnId].push(block);
      return acc;
    },
    {} as Record<string, EngineBlock<T>[]>,
  );

  // 2. Process the overlap math for each column independently
  for (const columnId in blocksByColumn) {
    const columnBlocks = blocksByColumn[columnId];
    renderableBlocksMap[columnId] = []; // Initialize the array in the dictionary

    // Step A: Sort chronologically
    columnBlocks.sort((a, b) => {
      if (a.startMinutes === b.startMinutes) {
        return b.endMinutes - a.endMinutes;
      }
      return a.startMinutes - b.startMinutes;
    });

    // Step B: Form Overlap Clusters
    const clusters: EngineBlock<T>[][] = [];
    let currentCluster: EngineBlock<T>[] = [];
    let clusterEnd = 0;

    for (const block of columnBlocks) {
      if (currentCluster.length === 0) {
        currentCluster.push(block);
        clusterEnd = block.endMinutes;
      } else if (block.startMinutes < clusterEnd) {
        currentCluster.push(block);
        clusterEnd = Math.max(clusterEnd, block.endMinutes);
      } else {
        clusters.push(currentCluster);
        currentCluster = [block];
        clusterEnd = block.endMinutes;
      }
    }
    if (currentCluster.length > 0) clusters.push(currentCluster);

    // Step C: Assign Lanes and Calculate CSS Percentages
    clusters.forEach((cluster) => {
      const lanes: EngineBlock<T>[][] = [];

      cluster.forEach((block) => {
        let placed = false;
        for (const lane of lanes) {
          const lastBlockInLane = lane[lane.length - 1];
          if (block.startMinutes >= lastBlockInLane.endMinutes) {
            lane.push(block);
            placed = true;
            break;
          }
        }
        if (!placed) lanes.push([block]);
      });

      const numLanes = lanes.length;
      const widthPercent = 100 / numLanes;

      lanes.forEach((lane, laneIndex) => {
        lane.forEach((block) => {
          // Clamp to grid config boundaries so boxes don't overflow the UI
          const clampedStart = Math.max(
            config.startMinutes,
            block.startMinutes,
          );
          const clampedEnd = Math.min(config.endMinutes, block.endMinutes);

          const topPercent =
            ((clampedStart - config.startMinutes) / totalGridMinutes) * 100;
          const heightPercent =
            ((clampedEnd - clampedStart) / totalGridMinutes) * 100;
          const leftPercent = laneIndex * widthPercent;

          // Push the final computed block directly into our dictionary!
          renderableBlocksMap[columnId].push({
            ...block,
            position: {
              topPercent,
              heightPercent,
              widthPercent,
              leftPercent,
              zIndex: 10 + laneIndex,
            },
          });
        });
      });
    });
  }

  return renderableBlocksMap;
};
