import { Grid, Button, ButtonGroup } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { getUniqueNumber, scrollToTargetOffset } from "@/../lib/helpers";
import { Decision as DecisionType } from "@/../lib/presets";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import TreeFlow from "./TreeFlow";
import Calculator from "./Calculator";

export default function CalculatorWrapper(): JSX.Element {
  const { active, addItem } = useContext(GlobalDecisionContext);
  const { treeFlow, setTreeFlow } = useContext(GlobalUiContext);
  const [lastAddedDecision, setLastAddedDecision] = useState(null);

  const decisions = active.decisions as DecisionType[];

  const handleClickAddItem = (): void => {
    const uniqueNumber = getUniqueNumber();
    setLastAddedDecision(uniqueNumber);
    addItem(uniqueNumber);
  };

  // Scroll to last added decision if on card view
  useEffect(() => {
    if (!treeFlow && decisions.find((item) => item.key === lastAddedDecision)) {
      scrollToTargetOffset(lastAddedDecision);
      setLastAddedDecision(null);
    }
    if (treeFlow) {
      setLastAddedDecision(null);
    }
  }, [treeFlow, decisions, lastAddedDecision]);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonGroup color="primary" style={{ marginRight: ".5rem" }}>
          <Button variant={!treeFlow ? "contained" : "outlined"} onClick={() => setTreeFlow(false)}>
            <ViewAgendaIcon />
          </Button>
          <Button variant={treeFlow ? "contained" : "outlined"} onClick={() => setTreeFlow(true)}>
            <AccountTreeIcon />
          </Button>
        </ButtonGroup>
        <Button variant="contained" color="primary" onClick={handleClickAddItem} startIcon={<AddCircleIcon />}>
          {i18next.t("calculator.new_decision")}
        </Button>
      </Grid>
      {treeFlow ? <TreeFlow /> : <Calculator />}
    </Grid>
  );
}
