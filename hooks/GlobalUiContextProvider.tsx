/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import T from "prop-types";

// Context for defining the global scope: UI Settings
export const GlobalUiContext = React.createContext({
  mobileFooter: false,
  visualMode: "card",
  toggleMobileFooter: () => undefined,
  setVisualMode: (_mode: string) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalUiContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ mobileFooter: false, visualMode: "card" });

  const setVisualMode = (mode: string): void => {
    setState({
      ...state,
      visualMode: mode
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
        setVisualMode
      }}
    >
      {state && children}
    </GlobalUiContext.Provider>
  );
};

GlobalUiContextProvider.propTypes = {
  children: T.node.isRequired
};
