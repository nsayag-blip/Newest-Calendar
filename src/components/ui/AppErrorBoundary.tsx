import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";
import { getErrorMessage } from "../../utils/errors";
import { MESSAGES } from "../../constants/messages";
import { notify } from "../../utils/notifications";

function BlankScreen() {
  return <div className="w-screen h-screen bg-white" />;
}

type AppErrorBoundaryProps = {
  children: ReactNode;
  /** Context message for React render crashes (Apex errors show their own text). */
  message?: string;
};

export function AppErrorBoundary({children, message = MESSAGES.LOAD_DATA_ERROR,}: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={BlankScreen}
      onError={(error) => {
        console.error(error);
        notify.error(getErrorMessage(error, message));
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
