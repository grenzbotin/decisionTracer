/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const VACCINATION_EFFICACY = 0.84975;

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
    damage_amount: 42,
    damage_vaccinated: 3584225
  },
  q3: {
    mild_day_value: -1,
    mild_days_duration: 14,
    hospitalised_day_value: -5,
    hospitalised_days_duration: 14,
    "severely-hospitalised_day_value": -10,
    "severely-hospitalised_days_duration": 14
  },
  personalData: {
    age: "50",
    sex: "F",
    vaccinationEfficiacy: VACCINATION_EFFICACY
  },
  valuesProgression: {
    type: "typecustom",
    hospitalised: 10,
    "severely-hospitalised": 30,
    death: 500,
    "vaccination-damage": 50
  },
  setValuesByStep: (_value?: Record<string, number | string>, _step?: string) => undefined
});

interface T {
  children: React.ReactNode;
}

export const CoronaPresetContextProvider: React.FC<T> = ({ children }) => {
  const [state, setState] = useState({
    q0: {
      knownInfected: 279387,
      darkFigure: 3,
      inhabitants: 83019213,
      peopleToMeet: 15,
      injectionDuration: 12
    },
    q2: {
      deaths_amount: 80303,
      deaths_infected: 3163308,
      damage_amount: 42,
      damage_vaccinated: 4639447
    },
    q3: {
      mild_day_value: -1,
      mild_days_duration: 14,
      hospitalised_day_value: -5,
      hospitalised_days_duration: 14,
      "severely-hospitalised_day_value": -10,
      "severely-hospitalised_days_duration": 14
    },
    personalData: {
      age: "50",
      sex: "F",
      vaccinationEfficiacy: VACCINATION_EFFICACY
    },
    valuesProgression: {
      type: "typecustom",
      hospitalised: 10,
      "severely-hospitalised": 30,
      death: 500,
      "vaccination-damage": 50
    }
  });

  const setValuesByStep = (value: Record<string, number | string>, step: string): void => {
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
