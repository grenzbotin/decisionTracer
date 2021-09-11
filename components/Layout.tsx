import React, { useContext, useState } from "react";
import clsx from "clsx";
import i18next from "i18next";
import Link from "next/link";
import { makeStyles, Theme, useTheme, createStyles } from "@material-ui/core/styles";
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
import Footer from "./Footer";
import { useMediaQuery } from "@material-ui/core";

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
    toolBar: {
      display: "flex",
      justifyContent: "space-between"
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
      padding: theme.spacing(2),
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
    },
    badge: {
      position: "absolute",
      left: "-7px",
      top: "19px",
      backgroundColor: "#F70000",
      transform: "rotate(-45deg) scale(1) skew(0deg) translate(10px)",
      textAlign: "center",
      textTransform: "uppercase",
      fontWeight: 600,
      color: "white",
      padding: "0 .5em",
      borderTop: "0px",
      lineHeight: "20px",
      margin: "0",
      zIndex: 1100,
      "&::after": {
        content: '""',
        position: "absolute",
        right: "-19px",
        top: "0px",
        borderRight: "20px solid transparent",
        borderBottom: "20px solid #F70000"
      },
      "&::before": {
        content: '""',
        position: "absolute",
        left: "-19px",
        top: "0px",
        borderLeft: "20px solid transparent",
        borderBottom: "20px solid #F70000"
      }
    }
  })
);

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  const classes = useStyles();
  const { active } = useContext(GlobalDecisionContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const pageAttrs = {
    icon: active ? active.icon : "question",
    title: active ? i18next.t(active.question) : "Rational Decision"
  };

  const isHome = pageAttrs.icon === "question";

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={classes.toolBar}>
          <div style={{ display: "flex" }}>
            <Link
              key="home"
              href={{
                pathname: `/[lang]`,
                query: { lang: i18next.language }
              }}
              passHref
            >
              <IconButton color="inherit">
                <CustomIcon name="question" fontSize="default" />
              </IconButton>
            </Link>
            {isHome && (
              <Typography
                component="p"
                variant="body1"
                noWrap
                className={classes.title}
                style={{ marginLeft: ".5rem" }}
              >
                Rational Decision
              </Typography>
            )}
          </div>
          {!isHome && (
            <Typography component="h1" variant="body1" noWrap className={classes.title}>
              {!isMobile && <CustomIcon name={pageAttrs.icon} fontSize="default" style={{ marginRight: ".5rem" }} />}
              {pageAttrs.title}
            </Typography>
          )}
          <div style={{ display: "flex" }}>
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
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.badge}>Beta</div>
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
        <Footer />
      </div>
      <SideBar open={open} handleClose={handleDrawerClose} />
    </div>
  );
}
