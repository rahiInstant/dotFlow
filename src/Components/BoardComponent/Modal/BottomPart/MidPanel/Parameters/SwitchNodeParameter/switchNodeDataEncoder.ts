import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";

export const switchNodeDataEncoder = (switchNodeData: any, nodeId: string) => {
  const transformRuleData = (data: any) => {
    const [fieldNo, setFieldNo] = createSignal(1);
    return Object.values(
      Object.entries(data)
        .filter(([k, v]) => k.startsWith("rule_"))
        .reduce((acc: any, cur: [string, any]) => {
          const [key, value] = cur;
          const parts = key.split("_");
          const baseKey = `${parts[0]}_${parts[1]}`;
          const field = parts[2];

          acc[baseKey] ??= {};

          if (!acc[baseKey].id) {
            acc[baseKey].id = fieldNo();
            setFieldNo((prev) => prev + 1);
          }

          if (field === "name") {
            acc[baseKey].leftValue = value;
          } else if (field === "value") {
            acc[baseKey].rightValue = value;
          } else if (field === "operator") {
            acc[baseKey].operator = {
              type: value.type,
              operation: value.operation,
              singleValue: true,
            };
          } else if (field === "isRename") {
            acc[baseKey].renameOutput = value;
          } else if (field === "renameOutput") {
            acc[baseKey].outputKey = value;
          }
          return acc;
        }, {})
    );
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
    name: "Switch",
    description: "Route items depending on defined expression or rules.",
    type: "SwitchNode",
    parameters: {
      mode: switchNodeData?.mode,
      rules: transformRuleData(switchNodeData),
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
