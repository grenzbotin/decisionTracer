/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateColors } from "../components/theme";
import { CaseItem, Decision as DecisionType, SubCaseItem, SubItem } from "./presets";
import { Elements } from "react-flow-renderer";
import i18next from "i18next";

export function getPath(): string {
  return "";
}

export function getPresetValueByField(
  decisions: DecisionType[],
  type: "probability" | "value",
  decKey: string,
  subKey: string,
  subItemKey?: string
): number | null {
  const decision = decisions.find((item) => item.key === decKey) || null;
  if (decision) {
    const decisionSub = decision.sub.find((i) => i.key === subKey) || null;
    if (decisionSub && subItemKey) {
      const subItem = decisionSub.cases.find((c) => c.key === subItemKey || null);
      if (subItem) {
        return subItem[type];
      }
      return null;
    } else if (decisionSub) {
      return decisionSub[type];
    }
  }
  return null;
}

export function getUniqueNumber(): string {
  const date = new Date();
  return date.valueOf().toString();
}

export function toLocale(value: string | number): string {
  if (typeof value === "string" || typeof value === "number") {
    const valueToConvert = typeof value === "string" && value !== "" ? parseFloat(value) : value;

    return valueToConvert.toLocaleString(i18next.language, { maximumFractionDigits: 5 });
  }

  return "";
}

export function getRoundedValue(value: number, digits: number): string {
  if (value < 1 && value > -1) {
    return toLocale(value.toFixed(7));
  } else {
    return toLocale(value.toFixed(digits));
  }
}

export function getValueFromChilds(node: SubItem | SubCaseItem | DecisionType, child: string): number {
  let value = 0;
  node[child].forEach((item: SubItem | SubCaseItem | CaseItem) => {
    value += item.value * (item.probability / 100);
  });

  return value;
}

