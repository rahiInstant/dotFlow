import useStateContext from "../useStateContext";

const { setSelectedNode, setSelectedEdge, edges } = useStateContext();


export function handleOnMouseDownEdge(edgeId: string) {
  setSelectedNode(null);
  setSelectedEdge(edgeId);
  const edge = edges().find((edge) => edge.id === edgeId);
  if (edge) {
    console.log(edge.currStartPosition.get().x, edge.currStartPosition.get().y);
  }
}
