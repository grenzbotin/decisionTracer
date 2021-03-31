/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import T from "prop-types";

// Context for defining the global scope: UI Settings
export const GlobalUiContext = React.createContext({
  mobileFooter: true,
  treeFlow: true,
  toggleMobileFooter: () => undefined,
  setTreeFlow: (_bool: boolean) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalUiContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ mobileFooter: true, treeFlow: false });

  const setTreeFlow = (bool: boolean): void => {
    setState({
      ...state,
      treeFlow: bool
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
        setTreeFlow
      }}
    >
      {state && children}
    </GlobalUiContext.Provider>
  );
};

GlobalUiContextProvider.propTypes = {
  children: T.node.isRequired
};
