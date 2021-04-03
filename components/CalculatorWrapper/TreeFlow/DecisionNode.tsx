import CustomIcon from "@/../assets/CustomIcon";
import { getRoundedValue } from "@/../lib/helpers";
import { Paper, Typography } from "@material-ui/core";
import React, { memo } from "react";

import { Handle, NodeProps, Position } from "react-flow-renderer";

const DecisionNode = memo(({ data, selected, sourcePosition = Position.Bottom }: NodeProps) => {
  return (
    <Paper
      style={{
        borderTop: `5px solid ${data.color}`,
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "140px",
        background: selected && data.color,
        color: selected && "#fff"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1, padding: ".5rem", lineHeight: 1.15 }}>
        {data.icon && <CustomIcon fontSize="small" name={data.icon} style={{ marginRight: ".5rem" }} />}
        {data.title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: selected ? "1px solid #fff" : "1px solid rgba(0,0,0,0.40)",
          width: "100%",
          height: "20px",
          justifyContent: "center"
        }}
      >
        <Typography noWrap variant="caption">
          {getRoundedValue(data.value, 2)}
        </Typography>
      </div>
      <Handle type="source" position={sourcePosition} />
    </Paper>
  );
});

DecisionNode.displayName = "DecisionNode";

export default DecisionNode;
