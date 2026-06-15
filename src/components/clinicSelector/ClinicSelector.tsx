// // // src/components/views/ClinicSelector/ClinicSelector.tsx
// // import { useCalendarStore } from "../../store/appStore";
// // import { useClinics } from "../../hooks/useScheduling";

// // export default function ClinicSelector() {
// //   const setActiveClinicId = useCalendarStore(
// //     (state) => state.setActiveClinicId,
// //   );
// //   const { data: clinics = [], isLoading, isError } = useClinics();

// //   if (isLoading) {
// //     return (
// //       <div className="w-screen h-screen bg-surface-alt flex items-center justify-center font-sans">
// //         <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   if (isError) {
// //     return (
// //       <div className="w-screen h-screen bg-surface-alt flex items-center justify-center font-sans text-destructive">
// //         שגיאה בטעינת המרפאות. אנא נסה שוב.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-screen h-screen bg-surface-alt flex flex-col items-center justify-center font-sans">
// //       <div className="bg-surface p-8 rounded-2xl shadow-xl border border-border max-w-lg w-full">
// //         <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">
// //           ברוכים הבאים
// //         </h1>
// //         <p className="text-text-muted mb-8 text-center">
// //           אנא בחר מרפאה כדי להציג את יומן החדרים
// //         </p>

// //         <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pe-2 custom-scrollbar">
// //           {clinics.map((clinic) => (
// //             <button
// //               key={clinic.Id}
// //               onClick={() => setActiveClinicId(clinic.Id)}
// //               className="w-full text-start px-6 py-4 bg-surface border-2 border-border text-text-primary rounded-xl hover:border-brand hover:bg-brand-subtle transition-all duration-200 shadow-sm font-medium text-lg group flex justify-between items-center"
// //             >
// //               <span>{clinic.Name}</span>
// //               <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity">
// //                 ←
// //               </span>
// //             </button>
// //           ))}

// //           {clinics.length === 0 && (
// //             <div className="text-center text-text-muted py-4">
// //               לא נמצאו מרפאות פעילות במערכת.
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useMemo } from "react";
// import { Search, Lock, Building2, ChevronLeft } from "lucide-react";
// import { useCalendarStore } from "../../store/appStore";
// import { MappedClinic } from "../../types/user";

// interface Props {
//   availableClinics: MappedClinic[];
// }

// export default function ClinicSelector({ availableClinics }: Props) {
//   const setActiveClinicId = useCalendarStore(
//     (state) => state.setActiveClinicId,
//   );
//   const [searchQuery, setSearchQuery] = useState("");

//   // ── PRD SEARCH LOGIC: Filter by Name or Branch Code ──
//   const filteredClinics = useMemo(() => {
//     if (!searchQuery.trim()) return availableClinics;

//     const term = searchQuery.toLowerCase();
//     return availableClinics.filter((mc) => {
//       const nameMatch = mc.clinic.Name.toLowerCase().includes(term);
//       const codeMatch = mc.clinic.Branch_Code__c?.toLowerCase().includes(term);
//       return nameMatch || codeMatch;
//     });
//   }, [availableClinics, searchQuery]);

//   return (
//     <div
//       className="w-screen h-screen bg-surface-alt flex flex-col items-center pt-20 px-4 font-sans"
//       dir="rtl"
//     >
//       {/* HEADER SECTION */}
//       <div className="w-16 h-16 bg-brand text-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
//         <Building2 size={32} />
//       </div>
//       <h1 className="text-3xl font-bold text-text-primary mb-2">בחירת מרפאה</h1>
//       <p className="text-text-secondary text-center max-w-md mb-8">
//         ברוך הבא, מנהל מרפאה. אנא בחר מרפאה להצגת לוח השיבוצים. ניתן לצפות
//         במרפאה אחת בכל עת.
//       </p>

//       {/* SEARCH BAR */}
//       <div className="w-full max-w-2xl relative mb-10">
//         <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
//           <Search className="text-text-tertiary" size={20} />
//         </div>
//         <input
//           type="text"
//           placeholder="חפש מרפאה לפי שם או קוד סניף..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full h-12 pl-4 pr-12 rounded-full border border-border focus:border-brand focus:ring-2 focus:ring-brand-subtle outline-none transition-all shadow-sm text-text-primary placeholder:text-text-tertiary"
//         />
//       </div>

