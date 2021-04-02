import React, { useContext } from "react";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";
import { Card } from "@material-ui/core";

import {
  SubCaseItem as SubCaseItemType,
  CaseItem as CaseItemType,
  Decision as DecisionType,
  SubItem as SubItemType
} from "@/../lib/presets";
import SubCaseItem from "../CalculatorWrapper/Calculator/SubCaseItem";
import CaseItem from "../CalculatorWrapper/Calculator/CaseItem";
import SubItem from "../CalculatorWrapper/Calculator/SubItem";
import Decision from "../CalculatorWrapper/Calculator/Decision";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";

const getSelectedNode = (
  decisions: DecisionType[],
  id: string
): SubCaseItemType | SubItemType | CaseItemType | null => {
  let node = null;
  decisions.forEach((decision) =>
    decision.key === id
      ? (node = { ...decision })
      : decision.sub.forEach((subItem) =>
          subItem.key === id
            ? (node = { decKey: decision.key, ...subItem })
            : subItem.cases.forEach((c) =>
                c.key === id
                  ? (node = { decKey: decision.key, subKey: subItem.key, ...c })
                  : c.subCases.forEach((sc) =>
                      sc.key === id
                        ? (node = { decKey: decision.key, subKey: subItem.key, caseKey: c.key, ...sc })
                        : null
                    )
              )
        )
  );

  return node;
};

const getNodeForm = (
  item: { decKey?: string; caseKey?: string; subKey?: string; subCaseKey?: string; color?: string; key: string },
  decisions: DecisionType[]
): JSX.Element | null => {
  if (item) {
    const { decKey, subCaseKey, caseKey, subKey, color, key } = item;
    const node = getSelectedNode(decisions, key);

    if (subCaseKey && node) {
      return (
        <SubCaseItem decisionKey={decKey} caseKey={caseKey} itemKey={subKey} subCaseItem={node} color={color} open />
      );
    } else if (caseKey && node) {
      return <CaseItem decisionKey={decKey} itemKey={subKey} color={color} caseItem={node} open />;
    } else if (subKey && node) {
      return <SubItem decisionKey={decKey} color={color} item={node} />;
    } else if (decKey && node) {
      return <Decision decision={node} color={color} />;
    }
  } else {
    return null;
  }
};

function SelectedNode(): JSX.Element {
  const { active, selectedNode } = useContext(GlobalDecisionContext);
  const { treeFlow } = useContext(GlobalUiContext);
  const decisions = active.decisions as DecisionType[];
  const selectedForm = getNodeForm(selectedNode, decisions);

  return treeFlow && selectedForm ? <Card style={{ marginTop: "1rem", padding: "1rem" }}>{selectedForm}</Card> : <></>;
}

export default SelectedNode;
