import { Grid, Typography, Button } from "@material-ui/core";
import React, { useContext } from "react";
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
      <Grid container item xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            {active.title}
          </Typography>
        </Grid>
        <Grid item md={6} xs={12} style={{ alignSelf: "center", textAlign: "right" }}>
          <Button variant="contained" color="primary" onClick={() => addItem()} startIcon={<AddCircleIcon />}>
            Entscheidung
          </Button>
        </Grid>
      </Grid>
      {decisions.map((decision, key) => (
        <Decision key={decision.key} decision={decision} color={colors[key]} />
      ))}
    </Grid>
  );
}
