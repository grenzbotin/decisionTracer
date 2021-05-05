import { Paper, Typography } from "@material-ui/core";
import React, { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";

import { getRoundedValue } from "@/../lib/helpers";

const DecisionNode = memo(({ data, selected, sourcePosition = Position.Bottom }: NodeProps) => {
  return (
    <Paper
      style={{
        borderTop: `5px solid ${data.color}`,
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "75px",
        width: "140px",
        height: "140px",
        background: selected && data.color,
        color: selected && "#fff",
        padding: "1.1rem"
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          position: "relative",
          paddingBottom: "1rem"
        }}
      >
        <div
          style={{
            maxHeight: "60px",
            maxWidth: "70px",
            overflow: "hidden",
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: 500
          }}
        >
          {data.title}
        </div>
        <div style={{ position: "absolute", bottom: "0rem" }}>
          <Typography noWrap variant="caption">
            {getRoundedValue(data.value, 2)}
          </Typography>
        </div>
      </div>
      <Handle type="source" position={sourcePosition} />
    </Paper>
  );
});

DecisionNode.displayName = "DecisionNode";

export default DecisionNode;
