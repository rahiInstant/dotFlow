import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";

export const editNodeDataEncoder = (editNodeData: any, nodeId: string) => {
  const { nodes } = useStateContext();


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
      assignment: "",
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
