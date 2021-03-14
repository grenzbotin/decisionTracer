import {
  Card,
  Grid,
  Paper,
  CardContent,
  Typography,
  Slider,
  Button,
} from "@material-ui/core";
import React, { useContext } from "react";
import {
  Decision,
  GlobalDecisionContext,
} from "../../hooks/GlobalDecisionsContextProvider";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { generateColors } from "../theme";
import EditableTitle from "./EditableTitle";
import NonLinearSlider from "./NonLinearSlider";
import ValidatedInputField from "./ValidatedInputField";
import GrowingSlider from "./GrowingSlider";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value: number): string {
  return `${value}%`;
}

function getResult(decision: Decision): number | string {
  let total = 0;
  decision.cases.forEach((item) => {
    total += item.value * (item.probability / 100);
  });

  return Math.round((total * 100) / 100);
}

function getProbabiltyStep(probability: number): number {
  switch (true) {
    case probability <= 1:
      return 0.001;
    case probability < 10:
      return 0.01;
    case probability < 20:
      return 0.1;
    case probability > 20:
      return 1;
    default:
      return 1;
  }
}

export default function Calculator(): JSX.Element {
  const {
    setProbabiltyChange,
    decisions,
    setNewDecision,
    setNewScenario,
    editDecisionName,
    editScenarioName,
  } = useContext(GlobalDecisionContext);

  const colors = generateColors(decisions.length);

  return (
    <Grid container spacing={2}>
      <Grid
        container
        item
        xs={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item md={6} xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sollte ich mich impfen lassen?
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          style={{ alignSelf: "center", textAlign: "right" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={setNewDecision}
            startIcon={<AddCircleIcon />}
          >
            Entscheidung
          </Button>
        </Grid>
      </Grid>
      {decisions.map((decision) => (
        <Grid key={decision.key} item xs>
          <Paper
            style={{
              minWidth: "200px",
              padding: "1rem",
              borderTop: `5px solid ${colors[decision.key]}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: ".5rem",
              }}
            >
              <EditableTitle
                title={decision.title}
                onChange={(title: string) =>
                  editDecisionName(title, decision.key)
                }
                variant="h5"
                component="h2"
              />
              <div style={{ color: colors[decision.key] }}>
                <IconButton
                  color="inherit"
                  aria-label="add scenario"
                  component="span"
                  onClick={() => setNewScenario(decision.key)}
                >
                  <AddCircleIcon />
                </IconButton>
              </div>
            </div>
            <Grid container spacing={2}>
              {decision.cases.map((item) => (
                <Grid key={item.key} item xs>
                  <Card variant="outlined" style={{ padding: ".5rem" }}>
                    <CardContent>
                      <EditableTitle
                        title={item.title}
                        onChange={(title: string) =>
                          editScenarioName(title, decision.key, item.key)
                        }
                        variant="h6"
                        component="h3"
                      />
                      <Typography
                        variant="caption"
                        gutterBottom
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <ValidatedInputField
                          decisionKey={decision.key}
                          itemKey={item.key}
                          value={item.probability}
                        />
                      </Typography>
                      <Slider
                        value={item.probability}
                        getAriaValueText={valuetext}
                        aria-labelledby="probability"
                        step={getProbabiltyStep(item.probability)}
                        marks={marks}
                        style={{ color: colors[decision.key] }}
                        valueLabelDisplay="auto"
                        onChange={(_e, value) =>
                          setProbabiltyChange(decision.key, item.key, value)
                        }
                      />
                      <br />
                      <NonLinearSlider
                        marks={[
                          { value: 0 },
                          { value: 5, label: 5 },
                          { value: 10, label: 10 },
                          { value: 15, label: 15 },
                          { value: 20, label: 20 },
                          { value: 50, label: 50 },
                          { value: 100, label: 100 },
                        ]}
                        steps={1000}
                        onChange={(value: number) =>
                          setProbabiltyChange(decision.key, item.key, value)
                        }
                        style={{ color: colors[decision.key] }}
                        value={item.probability}
                        numFormatter={(val: number) => Math.round(val)}
                      />
                      <br />
                      <Typography variant="caption" gutterBottom>
                        Value: {item.value}
                      </Typography>
                      <GrowingSlider
                        itemKey={item.key}
                        decisionKey={decision.key}
                        value={item.value}
                        style={{ color: colors[decision.key] }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  width: "1rem",
                  height: "1rem",
                  display: "inline-block",
                  marginRight: ".5rem",
                  background: colors[decision.key],
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
