import React, { memo } from "react";
import { Paper, Typography } from "@material-ui/core";

import { Handle, NodeProps, Position } from "react-flow-renderer";

const SubCaseEndNode = memo(({ data, targetPosition = Position.Top }: NodeProps) => {
  return (
    <Paper
      style={{
        borderTop: `2px solid ${data.color}`,
        width: "120px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Handle type="target" position={targetPosition} />
      <div
        style={{
          alignItems: "center",
          flex: 1,
          padding: ".2rem",
          maxHeight: "50px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: 2,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          lineHeight: 1.15
        }}
      >
        <Typography variant="caption" style={{ lineHeight: 1.15 }}>
          {data.title}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid rgba(0,0,0,0.40)",
          width: "100%",
          height: "20px",
          justifyContent: "center"
        }}
      >
        <Typography noWrap variant="caption">
          {data.value.toFixed(3)}
        </Typography>
      </div>
    </Paper>
  );
});

SubCaseEndNode.displayName = "SubCaseEndNode";

export default SubCaseEndNode;
