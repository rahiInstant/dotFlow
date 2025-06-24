import { createSignal } from "solid-js";
import useStateContext from "../useStateContext";
import { PanGuidedByNodeOrBoundingBox } from "./panGuidedByNodeOrBoundingBox";
import { getPathLength } from "./getPathLength";

const {
  isCtrlPressed,
  isSpacePressed,
  clickedPosition,
  selectionBox,
  setSelectionBox,
  nodes,
  edges,
  setGroupBoundingBox,
  setSelectedNodesGroup,
  scale,
  transform,
  lastPointer,
  groupBoundingBox,
  selectedNodesGroup,
  selectedNode,
  setLastPointer,
  newEdge,
  preTransform,
  setTransform,
  setEdgeLength,
  boardDragging,
  setInsideInput,
} = useStateContext();

//==================================================
// This function for handling all mouse move on the board
// like move board, move node/nodeGroup (bounding box)
//==================================================

export const handleOnMouseMove = (event: MouseEvent) => {
  const isKeyPress = isCtrlPressed() || isSpacePressed();
  const deltaX = event.x - clickedPosition().x;
  const deltaY = event.y - clickedPosition().y;
  // setCursor({ x: event.x, y: event.y });

  // ********** selection box dragging and move multiple nodes ************
  if (selectionBox()) {
    const start = clickedPosition();
    const width = event.clientX - start.x;
    const height = event.clientY - start.y;

    setSelectionBox({
      x: start.x,
      y: start.y,
      width,
      height,
    });
    const box = {
      x: Math.min(start.x, event.clientX),
      y: Math.min(start.y, event.clientY),
      width: Math.abs(width),
      height: Math.abs(height),
    };
    const liveSelectedNodes = nodes().filter((node) => {
      const nodeRef = document.getElementById(node.id);
      if (!nodeRef) return false;

      const nodeX = node.currPosition.get().x * scale() + transform().x;
      const nodeY = node.currPosition.get().y * scale() + transform().y;
      const nodeWidth = nodeRef.offsetWidth;
      const nodeHeight = nodeRef.offsetHeight;

      return (
        nodeX + nodeWidth > box.x &&
        nodeX < box.x + box.width &&
        nodeY + nodeHeight > box.y &&
        nodeY < box.y + box.height
      );
    });
    setSelectedNodesGroup(liveSelectedNodes.map((node) => node.id));
  }
  // *********** move multiple nodes ************
  if (groupBoundingBox() && lastPointer()) {
    const dx = event.clientX - lastPointer()!.x;
    const dy = event.clientY - lastPointer()!.y;

    // ********** move groundBoundingBox (screen coords) *********
    const prev = groupBoundingBox()!;
    setGroupBoundingBox({
      x: prev.x + dx / scale(),
      y: prev.y + dy / scale(),
      width: prev.width,
      height: prev.height,
    });

    selectedNodesGroup().forEach((nodeId) => {
      const node = nodes().find((node) => node.id === nodeId);
      if (node) {
        const prevPos = node.currPosition.get();
        const newX = prevPos.x + dx / scale();
        const newY = prevPos.y + dy / scale();

        node.currPosition.set({ x: newX, y: newY });
        // ******** input edges ************
        node.inputEdgeIds.get().forEach((edgeId) => {
          const edge = edges().find((edge) => edge.id === edgeId);
          if (edge) {
            const prevEnd = edge.currEndPosition.get();
            edge.currEndPosition.set(() => {
              return {
                x: prevEnd.x + dx / scale(),
                y: prevEnd.y + dy / scale(),
              };
            });
          }
        });
        // ************ output edges *************
        node.outputEdgeIds.get().forEach((edgeId) => {
          const edge = edges().find((edge) => edge.id === edgeId);
          if (edge) {
            const prevStart = edge.currStartPosition.get();
            edge.currStartPosition.set(() => {
              return {
                x: prevStart.x + dx / scale(),
                y: prevStart.y + dy / scale(),
              };
            });
          }
        });
      }
    });
    setLastPointer({ x: event.clientX, y: event.clientY });
    PanGuidedByNodeOrBoundingBox(event);
  }
  // ************ single node dragging ************
  else if (clickedPosition().x >= 0 && selectedNode() !== null) {
    const node = nodes().find((node) => node.id === selectedNode());
    // console.log(node)
    if (node) {
      // ************ Update node position ***************
      node.currPosition.set((_) => {
        return {
          x: (node.prevPosition.get().x + deltaX) / scale(),
          y: (node.prevPosition.get().y + deltaY) / scale(),
        };
      });

      // *********** input edges ************
      for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
        const edgeId = node.inputEdgeIds.get()[i];
        // console.log(edgeId);
        const edge = edges().find((edge) => edge.id === edgeId);
        if (edge) {
          // console.log(edge, "input");
          edge.currEndPosition.set(() => {
            return {
              x: (edge.prevEndPosition.get().x + deltaX) / scale(),
              y: (edge.prevEndPosition.get().y + deltaY) / scale(),
            };
          });
        }
      }

      // ************ output edges **********
      for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
        const edgeId = node.outputEdgeIds.get()[i];
        const edge = edges().find((edge) => edge.id === edgeId);
        if (edge) {
          // console.log(edge, "output");
          edge.currStartPosition.set(() => {
            return {
              x: (edge.prevStartPosition.get().x + deltaX) / scale(),
              y: (edge.prevStartPosition.get().y + deltaY) / scale(),
            };
          });
        }
      }

      PanGuidedByNodeOrBoundingBox(event);
    }
  }
  // ************ Board dragging **************
  else if (isKeyPress && boardDragging() && selectedNode() === null) {
    event.preventDefault();
    const deltaX = event.x - clickedPosition().x;
    const deltaY = event.y - clickedPosition().y;
    setTransform({
      x: deltaX + preTransform().x,
      y: deltaY + preTransform().y,
    });
  }

  // *********** new edge movement and snapping effect ************
  if (newEdge() !== null) {
    // console.log(newEdge(), "newEdge");
    setEdgeLength(getPathLength());
    const boardWrapperElement = document.getElementById("boardWrapper");
    const BUFFER_RADIUS = 50;
    if (boardWrapperElement) {
      const [foundInput, setFoundInput] = createSignal<{
        positionX: number;
        positionY: number;
        id: string;
      } | null>(null);
      const typeOfEdge = newEdge()?.typeOfEdge;

      // const distanceCalculator = (node) => {};

      // ************ check nearest input vertex ************
      for (const node of nodes()) {
        console.log(newEdge()?.typeOfEdge);
        const targetVertex =
          typeOfEdge === "dash" ? node.isUpVertex : node.isInputVertex;
        if (node.id !== newEdge()!.nodeStartId && targetVertex) {
          // console.log(node);
          const targetVertexId =
            typeOfEdge === "dash"
              ? node.upVertexIds[0]
              : node.inputVertexIds[0];

          // node.isInputVertex
          //   ? node.inputVertexIds[0]
          //   : node.upVertexIds[0];
          // console.log(inputVertexId, "inputVertexId");
          const inputVertexRef = document.getElementById(targetVertexId);
          const { left, right, top, bottom } =
            inputVertexRef!.getBoundingClientRect();
          const centerX = left + Math.abs(left - right) / 2;
          const centerY = top + Math.abs(top - bottom) / 2;

          const dx = event.clientX - centerX;
          const dy = event.clientY - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          // console.log(distance, "distance");
          if (distance < BUFFER_RADIUS) {
            setFoundInput({
              positionX: centerX,
              positionY: centerY,
              id: node.id,
            });
            break;
          }
        }
      }

      if (foundInput() !== null) {
        // console.log(foundInput(), "foundInput");
        //*********** Snap to input center ***********
        newEdge()?.currEndPosition.set({
          x: (foundInput()!.positionX - transform().x) / scale(),
          y: (foundInput()!.positionY - transform().y) / scale(),
        });

        // ********** save snapping input data **********
        setInsideInput({
          nodeId: foundInput()!.id,
          inputIndex: 0,
          positionX: foundInput()!.positionX,
          positionY: foundInput()!.positionY,
        });
      } else {
        setInsideInput(null);
        newEdge()?.currEndPosition.set({
          x: (event.x - transform().x) / scale(),
          y: (event.y - transform().y) / scale(),
        });
      }
    }
  }
};