//       {/* CLINICS GRID */}
//       <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
//         {filteredClinics.length === 0 ? (
//           <div className="col-span-full text-center py-12 text-text-tertiary">
//             לא נמצאו מרפאות התואמות את החיפוש.
//           </div>
//         ) : (
//           filteredClinics.map(({ clinic, access }) => {
//             const isViewOnly = access === "VIEW";

//             return (
//               <div
//                 key={clinic.Id}
//                 onClick={() => setActiveClinicId(clinic.Id)}
//                 className={`group relative bg-white rounded-2xl p-6 border transition-all cursor-pointer shadow-sm hover:shadow-md ${
//                   isViewOnly
//                     ? "border-border hover:border-brand" // View Only Styling
//                     : "border-border hover:border-brand" // Edit Styling
//                 }`}
//               >
//                 {/* VIEW ONLY BADGE (PRD Requirement) */}
//                 {isViewOnly && (
//                   <div className="absolute top-4 left-4 bg-status-warning-bg text-status-warning-text text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-status-warning-text/20">
//                     <Lock size={12} />
//                     צפייה בלבד
//                   </div>
//                 )}

//                 {/* CLINIC ICON */}
//                 <div
//                   className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
//                     isViewOnly
//                       ? "bg-status-warning-bg text-status-warning-text"
//                       : "bg-brand-subtle text-brand"
//                   }`}
//                 >
//                   <Building2 size={24} />
//                 </div>

//                 {/* CLINIC DETAILS */}
//                 <h3 className="text-xl font-bold text-text-primary mb-1">
//                   {clinic.Name}
//                 </h3>
//                 <p className="text-sm text-text-tertiary mb-6">
//                   {isViewOnly
//                     ? "מרפאה סמוכה - גישת קריאה בלבד"
//                     : "גישת עריכה מלאה"}
//                   {clinic.Branch_Code__c && ` • סניף ${clinic.Branch_Code__c}`}
//                 </p>

//                 {/* CALL TO ACTION */}
//                 <div className="flex items-center text-brand font-medium text-sm group-hover:text-brand-dark transition-colors">
//                   כניסה למערכת
//                   <ChevronLeft
//                     size={16}
//                     className="mr-1 group-hover:-translate-x-1 transition-transform"
//                   />
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/views/ClinicSelector/ClinicSelector.tsx
// src/components/views/ClinicSelector/ClinicSelector.tsx
import { useCalendarStore } from "../../store/appStore";
import { MappedClinic } from "../../types/user";

interface Props {
  availableClinics: MappedClinic[];
}

export default function ClinicSelector({ availableClinics }: Props) {
  const setActiveClinicId = useCalendarStore((state) => state.setActiveClinicId);

  return (
    <div className="w-screen h-screen bg-surface-alt flex flex-col items-center justify-center font-sans" dir="rtl">
      <div className="bg-surface p-8 rounded-2xl shadow-xl border border-border max-w-lg w-full">
        <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">ברוכים הבאים</h1>
        <p className="text-text-muted mb-8 text-center">אנא בחר מרפאה כדי להציג את יומן החדרים</p>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pe-2 custom-scrollbar">
          {availableClinics.map(({ clinic, access }) => {
            const isViewOnly = access === "VIEW";

            return (
              <button
                key={clinic.Id}
                onClick={() => setActiveClinicId(clinic.Id)}
                className="w-full text-start px-6 py-4 bg-surface border-2 border-border text-text-primary rounded-xl hover:border-brand hover:bg-brand-subtle transition-all duration-200 shadow-sm font-medium text-lg group flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span>{clinic.Name}</span>
                  {isViewOnly && (
                    <span className="text-xs text-amber-700 bg-amber-100 border border-amber-200 w-max px-2 py-0.5 rounded mt-1">
                      צפייה בלבד
                    </span>
                  )}
                </div>
                <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity">←</span>
              </button>
            );
          })}

          {availableClinics.length === 0 && (
            <div className="text-center text-text-muted py-4">לא נמצאו מרפאות פעילות במערכת.</div>
          )}
        </div>
      </div>
    </div>
  );
}