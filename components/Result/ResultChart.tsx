import React, { useContext } from "react";
import dynamic from "next/dynamic";
import i18next from "i18next";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";
import SentimentDissatisfiedOutlinedIcon from "@material-ui/icons/SentimentDissatisfiedOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import { generateColors, PRIMARY, SECONDARY } from "../theme";
import { Decision as DecisionType } from "@/../lib/presets";
import { applyFormatting } from "@/../lib/helpers";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const defaultOptions = {
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
    position: "back",
    yaxis: [
      {
        y: 0,
        strokeDashArray: 0,
        borderColor: "#919191",
        borderWidth: 1
      }
    ]
  },
  dataLabels: {
    position: "front",
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"]
    },
    background: {
      enabled: true,
      foreColor: "#fff",
      borderColor: "#919191",
      padding: 4,
      dropShadow: {}
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

function ResultChart({ height = 300 }: { height?: number; mobile?: boolean }): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];

  const categories = decisions.map((decision) => decision.title);
  const results = getResultValues(decisions);
  const colors = generateColors(decisions.length);
  const absMax = Math.max(...results.map((a) => Math.abs(a)));
  const bestAlternatives = getBestAlternatives(results, Math.max(...results), categories);

  return decisions.length > 0 ? (
    <>
      <div style={{ marginBottom: "1rem" }}>
        {applyFormatting(
          i18next.t(
            bestAlternatives.length > 1 ? "calculator.interpretation_text_pl" : "calculator.interpretation_text",
            {
              decision: bestAlternatives.join(" & ")
            }
          )
        )}
      </div>
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
              type: "bar",
              id: `option-values-${Math.random()}`
            },
            colors,
            xaxis: { categories },
            yaxis: { ...defaultOptions.yaxis, min: -absMax, max: absMax, forceNiceScale: true },
            dataLabels: {
              ...defaultOptions.dataLabels,
              formatter: (val: number) => getIcon(val, results)
            },
            annotations: {
              ...defaultOptions.annotations,
              yaxis: [
                ...defaultOptions.annotations.yaxis,
                {
                  label: {
                    text: " "
                  },
                  y: 0,
                  y2: -absMax,
                  fillColor: "rgba(255, 0, 0, 0.25)"
                }
              ]
            }
          }}
          series={[{ name: i18next.t("calculator.expected_utility"), data: results }]}
          type="bar"
          height={height}
          width="100%"
        />
      </div>
    </>
  ) : (
    i18next.t("calculator.no_decisions_created")
  );
}

export default ResultChart;
