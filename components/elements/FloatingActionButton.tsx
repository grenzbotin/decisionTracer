import React from "react";
import { Fab, makeStyles } from "@material-ui/core";

interface Props {
  handleAction: () => void;
  label: string;
  icon: JSX.Element;
}

const FloatingActionButton: React.FC<Props> = ({ handleAction, label, icon }) => {
  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "fixed",
      bottom: theme.spacing(8),
      right: theme.spacing(2),
      zIndex: 4
    }
  }));
  const classes = useStyles();

  return (
    <Fab color="primary" onClick={handleAction} className={classes.fab} aria-label={label}>
      {icon}
    </Fab>
  );
};

export default FloatingActionButton;
