/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import T from "prop-types";
import { Decision, PRESETS, Resource } from "../lib/presets";

const getNewProbabilty = (
  itemProbabilty: number,
  equal: number,
  probabiltySum: number,
  targetChange: number
): number => {
  if (equal > 0) {
    return itemProbabilty + equal;
  }
  if (itemProbabilty - (itemProbabilty / probabiltySum) * targetChange > 0) {
    if (itemProbabilty - (itemProbabilty / probabiltySum) * targetChange > 100) {
      return 100;
    }
    return itemProbabilty - (itemProbabilty / probabiltySum) * targetChange;
  }
  return 0;
};

// Context for defining the global scope: UI Settings
export const GlobalDecisionContext = React.createContext({
  active: PRESETS[0],
  setTitle: (_title: string, _decKey?: string, _subKey?: string, _caseKey?: string) => undefined,
  setValue: (_value: number | number[], _decKey: string, _subKey: string, _caseKey?: string) => undefined,
  setProbability: (_value: number | number[], _decKey: string, _subKey: string, _caseKey?: string) => undefined,
  removeItem: (_decKey: string, _subKey?: string, _caseKey?: string) => undefined,
  addItem: (_decKey?: string, _subKey?: string) => undefined,
  createNewPreset: (_title: string, _icon?: string, _resources?: Resource[], _decisions?: Decision[]) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalDecisionContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ active: PRESETS[0] });
  const root = state.active;

  // Name changes
  const setTitle = (title: string, decKey?: string, subKey?: string, caseKey?: string): void => {
    if (caseKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey
                      ? { ...sub, cases: sub.cases.map((c) => (c.key === caseKey ? { ...c, title } : c)) }
                      : sub
                  )
                }
              : decision
          )
        }
      });
    } else if (subKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? { ...decision, sub: decision.sub.map((sub) => (sub.key === subKey ? { ...sub, title } : sub)) }
              : decision
          )
        }
      });
    } else if (decKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) => (decision.key === decKey ? { ...decision, title } : decision))
        }
      });
    } else {
      setState({ ...state, active: { ...state.active, title } });
    }
  };

  // Value changes
  const setValue = (value: number | number[], decKey: string, subKey: string, caseKey?: string): void => {
    if (caseKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey
                      ? {
                          ...sub,
                          cases: sub.cases.map((c) =>
                            c.key === caseKey ? { ...c, value: typeof value === "number" && value } : c
                          )
                        }
                      : sub
                  )
                }
              : decision
          )
        }
      });
    } else if (subKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey ? { ...sub, value: typeof value === "number" && value } : sub
                  )
                }
              : decision
          )
        }
      });
    }
  };

  // Set probability
  const setProbability = (value: number | number[], decKey: string, subKey: string, caseKey?: string): void => {
    if (caseKey) {
      // Get information about changed case
      const targetCase = root.decisions.find((item) => item.key === decKey).sub.find((sub) => sub.key === subKey).cases;
      const targetCaseItem = targetCase.find((c) => c.key === caseKey);
      const targetChange = typeof value === "number" && value - targetCaseItem.probability;

      // Get all other decisions that need to change according to the total change
      const nonTargets = targetCase.filter((sc) => sc.key !== caseKey);
      const probabiltySum = nonTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0);
      const rest = typeof value === "number" && 100 - value - probabiltySum >= 0 ? 100 - value - probabiltySum : 0;
      const equal = rest / nonTargets.length;

      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey
                      ? {
                          ...sub,
                          cases: sub.cases.map((c) =>
                            c.key === caseKey
                              ? { ...c, probability: typeof value === "number" && parseFloat(value.toFixed(3)) }
                              : {
                                  ...c,
                                  probability: parseFloat(
                                    getNewProbabilty(c.probability, equal, probabiltySum, targetChange).toFixed(3)
                                  )
                                }
                          )
                        }
                      : sub
                  )
                }
              : decision
          )
        }
      });
    } else if (subKey) {
      // Get information about changed case
      const targetSubs = root.decisions.find((item) => item.key === decKey).sub;
      const targetSubItem = targetSubs.find((sub) => sub.key === subKey);
      const targetChange = typeof value === "number" && value - targetSubItem.probability;

      // Get all other decisions that need to change according to the total change
      const nonTargets = targetSubs.filter((sc) => sc.key !== subKey);
      const probabiltySum = nonTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0);
      const rest = typeof value === "number" && 100 - value - probabiltySum >= 0 ? 100 - value - probabiltySum : 0;
      const equal = rest / nonTargets.length;

      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey
                      ? { ...sub, probability: typeof value === "number" && parseFloat(value.toFixed(3)) }
                      : {
                          ...sub,
                          probability: parseFloat(
                            getNewProbabilty(sub.probability, equal, probabiltySum, targetChange).toFixed(3)
                          )
                        }
                  )
                }
              : decision
          )
        }
      });
    }
  };

  // Remove
  const removeItem = (decKey: string, subKey?: string, caseKey?: string): void => {
    if (caseKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey ? { ...sub, cases: sub.cases.filter((c) => c.key !== caseKey) } : sub
                  )
                }
              : decision
          )
        }
      });
    } else if (subKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey ? { ...decision, sub: decision.sub.filter((sub) => sub.key !== subKey) } : decision
          )
        }
      });
    } else {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.filter((dec) => dec.key !== decKey)
        }
      });
    }
  };

  const addItem = (decKey?: string, subKey?: string): void => {
    if (subKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: decision.sub.map((sub) =>
                    sub.key === subKey
                      ? {
                          ...sub,
                          cases: [
                            ...sub.cases,
                            { key: new Date().getUTCMilliseconds().toString(), title: "new", probability: 0, value: 0 }
                          ]
                        }
                      : sub
                  )
                }
              : decision
          )
        }
      });
    } else if (decKey) {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) =>
            decision.key === decKey
              ? {
                  ...decision,
                  sub: [
                    ...decision.sub,
                    {
                      key: new Date().getUTCMilliseconds().toString(),
                      title: "new",
                      probability: 0,
                      value: 0,
                      cases: []
                    }
                  ]
                }
              : decision
          )
        }
      });
    } else {
      setState({
        ...state,
        active: {
          ...state.active,
          decisions: [...root.decisions, { key: new Date().getUTCMilliseconds().toString(), title: "new", sub: [] }]
        }
      });
    }
  };

  const createNewPreset = (
    title: string,
    icon: string = null,
    resources: Resource[] = [],
    decisions: Decision[] = []
  ): void => {
    setState({
      ...state,
      active: {
        ...state.active,
        title,
        icon,
        resources,
        decisions
      }
    });
  };

  return (
    <GlobalDecisionContext.Provider
      value={{
        ...state,
        setTitle,
        setValue,
        setProbability,
        removeItem,
        addItem,
        createNewPreset
      }}
    >
      {state && children}
    </GlobalDecisionContext.Provider>
  );
};

GlobalDecisionContextProvider.propTypes = {
  children: T.node.isRequired
};
