import React from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { DialogTitle } from "@material-ui/core";
import { HeaderProps } from ".";

function DialogHeader({ children, onClose }: HeaderProps): JSX.Element {
  return (
    <DialogTitle>
      <div>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={onClose}
          style={{
            position: "absolute",
            right: ".5rem",
            top: ".5rem"
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default DialogHeader;
