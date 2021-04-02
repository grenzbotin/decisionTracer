import { generateColors } from "../components/theme";
import { CaseItem, Decision, SubCaseItem, SubItem } from "./presets";
import { Elements } from "react-flow-renderer";

export function getUniqueNumber(): string {
    const date = new Date();
    return date.valueOf().toString();
  }

export function getRoundedValue(value: number, digits: number): string {
  return value.toFixed(digits);
}

export function getValueFromChilds(node: SubItem | SubCaseItem | Decision, child: string): number {
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
  labelStyle: { fontWeight: 700, fontSize: 12, fill: '#fff' },
  labelBgStyle: { color: '#fff', fillOpacity: 0.8 },
};

export function createTreeDataFromPreset(decisions: Array<Decision>): Elements<any>{
  const elements = [] as Elements<any>;
  const colors = generateColors(decisions.length);

  decisions.forEach((decision, key) => {
    elements.push({
      id: decision.key,
      data: {
        color: colors[key],
        value: getValueFromChilds(decision, "sub"),
        decKey: decision.key,
        ...decision,
      },
        position,
        type: 'decisionNode',
    });
    decision.sub.forEach((scenario) => {
      const nodeType = scenario.cases.length > 0 ? 'caseNode' : 'subCaseEndNode';
      elements.push({
        id: scenario.key,
        data: {
          ...scenario,
          decKey: decision.key,
          subKey: scenario.key,
          color: colors[key],
        },
        position,
        type: nodeType,
      });
      elements.push({
        id: `${decision.key}-${scenario.key}-link`,
        source: decision.key,
        target: scenario.key,
        label: `${getRoundedValue(scenario.probability, 3)} %`,
        ...lineProps,
        labelBgStyle: { fill: colors[key] },
      });

      scenario.cases.forEach((c) => {
        const nodeType = c.subCases.length > 0 ? 'caseNode' : 'subCaseEndNode';
        elements.push({
          id: c.key,
          data: {
            decKey: decision.key,
            subKey: scenario.key,
            caseKey: c.key,
            color: colors[key],
            ...c,
          },
          position,
          type: nodeType,
        });
        elements.push({
          id: `${scenario.key}-${c.key}-link`, 
          source: scenario.key,
          target: c.key,
          label: `${getRoundedValue(c.probability, 3)} %`,
          ...lineProps,
          labelBgStyle: { fill: colors[key] },
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
            type: 'subCaseEndNode',
          });
          elements.push({
            id: `${c.key}-${sc.key}-link`,
            source: c.key,
            target: sc.key,
            label: `${getRoundedValue(sc.probability, 3)} %`,
            ...lineProps,
            labelBgStyle: { fill: colors[key] },
          });
        })
      });
    })
  });

  return elements;
}