import { generateColors } from "../components/theme";
import { Decision } from "./presets";
import { Elements } from "react-flow-renderer";

export function getUniqueNumber(): string {
    const date = new Date();
    return date.valueOf().toString();
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
  labelStyle: { fontWeight: 700, fontSize: 10, fill: '#fff' },
  labelBgStyle: { color: '#fff', fillOpacity: 0.8 },
};

export function createTreeDataFromPreset(decisions: Array<Decision>): Elements<any>{
  const elements = [] as Elements<any>;
  const colors = generateColors(decisions.length);

  decisions.forEach((decision, key) => {
    elements.push({
      id: decision.key,
      data: { title: decision.title,
        icon: decision.icon,
        color: colors[key],
      },
        position,
        type: 'decisionNode',
    });
    decision.sub.forEach((scenario) => {
      const nodeType = scenario.cases.length > 0 ? 'caseNode' : 'subCaseEndNode';
      elements.push({
        id: scenario.key,
        data: {
          title: scenario.title,
          color: colors[key],
          probability: scenario.probability,
          value: scenario.value
        },
        position,
        type: nodeType,
      });
      elements.push({
        id: `${decision.key}-${scenario.key}-link`,
        source: decision.key,
        target: scenario.key,
        label: `${scenario.probability} %`,
        ...lineProps,
        labelBgStyle: { fill: colors[key] },
      });

      scenario.cases.forEach((c) => {
        const nodeType = c.subCases.length > 0 ? 'caseNode' : 'subCaseEndNode';
        elements.push({
          id: c.key,
          data: {
            title: c.title,
            color: colors[key],
            probability: c.probability,
            value: c.value,
          },
          position,
          type: nodeType,
        });
        elements.push({
          id: `${scenario.key}-${c.key}-link`, 
          source: scenario.key,
          target: c.key,
          label: `${c.probability} %`,
          ...lineProps,
          labelBgStyle: { fill: colors[key] },
        });

        c.subCases.forEach((sc) => {
          elements.push({
            id: sc.key,
            data: {
              title: sc.title,
              color: colors[key],
              probability: sc.probability,
              value: sc.value,
            },
            position,
            type: 'subCaseEndNode',
          });
          elements.push({
            id: `${c.key}-${sc.key}-link`,
            source: c.key,
            target: sc.key,
            label: `${sc.probability} %`,
            ...lineProps,
            labelBgStyle: { fill: colors[key] },
          });
        })
      });
    })
  });

  return elements;
}