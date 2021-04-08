import React, { memo } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Handle, NodeProps, Position } from "react-flow-renderer";

import { getRoundedValue } from "@/../lib/helpers";

const CaseNode = memo(
  ({ data, selected, targetPosition = Position.Top, sourcePosition = Position.Bottom }: NodeProps) => {
    return (
      <Paper
        style={{
          borderTop: `2px solid ${data.color}`,
          width: "140px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: selected && data.color,
          color: selected && "#fff"
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
  }
);

CaseNode.displayName = "CaseNode";

export default CaseNode;
