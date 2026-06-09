// src/hooks/useUserClinics.ts
import { useMemo } from "react";
import { UserContext, MappedClinic } from "../types/user";
import { useAllClinics } from "./useSession";

export function useUserClinics(userContext: UserContext | undefined) {
  // 1. Fetch all clinics if needed
  const isSuperUser = !!userContext?.isSuperUser;
  const { data: allClinics, isLoading: loadingAll } = useAllClinics(isSuperUser);

  // 2. Normalize the permissions array
  const availableClinics = useMemo<MappedClinic[]>(() => {
    if (!userContext) return [];

    if (isSuperUser && allClinics) {
      return allClinics.map((clinic) => ({ clinic, access: "EDIT", role: "ALL" }));
    }

    if (!isSuperUser) {
      const clinics: MappedClinic[] = [];
      
      if (userContext.mainClinic) {
        clinics.push({ clinic: userContext.mainClinic, access: "EDIT", role: "MAIN" });
      }
      userContext.tempClinics?.forEach((clinic) => {
        clinics.push({ clinic, access: "EDIT", role: "TEMP" });
      });
      userContext.nearClinics?.forEach((clinic) => {
        clinics.push({ clinic, access: "VIEW", role: "NEAR" });
      });
      
      return clinics;
    }

    return [];
  }, [userContext, isSuperUser, allClinics]);

  // Return the calculated array and a combined loading state
  return { 
    availableClinics, 
    isLoadingClinics: isSuperUser ? loadingAll : false 
  };
}