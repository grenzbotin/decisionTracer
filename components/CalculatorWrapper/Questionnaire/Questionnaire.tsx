import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Grid, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Q0 from "./Corona/Q0";
import Q1 from "./Corona/Q1";
import Q2 from "./Corona/Q2";
import Q3 from "./Corona/Q3";
import Q4 from "./Corona/Q4";

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

const TABS = [
  {
    id: 0,
    label: 1,
    content: <Q0 />
  },
  {
    id: 1,
    label: 2,
    content: <Q1 />
  },
  {
    id: 2,
    label: 3,
    content: <Q2 />
  },
  {
    id: 3,
    label: 4,
    content: <Q3 />
  },
  {
    id: 4,
    label: 5,
    content: <Q4 />
  }
];

export default function FullWidthTabs(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

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
            {TABS.map((t) => (
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
          {TABS.map((t) => (
            <TabPanel key={t.id} value={value} index={t.id} dir={theme.direction}>
              {t.content}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                <IconButton color="primary" disabled={t.id === 0} onClick={() => handleChangeIndex(t.id - 1)}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={t.id === TABS.length - 1}
                  onClick={() => handleChangeIndex(t.id + 1)}
                >
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </div>
            </TabPanel>
          ))}
        </SwipeableViews>
      </div>
    </Grid>
  );
}
