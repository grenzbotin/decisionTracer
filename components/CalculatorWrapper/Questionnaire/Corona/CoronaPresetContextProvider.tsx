/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

// Context for defining and updating helper values for corona preset calculation
export const CoronaPresetContext = React.createContext({
  q0: {
    knownInfected: 240624,
    darkFigure: 3,
    inhabitants: 83019213,
    peopleToMeet: 15,
    injectionDuration: 12
  },
  q2: {
    deaths_amount: 78249,
    deaths_infected: 2980413,
    damage_amount: 31,
    damage_vaccinated: 3584225
  },
  q3: {
    mild_day_value: -1,
    mild_days_duration: 14,
    difficult_day_value: -5,
    difficult_days_duration: 40
  },
  setValuesByStep: (_value?: Record<string, number>, _step?: string) => undefined
});

interface T {
  children: React.ReactNode;
}

export const CoronaPresetContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({
    q0: {
      knownInfected: 240624,
      darkFigure: 3,
      inhabitants: 83019213,
      peopleToMeet: 15,
      injectionDuration: 12
    },
    q2: {
      deaths_amount: 78249,
      deaths_infected: 2980413,
      damage_amount: 31,
      damage_vaccinated: 3584225
    },
    q3: {
      mild_day_value: -1,
      mild_days_duration: 14,
      difficult_day_value: -5,
      difficult_days_duration: 40
    }
  });

  const setValuesByStep = (value: Record<string, number>, step: string): void => {
    setState({ ...state, [step]: { ...state[step], ...value } });
  };

  return (
    <CoronaPresetContext.Provider
      value={{
        ...state,
        setValuesByStep
      }}
    >
      {state && children}
    </CoronaPresetContext.Provider>
  );
};
