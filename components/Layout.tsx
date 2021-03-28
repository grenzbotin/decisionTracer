import React, { useContext, useState } from "react";
import clsx from "clsx";
import i18next from "i18next";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";

import CustomIcon from "../assets/CustomIcon";
import { GlobalDecisionContext } from "../hooks/GlobalDecisionsContextProvider";
import { DRAWER_WIDTH } from "./theme";
import SideBar from "./SideBar";
import LanguageToggle from "./LanguageToggle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: DRAWER_WIDTH
    },
    title: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      fontWeight: 500
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    },
    drawerPaper: {
      width: DRAWER_WIDTH
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginRight: -DRAWER_WIDTH
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    }
  })
);

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  const classes = useStyles();
  const { active } = useContext(GlobalDecisionContext);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const pageAttrs = {
    icon: active ? active.icon : "question",
    title: active ? i18next.t(active.question) : "Decision Tracer"
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography component="h1" variant="body1" noWrap className={classes.title}>
            <CustomIcon name={pageAttrs.icon} fontSize="large" style={{ marginRight: "2rem" }} />
            {pageAttrs.title}
          </Typography>
          <LanguageToggle />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <main>
          <Container maxWidth="xl" style={{ padding: 0 }}>
            <div className={classes.drawerHeader} />
            {children}
          </Container>
        </main>
      </div>
      <SideBar open={open} handleClose={handleDrawerClose} />
    </div>
  );
}
