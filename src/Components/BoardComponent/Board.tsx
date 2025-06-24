import { Component, createEffect, For, onCleanup, onMount } from "solid-js";
import style from "./style.module.css";
import NodeMain from "../FlowContent/NodeComponents";
import useStateContext from "./useStateContext";
import EdgeComponent from "../FlowContent/EdgeComponents";
import { Edge, Node } from "../ButtonComponents/Types";
import { handleOnMouseDown } from "./BoardFunctions/handleOnMouseDown";
import { getPathLength } from "./BoardFunctions/getPathLength";
import { handleOnMouseMove } from "./BoardFunctions/handleOnMouseMove";
import { handleOnMouseUp } from "./BoardFunctions/handleOnMouseUp";
import { handleOnMouseDownNode } from "./BoardFunctions/handleOnMouseDownNode";
import { handleOnMouseDownOutput } from "./BoardFunctions/handleOnMouseDownOutput";
import { handleOnMouseEnterInput } from "./BoardFunctions/handleOnMouseEnterInput";
import { handleOnMouseLeaveInput } from "./BoardFunctions/handleOnMouseLeaveInput";
import { handleOnClickDeleteNode } from "./BoardFunctions/handleOnClickDeleteNode";
import { handleOnMouseDownEdge } from "./BoardFunctions/handleOnMouseDownEdge";
import { handleOnDeleteEdge } from "./BoardFunctions/handleOnDeleteEdge";

