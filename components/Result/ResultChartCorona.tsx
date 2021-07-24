import React, { useContext } from "react";
import Chart from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import i18next from "i18next";

import { Decision as DecisionType } from "@/../lib/presets";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { generateColors } from "../theme";
import { ChartType, LegendItem, TooltipItem } from "chart.js";
import { applyFormatting } from "@/../lib/helpers";

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

function getBestAlternatives(
  results: Array<number>,
  val: number,
  categories: Array<string>
): { winner: Array<string>; loser: Array<string>; ratio: number } {
  const indices = [] as Array<number>;
  let i = -1;

  while ((i = results.indexOf(val, i + 1)) != -1) {
    indices.push(i);
  }

  const winner = categories.filter((_, i) => indices.includes(i));
  const loser = categories.filter((_, i) => !indices.includes(i));

  return {
    winner,
    loser,
    ratio: Math.round((Math.min(...results) / Math.max(...results)) * 100) / 100
  };
}

function getIcon(title: string, best: Array<string>): string {
  if (best.includes(title)) {
    return "✅";
  }
  return "❌";
}

function getSeriesFromData(
  decisions: Array<DecisionType>
): { labels: string[]; datasets: Array<{ label: string; data: number[]; backgroundColor: string }> } {
  const labels = decisions.map((decision) => decision.title);
  let datasets = [] as Array<{ label: string; data: number[]; backgroundColor: string }>;

  const COLORS = generateColors(8);

  decisions.forEach(
    (dec, key) =>
      dec.sub?.length > 0 &&
      dec.sub.forEach((sub) => {
        if (sub.cases?.length > 0) {
          sub.cases.forEach((item) => {
            const exist = datasets.some((dsItem) => dsItem.label === item.title);
            if (exist) {
              datasets = datasets.map((ds) =>
                ds.label === item.title
                  ? {
                      ...ds,
                      data: [
                        ...ds.data,
                        Math.round((item.probability / 100) * item.value * 100 * (sub.probability / 100)) / 100
                      ]
                    }
                  : ds
              );
            } else {
              datasets.push({
                label: item.title,
                data: [Math.round((item.probability / 100) * item.value * 100 * (sub.probability / 100)) / 100],
                backgroundColor: COLORS[datasets.length]
              });
            }
          });
        } else {
          const exist = datasets.some((dsItem) => dsItem.label === sub.title);
          if (exist) {
            datasets = datasets.map((ds) =>
              ds.label === sub.title
                ? {
                    ...ds,
                    data: [...ds.data, Math.round((sub.probability / 100) * sub.value * 100) / 100]
                  }
                : ds
            );
          } else {
            datasets.push({
              label: sub.title,
              data: [
                ...[...Array(key).keys()].map(() => null),
                Math.round((sub.probability / 100) * sub.value * 10000) / 10000
              ],
              backgroundColor: COLORS[datasets.length]
            });
          }
        }
      })
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
  const { winner, loser, ratio } = getBestAlternatives(results, Math.max(...results), data.labels);

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <Typography variant="body2" gutterBottom>
          {applyFormatting(
            i18next.t(winner.length > 1 ? "calculator.interpretation_text_pl" : "calculator.interpretation_text", {
              decision: winner.join(" & ")
            })
          )}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {applyFormatting(
            i18next.t("calculator.interpretation_insights", {
              value: ratio,
              loser: loser[0],
              winner: winner[0]
            })
          )}
        </Typography>
      </div>
      <div style={{ position: "relative", height: "40vh", width: "90%" }}>
        <Chart
          type="bar"
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  usePointStyle: true,
                  boxWidth: 6,
                  filter: (
                    legendItem: LegendItem,
                    { datasets }: { datasets: Array<{ label: string; data: number[]; backgroundColor: string }> }
                  ) => {
                    const dataset = datasets.find((item) => item.label === legendItem.text);
                    if (dataset.data.reduce((a, b) => a + b, 0) !== 0) {
                      return true;
                    }
                  }
                }
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
                    let value = 0;
                    data.datasets.map((item) => {
                      value += item.data[index];
                    });
                    return `${getIcon(title, winner)} ${title} (${Math.round(value * 100) / 100})`;
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
