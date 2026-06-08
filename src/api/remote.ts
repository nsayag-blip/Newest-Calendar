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
        else reject(new Error(event.message ?? 'Unknown remoting error'));
      },
      options
    );
  });
}

// error hanlding version
// export type RemoteOptions = {
//   escape?: boolean;
//   buffer?: boolean;
//   timeout?: number;
// };

// export function invokeRemote<T>(action: string, ...args: any[]): Promise<T> {
//   return new Promise<T>((resolve, reject) => {
//     let options: RemoteOptions | undefined;
//     let params = args;

//     const last = args[args.length - 1];
//     if (
//       last &&
//       typeof last === "object" &&
//       ("escape" in last || "buffer" in last || "timeout" in last)
//     ) {
//       options = last as RemoteOptions;
//       params = args.slice(0, -1);
//     }

//     window.Visualforce.remoting.Manager.invokeAction(
//       action,
//       ...params,
//       (result: T, event: { status: boolean; message?: string }) => {
//         if (event.status) {
//           resolve(result);
//         } else {
//           const rawMsg = event.message || "Unknown remoting error";
//           let msg: string;

//           if (/SESSION_EXPIRED|INVALID_SESSION|Not logged in/i.test(rawMsg)) {
//             msg = "פג תוקף החיבור. אנא רענן את העמוד והתחבר מחדש.";
//           } else if (/List has no rows/i.test(rawMsg)) {
//             msg = "הנתונים המבוקשים לא נמצאו במערכת.";
//           } else if (/Apex heap size/i.test(rawMsg)) {
//             msg =
//               "כמות הנתונים גדולה מדי לתצוגה. אנא סנן את התוצאות.";
//           } else if (/Timeout/i.test(rawMsg)) {
//             msg = "הבקשה ארכה זמן רב מדי (Timeout). אנא נסה שנית.";
//           } else {
//             msg = `שגיאת שרת: ${rawMsg.split("\n")[0]}`;
//           }

//           // Friendly message surfaces to the user via toast.
//           // Raw message is preserved in .cause for console logs and future error reporting.
//           const err = new Error(msg);
//           (err as any).cause = rawMsg;
//           reject(err);
//         }
//       },
//       options,
//     );
//   });
// }
