/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import T from "prop-types";

export interface Decision {
  key: number;
  title: string;
  cases: Array<{
    key: number;
    title: string;
    probability: number;
    value: number;
  }>;
}

const defaultState = [
  {
    key: 0,
    title: "Impfen",
    cases: [
      {
        key: 0,
        title: "Gesund",
        probability: 99,
        value: 1000,
      },
      {
        key: 1,
        title: "Tod",
        probability: 1,
        value: -1000,
      },
    ],
  },
  {
    key: 1,
    title: "Nicht impfen",
    cases: [
      {
        key: 0,
        title: "Gesund",
        probability: 20,
        value: 20,
      },
      {
        key: 1,
        title: "Krank",
        probability: 70,
        value: -100,
      },
      {
        key: 2,
        title: "Tod",
        probability: 10,
        value: -1000,
      },
    ],
  },
];

const getNewProbabilty = (
  itemProbabilty: number,
  equal: number,
  probabiltySum: number,
  targetChange: number
): number => {
  if (equal > 0) {
    return itemProbabilty + equal;
  }
  if (itemProbabilty - (probabiltySum / itemProbabilty) * targetChange > 0) {
    return itemProbabilty - (probabiltySum / itemProbabilty) * targetChange;
  }
  return 0;
};

// Context for defining the global scope: UI Settings
export const GlobalDecisionContext = React.createContext({
  decisions: defaultState,
  setProbabiltyChange: (
    _decisionKey: number,
    _itemKey: number,
    _value: number | number[]
  ) => undefined,
  setValueChange: (
    _decisionKey: number,
    _itemKey: number,
    _value: number | number[]
  ) => undefined,
  setNewDecision: () => undefined,
  setNewScenario: (_decisionKey: number) => undefined,
  editDecisionName: (_title: string, _id: number) => undefined,
  editScenarioName: (_title: string, _id: number, _caseId: number) => undefined,
});

interface T {
  children: React.ReactNode;
}

export const GlobalDecisionContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ decisions: defaultState });

  const setProbabiltyChange = (
    decisionKey: number,
    itemKey: number,
    value: number | number[]
  ): void => {
    // Get information about changed case
    const targetCase = state.decisions[decisionKey].cases.find(
      (c) => c.key === itemKey
    );
    const targetChange =
      typeof value === "number" && value - targetCase.probability;

    // Get all other cases that need to change according to the total change
    const nonTargetCases = state.decisions[decisionKey].cases.filter(
      (c) => c.key !== itemKey
    );
    const probabiltySum = nonTargetCases
      .map((c) => c.probability)
      .reduce((a, b) => a + b, 0);
    const rest =
      typeof value === "number" && 100 - value - probabiltySum >= 0
        ? 100 - value - probabiltySum
        : 0;
    const equal = rest / nonTargetCases.length;

    setState({
      ...state,
      decisions: [
        ...state.decisions.slice(0, decisionKey),
        {
          ...state.decisions[decisionKey],
          cases: state.decisions[decisionKey].cases.map((c) =>
            c.key === itemKey
              ? {
                  ...c,
                  probability:
                    typeof value === "number" && parseFloat(value.toFixed(3)),
                }
              : {
                  ...c,
                  probability: parseFloat(
                    getNewProbabilty(
                      c.probability,
                      equal,
                      probabiltySum,
                      targetChange
                    ).toFixed(3)
                  ),
                }
          ),
        },
        ...state.decisions.slice(decisionKey + 1),
      ],
    });
  };

  const setValueChange = (
    decisionKey: number,
    itemKey: number,
    value: number | number[]
  ): void => {
    setState({
      ...state,
      decisions: [
        ...state.decisions.slice(0, decisionKey),
        {
          ...state.decisions[decisionKey],
          cases: state.decisions[decisionKey].cases.map((c) =>
            c.key === itemKey
              ? { ...c, value: typeof value === "number" && value }
              : c
          ),
        },
        ...state.decisions.slice(decisionKey + 1),
      ],
    });
  };

  const setNewDecision = (): void => {
    setState({
      ...state,
      decisions: [
        ...state.decisions,
        { key: state.decisions.length, title: "new", cases: [] },
      ],
    });
  };

  const setNewScenario = (decisionKey: number): void => {
    setState({
      ...state,
      decisions: [
        ...state.decisions.slice(0, decisionKey),
        {
          ...state.decisions[decisionKey],
          cases: [
            ...state.decisions[decisionKey].cases,
            {
              key: state.decisions[decisionKey].cases.length,
              title: "new",
              probability: 0,
              value: 0,
            },
          ],
        },
        ...state.decisions.slice(decisionKey + 1),
      ],
    });
  };

  const editDecisionName = (title: string, id: number): void => {
    setState({
      ...state,
      decisions: state.decisions.map((item) =>
        item.key === id ? { ...item, title } : item
      ),
    });
  };

  const editScenarioName = (
    title: string,
    id: number,
    caseId: number
  ): void => {
    setState({
      ...state,
      decisions: state.decisions.map((item) => {
        if (item.key === id) {
          return {
            ...item,
            cases: item.cases.map((itemC) =>
              itemC.key === caseId ? { ...itemC, title } : itemC
            ),
          };
        }

        return item;
      }),
    });
  };

  return (
    <GlobalDecisionContext.Provider
      value={{
        ...state,
        setProbabiltyChange,
        setValueChange,
        setNewDecision,
        setNewScenario,
        editDecisionName,
        editScenarioName,
      }}
    >
      {state && children}
    </GlobalDecisionContext.Provider>
  );
};

GlobalDecisionContextProvider.propTypes = {
  children: T.node.isRequired,
};
