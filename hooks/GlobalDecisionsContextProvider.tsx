import React, { useState } from 'react';
import T from 'prop-types';

export interface Decision {
  key: number;
  title: string;
  cases: Array<{ key: number; title: string; probability: number; value: number }>;
}

const defaultState = [
  {
    key: 0,
    title: 'Impfen',
    cases: [
      {
        key: 0,
        title: 'Gesund',
        probability: 99,
        value: 1000
      },
      {
        key: 1,
        title: 'Tod',
        probability: 1,
        value: -1000
      }
    ]
  },
  {
    key: 1,
    title: 'Nicht impfen',
    cases: [
      {
        key: 0,
        title: 'Gesund',
        probability: 20,
        value: 20
      },
      {
        key: 1,
        title: 'Krank',
        probability: 70,
        value: -100
      },
      {
        key: 2,
        title: 'Tod',
        probability: 10,
        value: -1000
      }
    ]
  }
];

// Context for defining the global scope: UI Settings
export const GlobalDecisionContext = React.createContext({
  decisions: defaultState,
  setProbabiltyChange: (_decisionKey: number, _itemKey: number, _value: number | number[]) =>
    undefined,
  setValueChange: (_decisionKey: number, _itemKey: number, _value: number | number[]) => undefined,
  setNewDecision: () => undefined,
  setNewScenario: (_decisionKey: number) => undefined,
  editDecisionName: (_title: string, _id: number) => undefined,
  editScenarioName: (_title: string, _id: number, _caseId: number) => undefined
});

interface T {
  children: React.ReactNode;
}

export const GlobalDecisionContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({ decisions: defaultState });

  const setProbabiltyChange = (decisionKey: number, itemKey: number, value: number): void => {
    // Probability is not allowed to go over 100
    let maxValue = 100;
    state.decisions[decisionKey].cases.forEach((item) => {
      maxValue -= item.key !== itemKey ? item.probability : 0;
    });

    setState({
      ...state,
      decisions: [
        ...state.decisions.slice(0, decisionKey),
        {
          ...state.decisions[decisionKey],
          cases: state.decisions[decisionKey].cases.map((c) =>
            c.key === itemKey ? { ...c, probability: value > maxValue ? maxValue : value } : c
          )
        },
        ...state.decisions.slice(decisionKey + 1)
      ]
    });
  };

  const setValueChange = (decisionKey: number, itemKey: number, value: number): void => {
    setState({
      ...state,
      decisions: [
        ...state.decisions.slice(0, decisionKey),
        {
          ...state.decisions[decisionKey],
          cases: state.decisions[decisionKey].cases.map((c) =>
            c.key === itemKey ? { ...c, value: value } : c
          )
        },
        ...state.decisions.slice(decisionKey + 1)
      ]
    });
  };

  const setNewDecision = () => {
    setState({
      ...state,
      decisions: [...state.decisions, { key: state.decisions.length, title: 'new', cases: [] }]
    });
  };

  const setNewScenario = (decisionKey: number) => {
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
              title: 'new',
              probability: 0,
              value: 0
            }
          ]
        },
        ...state.decisions.slice(decisionKey + 1)
      ]
    });
  };

  const editDecisionName = (title: string, id: number) => {
    setState({
      ...state,
      decisions: state.decisions.map((item) => (item.key === id ? { ...item, title } : item))
    });
  };

  const editScenarioName = (title: string, id: number, caseId: number) => {
    setState({
      ...state,
      decisions: state.decisions.map((item) => {
        if (item.key === id) {
          return {
            ...item,
            cases: item.cases.map((itemC) => (itemC.key === caseId ? { ...itemC, title } : itemC))
          };
        }

        return item;
      })
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
        editScenarioName
      }}
    >
      {state && children}
    </GlobalDecisionContext.Provider>
  );
};

GlobalDecisionContextProvider.propTypes = {
  children: T.node.isRequired
};
