// src/components/grid/components/GridBlock.tsx
import { memo } from "react";
import { RenderableBlock } from "../../../types/engine";

interface Props {
  block: RenderableBlock<any>;
}

const GridBlock = memo(({ block }: Props) => {
  const { title, subtitle, bgColor, borderColor, textColor } = block.display;

  return (
    <div
      className="absolute rounded shadow-sm overflow-hidden p-1.5 transition-all hover:brightness-95 cursor-pointer"
      style={{
        top: `${block.position.topPercent}%`,
        height: `${block.position.heightPercent}%`,
        width: `${block.position.widthPercent}%`,
        insetInlineStart: `${block.position.leftPercent}%`,
        zIndex: block.position.zIndex,
        backgroundColor: bgColor,
        borderRight: `${borderColor}`,
        borderTop: `${borderColor}`,
        borderLeft: `${borderColor}`,
        borderBottom: `${borderColor}`,
        // borderRight: `4px solid ${borderColor}`,
        // borderTop: `1px solid ${borderColor}`,
        // borderLeft: `1px solid ${borderColor}`,
        // borderBottom: `1px solid ${borderColor}`,
        color: textColor,
      }}
    >
      <div className="text-xs font-bold truncate">{title}</div>
      <div className="text-[10px] truncate mt-0.5 ">{subtitle}</div>
    </div>
  );
});

export default GridBlock;
