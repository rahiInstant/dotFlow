export const aiAgentNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameters } = data;
    return {
      agent: parameters?.agent,
      sourceForPrompt: parameters?.promptType,
      promptDefineBelow: parameters?.text,
      promptConnectedChatTriggerNode: parameters?.text,
      options: parameters?.options,
    };
  }
};
