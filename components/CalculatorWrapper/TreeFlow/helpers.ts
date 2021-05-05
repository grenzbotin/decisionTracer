/* eslint-disable @typescript-eslint/no-explicit-any */
import { Elements, isNode, Position } from "react-flow-renderer";
import dagre from "dagre";

import CaseNode from "./CaseNode";
import DecisionNode from "./DecisionNode";
import SubCaseEndNode from "./SubCaseEndNode";

const nodeWidth = 140;

const NODE_HEIGHT = {
  decisionNode: 140,
  caseNode: 60,
  subcaseNode: 60
};

export const nodeTypes = {
  decisionNode: DecisionNode,
  caseNode: CaseNode,
  subCaseEndNode: SubCaseEndNode
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (elements: Elements<any>, direction = "TB"): Elements<any> => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction, nodesep: isHorizontal ? 30 : 30, ranksep: isHorizontal ? 150 : 120 });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: NODE_HEIGHT[el.type] || 60 });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - (NODE_HEIGHT[el.type] || 60) / 2
      };
    }

    return el;
  });
};
