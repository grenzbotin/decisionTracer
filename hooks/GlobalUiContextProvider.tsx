/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import T from "prop-types";

// Context for defining the global scope: UI Settings
export const GlobalUiContext = React.createContext({
  mobileFooter: true,
  toggleMobileFooter: () => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalUiContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ mobileFooter: true });

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
        toggleMobileFooter
      }}
    >
      {state && children}
    </GlobalUiContext.Provider>
  );
};

GlobalUiContextProvider.propTypes = {
  children: T.node.isRequired
};
