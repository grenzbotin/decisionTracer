const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export default [
  {
    id: "1",
    type: "decisionNode",
    data: { title: "no vaccination", icon: "noVaccination", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "2",
    type: "caseNode",
    data: { title: "sub", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "2a",
    type: "subCaseEndNode",
    data: { title: "node 2a", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "2b",
    type: "subCaseEndNode",
    data: { title: "node 2b", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "2c",
    type: "caseNode",
    data: { title: "node 2c", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "2d",
    type: "subCaseEndNode",
    data: { title: "node 2d", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "3",
    type: "subCaseEndNode",
    data: { title: "node 3", color: "rgb(58, 128, 138)" },
    position
  },
  {
    id: "4",
    type: "decisionNode",
    data: { title: "vaccination", icon: "vaccination", color: "rgb(255, 163, 51)" },
    position
  },
  {
    id: "5",
    type: "caseNode",
    data: { title: "node 5", color: "rgb(255, 163, 51)" },
    position
  },
  {
    id: "6",
    type: "subCaseEndNode",
    data: { title: "output", color: "rgb(255, 163, 51)" },
    position
  },
  { id: "7", type: "subCaseEndNode", data: { title: "output", color: "rgb(255, 163, 51)" }, position },
  { id: "e12", source: "1", target: "2", arrowHeadType: "arrowclosed", type: edgeType, label: "edge with arrow head" },
  { id: "e13", source: "1", target: "3", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e22a", source: "2", target: "2a", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e22b", source: "2", target: "2b", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e22c", source: "2", target: "2c", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e2c2d", source: "2c", target: "2d", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e45", source: "4", target: "5", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e56", source: "5", target: "6", arrowHeadType: "arrowclosed", type: edgeType },
  { id: "e57", source: "5", target: "7", arrowHeadType: "arrowclosed", type: edgeType }
];
