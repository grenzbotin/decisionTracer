import React, { useContext } from "react";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";
import { Card } from "@material-ui/core";

import { Decision as DecisionType } from "@/../lib/presets";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import { getNodeForm } from "./helpers";

function SelectedNode(): JSX.Element {
  const { active, selectedNode } = useContext(GlobalDecisionContext);
  const { visualMode } = useContext(GlobalUiContext);
  const decisions = active.decisions as DecisionType[];
  const selectedForm = getNodeForm(selectedNode, decisions);

  const isTreeMode = visualMode === "tree";

  return isTreeMode && selectedForm ? (
    <Card style={{ marginTop: "1rem", padding: "1rem" }}>{selectedForm}</Card>
  ) : (
    <></>
  );
}

export default SelectedNode;
