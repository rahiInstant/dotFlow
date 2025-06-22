import useStateContext from "../../../../../useStateContext";

export const aiAgentNodeDataEncoder = (
  aiAgentNodeData: any,
  nodeId: string
) => {
  const { nodes } = useStateContext();


  const transformedOptionData = () => {
    const filterKey = [
      "systemMessage",
      "maxIterations",
      "returnIntermediateSteps",
      "passthroughBinaryImages",
    ];
    return ""
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
    name: "AI Agent",
    description: "AI Agent",
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
        name: "fromEdit",
        description: "data coming from previous node",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "output",
        name: "agent output",
        description: "reAct agent",
        type: "object",
      },
      {
        id: "chatModel",
        name: "from ollamaChatModel1",
        description: "data coming from ollama node",
        type: "object",
      },
    ],
  };
};
