import { Grid, Button, ButtonGroup } from "@material-ui/core";
import React, { useContext } from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import ExposureIcon from "@material-ui/icons/Exposure";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import TreeFlow from "./TreeFlow";
import Calculator from "./Calculator";
import Questionnaire from "./Questionnaire";
import Calculation from "./Calculation";
import Tutorial from "./Tutorial";
import CalculatorSnackbar from "./CalculatorSnackbar";

const activeSelectors = {
  corona: {
    default: ["questionnaire"],
    expert: ["tutorial", "tree", "card", "calculation"]
  },
  ["coin-toss"]: {
    default: ["questionnaire", "tree", "card", "calculation"],
    expert: ["questionnaire", "tree", "card", "calculation"]
  },
  custom: {
    expert: ["tree", "card", "calculation"]
  }
};

const SELECTORS = {
  tree: {
    id: "tree",
    icon: <AccountTreeIcon />
  },
  card: {
    id: "card",
    icon: <ViewAgendaIcon />
  },
  questionnaire: {
    id: "questionnaire",
    icon: <LiveHelpIcon />
  },
  calculation: {
    id: "calculation",
    icon: <ExposureIcon />
  },
  tutorial: {
    id: "tutorial",
    icon: <PlayCircleFilledIcon />
  }
};

const getComponentFromMode = (
  mode: string,
  lastAddedDecision: string,
  setLastAddedDecision: (_value: string | null) => void
): JSX.Element => {
  switch (mode) {
    case "tutorial":
      return <Tutorial />;
    case "tree":
      return <TreeFlow />;
    case "card":
      return <Calculator lastAdded={lastAddedDecision} setLastAdded={setLastAddedDecision} />;
    case "questionnaire":
      return <Questionnaire />;
    case "calculation":
      return <Calculation />;
    default:
      return <Calculator lastAdded={lastAddedDecision} setLastAdded={setLastAddedDecision} />;
  }
};

export default function CalculatorWrapper(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const { visualMode, updateUIState, expert, lastAddedDecision, setLastAddedDecision } = useContext(GlobalUiContext);

  const handleClick = (mode: string): void => {
    updateUIState({ visualMode: mode, expert: true });
  };

  const presetMode = expert ? "expert" : "default";

  return (
    <>
      <Grid container spacing={2}>
        <Grid container item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup color="primary" size="small" style={{ marginRight: ".5rem" }}>
            {activeSelectors[active.key][presetMode].map((selector: string) => (
              <Button
                key={selector}
                variant={visualMode === SELECTORS[selector].id ? "contained" : "outlined"}
                onClick={() => handleClick(SELECTORS[selector].id)}
              >
                {SELECTORS[selector].icon}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        {getComponentFromMode(visualMode, lastAddedDecision, setLastAddedDecision)}
      </Grid>
      <CalculatorSnackbar />
    </>
  );
}
