// src/components/grid/components/HorizontalBlock.tsx
import { memo } from "react";
import { RenderableBlock } from "../../../types/engine";

interface Props {
  block: RenderableBlock<any>;
}

const HorizontalBlock = memo(({ block }: Props) => {
  const { title, subtitle, bgColor, borderColor, textColor } = block.display;

  // ── Axis rotation ─────────────────────────────────────────────────────────
  // calculatePositions() outputs percentages relative to a vertical column:
  //   topPercent    = time start position    (% of total time range)
  //   heightPercent = block duration         (% of total time range)
  //   leftPercent   = lane offset            (0% for lane 0, 50% for lane 1, etc.)
  //   widthPercent  = lane size              (100% if no overlap, 50% if 2 overlap, etc.)
  //
  // Rotated to horizontal:
  //   insetInlineStart = topPercent     (X: where in time)
  //   width            = heightPercent  (X: how long)
  //   top              = leftPercent    (Y: which lane — 0 = top, 50 = middle)
  //   height           = widthPercent   (Y: how tall the lane is)
  //
  // THE BUG WAS HERE: previously `top` was hardcoded to a constant INSET%,
  // which discarded `leftPercent` entirely. Both overlapping blocks got the
  // same top value so they stacked instead of stacking in their own lanes.
  //
  // Fix: apply a small px inset RELATIVE TO the lane slot using calc().
  // This preserves lane separation while keeping a tidy gap from row borders.

  const INSET_PX = 4;

  return (
    <div
      className="absolute rounded shadow-sm overflow-hidden px-2 py-1 transition-all hover:brightness-95 cursor-pointer flex flex-col justify-center"
      style={{
        insetInlineStart: `${block.position.topPercent}%`,
        width: `${block.position.heightPercent}%`,
        top: `calc(${block.position.leftPercent}%  + ${INSET_PX}px)`,
        height: `calc(${block.position.widthPercent}% - ${INSET_PX * 2}px)`,
        zIndex: block.position.zIndex,
        backgroundColor: bgColor,
        borderTop: `4px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        borderLeft: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
        color: textColor ?? "var(--color-text-primary)",
      }}
    >
      <div className="text-xs font-bold truncate leading-none mb-0.5">
        {title}
      </div>
      <div className="text-[10px] truncate opacity-80 leading-none">
        {subtitle}
      </div>
    </div>
  );
});

export default HorizontalBlock;
