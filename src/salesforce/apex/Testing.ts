import { invokeRemote } from "../../api/remote";

const CONTROLLER = "Calendar_Ctrl";

export const Calendar_Ctrl = {
  getName(recordId: string): Promise<string> {
    return invokeRemote<string>(`${CONTROLLER}.getName`, recordId);
  },

  getHebrewDate(today: Date): Promise<string> {
    return invokeRemote<string>(`${CONTROLLER}.getHebrewDate`, today);
  },
};
