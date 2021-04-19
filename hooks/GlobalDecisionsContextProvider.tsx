/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Decision, PRESETS, Preset } from "../lib/presets";
import { Node } from "react-flow-renderer";
import i18next from "i18next";
import { getPresetValueByField, getValueFromChilds } from "../lib/helpers";

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
  active: null,
  setTitle: (_title: string, _decKey?: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
  setValue: (_value: number | number[], _decKey: string, _subKey: string, _caseKey?: string, _subCaseKey?: string) =>
    undefined,
  setProbabilityByKey: (
    _value: number | number[],
    _decKey: string,
    _subKey: string,
    _caseKey?: string,
    _subCaseKey?: string
  ) => undefined,
  removeItem: (_decKey: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
  addItem: (_newKey: string, _decKey?: string, _subKey?: string, _caseKey?: string) => undefined,
  toggleIndependent: (_decKey: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
  toggleClose: (_decKey: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
  setActiveFromPreset: (_key?: string) => undefined,
  selectedNode: null,
  setSelectedNode: (_element: Node) => undefined
});

interface T {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfPreset(object: any): object is Preset {
  return true;
}

export const GlobalDecisionContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ active: null, selectedNode: null });
  const root = state.active;

  const setActiveFromPreset = (key: string): void => {
    let translatedPreset = null;
    const preset = key ? PRESETS.find((item) => item.key === key) : null;

    if (preset) {
      translatedPreset = {
        ...preset,
        decisions: preset.decisions.map((decision) => ({
          ...decision,
          title: i18next.t(decision.title),
          sub: decision.sub.map((sub) => ({
            ...sub,
            title: i18next.t(sub.title),
            cases: sub.cases.map((c) => ({
              ...c,
              title: i18next.t(c.title),
              subCases: c.subCases.map((sc) => ({
                ...sc,
                title: i18next.t(sc.title)
              }))
            }))
          }))
        }))
      };
    }

    setState({ active: translatedPreset, selectedNode: null });
  };

  // Name changes
  const setTitle = (title: string, decKey?: string, subKey?: string, caseKey?: string, subCaseKey?: string): void => {
    if (instanceOfPreset(root)) {
      if (subCaseKey) {
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
                                ? {
                                    ...c,
                                    subCases: c.subCases.map((sc) =>
                                      sc.key === subCaseKey ? { ...sc, title: title } : sc
                                    )
                                  }
                                : c
                            )
                          }
                        : sub
                    )
                  }
                : decision
            )
          }
        });
      } else if (caseKey) {
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
    }
  };

  // Value changes
  // All scenarios, cases, subcases with same title should have same value
  const setValue = (
    value: number | number[],
    decKey: string,
    subKey: string,
    caseKey?: string,
    subCaseKey?: string
  ): void => {
    if (instanceOfPreset(root)) {
      let title = "";
      let isClosed = false;

      if (subCaseKey) {
        const item = root.decisions
          .find((decision) => decision.key === decKey)
          .sub.find((sub) => sub.key === subKey)
          .cases.find((c) => c.key === caseKey)
          .subCases.find((sc) => sc.key === subCaseKey);
        title = item.title;
        isClosed = item.isClosed;
      } else if (caseKey) {
        const item = root.decisions
          .find((decision) => decision.key === decKey)
          .sub.find((sub) => sub.key === subKey)
          .cases.find((c) => c.key === caseKey);

        title = item.title;
        isClosed = item.isClosed;
      } else if (subKey) {
        const item = root.decisions.find((decision) => decision.key === decKey).sub.find((sub) => sub.key === subKey);

        title = item.title;
        isClosed = item.isClosed;
      }

      const newState = {
        ...state,
        active: {
          ...state.active,
          decisions: root.decisions.map((decision) => ({
            ...decision,
            sub: decision.sub.map((sub) => ({
              ...sub,
              value:
                sub.title === title && ((!isClosed && !sub.isClosed) || sub.key === subKey) && typeof value === "number"
                  ? value
                  : sub.value,
              cases: sub.cases.map((c) => ({
                ...c,
                value:
                  c.title === title && ((!isClosed && !c.isClosed) || c.key === caseKey) && typeof value === "number"
                    ? value
                    : c.value,
                subCases: c.subCases.map((sc) => ({
                  ...sc,
                  value:
                    sc.title === title &&
                    ((!isClosed && !sc.isClosed) || sub.key === subCaseKey) &&
                    typeof value === "number"
                      ? value
                      : sc.value
                }))
              }))
            }))
          }))
        }
      };

      const updatedState = {
        ...newState,
        active: {
          ...newState.active,
          decisions: newState.active.decisions.map((decision: Decision) => ({
            ...decision,
            sub: decision.sub.map((sub) => ({
              ...sub,
              value: sub.cases.length > 0 ? getValueFromChilds(sub, "cases") : sub.value,
              cases: sub.cases.map((c) => ({
                ...c,
                value: c.subCases.length > 0 ? getValueFromChilds(c, "subCases") : c.value
              }))
            }))
          }))
        }
      };

      setState({
        ...updatedState
      });
    }
  };

  // Set probability
  const setProbabilityByKey = (
    value: number | number[],
    decKey: string,
    subKey: string,
    caseKey?: string,
    subCaseKey?: string
  ): Promise<boolean> =>
    new Promise((resolve) => {
      if (instanceOfPreset(root)) {
        let newState = {} as { active: Preset; selectedNode: Node | null };

        if (getPresetValueByField(root.decisions, "probability", decKey, subKey, caseKey) !== null) {
          if (subCaseKey) {
            // Get information about changed subcase
            const targetSubCases = root.decisions
              .find((item) => item.key === decKey)
              .sub.find((sub) => sub.key === subKey)
              .cases.find((c) => c.key === caseKey).subCases;
            const targetSubCaseItem = targetSubCases.find((sc) => sc.key === subCaseKey);
            const isIndependent = targetSubCaseItem.isIndependent;
            const targetChange = typeof value === "number" && value - targetSubCaseItem.probability;

            // Get all other decisions that need to change according to the total change
            const nonTargets = targetSubCases.filter((sc) => sc.key !== subCaseKey && !sc.isIndependent);
            const probabiltySum = !isIndependent
              ? nonTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = !isIndependent
              ? typeof value === "number" && 100 - value - probabiltySum >= 0
                ? 100 - value - probabiltySum
                : 0
              : 0;
            const equal = !isIndependent ? rest / nonTargets.length : 0;

            newState = {
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
                                    ? {
                                        ...c,
                                        subCases: c.subCases.map((sc) =>
                                          sc.key === subCaseKey
                                            ? {
                                                ...sc,
                                                probability: typeof value === "number" && value
                                              }
                                            : {
                                                ...sc,
                                                probability:
                                                  !isIndependent && !sc.isIndependent
                                                    ? getNewProbabilty(
                                                        sc.probability,
                                                        equal,
                                                        probabiltySum,
                                                        targetChange
                                                      )
                                                    : sc.probability
                                              }
                                        )
                                      }
                                    : c
                                )
                              }
                            : sub
                        )
                      }
                    : decision
                )
              }
            };
          } else if (caseKey) {
            // Get information about changed case
            const targetCases = root.decisions.find((item) => item.key === decKey).sub.find((sub) => sub.key === subKey)
              .cases;
            const targetCaseItem = targetCases.find((c) => c.key === caseKey);
            const isIndependent = targetCaseItem.isIndependent;
            const targetChange = typeof value === "number" && value - targetCaseItem.probability;

            // Get all other decisions that need to change according to the total change
            const nonTargets = targetCases.filter((sc) => sc.key !== caseKey && !sc.isIndependent);
            const probabiltySum = !isIndependent
              ? nonTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = !isIndependent
              ? typeof value === "number" && 100 - value - probabiltySum >= 0
                ? 100 - value - probabiltySum
                : 0
              : 0;
            const equal = !isIndependent ? rest / nonTargets.length : 0;

            newState = {
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
                                    ? { ...c, probability: typeof value === "number" && value }
                                    : {
                                        ...c,
                                        probability:
                                          !isIndependent && !c.isIndependent
                                            ? getNewProbabilty(c.probability, equal, probabiltySum, targetChange)
                                            : c.probability
                                      }
                                )
                              }
                            : sub
                        )
                      }
                    : decision
                )
              }
            };
          } else if (subKey) {
            // Get information about changed case
            const targetSubs = root.decisions.find((item) => item.key === decKey).sub;
            const targetSubItem = targetSubs.find((sub) => sub.key === subKey);
            const targetChange = typeof value === "number" && value - targetSubItem.probability;
            const isIndependent = targetSubItem.isIndependent;

            // Get all other decisions that need to change according to the total change
            const nonTargets = targetSubs.filter((sc) => sc.key !== subKey && !sc.isIndependent);
            const probabiltySum = !isIndependent
              ? nonTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = !isIndependent
              ? typeof value === "number" && 100 - value - probabiltySum >= 0
                ? 100 - value - probabiltySum
                : 0
              : 0;
            const equal = !isIndependent ? rest / nonTargets.length : 0;

            newState = {
              ...state,
              active: {
                ...state.active,
                decisions: root.decisions.map((decision) =>
                  decision.key === decKey
                    ? {
                        ...decision,
                        sub: decision.sub.map((sub) =>
                          sub.key === subKey
                            ? { ...sub, probability: typeof value === "number" && value }
                            : {
                                ...sub,
                                probability:
                                  !isIndependent && !sub.isIndependent
                                    ? getNewProbabilty(sub.probability, equal, probabiltySum, targetChange)
                                    : sub.probability
                              }
                        )
                      }
                    : decision
                )
              }
            };
          }

          const updatedState = {
            ...newState,
            active: {
              ...newState.active,
              decisions: newState.active.decisions.map((decision: Decision) => ({
                ...decision,
                sub: decision.sub.map((sub) => ({
                  ...sub,
                  value: sub.cases.length > 0 ? getValueFromChilds(sub, "cases") : sub.value,
                  cases: sub.cases.map((c) => ({
                    ...c,
                    value: c.subCases.length > 0 ? getValueFromChilds(c, "subCases") : c.value
                  }))
                }))
              }))
            }
          };

          setState({ ...updatedState });
        }
      }
      resolve(true);
    });

  // Independent settings
  const toggleIndependent = (decKey: string, subKey: string, caseKey?: string, subCaseKey?: string): void => {
    if (instanceOfPreset(root)) {
      if (subCaseKey) {
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
                                ? {
                                    ...c,
                                    subCases: c.subCases.map((sc) =>
                                      sc.key === subCaseKey
                                        ? {
                                            ...sc,
                                            isIndependent: !sc.isIndependent,
                                            probability: sc.isIndependent ? 0 : sc.probability
                                          }
                                        : sc
                                    )
                                  }
                                : c
                            )
                          }
                        : sub
                    )
                  }
                : decision
            )
          }
        });
      } else if (caseKey) {
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
                                ? {
                                    ...c,
                                    isIndependent: !c.isIndependent,
                                    probability: c.isIndependent ? 0 : c.probability
                                  }
                                : c
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
                      sub.key === subKey
                        ? {
                            ...sub,
                            isIndependent: !sub.isIndependent,
                            probability: sub.isIndependent ? 0 : sub.probability
                          }
                        : sub
                    )
                  }
                : decision
            )
          }
        });
      }
    }
  };

  // Independent settings
  const toggleClose = (decKey: string, subKey: string, caseKey?: string, subCaseKey?: string): void => {
    if (instanceOfPreset(root)) {
      if (subCaseKey) {
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
                                ? {
                                    ...c,
                                    subCases: c.subCases.map((sc) =>
                                      sc.key === subCaseKey
                                        ? {
                                            ...sc,
                                            isClosed: !sc.isClosed
                                          }
                                        : sc
                                    )
                                  }
                                : c
                            )
                          }
                        : sub
                    )
                  }
                : decision
            )
          }
        });
      } else if (caseKey) {
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
                                ? {
                                    ...c,
                                    isClosed: !c.isClosed
                                  }
                                : c
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
                      sub.key === subKey
                        ? {
                            ...sub,
                            isClosed: !sub.isClosed
                          }
                        : sub
                    )
                  }
                : decision
            )
          }
        });
      }
    }
  };

  // Remove
  const removeItem = (decKey: string, subKey?: string, caseKey?: string, subCaseKey?: string): void => {
    if (instanceOfPreset(root)) {
      let newState = {} as { active: Preset; selectedNode: Node | null };

      if (subCaseKey) {
        newState = {
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
                                ? { ...c, subCases: c.subCases.filter((sc) => sc.key !== subCaseKey) }
                                : c
                            )
                          }
                        : sub
                    )
                  }
                : decision
            )
          }
        };
      } else if (caseKey) {
        newState = {
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
        };
      } else if (subKey) {
        newState = {
          ...state,
          active: {
            ...state.active,
            decisions: root.decisions.map((decision) =>
              decision.key === decKey
                ? { ...decision, sub: decision.sub.filter((sub) => sub.key !== subKey) }
                : decision
            )
          }
        };
      } else {
        newState = {
          ...state,
          active: {
            ...state.active,
            decisions: root.decisions.filter((dec) => dec.key !== decKey)
          }
        };
      }

      const updatedState = {
        ...newState,
        active: {
          ...newState.active,
          decisions: newState.active.decisions.map((decision: Decision) => ({
            ...decision,
            sub: decision.sub.map((sub) => ({
              ...sub,
              value: sub.cases.length > 0 ? getValueFromChilds(sub, "cases") : sub.value,
              cases: sub.cases.map((c) => ({
                ...c,
                value: c.subCases.length > 0 ? getValueFromChilds(c, "subCases") : c.value
              }))
            }))
          }))
        }
      };

      setState({ ...updatedState });
    }
  };

  const addItem = (newKey: string, decKey?: string, subKey?: string, caseKey?: string): void => {
    if (instanceOfPreset(root)) {
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
                              c.key === caseKey
                                ? {
                                    ...c,
                                    subCases: [
                                      ...c.subCases,
                                      {
                                        key: newKey,
                                        title: i18next.t("calculator.add_item_title"),
                                        probability: 0,
                                        value: 0
                                      }
                                    ]
                                  }
                                : c
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
                      sub.key === subKey
                        ? {
                            ...sub,
                            cases: [
                              ...sub.cases,
                              {
                                key: newKey,
                                title: i18next.t("calculator.add_item_title"),
                                probability: 0,
                                value: 0,
                                subCases: []
                              }
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
                        key: newKey,
                        title: i18next.t("calculator.add_item_title"),
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
            decisions: [...root.decisions, { key: newKey, title: i18next.t("calculator.add_item_title"), sub: [] }]
          }
        });
      }
    }
  };

  const setSelectedNode = (node: Node | null): void => {
    setState({ ...state, selectedNode: node });
  };

  return (
    <GlobalDecisionContext.Provider
      value={{
        ...state,
        setTitle,
        setValue,
        setProbabilityByKey,
        removeItem,
        addItem,
        toggleIndependent,
        setActiveFromPreset,
        toggleClose,
        setSelectedNode
      }}
    >
      {state && children}
    </GlobalDecisionContext.Provider>
  );
};
