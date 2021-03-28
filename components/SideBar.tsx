import React from "react";
import Link from "next/link";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import i18next from "i18next";
import { useRouter } from "next/router";

import { DRAWER_WIDTH } from "./theme";
import { PRESETS } from "../lib/presets";
import CustomIcon from "../assets/CustomIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
);

export default function SideBar({ open, handleClose }: { open: boolean; handleClose: () => void }): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const { pathname } = useRouter();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose}>
          {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link
          key="home"
          href={{
            pathname: `/[lang]`,
            query: { lang: i18next.language }
          }}
        >
          <ListItem disabled={`/[lang]` === pathname} selected={`/[lang]` === pathname} button>
            <ListItemIcon>
              <CustomIcon name="question" />
            </ListItemIcon>
            <ListItemText primary={i18next.t("common.navbar.home")} />
          </ListItem>
        </Link>
        {PRESETS.map((preset) => (
          <Link
            key={preset.key}
            href={{
              pathname: `/[lang]/${preset.url}`,
              query: { lang: i18next.language }
            }}
          >
            <ListItem
              disabled={`/[lang]/${preset.url}` === pathname}
              selected={`/[lang]/${preset.url}` === pathname}
              button
            >
              <ListItemIcon>
                <CustomIcon name={preset.icon} />
              </ListItemIcon>
              <ListItemText primary={i18next.t(preset.title)} secondary={i18next.t(preset.question)} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
