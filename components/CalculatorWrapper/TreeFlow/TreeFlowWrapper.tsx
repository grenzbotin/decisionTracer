/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { Card, Grid } from "@material-ui/core";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { createTreeDataFromPreset } from "@/../lib/helpers";
import TreeFlow from "./TreeFlow";
import { getLayoutedElements } from "./helpers";

function TreeFlowWrapper(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const [elements, setElements] = useState(null);

  useEffect(() => {
    setElements(null);
    const layoutedElements = getLayoutedElements(createTreeDataFromPreset(active.decisions));
    setElements(layoutedElements);
  }, [active]);

  return (
    <Grid item xs={12}>
      <Card style={{ height: "calc(100vh - 200px)", minHeight: "600px", position: "relative" }}>
        {elements && (
          <ReactFlowProvider>
            <TreeFlow elements={elements} setElements={setElements} />
          </ReactFlowProvider>
        )}
      </Card>
    </Grid>
  );
}

export default TreeFlowWrapper;
