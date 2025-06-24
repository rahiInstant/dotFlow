import useStateContext from "../useStateContext";

const { nodes, setSelectedNode, edges, setEdges, setNodes } = useStateContext();

//=====================================================
// delete single node or many node at all
//=====================================================

export function handleOnClickDeleteNode(id: string) {
  const node = nodes().find((node) => node.id == id);
  if (!node) {
    setSelectedNode(null);
    return;
  }
  // Delete node edges
  const inputs = node.inputEdgeIds.get();
  const outputs = node.outputEdgeIds.get();

  // Get all unique edges to delete
  const allEdges = [...inputs, ...outputs];
  const uniqueEdges = allEdges.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

  // Delete edges from correspondent nodes data
  for (let i = 0; i < uniqueEdges.length; i++) {
    const edge = edges().find((edge) => edge.id === uniqueEdges[i]);
    if (edge) {
      const nodeStart = nodes().find((node) => node.id === edge.nodeStartId);
      const nodeEnd = nodes().find((node) => node.id === edge.nodeEndId);

      nodeStart?.outputEdgeIds.set([
        ...nodeStart.outputEdgeIds
          .get()
          .filter((edgeId) => edgeId !== uniqueEdges[i]),
      ]);
      nodeEnd?.inputEdgeIds.set([
        ...nodeEnd.inputEdgeIds
          .get()
          .filter((edgeId) => edgeId !== uniqueEdges[i]),
      ]);

      const busyCheck = edges().filter(
        (e) => e.outputVertexId === edge.outputVertexId
      );

      // ******** block vertex ********
      if (busyCheck.length <= 1 && nodeStart) {
        nodeStart.busyIndex.set([
          ...nodeStart.busyIndex
            .get()
            .filter((vertexId) => vertexId !== edge.outputVertexId),
        ]);
      }

      // Delete edge from global data
      setEdges([...edges().filter((e) => edge.id !== e.id)]);
    }
  }

  setNodes([...nodes().filter((node) => node.id !== id)]);
  setSelectedNode(null);
}
