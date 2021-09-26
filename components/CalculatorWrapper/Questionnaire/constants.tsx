import ValuesProgressionSelection from "./Corona/ValuesProgressionSelection";
import PersonalData from "./Corona/PersonalData";
import ProbabilityVaccinationDamageSelection from "./Corona/ProbabilityVaccinationDamageSelection";
import CoronaResult from "./Corona/CoronaResult";
import Welcome from "./Corona/Welcome";

import Coin0 from "./CoinToss/Q0";
import Coin1 from "./CoinToss/Q1";
import Coin2 from "./CoinToss/Q2";
import Coin3 from "./CoinToss/Q3";
import Coin4 from "./CoinToss/Q4";

export const TABS = {
  corona: [
    {
      id: 0,
      label: 1,
      content: <Welcome />
    },
    {
      id: 1,
      label: 2,
      content: <PersonalData />
    },
    {
      id: 2,
      label: 3,
      content: <ValuesProgressionSelection />
    },
    {
      id: 3,
      label: 4,
      content: <ProbabilityVaccinationDamageSelection />
    },
    {
      id: 4,
      label: 5,
      content: <CoronaResult />
    }
  ],
  ["coin-toss"]: [
    {
      id: 0,
      label: 1,
      content: <Coin0 />
    },
    {
      id: 1,
      label: 2,
      content: <Coin1 />
    },
    {
      id: 2,
      label: 3,
      content: <Coin2 />
    },
    {
      id: 3,
      label: 4,
      content: <Coin3 />
    },
    {
      id: 4,
      label: 5,
      content: <Coin4 />
    }
  ]
};
