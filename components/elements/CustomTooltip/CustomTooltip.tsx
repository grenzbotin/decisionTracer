import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
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

export default function CustomTooltip({ content }: { content: JSX.Element | string }): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <TooltipWrapper
        open={open}
        onClose={handleClose}
        title={content}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <IconButton size="small" color="primary" aria-label="meeting a person?" component="span" onClick={handleOpen}>
          {open ? <HelpIcon fontSize="inherit" /> : <HelpOutlineIcon fontSize="inherit" />}
        </IconButton>
      </TooltipWrapper>
    </ClickAwayListener>
  );
}
