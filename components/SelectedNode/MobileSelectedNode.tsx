import React, { useContext } from "react";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";
import { Dialog } from "@material-ui/core";

import { Decision as DecisionType } from "@/../lib/presets";
import { GlobalUiContext } from "@/../hooks/GlobalUiContextProvider";
import { getNodeForm } from "./helpers";

function MobileSelectedNode(): JSX.Element {
  const { active, selectedNode, setSelectedNode } = useContext(GlobalDecisionContext);
  const { treeFlow } = useContext(GlobalUiContext);
  const decisions = active.decisions as DecisionType[];
  const selectedForm = getNodeForm(selectedNode, decisions);

  const open = treeFlow && selectedForm !== null;

  return (
    <Dialog fullWidth onClose={() => setSelectedNode(null)} open={open}>
      {selectedForm}
    </Dialog>
  );
}

export default MobileSelectedNode;
