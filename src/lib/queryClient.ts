// src/lib/queryClient.ts
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { useToastStore } from "../store/toastStore";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("API Query Error:", error);
      useToastStore
        .getState()
        .addToast(`שגיאה בטעינת נתונים: ${error.message}`, "error");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("API Mutation Error:", error);
      useToastStore
        .getState()
        .addToast(`שגיאת מערכת: ${error.message}`, "error");
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1, // Only retry once before showing the error toast
      refetchOnWindowFocus: false,
    },
  },
});
