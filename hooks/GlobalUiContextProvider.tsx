/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

// Context for defining the global scope: UI Settings
export const GlobalUiContext = React.createContext({
  mobileFooter: false,
  visualMode: "card",
  expert: true,
  lastAddedDecision: null,
  setLastAddedDecision: (_value: string) => undefined,
  toggleMobileFooter: () => undefined,
  setVisualMode: (_mode: string) => undefined,
  updateUIState: (_options: Record<string, boolean | string>) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalUiContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({
    lastAddedDecision: null,
    mobileFooter: false,
    visualMode: "card",
    expert: true
  });

  const setVisualMode = (mode: string): void => {
    setState({
      ...state,
      visualMode: mode
    });
  };

  const setLastAddedDecision = (value: string): void => {
    setState({
      ...state,
      lastAddedDecision: value
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
        updateUIState,
        setLastAddedDecision
      }}
    >
      {state && children}
    </GlobalUiContext.Provider>
  );
};
