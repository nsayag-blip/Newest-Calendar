// src/components/error/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Here you could also log to a service like Sentry or Datadog
    console.error("Uncaught React error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center w-screen h-screen bg-surface-alt p-6 text-center"
          dir="rtl"
        >
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border-t-4 border-destructive">
            <h2 className="text-xl font-bold text-text-primary mb-2">
              אופס! משהו השתבש
            </h2>
            <p className="text-text-secondary mb-4 text-sm">
              התרחשה שגיאה בלתי צפויה במערכת היומנים.
            </p>
            <div
              className="bg-surface-alt p-3 rounded text-left text-xs text-destructive font-mono mb-6 overflow-x-auto"
              dir="ltr"
            >
              {this.state.errorMsg}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-2 px-4 rounded transition-colors"
            >
              רענן עמוד
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
