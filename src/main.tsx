// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { AppToaster } from "./components/ui/AppToaster";
import { AppErrorBoundary } from "./components/ui/AppErrorBoundary";
import "./index.css";

// Any query error re-throws to AppErrorBoundary, which renders the blank screen + toasts.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { throwOnError: true },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppToaster />
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>,
);
