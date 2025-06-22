import { createSignal } from "solid-js";
import useStateContext from "../useStateContext";

const { setSelectedNode, transform, scale, setNewEdge } = useStateContext();


export function handleOnMouseDownOutput(
  outputPositionX: number,
  outputPositionY: number,
  nodeId: string,
  outputIndex: number,
  vertexId: string,
  typeOfEdge: string
) {
  // setEdgeDragging(true);
  // setTypeOfVertex(typeOfVertex);
  // console.log(typeOfVertex)

  setSelectedNode(null);
  const boardWrapperElement = document.getElementById("pane");
  // console.log(scale());
  // console.log("offset", offset().x, offset().y);
  if (boardWrapperElement) {
    const [prevEdgeStart, setPrevEdgeStart] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (outputPositionX - transform().x) / scale(),
      y: (outputPositionY - transform().y) / scale(),
    });
    const [prevEdgeEnd, setPrevEdgeEnd] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (outputPositionX - transform().x) / scale(),
      y: (outputPositionY - transform().y) / scale(),
    });
    const [currEdgeStart, setCurrEdgeStart] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (outputPositionX - transform().x) / scale(),
      y: (outputPositionY - transform().y) / scale(),
    });
    const [currEdgeEnd, setCurrEdgeEnd] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (outputPositionX - transform().x) / scale(),
      y: (outputPositionY - transform().y) / scale(),
    });

    setNewEdge({
      id: "",
      nodeStartId: nodeId,
      outputIndex: outputIndex,
      nodeEndId: "",
      inputIndex: -1,
      outputVertexId: vertexId,
      inputVertexId: "",
      typeOfEdge,
      prevStartPosition: { get: prevEdgeStart, set: setPrevEdgeStart },
      prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
      currStartPosition: { get: currEdgeStart, set: setCurrEdgeStart },
      currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
    });
  }
}
