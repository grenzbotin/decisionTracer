import React, { useState } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorIcon from "@material-ui/icons/Error";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import HelpIcon from "@material-ui/icons/Help";
import { IconButton } from "@material-ui/core";

const TooltipWrapper = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    maxWidth: "340px"
  }
}))(Tooltip);

export default function CustomTooltip({
  content,
  alert = false,
  style = {},
  isOpen = false
}: {
  content: JSX.Element | string;
  alert?: boolean;
  isOpen?: boolean;
  style?: Record<string, number | string>;
}): JSX.Element {
  const [open, setOpen] = useState(isOpen);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const getCustomTooltipIcon = (): JSX.Element => {
    if (alert) {
      if (open) {
        return <ErrorIcon fontSize="inherit" />;
      }
      return <ErrorOutlineIcon fontSize="inherit" />;
    } else {
      if (open) {
        return <HelpIcon fontSize="inherit" />;
      }
      return <HelpOutlineIcon fontSize="inherit" />;
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <TooltipWrapper
        interactive
        open={open}
        onClose={handleClose}
        title={content}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <IconButton
          size="small"
          color="primary"
          aria-label="meeting a person?"
          component="span"
          onClick={handleOpen}
          style={style}
        >
          {getCustomTooltipIcon()}
        </IconButton>
      </TooltipWrapper>
    </ClickAwayListener>
  );
}
