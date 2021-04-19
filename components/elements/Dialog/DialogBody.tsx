import React from "react";
import { DialogContent } from "@material-ui/core";
import { BodyProps } from ".";

function DialogBody({ children }: BodyProps): JSX.Element {
  return <DialogContent style={{ paddingBottom: "2rem" }}>{children}</DialogContent>;
}

export default DialogBody;
