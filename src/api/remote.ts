import { ServerError } from "../utils/errors";

export type RemoteOptions = {
  escape?: boolean;
  buffer?: boolean;
  timeout?: number;
};

export function invokeRemote<T>(
  action: string,
  ...args: any[]
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let options: RemoteOptions | undefined;
    let params = args;

    const last = args[args.length - 1];
    if (
      last &&
      typeof last === 'object' &&
      ('escape' in last || 'buffer' in last || 'timeout' in last)
    ) {
      options = last as RemoteOptions;
      params = args.slice(0, -1);
    }

    window.Visualforce.remoting.Manager.invokeAction(
      action,
      ...params,
      (result: T, event: { status: boolean; message?: string }) => {
        if (event.status) resolve(result);
        else reject(new ServerError(event.message ?? 'אירעה שגיאה בשרת.'));
      },
      options
    );
  });
}
