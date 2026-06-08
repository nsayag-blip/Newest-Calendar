export {};

declare global {
  type RemoteCallback<T> = (
    result: T,
    event: {
      status: boolean;
      message?: string;
      [key: string]: any;
    }
  ) => void;

  interface VisualforceRemotingManager {
    invokeAction(
      action: string,
      ...args: any[]
    ): void;
  }

  interface VisualforceStatic {
    remoting: {
      Manager: VisualforceRemotingManager;
    };
  }

  interface Window {
    Visualforce: VisualforceStatic;
  }
}
