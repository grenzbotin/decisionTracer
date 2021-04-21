/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect } from "react";
import ReactFlow, {
  Controls,
  ControlButton,
  removeElements,
  Elements,
  useZoomPanHelper,
  isNode
} from "react-flow-renderer";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";
import { getLayoutedElements, nodeTypes } from "./helpers";
import { GlobalDecisionContext } from "@/../hooks/GlobalDecisionsContextProvider";

function TreeFlow({ elements, setElements }: { elements: Elements<any>; setElements: (_: any) => void }): JSX.Element {
  const { fitView } = useZoomPanHelper();
  const { setSelectedNode, removeItem } = useContext(GlobalDecisionContext);

  const handleElementRemove = (elementsToRemove: Elements<any>): void => {
    elementsToRemove.forEach((el) => {
      if (isNode(el)) {
        const { decKey, subKey, caseKey, subCaseKey } = el.data;
        removeItem(decKey, subKey, caseKey, subCaseKey);
      }
    });
    setElements((els: any) => removeElements(elementsToRemove, els));
  };

  const handleClick = (elements: Elements<any>): void => {
    if (elements && elements.length > 0 && isNode(elements[0])) {
      setSelectedNode(elements[0].data);
    } else {
      setSelectedNode(null);
    }
  };

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
        elementsSelectable
        minZoom={0.1}
        onLoad={() => fitView()}
        onElementsRemove={handleElementRemove}
        onSelectionChange={handleClick}
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
