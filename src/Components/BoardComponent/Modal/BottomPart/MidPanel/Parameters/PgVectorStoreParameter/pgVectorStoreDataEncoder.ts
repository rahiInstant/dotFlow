import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";

export const pgVectorStoreNodeDataEncoder = (
  pgVectorStoreNodeData: any,
  nodeId: string
) => {
  console.log("from encoder", pgVectorStoreNodeData);
  const [blockOption, setBlockOption] = createSignal([]);

  const transformMetadata = (data: any) => {
    const [fieldNo, setFieldNo] = createSignal(1);
    return Object.values(
      Object.entries(data)
        .filter(([k, v]) => k.startsWith("metadata_"))
        .reduce((acc: any, curr: [string, unknown]) => {
          const [key, value] = curr;
          const parts = key.split("_");
          const baseKey = `${parts[0]}_${parts[1]}`;
          const field = parts[2];

          acc[baseKey] ??= {};

          if (!acc[baseKey].id) {
            acc[baseKey].id = fieldNo();
            setFieldNo((prev) => prev + 1);
          }

          if (field === "name") {
            acc[baseKey].name = value;
          } else if (field === "value") {
            acc[baseKey].value = value;
          }
          return acc;
        }, {})
    );
  };

  const metadata = transformMetadata(pgVectorStoreNodeData);
  const extractParameterByKey = (
    keys: string[],
    booleanKeys?: string[],
    keysHasChildObject?: string[],
    childObject?: Record<string, string[]>,
    keyHasOperation?: string[],
    operation?: Record<string, any>
  ) => {
    return keys.reduce(
      (acc: Record<string, string | boolean | object>, key: string) => {
        if (key in pgVectorStoreNodeData) {
          if (booleanKeys?.includes(key)) {
            acc[key] = !!pgVectorStoreNodeData[key];
          } else if (keysHasChildObject?.includes(key)) {
            const values: Record<string, any> = {};
            if (childObject && childObject[key]) {
              childObject[key].forEach((childKey) => {
                console.log(
                  "child key from decoder",
                  childKey,
                  pgVectorStoreNodeData[childKey]
                );
                values[childKey] = pgVectorStoreNodeData[childKey];
              });
            }
            acc[key] = { values };
          }
          // else if(keyHasOperation?.includes(key)) {
          //   acc[key] = operation?.[key]
          // }
          else {
            acc[key] = pgVectorStoreNodeData[key];
          }
        }
        return acc;
      },
      {} as Record<string, string | boolean | object>
    );
  };

  const transformedOptionData = () => {
    const filterKey = ["distanceStrategy", "collection", "columnNames"];
    return extractParameterByKey(filterKey, [], ["collection", "columnNames"], {
      collection: ["useCollection", "collectionName", "collectionTableName"],
      columnNames: [
        "idColumnName",
        "vectorColumnName",
        "contentColumnName",
        "metadataColumnName",
      ],
    });
  };

  const options = {
    ...(metadata?.length > 0 && { metadataFilter: metadata }),
    ...(pgVectorStoreNodeData?.useCollection && {
      collection: {
        values: {
          useCollection: pgVectorStoreNodeData?.useCollection,
          collectionName: pgVectorStoreNodeData?.collectionName,
          collectionTableName: pgVectorStoreNodeData?.collectionTableName,
        },
      },
    }),
    ...(pgVectorStoreNodeData?.idColumnName && {
      columnNames: {
        values: {
          idColumnName: pgVectorStoreNodeData?.idColumnName,
          vectorColumnName: pgVectorStoreNodeData?.vectorColumnName,
          contentColumnName: pgVectorStoreNodeData?.contentColumnName,
          metadataColumnName: pgVectorStoreNodeData?.metadataColumnName,
        },
      },
    }),
    ...(pgVectorStoreNodeData?.distanceStrategy && {
      distanceStrategy: pgVectorStoreNodeData?.distanceStrategy,
    }),
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
      options: options,
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
};
