import React, { useState } from "react";
import i18next from "i18next";
import { AppBar, IconButton, makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import Result from "./Result";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0
  }
});

function FooterResult(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleToggleClick = (): void => {
    setOpen(!open);
  };

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: ".2rem 1rem", alignItems: "center" }}>
        <Typography variant="subtitle2" component="h3">
          {i18next.t("calculator.result")}
        </Typography>
        <IconButton color="inherit" aria-label="toggle results" size="small" edge="end" onClick={handleToggleClick}>
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </IconButton>
      </div>
      {open && <Result mobile height={150} />}
    </AppBar>
  );
}

export default FooterResult;
