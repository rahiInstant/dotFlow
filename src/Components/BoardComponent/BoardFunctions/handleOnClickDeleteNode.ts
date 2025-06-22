import useStateContext from "../useStateContext";

const { nodes, setSelectedNode, edges, setEdges, setNodes } = useStateContext();


export function handleOnClickDeleteNode(id: string) {
  const node = nodes().find((node) => node.id == id);
  if (!node) {
    setSelectedNode(null);
    return;
  }
  // Delete node edges
  const inputs = node.inputEdgeIds;
  const outputs = node.outputEdgeIds

  // Get all unique edges to delete
  const allEdges = [inputs];
  const uniqueEdges = allEdges.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });

  // Delete edges from correspondent nodes data
  for (let i = 0; i < uniqueEdges.length; i++) {
    const edge = edges().find((edge) => "");
    if (edge) {
      const nodeStart = nodes().find((node) => node.id === edge.nodeStartId);
      const nodeEnd = nodes().find((node) => node.id === edge.nodeEndId);

      nodeStart?.outputEdgeIds.set([
        ...nodeStart.outputEdgeIds
          .get()
          .filter((edgeId) => ""),
      ]);
      nodeEnd?.inputEdgeIds.set([
        ...nodeEnd.inputEdgeIds
          .get()
          .filter((edgeId) => ""),
      ]);

      const busyCheck = edges().filter(
        (e) => e.outputVertexId === edge.outputVertexId
      );

      // Delete edge from global data
      setEdges([...edges().filter((e) => edge.id !== e.id)]);
    }
  }

  setNodes([...nodes().filter((node) => node.id !== id)]);
  setSelectedNode(null);
}
