import { toast } from "sonner";

type NotifyOptions = { duration?: number };

// `id: message` collapses identical messages into one toast (several queries failing at once,
// or a query error reaching both the cache handler and the boundary).
export const notify = {
  error: (message: string, options?: NotifyOptions) =>
    toast.error(message, { id: message, duration: options?.duration }),
  success: (message: string, options?: NotifyOptions) =>
    toast.success(message, { id: message, duration: options?.duration }),
};
