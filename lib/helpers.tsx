/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateColors } from "../components/theme";
import { CaseItem, Decision as DecisionType, SubCaseItem, SubItem } from "./presets";
import { Elements } from "react-flow-renderer";
import i18next from "i18next";

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
        labelBgStyle: { fill: colors[key] }
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
          labelBgStyle: { fill: colors[key] }
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
            labelBgStyle: { fill: colors[key] }
          });
        });
      });
    });
  });

  return elements;
}

const regex = {
  paragraph: /(?:\r\n){2,}/g,
  formatting: /(_.*?_)|(\*.*?\*)/g
};

export const applyFormatting = (text: string): (string | JSX.Element)[] => {
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
          str
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
