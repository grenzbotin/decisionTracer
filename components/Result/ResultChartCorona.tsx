import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { Decision as DecisionType } from "@/../lib/presets";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { generateColors } from "../theme";
import { ChartType, TooltipItem } from "chart.js";

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

function getIcon(title: string, best: Array<string>): string {
  if (best.includes(title)) {
    return "✅";
  }
  {
    return "❌";
  }

  return "";
}

function getSeriesFromData(
  decisions: Array<DecisionType>
): { labels: string[]; datasets: Array<{ label: string; data: number[]; backgroundColor: string }> } {
  const labels = decisions.map((decision) => decision.title);
  const datasets = [] as Array<{ label: string; data: number[]; backgroundColor: string }>;

  const COLORS = generateColors(decisions.length);
  const OPACITY = ["E6", "CC", "B3", "99", "80", "66", "4D", "33"];

  decisions.forEach(
    (dec, key) =>
      dec.sub?.length > 0 &&
      dec.sub.forEach((sub) =>
        sub.cases?.length > 0
          ? sub.cases.forEach((item, ikey) =>
              datasets.push({
                label: `${item.title} (${dec.title})`,
                data: labels.map((label) =>
                  label === dec.title
                    ? Math.round((item.probability / 100) * item.value * 100 * (sub.probability / 100)) / 100
                    : null
                ),
                backgroundColor: `${COLORS[key]}${OPACITY[ikey]}`
              })
            )
          : datasets.push({
              label: `${sub.title} (${dec.title})`,
              data: labels.map((label) =>
                label === dec.title ? Math.round((sub.probability / 100) * sub.value * 100) / 100 : null
              ),
              backgroundColor: COLORS[key]
            })
      )
  );
  return {
    labels,
    datasets
  };
}

const ResultChartCorona = (): JSX.Element => {
  const { active } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];
  const results = getResultValues(decisions);
  const data = getSeriesFromData(decisions);
  const bestAlternatives = getBestAlternatives(results, Math.max(...results), data.labels);

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Typography variant="subtitle2" gutterBottom style={{ marginTop: "1rem" }}>
          {i18next.t("calculator.interpretation")}
        </Typography>
        {i18next.t(
          bestAlternatives.length > 1 ? "calculator.interpretation_text_pl" : "calculator.interpretation_text",
          {
            decision: bestAlternatives.join(" & ")
          }
        )}
      </div>
      <div style={{ position: "relative", height: "40vh", width: "90%" }}>
        <Bar
          type="bar"
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem: TooltipItem<ChartType>) => {
                    return (
                      tooltipItem.raw !== null &&
                      tooltipItem.raw !== 0 &&
                      `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`
                    );
                  },
                  footer: (tooltipItems: Array<TooltipItem<ChartType>>) => {
                    let sum = 0;
                    tooltipItems.forEach((tooltipItem) => {
                      sum += tooltipItem.parsed.y;
                    });
                    return `Total: ${Math.round(sum * 100) / 100}`;
                  }
                }
              }
            },
            scales: {
              y: {
                display: false,
                stacked: true,
                ticks: {
                  display: false
                },
                grid: {
                  drawBorder: false
                }
              },
              x: {
                stacked: true,
                grid: {
                  drawBorder: false,
                  display: false
                },
                ticks: {
                  callback: (_: number, index: number) => {
                    const title = data.labels[index];
                    return `${title} ${getIcon(title, bestAlternatives)}`;
                  }
                }
              }
            }
          }}
        />
      </div>
    </>
  );
};

export default ResultChartCorona;