export function scrollToTargetOffset(id: string): void {
  const element = document.getElementById(id);
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

const position = { x: 0, y: 0 };
const lineProps = {
  edgeType: "smoothstep",
  labelStyle: { fontWeight: 700, fontSize: 12, fill: "#fff" },
  labelBgStyle: { color: "#fff", fillOpacity: 0.8 }
};

export function updateTreeData(oldElements: Elements<any>, decisions: Array<DecisionType>): Elements<any> {
  const elements = [] as Elements<any>;
  const colors = generateColors(decisions.length);

  decisions.forEach((decision, key) => {
    elements.push({
      ...oldElements.find((oldElement) => oldElement.id === decision.key),
      data: {
        ...oldElements.find((oldElement) => oldElement.id === decision.key).data,
        value: getValueFromChilds(decision, "sub"),
        ...decision
      }
    });
    decision.sub.forEach((scenario) => {
      elements.push({
        ...oldElements.find((oldElement) => oldElement.id === scenario.key),
        data: {
          ...oldElements.find((oldElement) => oldElement.id === scenario.key).data,
          ...scenario
        }
      });
      elements.push({
        id: `${decision.key}-${scenario.key}-link`,
        source: decision.key,
        target: scenario.key,
        label: `${getRoundedValue(scenario.probability, 3)} %`,
        ...lineProps,
        labelBgStyle: { fill: scenario.isProbabilityIntersecting ? colors[key] : "#FFF" },
        labelStyle: { fill: scenario.isProbabilityIntersecting ? "#FFF" : colors[key] }
      });

      scenario.cases.forEach((c) => {
        elements.push({
          ...oldElements.find((oldElement) => oldElement.id === c.key),
          data: {
            ...oldElements.find((oldElement) => oldElement.id === c.key).data,
            ...c
          }
        });
        elements.push({
          id: `${scenario.key}-${c.key}-link`,
          source: scenario.key,
          target: c.key,
          label: `${getRoundedValue(c.probability, 3)} %`,
          ...lineProps,
          labelBgStyle: { fill: c.isProbabilityIntersecting ? colors[key] : "#FFF" },
          labelStyle: { fill: c.isProbabilityIntersecting ? "#FFF" : colors[key] }
        });

        c.subCases.forEach((sc) => {
          elements.push({
            ...oldElements.find((oldElement) => oldElement.id === sc.key),
            data: {
              ...oldElements.find((oldElement) => oldElement.id === sc.key).data,
              ...sc
            }
          });
          elements.push({
            id: `${c.key}-${sc.key}-link`,
            source: c.key,
            target: sc.key,
            label: `${getRoundedValue(sc.probability, 3)} %`,
            ...lineProps,
            labelBgStyle: { fill: c.isProbabilityIntersecting ? colors[key] : "#FFF" },
            labelStyle: { fill: c.isProbabilityIntersecting ? "#FFF" : colors[key] }
          });
        });
      });
    });
  });

  return elements;
}

export function createTreeDataFromPreset(decisions: Array<DecisionType>): Elements<any> {
  const elements = [] as Elements<any>;
  const colors = generateColors(decisions.length);

  decisions.forEach((decision, key) => {
    elements.push({
      id: decision.key,
      data: {
        color: colors[key],
        value: getValueFromChilds(decision, "sub"),
        decKey: decision.key,
        ...decision
      },
      position,
      type: "decisionNode"
    });
    decision.sub.forEach((scenario) => {
      const nodeType = scenario.cases.length > 0 ? "caseNode" : "subCaseEndNode";
      elements.push({
        id: scenario.key,
        data: {
          ...scenario,
          decKey: decision.key,
          subKey: scenario.key,
          color: colors[key]
        },
        position,
        type: nodeType
      });
      elements.push({
        id: `${decision.key}-${scenario.key}-link`,
        source: decision.key,
        target: scenario.key,
        label: `${getRoundedValue(scenario.probability, 3)} %`,
        ...lineProps,
        labelBgStyle: { fill: scenario.isProbabilityIntersecting ? colors[key] : "#FFF" },
        labelStyle: { fill: scenario.isProbabilityIntersecting ? "#FFF" : colors[key], fontSize: 14 }
      });

      scenario.cases.forEach((c) => {
        const nodeType = c.subCases.length > 0 ? "caseNode" : "subCaseEndNode";
        elements.push({
          id: c.key,
          data: {
            decKey: decision.key,
            subKey: scenario.key,
            caseKey: c.key,
            color: colors[key],
            ...c
          },
          position,
          type: nodeType
        });
        elements.push({
          id: `${scenario.key}-${c.key}-link`,
          source: scenario.key,
          target: c.key,
          label: `${getRoundedValue(c.probability, 3)} %`,
          ...lineProps,
          labelBgStyle: { fill: c.isProbabilityIntersecting ? colors[key] : "#FFF" },
          labelStyle: { fill: c.isProbabilityIntersecting ? "#FFF" : colors[key], fontSize: 14 }
        });

        c.subCases.forEach((sc) => {
          elements.push({
            id: sc.key,
            data: {
              color: colors[key],
              decKey: decision.key,
              subKey: scenario.key,
              caseKey: c.key,
              subCaseKey: sc.key,
              ...sc
            },
            position,
            type: "subCaseEndNode"
          });
          elements.push({
            id: `${c.key}-${sc.key}-link`,
            source: c.key,
            target: sc.key,
            label: `${getRoundedValue(sc.probability, 3)} %`,
            ...lineProps,
            labelBgStyle: { fill: sc.isProbabilityIntersecting ? colors[key] : "#FFF" },
            labelStyle: { fill: sc.isProbabilityIntersecting ? "#FFF" : colors[key], fontSize: 14 }
          });
        });
      });
    });
  });

  return elements;
}

const regex = {
  paragraph: /(?:\r\n){2,}/g,
  formatting: /(_.*?_)|(\*.*?\*)/g,
  formatLinks: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
};

export const applyFormatting = (text: string): (JSX.Element | (string | JSX.Element)[])[] => {
  return text
    .split(regex.formatting)
    .filter((n) => n)
    .map((str) => {
      const parsed =
        str[0] == "_" ? (
          <em key={str}>{applyFormatting(str.substr(1, str.length - 2))}</em>
        ) : str[0] == "*" ? (
          <b key={str}>{applyFormatting(str.substr(1, str.length - 2))}</b>
        ) : (
          str.split(" ").map((part) =>
            regex.formatLinks.test(part) ? (
              <a href={part} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
                {part}{" "}
              </a>
            ) : (
              part + " "
            )
          )
        );
      return parsed;
    });
};

export function getResult(decision: DecisionType): number | string {
  let total = 0;
  decision.sub.forEach((item) => {
    total += item.value * (item.probability / 100);
  });

  return getRoundedValue(total, 2);
}

export function getHasChangeableSiblings(
  decisions: DecisionType[],
  decKey: string,
  subKey: string,
  caseKey?: string,
  subCaseKey?: string
): boolean {
  if (subCaseKey) {
    const decision = decisions.find((item) => item.key === decKey);
    const sub = decision.sub.find((item) => item.key === subKey);
    const c = sub.cases.find((item) => item.key === caseKey);

    return (
      c.subCases.filter(
        (item) => item.isProbabilityIntersecting && !item.isProbabilityLocked && item.key !== subCaseKey
      ).length > 0
    );
  }

  if (caseKey) {
    const decision = decisions.find((item) => item.key === decKey);
    const sub = decision.sub.find((item) => item.key === subKey);

    return (
      sub.cases.filter((item) => item.isProbabilityIntersecting && !item.isProbabilityLocked && item.key !== caseKey)
        .length > 0
    );
  }

  if (subKey) {
    const decision = decisions.find((item) => item.key === decKey);

    return (
      decision.sub.filter((item) => item.isProbabilityIntersecting && !item.isProbabilityLocked && item.key !== subKey)
        .length > 0
    );
  }
}
