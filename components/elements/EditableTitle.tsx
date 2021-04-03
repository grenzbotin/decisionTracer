import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Popover, TextField, Typography, withStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

const CustomTextButton = withStyles({
  root: {
    textTransform: "none",
    textAlign: "left",
    minWidth: "20px"
  }
})(Button);

function EditableTitle({
  title,
  onChange,
  variant,
  component,
  alignItems = "baseline"
}: {
  title: string;
  onChange: (_title: string) => void;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body2" | "caption";
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  alignItems?: "baseline" | "center";
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [localTitle, setLocalTitle] = useState<string>("");

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setLocalTitle(e.currentTarget.value);
  };

  const handleClose = (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleSave = (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>): void => {
    onChange(localTitle);
    handleClose(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave(e);
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "edit-name" : undefined;

  return (
    <div style={{ display: "flex", alignItems: alignItems, overflow: "hidden" }}>
      <CustomTextButton onClick={handleClick}>
        <Typography variant={variant} component={component} style={{ wordBreak: "break-word" }}>
          {title}
        </Typography>
      </CustomTextButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Box
          p={2}
          style={{ display: "flex", alignItems: "center", padding: ".5rem" }}
          onClick={(e) => e.stopPropagation()}
        >
          <TextField
            id="standard-basic"
            label="Name"
            value={localTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            variant="filled"
            size="small"
          />
          <IconButton
            disabled={!localTitle}
            color="primary"
            aria-label="edit name"
            style={{ marginLeft: "1rem" }}
            onClick={handleSave}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <IconButton color="inherit" aria-label="edit name" style={{ marginLeft: ".5rem" }} onClick={handleClose}>
            <CancelIcon fontSize="small" />
          </IconButton>
        </Box>
      </Popover>
    </div>
  );
}

export default EditableTitle;
