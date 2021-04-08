import React, { useContext, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import i18next from "i18next";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Button, Grid, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { TABS } from "./constants";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number): { id: string; ["aria-controls"]: string } {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 20,
    height: 20,
    borderRadius: "50%",
    color: "#fff",
    fontSize: ".8rem",
    textAlign: "center"
  },
  tab: {
    minWidth: "20px"
  }
}));

export default function FullWidthTabs(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { active } = useContext(GlobalDecisionContext);
  const { setVisualMode } = useContext(GlobalUiContext);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number): void => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number): void => {
    setValue(index);
  };

  return (
    <Grid item xs={12}>
      <div className={classes.root}>
        <AppBar elevation={1} position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {TABS[active.key].map((t: { id: number; label: number }) => (
              <Tab
                key={t.id}
                className={classes.tab}
                label={
                  <>
                    <div className={classes.shape}>{t.label}</div>
                  </>
                }
                {...a11yProps(t.id)}
              />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {TABS[active.key].map((t: { id: number; label: number; content: JSX.Element }) => (
            <TabPanel key={t.id} value={value} index={t.id} dir={theme.direction}>
              {t.content}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <IconButton color="primary" disabled={t.id === 0} onClick={() => handleChangeIndex(t.id - 1)}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                {t.id === TABS[active.key].length - 1 ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => setVisualMode("tree")}
                    startIcon={<AccountTreeIcon />}
                  >
                    {i18next.t("common.decision_tree")}
                  </Button>
                ) : (
                  <IconButton
                    color="primary"
                    disabled={t.id === TABS[active.key].length - 1}
                    onClick={() => handleChangeIndex(t.id + 1)}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                )}
              </div>
            </TabPanel>
          ))}
        </SwipeableViews>
      </div>
    </Grid>
  );
}
