"use client";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getPersistor } from "@/store/store";

export const Providers = ({ children }: { children: ReactNode }) => {
  // Handle client-side only rendering for the persistor
  const [persistorValue, setPersistorValue] = useState<any>(null);

  useEffect(() => {
    setPersistorValue(getPersistor());
  }, []);

  // On the server, just render without PersistGate
  if (!persistorValue) {
    return (
      <Provider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </Provider>
    );
  }

  // On the client, include PersistGate
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorValue}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
