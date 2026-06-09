import { useQuery } from "@tanstack/react-query";
import { salesforceApi } from "../api/client";

export function useSession() {
  return useQuery({
    queryKey: ["userContext"],
    queryFn: () => salesforceApi.getCurrentUser(),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });
}

// 👇 Add this new hook
export function useAllClinics(enabled: boolean) {
  return useQuery({
    queryKey: ["allClinics"],
    queryFn: () => salesforceApi.getAllClinics(),
    staleTime: Infinity, // Clinics rarely change
    enabled, // This ensures we ONLY fetch if they are a super user!
  });
}
