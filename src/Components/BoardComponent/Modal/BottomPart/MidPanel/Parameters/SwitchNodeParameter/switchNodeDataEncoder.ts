import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";

export const switchNodeDataEncoder = (switchNodeData: any, nodeId: string) => {


  const { nodes } = useStateContext();
  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return node.currPosition.get();
    }
  };

  return {
    id: nodeId,
    name: "Switch",
    description: "Route items depending on defined expression or rules.",
    type: "SwitchNode",
    parameters: {
      mode: switchNodeData?.mode,
      rules: "",
    },
    position: getNodePosition(),
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
        id: "Yes",
        name: "rule 0",
        description: "langchainAgent2.input",
        type: "object",
      },
      {
        id: "No",
        name: "rule 1",
        description: "sendEmail1.input",
        type: "object",
      },
    ],
  };
};
