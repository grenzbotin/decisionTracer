/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { useTheme } from "@material-ui/core/styles";
import { Card, Grid, useMediaQuery } from "@material-ui/core";
import dynamic from "next/dynamic";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { createTreeDataFromPreset } from "@/../lib/helpers";
import TreeFlow from "./TreeFlow";
import { getLayoutedElements } from "./helpers";

const SelectedNode = dynamic(() => import("../../SelectedNode"));

function TreeFlowWrapper(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const [elements, setElements] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setElements(null);
    const layoutedElements = getLayoutedElements(createTreeDataFromPreset(active.decisions));
    setElements(layoutedElements);
  }, [active]);

  return (
    <Grid item xs={12}>
      <Card
        style={{
          height: "calc(100vh - 200px)",
          minHeight: "500px",
          position: "relative",
          background: "rgba(255,255,255,0.2)"
        }}
      >
        {elements && (
          <ReactFlowProvider>
            <TreeFlow elements={elements} setElements={setElements} />
          </ReactFlowProvider>
        )}
        {!isMobile && (
          <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "400px", zIndex: 4 }}>
            <SelectedNode />
          </div>
        )}
      </Card>
    </Grid>
  );
}

export default TreeFlowWrapper;
