import React, { useContext } from "react";
import { GlobalDecisionContext } from "../../hooks/GlobalDecisionsContextProvider";

import { Decision as DecisionType } from "@/../lib/presets";
import { getNodeForm } from "./helpers";
import { IconButton } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";

function SelectedNode(): JSX.Element {
  const { active, selectedNode, setSelectedNode } = useContext(GlobalDecisionContext);
  const decisions = active.decisions as DecisionType[];
  const selectedForm = getNodeForm(selectedNode, decisions);

  return selectedForm ? (
    <div
      style={{
        overflow: "auto",
        maxHeight: "calc(500px - 2rem)",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
      }}
    >
      {selectedForm}
      <IconButton
        style={{ position: "absolute", left: "-1.8rem", top: ".5rem", background: selectedNode.color, color: "#fff" }}
        size="small"
        onClick={() => setSelectedNode(null)}
      >
        <CloseOutlined fontSize="small" />
      </IconButton>
    </div>
  ) : (
    <></>
  );
}

export default SelectedNode;
