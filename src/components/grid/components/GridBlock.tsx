// // // // src/components/grid/components/GridBlock.tsx
// // // import { memo } from "react";
// // // import { RenderableBlock } from "../../../types/engine";

// // // interface Props {
// // //   block: RenderableBlock<any>;
// // // }

// // // const GridBlock = memo(({ block }: Props) => {
// // //   const { title, subtitle, bgColor, borderColor, textColor } = block.display;

// // //   return (
// // //     <div
// // //       className="absolute rounded shadow-sm overflow-hidden p-1.5 transition-all hover:brightness-95 cursor-pointer"
// // //       style={{
// // //         top: `${block.position.topPercent}%`,
// // //         height: `${block.position.heightPercent}%`,
// // //         width: `${block.position.widthPercent}%`,
// // //         insetInlineStart: `${block.position.leftPercent}%`,
// // //         zIndex: block.position.zIndex,
// // //         backgroundColor: bgColor,
// // //         borderRight: `${borderColor}`,
// // //         borderTop: `${borderColor}`,
// // //         borderLeft: `${borderColor}`,
// // //         borderBottom: `${borderColor}`,
// // //         // borderRight: `4px solid ${borderColor}`,
// // //         // borderTop: `1px solid ${borderColor}`,
// // //         // borderLeft: `1px solid ${borderColor}`,
// // //         // borderBottom: `1px solid ${borderColor}`,
// // //         color: textColor,
// // //         borderRadius: "15px",
// // //       }}
// // //     >
// // //       <div className="text-xs font-bold truncate">{title}</div>
// // //       <div className="text-[10px] truncate mt-0.5 ">{subtitle}</div>
// // //     </div>
// // //   );
// // // });

// // // export default GridBlock;

// // // src/components/grid/components/GridBlock.tsx
// // import { memo } from "react";
// // import { RenderableBlock } from "../../../types/engine";

// // const ShiftCard = ({ block }: { block: RenderableBlock<any> }) => {
// //   const { title, statusText, timeRange } = block.display;

// //   return (
// //     <div className="flex flex-col h-full w-full text-[#0250D9]">

// //       {/* ── HEADER ── */}
// //       <div
// //         className="flex items-center justify-between p-2 border-b border-[#0250D9]/20"
// //         style={{ backgroundColor: "#D6E6FF" }}
// //       >
// //         <span className="font-bold text-sm truncate pe-2">{title}</span>

// //         <div className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
// //           זימון תורים
// //         </div>
// //       </div>

// //       {/* ── BODY ── */}
// //       {/* FIX: Changed to items-start (aligns right in RTL) and justify-start (aligns to top) */}
// //       <div className="flex flex-col items-start justify-start flex-1 p-3 gap-1">
// //         <span className="font-bold text-lg leading-none">
// //           {statusText || "פעילה"}
// //         </span>
// //         {/* dir="ltr" keeps the time formatting correct, while items-start keeps it aligned to the right! */}
// //         <span className="text-sm font-medium" dir="ltr">
// //           {timeRange}
// //         </span>
// //       </div>

// //     </div>
// //   );
// // };

// // // ── WRAPPER ──
// // const GridBlock = memo(({ block }: { block: RenderableBlock<any> }) => {
// //   const { bgColor, borderColor } = block.display;
// //   const isShift = block.itemType === "shift";

// //   return (
// //     <div
// //       className="absolute overflow-hidden transition-all hover:brightness-95 cursor-pointer shadow-sm rounded-xl"
// //       style={{
// //         top: `${block.position.topPercent}%`,
// //         height: `${block.position.heightPercent}%`,
// //         width: `${block.position.widthPercent}%`,
// //         insetInlineStart: `${block.position.leftPercent}%`,
// //         zIndex: block.position.zIndex,
// //         border: `1px solid ${borderColor}`,
// //         backgroundColor: bgColor,
// //       }}
// //     >
// //       {isShift ? (
// //         <ShiftCard block={block} />
// //       ) : (
// //         <div className="p-2 text-xs">
// //           <div className="font-bold">{block.display.title}</div>
// //           <div>{block.display.subtitle}</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // });

// // export default GridBlock;

// // src/components/grid/components/GridBlock.tsx
// import { memo } from "react";
// import { RenderableBlock } from "../../../types/engine";
// import { useLabels } from "../../../hooks/useLabels";

// const ShiftCard = ({ block }: { block: RenderableBlock<any> }) => {
//   const labels = useLabels();
//   const { title, statusText, timeRange } = block.display;

