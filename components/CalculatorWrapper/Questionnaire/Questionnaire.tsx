import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
            <Tab
              className={classes.tab}
              label={
                <>
                  <div className={classes.shape}>1</div>
                </>
              }
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tab}
              label={
                <>
                  <div className={classes.shape}>2</div>
                </>
              }
              {...a11yProps(1)}
            />
            <Tab
              className={classes.tab}
              label={
                <>
                  <div className={classes.shape}>3</div>
                </>
              }
              {...a11yProps(2)}
            />
            <Tab
              className={classes.tab}
              label={
                <>
                  <div className={classes.shape}>4</div>
                </>
              }
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            tbd 1
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            tbd 2
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            tbd 3
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            tbd 4
          </TabPanel>
        </SwipeableViews>
      </div>
    </Grid>
  );
}
