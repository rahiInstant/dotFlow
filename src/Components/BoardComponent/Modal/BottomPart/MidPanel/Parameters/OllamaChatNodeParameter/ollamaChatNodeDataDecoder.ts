export const ollamaChatNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameters } = data;
    return {
      model: parameters?.model,
      options: parameters?.options,
    };
  }
};
