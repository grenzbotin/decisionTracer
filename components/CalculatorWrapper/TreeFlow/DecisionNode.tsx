import CustomIcon from "@/../assets/CustomIcon";
import { Paper } from "@material-ui/core";
import React, { memo } from "react";

import { Handle, NodeProps, Position } from "react-flow-renderer";

const DecisionNode = memo(({ data, sourcePosition = Position.Bottom }: NodeProps) => {
  return (
    <Paper
      style={{
        padding: "0.5rem .8rem",
        borderTop: `5px solid ${data.color}`,
        fontSize: "1rem"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.icon && <CustomIcon fontSize="small" name={data.icon} style={{ marginRight: ".5rem" }} />}
        {data.title}
      </div>
      <Handle type="source" position={sourcePosition} />
    </Paper>
  );
});

DecisionNode.displayName = "DecisionNode";

export default DecisionNode;
