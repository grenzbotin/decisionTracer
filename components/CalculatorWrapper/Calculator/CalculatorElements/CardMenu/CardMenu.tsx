import React, { useState } from "react";
import { IconButton, ListItemIcon, MenuItem, MenuList, Paper, Popover } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

interface ListContent {
  icon?: JSX.Element;
  text: string;
  onClick: (_e: React.MouseEvent<HTMLButtonElement>) => void;
}

function CardMenu({
  listContent,
  size = "medium"
}: {
  listContent: Array<ListContent>;
  size?: "small" | "medium";
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleAction = (event: React.MouseEvent<HTMLLIElement>, action: () => void): void => {
    event.stopPropagation();
    action(event);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "edit-name" : undefined;

  return (
    <div>
      <IconButton aria-label="edit name" size={size} onClick={handleClick} style={{ marginLeft: ".5rem" }}>
        <SettingsIcon fontSize="small" />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Paper>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {listContent.map((item) => (
              <MenuItem key={item.text} dense onClick={(e) => handleAction(e, item.onClick)}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>} {item.text}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
}

export default CardMenu;
