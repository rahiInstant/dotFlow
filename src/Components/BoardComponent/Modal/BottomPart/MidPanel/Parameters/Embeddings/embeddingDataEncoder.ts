import useStateContext from "../../../../../useStateContext";

export const embeddingNodeDataEncoder = (
  embeddingNodeData: any,
  nodeId: string
) => {
    const { nodes } = useStateContext();
  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return node.currPosition.get();
    }
  };
  return {
    id: nodeId,
    name: "Embeddings",
    description: "embeddings for PGVectore Store",
    type: "Ollama",
    parameters: {
      credentials: {
        id: "d0rvblltcbtlha4jl3n0",
        name: "Ollama account",
        provider: "ollama",
        ctype: "url",
      },
      model: embeddingNodeData?.model,
    },
    position: getNodePosition(),
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "embeddings vector as output",
        description: "turn text into vectors",
        type: "object",
      },
    ],
  };
};
