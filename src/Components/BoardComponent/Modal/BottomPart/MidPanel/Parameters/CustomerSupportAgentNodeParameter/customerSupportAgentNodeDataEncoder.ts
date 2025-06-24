import useStateContext from "../../../../../useStateContext";

export const aiAgentNodeDataEncoder = (
  aiAgentNodeData: any,
  nodeId: string
) => {
  const { nodes } = useStateContext();
  const extractParameterByKey = (keys: string[], booleanKeys: string[]) => {
    return keys.reduce((acc: Record<string, string | boolean>, key: string) => {
      if (key in aiAgentNodeData) {
        if (booleanKeys.includes(key)) {
          acc[key] = !!aiAgentNodeData[key];
        } else {
          acc[key] = aiAgentNodeData[key];
        }
      }
      return acc;
    }, {} as Record<string, string | boolean>);
  };

  const transformedOptionData = () => {
    const filterKey = [
      "systemMessage",
      "maxIterations",
      "returnIntermediateSteps",
      "passthroughBinaryImages",
    ];
    return extractParameterByKey(filterKey, [
      "returnIntermediateSteps",
      "passthroughBinaryImages",
    ]);
  };

  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return {
        x: Math.trunc(node.currPosition.get().x),
        y: Math.trunc(node.currPosition.get().y),
      };
    }
  };

  return {
    id: nodeId,
    name: "Customer Support Agent",
    description: "Customer Support Agent",
    type: "LangChainAgent",
    parameters: {
      agent: aiAgentNodeData?.agent,
      promptType: aiAgentNodeData?.sourceForPrompt,
      text:
        aiAgentNodeData?.promptDefineBelow ||
        aiAgentNodeData?.promptConnectedChatTriggerNode ||
        "",
      options: transformedOptionData(),
    },
    position: getNodePosition(),
    inputs: [
      {
        id: "input",
        name: "fromSwitch",
        description: "data coming from previous node",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "output",
        name: "agent output",
        description: "tools agent",
        type: "object",
      },
      {
        id: "chatModel",
        name: "toOllama",
        description: "data sending to LangchainAgent chatModel",
        type: "object",
      },
      {
        id: "tool1",
        name: "toTool1",
        description: "data sending to customerSuppertDocs tool",
        type: "tool",
      },
      {
        id: "tool2",
        name: "toTool2",
        description: "data sending to createDraft tool",
        type: "tool",
      },
    ],
  };
};
