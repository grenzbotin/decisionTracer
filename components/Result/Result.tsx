import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";
import { Grid, Paper, Typography } from "@material-ui/core";
import { generateColors } from "../theme";
import { Decision } from "@/../lib/presets";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const defaultOptions = {
  chart: {
    id: "basicValues",
    type: "bar"
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      endingShape: "rounded",
      distributed: true
    }
  },
  grid: {
    row: {
      colors: ["#fff", "#f2f2f2"]
    }
  },
  yaxis: {
    title: {
      text: "Nutzwert"
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  annotations: {
    yaxis: [
      {
        y: 0,
        strokeDashArray: 0,
        borderColor: "#919191",
        borderWidth: 2
      }
    ]
  }
};

function getResults(decisions: Array<Decision>): Array<number | boolean> {
  const results = decisions.map((decision) => {
    let total = 0;
    decision.sub.forEach((item) => {
      total += item.value * (item.probability / 100);
    });

    return Math.round((total * 100) / 100);
  });

  return results;
}

function Result(): JSX.Element {
  const {
    active: { decisions }
  } = useContext(GlobalDecisionContext);
  const categories = decisions.map((decision) => decision.title);
  const results = getResults(decisions);
  const colors = generateColors(decisions.length);

  return (
    <Grid container spacing={2} style={{ marginTop: "1rem" }}>
      <Grid item xs={12} md={6}>
        <Paper
          style={{
            minWidth: "200px",
            padding: "1rem"
          }}
        >
          {decisions.length > 0 ? (
            <Chart
              options={{ ...defaultOptions, colors, xaxis: { categories } }}
              series={[{ name: "Nutzwert", data: results }]}
              type="bar"
              height={300}
              width="100%"
            />
          ) : (
            "Keine Entscheidungen angegeben"
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          style={{
            padding: "1rem"
          }}
        >
          <Typography variant="h5" component="h2">
            Beispieltitel
          </Typography>
          Platz für Erklärungen
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Result;
