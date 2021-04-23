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
  setProbabilityByKeyHard: (
    _value: number | number[],
    _decKey: string,
    _subKey: string,
    _caseKey?: string,
    _subCaseKey?: string
  ) => undefined,
  removeItem: (_decKey: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
  addItem: (_newKey: string, _decKey?: string, _subKey?: string, _caseKey?: string) => undefined,
  toggleIndependent: (_decKey: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
  toggleIntersecting: (_decKey: string, _subKey?: string, _caseKey?: string, _subCaseKey?: string) => undefined,
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
  ): Promise<boolean> =>
    new Promise((resolve) => {
      if (instanceOfPreset(root)) {
        let title = "";
        let isValueLocked = false;

        if (subCaseKey) {
          const item = root.decisions
            .find((decision) => decision.key === decKey)
            .sub.find((sub) => sub.key === subKey)
            .cases.find((c) => c.key === caseKey)
            .subCases.find((sc) => sc.key === subCaseKey);
          title = item.title;
          isValueLocked = item.isValueLocked;
        } else if (caseKey) {
          const item = root.decisions
            .find((decision) => decision.key === decKey)
            .sub.find((sub) => sub.key === subKey)
            .cases.find((c) => c.key === caseKey);

          title = item.title;
          isValueLocked = item.isValueLocked;
        } else if (subKey) {
          const item = root.decisions.find((decision) => decision.key === decKey).sub.find((sub) => sub.key === subKey);

          title = item.title;
          isValueLocked = item.isValueLocked;
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
                  sub.title === title &&
                  ((!isValueLocked && !sub.isValueLocked) || sub.key === subKey) &&
                  typeof value === "number"
                    ? value
                    : sub.value,
                cases: sub.cases.map((c) => ({
                  ...c,
                  value:
                    c.title === title &&
                    ((!isValueLocked && !c.isValueLocked) || c.key === caseKey) &&
                    typeof value === "number"
                      ? value
                      : c.value,
                  subCases: c.subCases.map((sc) => ({
                    ...sc,
                    value:
                      sc.title === title &&
                      ((!isValueLocked && !sc.isValueLocked) || sub.key === subCaseKey) &&
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

        setState({ ...updatedState });
      }
      resolve(true);
    });

  const setProbabilityByKeyHard = (
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
            };
          } else if (caseKey) {
            // Get information about changed case
            const targetCases = root.decisions.find((item) => item.key === decKey).sub.find((sub) => sub.key === subKey)
              .cases;
            const targetCaseItem = targetCases.find((c) => c.key === caseKey);
            const isProbabilityIntersecting = targetCaseItem.isProbabilityIntersecting;
            const targetChange = typeof value === "number" && value - targetCaseItem.probability;

            // Get all other decisions that need to change according to the total change
            const changingTargets = targetCases.filter(
              (sc) => sc.key !== caseKey && sc.isProbabilityIntersecting && !sc.isProbabilityLocked
            );
            const currentProbabiltySum = isProbabilityIntersecting
              ? changingTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = isProbabilityIntersecting
              ? typeof value === "number" && 100 - value - currentProbabiltySum >= 0
                ? 100 - value - currentProbabiltySum
                : 0
              : 0;
            const equal = isProbabilityIntersecting ? rest / changingTargets.length : 0;

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
                                  c.key === caseKey ? { ...c, probability: typeof value === "number" && value } : c
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
            const isProbabilityIntersecting = targetSubItem.isProbabilityIntersecting;

            // Get all other decisions that need to change according to the total change
            const changingTargets = targetSubs.filter(
              (sc) => sc.key !== subKey && sc.isProbabilityIntersecting && !sc.isProbabilityLocked
            );
            const currentProbabiltySum = isProbabilityIntersecting
              ? changingTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = isProbabilityIntersecting
              ? typeof value === "number" && 100 - value - currentProbabiltySum >= 0
                ? 100 - value - currentProbabiltySum
                : 0
              : 0;
            const equal = isProbabilityIntersecting ? rest / changingTargets.length : 0;

            newState = {
              ...state,
              active: {
                ...state.active,
                decisions: root.decisions.map((decision) =>
                  decision.key === decKey
                    ? {
                        ...decision,
                        sub: decision.sub.map((sub) =>
                          sub.key === subKey ? { ...sub, probability: typeof value === "number" && value } : sub
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

            // Is probability an intersecting value?
            const isProbabilityIntersecting = targetSubCaseItem.isProbabilityIntersecting;
            const targetChange = typeof value === "number" && value - targetSubCaseItem.probability;

            // Get all other decisions that need to change according to the total change
            const changingTargets = targetSubCases.filter(
              (sc) => sc.key !== subCaseKey && sc.isProbabilityIntersecting && !sc.isProbabilityLocked
            );
            const currentProbabiltySum = isProbabilityIntersecting
              ? changingTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;

            const rest = isProbabilityIntersecting
              ? typeof value === "number" && 100 - value - currentProbabiltySum >= 0
                ? 100 - value - currentProbabiltySum
                : 0
              : 0;

            const equal = isProbabilityIntersecting ? rest / changingTargets.length : 0;

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
                                                  isProbabilityIntersecting &&
                                                  sc.isProbabilityIntersecting &&
                                                  !sc.isProbabilityLocked
                                                    ? getNewProbabilty(
                                                        sc.probability,
                                                        equal,
                                                        currentProbabiltySum,
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
            const isProbabilityIntersecting = targetCaseItem.isProbabilityIntersecting;
            const targetChange = typeof value === "number" && value - targetCaseItem.probability;

            // Get all other decisions that need to change according to the total change
            const changingTargets = targetCases.filter(
              (sc) => sc.key !== caseKey && sc.isProbabilityIntersecting && !sc.isProbabilityLocked
            );
            const currentProbabiltySum = isProbabilityIntersecting
              ? changingTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = isProbabilityIntersecting
              ? typeof value === "number" && 100 - value - currentProbabiltySum >= 0
                ? 100 - value - currentProbabiltySum
                : 0
              : 0;
            const equal = isProbabilityIntersecting ? rest / changingTargets.length : 0;

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
                                          isProbabilityIntersecting &&
                                          c.isProbabilityIntersecting &&
                                          !c.isProbabilityLocked
                                            ? getNewProbabilty(c.probability, equal, currentProbabiltySum, targetChange)
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
            const isProbabilityIntersecting = targetSubItem.isProbabilityIntersecting;

            // Get all other decisions that need to change according to the total change
            const changingTargets = targetSubs.filter(
              (sc) => sc.key !== subKey && sc.isProbabilityIntersecting && !sc.isProbabilityLocked
            );
            const currentProbabiltySum = isProbabilityIntersecting
              ? changingTargets.map((d) => d.probability).reduce((a: number, b: number) => a + b, 0)
              : 0;
            const rest = isProbabilityIntersecting
              ? typeof value === "number" && 100 - value - currentProbabiltySum >= 0
                ? 100 - value - currentProbabiltySum
                : 0
              : 0;
            const equal = isProbabilityIntersecting ? rest / changingTargets.length : 0;

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
                                  isProbabilityIntersecting && sub.isProbabilityIntersecting
                                    ? getNewProbabilty(sub.probability, equal, currentProbabiltySum, targetChange)
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
                                            isProbabilityLocked: !sc.isProbabilityLocked
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
                                    isProbabilityLocked: !c.isProbabilityLocked
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
                            isProbabilityLocked: !sub.isProbabilityLocked
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

  // Toggle intersecting
  const toggleIntersecting = (decKey: string, subKey: string, caseKey?: string, subCaseKey?: string): void => {
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
                                            isProbabilityIntersecting: !sc.isProbabilityIntersecting,
                                            probability: !sc.isProbabilityIntersecting ? 0 : sc.probability
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
                                    isProbabilityIntersecting: !c.isProbabilityIntersecting,
                                    probability: !c.isProbabilityIntersecting ? 0 : c.probability
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
                            isProbabilityIntersecting: !sub.isProbabilityIntersecting,
                            probability: !sub.isProbabilityIntersecting ? 0 : sub.probability
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
                                            isValueLocked: !sc.isValueLocked
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
                                    isValueLocked: !c.isValueLocked
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
                            isValueLocked: !sub.isValueLocked
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
        setProbabilityByKeyHard,
        removeItem,
        addItem,
        toggleIndependent,
        toggleIntersecting,
        setActiveFromPreset,
        toggleClose,
        setSelectedNode
      }}
    >
      {state && children}
    </GlobalDecisionContext.Provider>
  );
};
