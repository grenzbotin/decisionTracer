import { SvgIcon } from "@material-ui/core";
import React from "react";

import Virus from "./svg/virus.svg";
import Vaccination from "./svg/vaccination.svg";
import NoVaccination from "./svg/noVaccination.svg";

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
  const icon = ICONS[name] || ICONS["virus"];
  return (
    <SvgIcon component={icon.path} fontSize={fontSize} width="0" height="0" viewBox={icon.viewbox} style={style} />
  );
};

export default CustomIcon;
