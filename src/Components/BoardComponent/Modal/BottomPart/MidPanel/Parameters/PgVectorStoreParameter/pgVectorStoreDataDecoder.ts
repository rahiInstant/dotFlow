export const pgVectorNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameters } = data;
    const metadataIds: string[] = [];
    const metadataFilters: Record<string, string> = {};
    if (parameters) {
      const metadata = parameters?.options?.metadataFilter;
      if (metadata) {
        metadata.forEach((item: any) => {
          console.log('inside metadata Item loop',item);
          const metadataId = `metadata_${Math.random()
            .toString(36)
            .substring(2, 8)}`;
          metadataIds.push(metadataId);
          if ("name" in item) {
            metadataFilters[`${metadataId}_name`] = item.name;
          }
          if ("value" in item) {
            metadataFilters[`${metadataId}_value`] = item.value;
          }
        });
      }
    }
    console.log("from decoder", metadataFilters, "\n metadata ids", metadataIds);

    return {
      operationMode: parameters.operationMode,
      tableName: parameters.tableName,
      limit: parameters.limit,
      prompt: parameters.prompt,
      includeMetadata: parameters.includeMetadata,
      metadataIds,
      metadataFilter: metadataFilters || {},
      options: parameters.options,
    };
  }
};

// operationMode
// tableName
// limit
// prompt
// includeMetaData
