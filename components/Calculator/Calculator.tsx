import { Grid, Button } from "@material-ui/core";
import React, { useContext } from "react";
import i18next from "i18next";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { generateColors } from "../theme";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import Decision from "./Decision";

export default function Calculator(): JSX.Element {
  const { active, addItem } = useContext(GlobalDecisionContext);

  const colors = generateColors(active.decisions.length);
  const decisions = active.decisions;

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={() => addItem()} startIcon={<AddCircleIcon />}>
          {i18next.t("calculator.new_decision")}
        </Button>
      </Grid>
      {decisions.map((decision, key) => (
        <Decision key={decision.key} decision={decision} color={colors[key]} />
      ))}
    </Grid>
  );
}
