import React from "react";
import { DialogActions as MuiActions } from "@material-ui/core";

import { ActionsProps } from ".";

function DialogActions({ children }: ActionsProps): JSX.Element {
  return <MuiActions>{children}</MuiActions>;
}

export default DialogActions;
