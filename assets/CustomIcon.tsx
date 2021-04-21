import { SvgIcon } from "@material-ui/core";
import React from "react";

import Virus from "./svg/virus.svg";
import Vaccination from "./svg/vaccination.svg";
import NoVaccination from "./svg/noVaccination.svg";
import Question from "./svg/question.svg";
import DeFlag from "./svg/de.svg";
import EnFlag from "./svg/en.svg";
import Custom from "./svg/custom.svg";
import Coin from "./svg/coins.svg";
import Intersectioning from "./svg/intersectioning.svg";

const ICONS = {
  virus: {
    path: Virus,
    viewbox: "0 0 512.298 512.298"
  },
  vaccination: {
    path: Vaccination,
    viewbox: "0 0 512 512"
  },
  noVaccination: {
    path: NoVaccination,
    viewbox: "0 0 512 512"
  },
  question: {
    path: Question,
    viewbox: "0 0 512.001 512.001"
  },
  en: {
    path: EnFlag,
    viewbox: "0 0 1000 500"
  },
  de: {
    path: DeFlag,
    viewbox: "0 0 5 3"
  },
  custom: {
    path: Custom,
    viewbox: "0 0 512 512"
  },
  coin: {
    path: Coin,
    viewbox: "0 0 60 60"
  },
  intersectioning: {
    path: Intersectioning,
    viewbox: "0 0 377 160"
  }
};

const CustomIcon = ({
  name,
  fontSize = "default",
  style
}: {
  name: string;
  fontSize?: "small" | "inherit" | "large" | "default";
  style?: Record<string, string | number>;
}): JSX.Element => {
  const icon = ICONS[name] || ICONS["custom"];
  return <SvgIcon component={icon.path} fontSize={fontSize} viewBox={icon.viewbox} style={style} />;
};

export default CustomIcon;
