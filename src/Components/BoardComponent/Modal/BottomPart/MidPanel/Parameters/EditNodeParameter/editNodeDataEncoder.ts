import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";

export const editNodeDataEncoder = (editNodeData: any, nodeId: string) => {
  const { nodes } = useStateContext();
  const transformFieldData = (data: any) => {
    const [fieldNo, setFieldNo] = createSignal(1);
    return Object.values(
      Object.entries(data)
        .filter(([k, v]) => k.startsWith("field_"))
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
            acc[baseKey].name = value as string;
          } else if (field === "value") {
            acc[baseKey].value = value as string;
          } else if (field === "type") {
            acc[baseKey].type = value as string;
          }
          return acc;
        }, {})
    );
  };

  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return node.currPosition.get();
    }
  };

  return {
    id: nodeId,
    name: "Edit Fields",
    description: "Modify,add,or remove item fields.",
    type: "EditNode",
    parameters: {
      mode: editNodeData?.mode,
      assignment: transformFieldData(editNodeData),
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "Data to filter",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "Output",
          description: "Outcode of the node after process",
          type: "object",
        },
      ],
    },
    position: getNodePosition(),
  };
};
