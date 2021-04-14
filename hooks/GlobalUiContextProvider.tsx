/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

// Context for defining the global scope: UI Settings
export const GlobalUiContext = React.createContext({
  mobileFooter: false,
  visualMode: "card",
  showResult: true,
  toggleMobileFooter: () => undefined,
  setVisualMode: (_mode: string) => undefined,
  updateUIState: (_options: Record<string, boolean | string>) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalUiContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ mobileFooter: false, visualMode: "card", showResult: true });

  const setVisualMode = (mode: string): void => {
    setState({
      ...state,
      visualMode: mode
    });
  };

  const updateUIState = (options: Record<string, boolean | string>): void => {
    setState({
      ...state,
      ...options
    });
  };

  const toggleMobileFooter = (): void => {
    setState({
      ...state,
      mobileFooter: !state.mobileFooter
    });
  };

  return (
    <GlobalUiContext.Provider
      value={{
        ...state,
        toggleMobileFooter,
        setVisualMode,
        updateUIState
      }}
    >
      {state && children}
    </GlobalUiContext.Provider>
  );
};
