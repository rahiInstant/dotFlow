export const vectorStoreNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameters } = data;
    return {
      dataName: parameters?.name,
      dataDescription: parameters?.description,
      limit: parameters?.limit,
    };
  }
};
