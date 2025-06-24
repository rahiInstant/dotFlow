import useStateContext from "../../../../../useStateContext";

export const createDraftNodeDataEncoder = (
  createDraftNodeData: any,
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
    name: "createDraft",
    description: "create gmail Draft",
    type: "GmailTool",
    parameters: {
      credentials: {
        id: "d0esgqltcbthv6156tjg",
        name: "Gmail Account",
        provider: "gmail",
        ctype: "oauth2",
      },
      descriptionType: createDraftNodeData?.toolDescription,
      toolDescription: createDraftNodeData?.description,
      resource: createDraftNodeData?.resource,
      operation: createDraftNodeData?.operation,
      subject: createDraftNodeData?.subject,
      emailType: createDraftNodeData?.emailType,
      message: createDraftNodeData?.message,
      options: {
        threadId: createDraftNodeData?.threadId,
        sendTo: createDraftNodeData?.sendRepliesTo,
      },
    },
    position: getNodePosition(),
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "createDraft",
        description: "gmail tool output",
        type: "tool",
      },
    ],
  };
};
