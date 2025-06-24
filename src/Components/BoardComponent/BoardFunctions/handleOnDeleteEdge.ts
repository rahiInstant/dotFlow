import useStateContext from "../useStateContext";

const { edges, nodes, setEdges } = useStateContext();

//=====================================================
// for delete the permanent edge (one by one)
//=====================================================

export function handleOnDeleteEdge(edgeId: string) {
  const edge = edges().find((e) => e.id === edgeId);

  if (edge) {
    const nodeStart = nodes().find((n) => n.id == edge.nodeStartId);
    if (nodeStart) {
      nodeStart.outputEdgeIds.set([
        ...nodeStart.outputEdgeIds.get().filter((id) => id !== edgeId),
      ]);
    }
    const nodeEnd = nodes().find((n) => n.id === edge.nodeEndId);
    if (nodeEnd) {
      nodeEnd.inputEdgeIds.set([
        ...nodeEnd.inputEdgeIds.get().filter((id) => id !== edgeId),
      ]);
    }

    const busyCheck = edges().filter(
      (e) => e.outputVertexId === edge.outputVertexId
    );

    // ******** release vertex ********
    if (busyCheck.length <= 1 && nodeStart) {
      nodeStart.busyIndex.set([
        ...nodeStart.busyIndex
          .get()
          .filter((vertexId) => vertexId !== edge.outputVertexId),
      ]);
    }
    // console.log(busyCheck, 'busyCheck');
    setEdges([...edges().filter((e) => e.id !== edgeId)]);
  }
}
