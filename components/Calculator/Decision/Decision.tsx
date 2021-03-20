import React, { useContext } from "react";
import { Grid, Paper } from "@material-ui/core";
import i18next from "i18next";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision as DecisionType } from "@/../lib/presets";
import EditableTitle from "../CalculatorElements/EditableTitle";
import SubItem from "../SubItem";

function getResult(decision: DecisionType): number | string {
  let total = 0;
  decision.sub.forEach((item) => {
    if (item.cases.length !== 0) {
      let subs = 0;
      item.cases.map((c) => {
        subs += c.value * (c.probability / 100);
      });
      total += subs * (item.probability / 100);
    } else {
      total += item.value * (item.probability / 100);
    }
  });

  return Math.round((total * 100) / 100);
}

export default function Decision({ decision, color }: { decision: DecisionType; color: string }): JSX.Element {
  const { setTitle, removeItem, addItem } = useContext(GlobalDecisionContext);

  return (
    <Grid key={decision.key} item xs>
      <Paper
        style={{
          padding: "1rem",
          borderTop: `5px solid ${color}`
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: ".5rem"
          }}
        >
          <EditableTitle
            title={decision.title}
            onChange={(title: string) => setTitle(title, decision.key)}
            variant="h5"
            component="h2"
          />
          <div style={{ color: color, display: "flex", alignSelf: "baseline" }}>
            <IconButton aria-label="remove scenario" component="span" onClick={() => removeItem(decision.key)}>
              <DeleteForeverIcon fontSize="small" color="inherit" />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="add scenario"
              component="span"
              onClick={() => addItem(decision.key)}
            >
              <AddCircleIcon />
            </IconButton>
          </div>
        </div>
        <Grid container spacing={2}>
          {decision.sub.map((item) => (
            <SubItem key={item.key} color={color} decisionKey={decision.key} item={item} />
          ))}
        </Grid>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center"
          }}
        >
          <span
            style={{
              width: "1rem",
              height: "1rem",
              display: "inline-block",
              marginRight: ".5rem",
              background: color
            }}
          />
          {i18next.t("calculator.expected_utility")} {getResult(decision)}
        </div>
      </Paper>
    </Grid>
  );
}
