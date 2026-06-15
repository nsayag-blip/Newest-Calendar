import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";
import { getErrorMessage } from "../../utils/errors";
import { getLabel } from "../../hooks/useLabels";
import { notify } from "../../utils/notifications";

function BlankScreen() {
  return <div className="w-screen h-screen bg-white" />;
}

type AppErrorBoundaryProps = {
  children: ReactNode;
  /** Context message for React render crashes (Apex errors show their own text). */
  message?: string;
};

export function AppErrorBoundary({children, message = getLabel("CAL_ERR_LOAD_DATA"),}: AppErrorBoundaryProps) {
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
