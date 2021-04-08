import { Grid, Button, ButtonGroup } from "@material-ui/core";
import React, { useContext, useState } from "react";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { getUniqueNumber } from "@/../lib/helpers";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import TreeFlow from "./TreeFlow";
import Calculator from "./Calculator";
import Questionnaire from "./Questionnaire";

const activeSelectors = {
  corona: ["questionnaire", "tree", "card"],
  ["coin-toss"]: ["questionnaire", "tree", "card"],
  custom: ["tree", "card"]
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
  }
};

const getComponentFromMode = (
  mode: string,
  lastAddedDecision: string,
  setLastAddedDecision: (_value: number | null) => void
): JSX.Element => {
  switch (mode) {
    case "tree":
      return <TreeFlow />;
    case "card":
      return <Calculator lastAdded={lastAddedDecision} setLastAdded={setLastAddedDecision} />;
    case "questionnaire":
      return <Questionnaire />;
    default:
      return <Calculator lastAdded={lastAddedDecision} setLastAdded={setLastAddedDecision} />;
  }
};

export default function CalculatorWrapper(): JSX.Element {
  const { active, addItem } = useContext(GlobalDecisionContext);
  const { visualMode, setVisualMode } = useContext(GlobalUiContext);
  const [lastAddedDecision, setLastAddedDecision] = useState(null);

  const handleClickAddItem = (): void => {
    const uniqueNumber = getUniqueNumber();
    setLastAddedDecision(uniqueNumber);
    addItem(uniqueNumber);
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup color="primary" size="small" style={{ marginRight: ".5rem" }}>
          {activeSelectors[active.key].map((selector: string) => (
            <Button
              key={selector}
              variant={visualMode === SELECTORS[selector].id ? "contained" : "outlined"}
              onClick={() => setVisualMode(SELECTORS[selector].id)}
            >
              {SELECTORS[selector].icon}
            </Button>
          ))}
        </ButtonGroup>
        <Button variant="contained" color="primary" onClick={handleClickAddItem} startIcon={<AddCircleIcon />}>
          {i18next.t("calculator.new_decision")}
        </Button>
      </Grid>
      {getComponentFromMode(visualMode, lastAddedDecision, setLastAddedDecision)}
    </Grid>
  );
}
