/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { useTheme } from "@material-ui/core/styles";
import { Card, Grid, useMediaQuery } from "@material-ui/core";
import dynamic from "next/dynamic";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";

import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";
import { createTreeDataFromPreset, updateTreeData } from "@/../lib/helpers";
import TreeFlow from "./TreeFlow";
import { getLayoutedElements } from "./helpers";
import { Decision } from "@/../lib/presets";

const SelectedNode = dynamic(() => import("../../SelectedNode"));

const getTotalCaseNumber = (decisions: Decision[]): number => {
  let countPrev = decisions.length;
  decisions.forEach((item) => {
    countPrev += item.sub.length;
    item.sub.forEach((scenario) => {
      countPrev += scenario.cases.length;
      scenario.cases.forEach((c) => {
        countPrev += c.subCases.length;
      });
    });
  });

  return countPrev;
};

const hasLengthChange = (prev: Decision[], decisions: Decision[]): boolean => {
  const prevCaseNumber = getTotalCaseNumber(prev);
  const currentCaseNumber = getTotalCaseNumber(decisions);

  return prevCaseNumber !== currentCaseNumber;
};

function TreeFlowWrapper(): JSX.Element {
  const { active } = useContext(GlobalDecisionContext);
  const [elements, setElements] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [prevDecisions, setPrevDecisions] = useState([]);

  useEffect(() => {
    if (hasLengthChange(prevDecisions, active.decisions)) {
      setElements(null);
      const layoutedElements = getLayoutedElements(createTreeDataFromPreset(active.decisions));
      setElements(layoutedElements);
      setPrevDecisions(active.decisions);
    } else {
      const updatedElements = updateTreeData(elements, active.decisions);
      setElements(null);
      setElements(updatedElements);
    }
  }, [active]);

  return (
    <Grid item xs={12}>
      <Card
        style={{
          height: "calc(100vh - 200px)",
          minHeight: "500px",
          position: "relative",
          background: "rgba(255,255,255,0.5)"
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
