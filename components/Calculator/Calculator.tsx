import { Card, Grid, Paper, CardContent, Typography, Button } from "@material-ui/core";
import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { generateColors } from "../theme";
import EditableTitle from "./EditableTitle";
import NonLinearSlider from "./NonLinearSlider";
import ValidatedInputField from "./ValidatedInputField";
import GrowingSlider from "./GrowingSlider";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { Decision } from "@/../lib/presets";

function getResult(decision: Decision): number | string {
  let total = 0;
  decision.sub.forEach((item) => {
    total += item.value * (item.probability / 100);
  });

  return Math.round((total * 100) / 100);
}

export default function Calculator(): JSX.Element {
  const { active, setTitle, setProbability, removeItem, addItem } = useContext(GlobalDecisionContext);

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
        <Grid key={decision.key} item xs>
          <Paper
            style={{
              padding: "1rem",
              borderTop: `5px solid ${colors[key]}`
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
              <div style={{ color: colors[decision.key], display: "flex", alignSelf: "baseline" }}>
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
                <Grid key={item.key} item xs>
                  <Card variant="outlined" style={{ padding: ".5rem", minWidth: "250px" }}>
                    <CardContent>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <EditableTitle
                          title={item.title}
                          onChange={(title: string) => setTitle(title, decision.key, item.key)}
                          variant="h6"
                          component="h3"
                        />
                        <IconButton
                          aria-label="remove scenario"
                          component="span"
                          onClick={() => removeItem(decision.key, item.key)}
                        >
                          <DeleteForeverIcon fontSize="small" color="inherit" />
                        </IconButton>
                      </div>
                      <Typography
                        variant="caption"
                        gutterBottom
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}
                      >
                        <ValidatedInputField decisionKey={decision.key} itemKey={item.key} value={item.probability} />
                      </Typography>
                      <NonLinearSlider
                        marks={[
                          { value: 0, label: 0 },
                          { value: 0.1, label: 0.1 },
                          { value: 1, label: 1 },
                          { value: 10, label: 10 },
                          { value: 20, label: 20 },
                          { value: 50, label: 50 },
                          { value: 100, label: 100 }
                        ]}
                        steps={1000}
                        onChange={(value: number) => setProbability(value, decision.key, item.key)}
                        style={{ color: colors[decision.key] }}
                        value={item.probability}
                        numFormatter={(val: number) => Math.round(val)}
                      />
                      <br />
                      <Typography variant="caption" gutterBottom>
                        Value: {item.value}
                      </Typography>
                      <GrowingSlider itemKey={item.key} decisionKey={decision.key} value={item.value} />
                    </CardContent>
                  </Card>
                </Grid>
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
                  background: colors[decision.key]
                }}
              />
              Gesamtnutzen: {getResult(decision)}
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
