import { Grid, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { generateColors } from "../theme";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import Decision from "./Decision";
import { getUniqueNumber, scrollToTargetOffset } from "@/../lib/helpers";
import { Decision as DecisionType } from "@/../lib/presets";

export default function Calculator(): JSX.Element {
  const { active, addItem } = useContext(GlobalDecisionContext);
  const [lastAddedDecision, setLastAddedDecision] = useState(null);

  const decisions = active.decisions as DecisionType[];
  const colors = generateColors(decisions.length);

  const handleClickAddItem = (): void => {
    const uniqueNumber = getUniqueNumber();
    setLastAddedDecision(uniqueNumber);
    addItem(uniqueNumber);
  };

  // Scroll to last added decision
  useEffect(() => {
    if (decisions.find((item) => item.key === lastAddedDecision)) {
      scrollToTargetOffset(lastAddedDecision);
      setLastAddedDecision(null);
    }
  }, [decisions, lastAddedDecision]);

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={handleClickAddItem} startIcon={<AddCircleIcon />}>
          {i18next.t("calculator.new_decision")}
        </Button>
      </Grid>
      {decisions.map((decision, key) => (
        <Decision key={decision.key} decision={decision} color={colors[key]} />
      ))}
    </Grid>
  );
}
