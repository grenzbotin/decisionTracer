import { ReactNode } from "react";
import { Dialog as MuiDialog } from "@material-ui/core";

import DialogHeader from "./DialogHeader";
import DialogBody from "./DialogBody";
import DialogActions from "./DialogActions";

export interface HeaderProps {
  children: ReactNode;
  onClose: () => void | undefined;
}

export interface BodyProps {
  children: ReactNode;
}

export interface ActionsProps {
  children: ReactNode;
}

interface DialogProps {
  open: boolean;
  fullScreen?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  children: ReactNode;
}

interface DialogComposition {
  Header: React.FC<HeaderProps>;
  Body: React.FC<BodyProps>;
  Actions: React.FC<ActionsProps>;
}

const Dialog: React.FC<DialogProps> & DialogComposition = ({ open = false, fullScreen, children, maxWidth = "md" }) => {
  return (
    <MuiDialog fullScreen={fullScreen} fullWidth maxWidth={maxWidth} open={open} scroll="paper">
      {children}
    </MuiDialog>
  );
};

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Actions = DialogActions;

export default Dialog;