const Board: Component = () => {
  const {
    draggable,
    scale,
    edges,
    newEdge,
    transform,
    selectedNode,
    nodes,
    setClickedPosition,
    boardDragging,
    selectedEdge,
    selectionBox,
    selectedNodesGroup,
    groupBoundingBox,
    setGroupBoundingBox,
    setLastPointer,
  } = useStateContext();

  createEffect(() => {
    console.log("from board", nodes());
    console.log(edges());
  });

  onMount(() => {
    const handleOnDeleteKeyDown = (event: any) => {
      if (event.code === "Delete") {
        if (selectedNodesGroup() && selectedNode() === null) {
          selectedNodesGroup().forEach((nodeId) => {
            const node = nodes().find((node) => node.id === nodeId);
            if (node) {
              handleOnClickDeleteNode(node.id);
            }
          });
          setGroupBoundingBox(null);
        } else if (selectedNode() !== null) {
          const node = nodes().find((node) => node.id === selectedNode());
          if (node) {
            handleOnClickDeleteNode(node.id);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    const paneElement = document.getElementById("pane");

    if (paneElement) {
      paneElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    document.addEventListener("keydown", handleOnDeleteKeyDown);

    onCleanup(() => {
      document.removeEventListener("keydown", handleOnDeleteKeyDown);
      if (paneElement) {
        paneElement.removeEventListener("wheel", handleWheel);
      }
    });
  });

  return (
    // pane
    <div
      id="pane"
      class="absolute w-full h-full top-0 left-0 select-none cursor-default"
      classList={{
        [style["dot-flow__pane"]]: true,
        [style["draggable"]]: draggable(),
        [style["dragging"]]: boardDragging(),
        [style["selection"]]: false,
      }}
      // onWheel={(e) => e.preventDefault()}
      onPointerDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
    >
      {/* background */}
      <div
        class={style["dot-flow__background"]}
        style={{
          transform: `scale(${scale()})`,
          width: `calc(100vw / ${scale()})`,
          height: `calc(100vh / ${scale()})`,
          "transform-origin": "top left",
          "background-position": `${transform().x / scale()}px ${
            transform().y / scale()
          }px`,
        }}
      ></div>
      {/* selection box */}
      {selectionBox() && (
        <div
          style={{
            position: "absolute",
            left: `${Math.min(
              selectionBox()!.x,
              selectionBox()!.x + selectionBox()!.width
            )}px`,
            top: `${Math.min(
              selectionBox()!.y,
              selectionBox()!.y + selectionBox()!.height
            )}px`,
            width: `${Math.abs(selectionBox()!.width)}px`,
            height: `${Math.abs(selectionBox()!.height)}px`,
            border: "1px dashed #00aaff",
            background: "rgba(0, 170, 255, 0.1)",
            "z-index": 999,
            "pointer-events": "none",
          }}
        ></div>
      )}
      {/* bounding box */}
      {groupBoundingBox() && (
        <div
          style={{
            position: "absolute",
            left: `${groupBoundingBox()!.x * scale() + transform().x}px`,
            top: `${groupBoundingBox()!.y * scale() + transform().y}px`,
            width: `${groupBoundingBox()!.width * scale()}px`,
            height: `${groupBoundingBox()!.height * scale()}px`,
            border: "1px solid #00aaff",
            background: "rgba(0, 170, 255, 0.05)",
            "z-index": 998,
            cursor: "move",
            "transform-origin": "top left",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setClickedPosition({ x: e.clientX, y: e.clientY });
            setLastPointer({ x: e.clientX, y: e.clientY });
          }}
        ></div>
      )}
      {/* bounding box --> main element */}
      <div
        id="board"
        class="w-screen h-screen absolute top-0 left-0"
        classList={{
          [style["dot-flow__viewport"]]: true,
          [style["dot-flow__viewport"]]: true,
        }}
        style={{
          transform: `translate(${transform().x}px, ${
            transform().y
          }px) scale(${scale()})`,
          "transform-origin": "top left",
        }}
      >
        <div id="flow">
          {/* render all nodes */}
          <For each={nodes()}>
            {(node: Node) => (
              <NodeMain
                id={node.id}
                name={node.name}
                title={node.title}
                x={node.currPosition.get().x}
                y={node.currPosition.get().y}
                numberInputs={node.numberInputs}
                numberOutputs={node.numberOutputs}
                downVertexNumber={node.downVertexNumber || 0}
                upVertexNumber={node.upVertexNumber || 0}
                isInputVertex={node.isInputVertex}
                isOutputVertex={node.isOutputVertex}
                isDownVertex={node.isDownVertex || false}
                isUpVertex={node.isUpVertex || false}
                inputVertexIds={node.inputVertexIds}
                outputVertexIds={node.outputVertexIds}
                downVertexIds={node.downVertexIds || []}
                upVertexIds={node.upVertexIds || []}
                downVertexOrientation={node.downVertexOrientation || ""}
                busyIndex={node.busyIndex}
                content={node.content}
                selected={
                  selectedNode() == node.id ||
                  selectedNodesGroup().includes(node.id)
                }
                onMouseDownNode={handleOnMouseDownNode}
                onMouseDownOutput={handleOnMouseDownOutput}
                onMouseEnterInput={handleOnMouseEnterInput}
                onMouseLeaveInput={handleOnMouseLeaveInput}
                onClickDeleteNode={handleOnClickDeleteNode}
              />
            )}
          </For>

          {/* render only new edge */}
          {newEdge() !== null && (
            <EdgeComponent
              selected={false}
              isNew={true}
              edgeLength={() => getPathLength()}
              typeOfEdge={newEdge()!.typeOfEdge}
              position={{
                x0: newEdge()!.currStartPosition.get().x,
                y0: newEdge()!.currStartPosition.get().y,
                x1: newEdge()!.currEndPosition.get().x,
                y1: newEdge()!.currEndPosition.get().y,
              }}
              onMouseDownEdge={() => {}}
              onClickDeleteEdge={() => {}}
            />
          )}

          {/* render all edges */}
          <For each={edges()}>
            {(edges: Edge) => (
              <EdgeComponent
                selected={selectedEdge() === edges.id}
                isNew={false}
                edgeLength={() => getPathLength()}
                typeOfEdge={edges.typeOfEdge}
                position={{
                  x0: edges.currStartPosition.get().x,
                  y0: edges.currStartPosition.get().y,
                  x1: edges.currEndPosition.get().x,
                  y1: edges.currEndPosition.get().y,
                }}
                onMouseDownEdge={() => handleOnMouseDownEdge(edges.id)}
                onClickDeleteEdge={() => handleOnDeleteEdge(edges.id)}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Board;
