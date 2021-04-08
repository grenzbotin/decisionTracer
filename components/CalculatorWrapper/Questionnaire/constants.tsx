import Q0 from "./Corona/Q0";
import Q1 from "./Corona/Q1";
import Q2 from "./Corona/Q2";
import Q3 from "./Corona/Q3";
import Q4 from "./Corona/Q4";

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
      content: <Q0 />
    },
    {
      id: 1,
      label: 2,
      content: <Q1 />
    },
    {
      id: 2,
      label: 3,
      content: <Q2 />
    },
    {
      id: 3,
      label: 4,
      content: <Q3 />
    },
    {
      id: 4,
      label: 5,
      content: <Q4 />
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
