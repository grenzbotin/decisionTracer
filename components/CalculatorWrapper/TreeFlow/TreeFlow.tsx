/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import ReactFlow, { Controls, ControlButton, removeElements, Elements, useZoomPanHelper } from "react-flow-renderer";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";
import { getLayoutedElements, nodeTypes } from "./helpers";

function TreeFlow({ elements, setElements }: { elements: Elements<any>; setElements: (_: any) => void }): JSX.Element {
  const { fitView } = useZoomPanHelper();

  const onElementsRemove = (elementsToRemove: Elements<any>): void =>
    setElements((els: any) => removeElements(elementsToRemove, els));

  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements]
  );

  useEffect(() => {
    fitView();
  }, [elements]);

  return (
    <>
      <ReactFlow
        elements={elements}
        minZoom={0.1}
        onLoad={() => fitView()}
        onElementsRemove={onElementsRemove}
        snapToGrid={true}
        snapGrid={[15, 15]}
        nodeTypes={nodeTypes}
      />
      <Controls>
        <ControlButton onClick={() => onLayout("TB")}>
          <SwapHorizIcon fontSize="small" />
        </ControlButton>
        <ControlButton onClick={() => onLayout("LR")}>
          <SwapVertIcon fontSize="small" />
        </ControlButton>
      </Controls>
    </>
  );
}

export default TreeFlow;
