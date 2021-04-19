import React, { useContext } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";

import { Decision as DecisionType } from "@/../lib/presets";
import { getNodeForm } from "./helpers";

function SelectedNode(): JSX.Element {
  const { active, selectedNode, setSelectedNode } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];
  const selectedForm = getNodeForm(selectedNode, decisions);

  const handleClose = (): void => {
    setSelectedNode(null);
  };

  return selectedForm ? (
    <ClickAwayListener onClickAway={handleClose}>
      <div
        style={{
          overflow: "auto",
          maxHeight: "calc(500px - 2rem)",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
        }}
      >
        {selectedForm}
      </div>
    </ClickAwayListener>
  ) : (
    <></>
  );
}

export default SelectedNode;
