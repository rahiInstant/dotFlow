import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";

export const pgVectorStoreNodeDataEncoder = (
  pgVectorStoreNodeData: any,
  nodeId: string
) => {
  console.log("from encoder", pgVectorStoreNodeData);
  const [blockOption, setBlockOption] = createSignal([]);

  

  const transformedOptionData = () => {
    const filterKey = ["distanceStrategy", "collection", "columnNames"];
    return ""
  };

  const { nodes } = useStateContext();
  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return node.currPosition.get();
    }
  };

  return {
    id: nodeId,
    name: "PGVector Store",
    description: "pgvectore store",
    type: "PGVectorStore",
    parameters: {
      credentials: {
        id: "a",
        name: "Postgres account",
        provider: "postgres",
        ctype: "db",
      },
      operationMode: pgVectorStoreNodeData?.operationMode,
      tableName: pgVectorStoreNodeData?.tableName,
      limit: pgVectorStoreNodeData?.limit,
      prompt: pgVectorStoreNodeData?.prompt,
      includeMetadata: pgVectorStoreNodeData?.includeMetadata,
      options: {
              collection: {
        values: {
          useCollection: pgVectorStoreNodeData?.useCollection,
          collectionName: pgVectorStoreNodeData?.collectionName,
          collectionTableName: pgVectorStoreNodeData?.collectionTableName,
        },      columnNames: {
        values: {
          idColumnName: pgVectorStoreNodeData?.idColumnName,
          vectorColumnName: pgVectorStoreNodeData?.vectorColumnName,
          contentColumnName: pgVectorStoreNodeData?.contentColumnName,
          metadataColumnName: pgVectorStoreNodeData?.metadataColumnName,
        },
      },
      },
    },
    position: getNodePosition(),
    inputs: [
      {
        id: "input",
        name: "Input",
        description: "data coming from Vector Store Tool",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "chatModel",
        name: "Output",
        description: "pgVector chat model for embeddings",
        type: "object",
      },
    ],
  };
}};
