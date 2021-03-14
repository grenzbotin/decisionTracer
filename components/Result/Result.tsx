import React, { useContext } from "react";
import dynamic from "next/dynamic";
import {
  Decision,
  GlobalDecisionContext,
} from "../../hooks/GlobalDecisionsContextProvider";
import { Paper } from "@material-ui/core";
import { generateColors } from "../theme";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const defaultOptions = {
  chart: {
    id: "basicValues",
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      endingShape: "rounded",
      distributed: true,
    },
  },
  grid: {
    row: {
      colors: ["#fff", "#f2f2f2"],
    },
  },
  yaxis: {
    title: {
      text: "Nutzwert",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  annotations: {
    yaxis: [
      {
        y: 0,
        strokeDashArray: 0,
        borderColor: "#919191",
        borderWidth: 2,
      },
    ],
  },
};

function getResults(decisions: Array<Decision>): Array<number | boolean> {
  const results = decisions.map((decision) => {
    let total = 0;
    decision.cases.forEach((item) => {
      total += item.value * (item.probability / 100);
    });

    return Math.round((total * 100) / 100);
  });

  return results;
}

function Result(): JSX.Element {
  const { decisions } = useContext(GlobalDecisionContext);
  const categories = decisions.map((decision) => decision.title);
  const results = getResults(decisions);
  const colors = generateColors(decisions.length);

  return (
    <Paper
      style={{
        minWidth: "200px",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <Chart
        options={{ ...defaultOptions, colors, xaxis: { categories } }}
        series={[{ name: "Nutzwert", data: results }]}
        type="bar"
        height={300}
        width="100%"
      />
    </Paper>
  );
}

export default Result;