//   return (
//     <div className="flex flex-col h-full w-full text-[#0250D9]">
//       {/* ── HEADER ── */}
//       <div
//         className="flex items-center justify-between p-2 border-b border-[#0250D9]/20"
//         style={{ backgroundColor: "#D6E6FF" }}
//       >
//         <span className="font-bold text-sm truncate pe-2">{title}</span>

//         {/* <div className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
//           זימון תורים
//         </div> */}
//       </div>

//       {/* ── BODY ── */}
//       <div className="flex flex-col items-start justify-start flex-1 p-3 gap-0.5">
//         {/* Decreased from text-lg to text-sm */}
//         <span className="font-bold text-sm leading-none">
//           {statusText || labels.CAL_BLOCK_ACTIVE}
//         </span>

//         {/* Decreased from text-sm to text-xs */}
//         <span className="text-xs font-medium opacity-90" dir="ltr">
//           {timeRange}
//         </span>
//       </div>
//     </div>
//   );
// };

// // ── WRAPPER ──
// const GridBlock = memo(({ block }: { block: RenderableBlock<any> }) => {
//   const { bgColor, borderColor } = block.display;
//   const isShift = block.itemType === "shift";

//   return (
//     <div
//       className="absolute overflow-hidden transition-all hover:brightness-95 cursor-pointer shadow-sm rounded-xl"
//       style={{
//         top: `${block.position.topPercent}%`,
//         height: `${block.position.heightPercent}%`,
//         width: `${block.position.widthPercent}%`,
//         insetInlineStart: `${block.position.leftPercent}%`,
//         zIndex: block.position.zIndex,
//         border: `1px solid ${borderColor}`,
//         backgroundColor: bgColor,
//       }}
//     >
//       {isShift ? (
//         <ShiftCard block={block} />
//       ) : (
//         <div className="p-2 text-xs">
//           <div className="font-bold">{block.display.title}</div>
//           <div>{block.display.subtitle}</div>
//         </div>
//       )}
//     </div>
//   );
// });

// export default GridBlock;



// src/components/grid/components/GridBlock.tsx
import { memo } from "react";
import { RenderableBlock } from "../../../types/engine";
import { useLabels } from "../../../hooks/useLabels";
import { useCalendarStore } from "../../../store/appStore";

const ShiftCard = ({ block }: { block: RenderableBlock<any> }) => {
  const labels = useLabels();
  const { title, statusText, timeRange } = block.display;

  return (
    <div className="flex flex-col h-full w-full text-[#0250D9]">
      {/* ── HEADER ── */}
      <div
        className="flex items-center justify-between p-2 border-b border-[#0250D9]/20"
        style={{ backgroundColor: "#D6E6FF" }}
      >
        <span className="font-bold text-sm truncate pe-2">{title}</span>

        {/* <div className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
          זימון תורים
        </div> */}
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col items-start justify-start flex-1 p-3 gap-0.5">
        {/* Decreased from text-lg to text-sm */}
        <span className="font-bold text-sm leading-none">
          {statusText || labels.CAL_BLOCK_ACTIVE}
        </span>

        {/* Decreased from text-sm to text-xs */}
        <span className="text-xs font-medium opacity-90" dir="ltr">
          {timeRange}
        </span>
      </div>
    </div>
  );
};

// ── WRAPPER ──
const GridBlock = memo(({ block }: { block: RenderableBlock<any> }) => {
  const { bgColor, borderColor } = block.display;
  const isShift = block.itemType === "shift";

  // 1. Grab the generic openModal function from the store
  const openModal = useCalendarStore((state) => state.openModal);

  // 2. Handle the click securely
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stops grid column drag from accidentally triggering
    if (isShift) {
      openModal("shiftView", block.payload);
    } else {
      openModal("appointmentView", block.payload);
    }
  };

  return (
    <div
      onClick={handleClick} // 3. Attach click handler!
      className="absolute overflow-hidden transition-all hover:brightness-95 cursor-pointer shadow-sm rounded-xl"
      style={{
        top: `${block.position.topPercent}%`,
        height: `${block.position.heightPercent}%`,
        // width: `${block.position.widthPercent}%`,
        // insetInlineStart: `${block.position.leftPercent}%`,
        width: `calc(${block.position.widthPercent}% - 4px)`,
        insetInlineStart: `calc(${block.position.leftPercent}% + 2px)`,
        zIndex: block.position.zIndex,
        border: `1px ${borderColor}`,
        backgroundColor: bgColor,
      }}
    >
      {isShift ? (
        <ShiftCard block={block} />
      ) : (
        <div className="p-2 text-xs">
          <div className="font-bold">{block.display.title}</div>
          <div>{block.display.subtitle}</div>
        </div>
      )}
    </div>
  );
});

export default GridBlock;