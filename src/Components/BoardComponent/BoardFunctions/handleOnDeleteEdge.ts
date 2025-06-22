import useStateContext from "../useStateContext";

const { edges, nodes, setEdges } = useStateContext();


export function handleOnDeleteEdge(edgeId: string) {
  const edge = edges().find((e) => e.id === edgeId);

  if (edge) {
    const nodeStart = nodes().find((n) => n.id == edge.nodeStartId);
    if (nodeStart) {
      nodeStart.outputEdgeIds.set([
        ...nodeStart.outputEdgeIds.get().filter((id) => id !== edgeId),
      ]);
    }

    const busyCheck = edges().filter(
      (e) => e.outputVertexId === edge.outputVertexId
    );

    // console.log(busyCheck, 'busyCheck');
    setEdges([...edges().filter((e) => e.id !== edgeId)]);
  }
}
