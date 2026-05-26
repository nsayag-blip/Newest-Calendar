import { invokeRemote } from '../utils/remote';

const CONTROLLER = 'HealthcareFacilityController';

export const HealthcareFacilityApi = {
  getName(recordId: string): Promise<string> {
    return invokeRemote<string>(
      `${CONTROLLER}.getName`,
      recordId
    );
  },

  updateName(recordId: string, name: string): Promise<void> {
    return invokeRemote<void>(
      `${CONTROLLER}.updateName`,
      recordId,
      name
    );
  }
};
