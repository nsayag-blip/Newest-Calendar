import { MESSAGES } from "../constants/messages";

/** Marks an error from Apex/Visualforce remoting */
export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

/** Apex errors carry their own Hebrew text; anything else uses the caller's context message. */
export function getErrorMessage(error: unknown, fallback: string = MESSAGES.GENERIC_ERROR,): string {
  if (error instanceof ServerError) return error.message;
  return fallback;
}
