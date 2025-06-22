export const embeddingNodeDataDecoder = (data: any) => {
  if (data) {
    const {parameters} = data
    return {
      model: parameters?.model,
    };
  }
};
