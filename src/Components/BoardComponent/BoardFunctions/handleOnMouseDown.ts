import useStateContext from "../useStateContext";

const {
  setLastClickPosition,
  setSelectedNode,
  isCtrlPressed,
  isSpacePressed,
  setSelectedEdge,
  setBoardDragging,
  setClickedPosition,
  setSelectionBox,
  setGroupBoundingBox,
  setSelectedNodesGroup,
} = useStateContext();

//==================================================
// handle all mouse down event, it may be
// down on node, boundingBox etc
//==================================================

export const handleOnMouseDown = (event: any) => {
  setLastClickPosition({ x: event.clientX, y: event.clientY });
  setSelectedNode(null);
  setSelectedEdge(null);
  if (isCtrlPressed() || isSpacePressed()) {
    setBoardDragging(true);
    setClickedPosition({ x: event.x, y: event.y });
  } else {
    setClickedPosition({ x: event.clientX, y: event.clientY });
    setSelectionBox({
      x: event.clientX,
      y: event.clientY,
      width: 0,
      height: 0,
    });
    setGroupBoundingBox(null);
    setSelectedNodesGroup([]);
  }
};
