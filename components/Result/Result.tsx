import React, { useContext } from "react";
import dynamic from "next/dynamic";
import i18next from "i18next";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";
import { Card, Typography } from "@material-ui/core";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import { generateColors, PRIMARY, SECONDARY } from "../theme";
import { Decision as DecisionType } from "@/../lib/presets";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const defaultOptions = {
  chart: {
    id: "option-values",
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
      text: i18next.t("calculator.expected_utility"),
      style: {
        fontWeight: 500
      }
    }
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
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"]
    }
  }
};

function getResultValues(decisions: Array<DecisionType>): Array<number> {
  const results = decisions.map((decision) => {
    let total = 0;
    decision.sub.forEach((item) => {
      total += item.value * (item.probability / 100);
    });

    return Math.round(total * 100) / 100;
  });

  return results;
}

function getBestAlternatives(results: Array<number>, val: number, categories: Array<string>): Array<string> {
  const indices = [] as Array<number>;
  let i = -1;

  while ((i = results.indexOf(val, i + 1)) != -1) {
    indices.push(i);
  }

  return categories.filter((_, i) => indices.includes(i));
}

function getIcon(value: number, results: Array<number>): string {
  if (value === Math.max(...results)) {
    return "✅";
  } else if (value === Math.min(...results)) {
    return "❌";
  }

  return "";
}

function Result({ height = 300, mobile = false }: { height?: number; mobile?: boolean }): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];

  const categories = decisions.map((decision) => decision.title);
  const results = getResultValues(decisions);
  const colors = generateColors(decisions.length);
  const absMax = Math.max(...results.map((a) => Math.abs(a)));
  const bestAlternatives = getBestAlternatives(results, Math.max(...results), categories);

  return (
    <Card style={{ padding: mobile ? ".5rem .5rem 0 .2rem" : "1rem" }}>
      {!mobile && (
        <Typography variant="h5" component="h3" gutterBottom>
          {i18next.t("calculator.result")}
        </Typography>
      )}
      {decisions.length > 0 ? (
        <>
          <div style={{ position: "relative" }}>
            <SentimentSatisfiedOutlinedIcon
              fontSize="small"
              style={{ color: PRIMARY, position: "absolute", left: "2rem", top: "0rem" }}
            />
            <SentimentDissatisfiedOutlinedIcon
              fontSize="small"
              style={{ color: SECONDARY, position: "absolute", left: "2rem", bottom: "1.5rem" }}
            />
            <Chart
              options={{
                ...defaultOptions,
                chart: {
                  ...defaultOptions.chart,
                  id: `option-values${Math.random()}`
                },
                colors,
                xaxis: { categories },
                yaxis: { ...defaultOptions.yaxis, min: -absMax, max: absMax, forceNiceScale: true },
                dataLabels: {
                  ...defaultOptions.dataLabels,
                  formatter: (val: number) => getIcon(val, results)
                }
              }}
              series={[{ name: i18next.t("calculator.expected_utility"), data: results }]}
              type="bar"
              height={height}
              width="100%"
            />
          </div>
          <Typography variant="subtitle2" gutterBottom style={{ marginTop: "1rem" }}>
            {i18next.t("calculator.interpretation")}
          </Typography>
          {i18next.t(
            bestAlternatives.length > 1 ? "calculator.interpretation_text_pl" : "calculator.interpretation_text",
            {
              decision: bestAlternatives.join(" & ")
            }
          )}
        </>
      ) : (
        i18next.t("calculator.no_decisions_created")
      )}
    </Card>
  );
}

export default Result;
