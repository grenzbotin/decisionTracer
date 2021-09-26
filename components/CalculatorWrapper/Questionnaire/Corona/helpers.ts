import { generateColors } from "@/../components/theme";
import { Decision as DecisionType } from "@/../lib/presets";

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

export {
  getResultValues,
  getBestAlternatives,
  getSeriesFromData,
}