import useStateContext from "../../../../../useStateContext";

export const vectorStoreNodeDataEncoder = (
  vectorStoreNodeData: any,
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
    name: "Vector Store Tool",
    description: "vectore store tool customerSuppertDocs",
    type: "VectoreStoreTool",
    parameters: {
      name: vectorStoreNodeData?.dataName,
      description: vectorStoreNodeData?.dataDescription,
      limit: vectorStoreNodeData?.limit,
    },
    position: getNodePosition(),
    inputs: [
      {
        id: "input",
        name: "Input",
        description: "data coming from pg vector store node",
        type: "tool",
      },
    ],
    outputs: [
      {
        id: "chatModel",
        name: "toChatModel3",
        description: "data sending to ollama model 3",
        type: "object",
      },
      {
        id: "vectorStore",
        name: "toPgVectorStore",
        description: "data sending to pgvector",
        type: "object",
      },
    ],
  };
};
