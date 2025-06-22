export const switchNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameters } = data;
    const rules = parameters?.rules;
    const rulesIds: string[] = [];
    const rulesData: Record<string, string | Record<string, string | boolean>> =
      {};
    const onlyNameAndValueForMatching: Record<string, string[]> = {};
    const renameOutput: Record<string, boolean> = {};
    if (rules) {
      rules.forEach((item: any) => {
        const fieldId = `rule_${Math.random().toString(36).substring(2, 8)}`;
        rulesIds.push(fieldId);
        console.log(item);
        onlyNameAndValueForMatching[fieldId] = [];
        if ("leftValue" in item) {
          onlyNameAndValueForMatching[fieldId].push(item.leftValue);
          rulesData[`${fieldId}_name`] = item.leftValue;
        }
        if ("rightValue" in item) {
          onlyNameAndValueForMatching[fieldId].push(item.rightValue);
          rulesData[`${fieldId}_value`] = item.rightValue;
        }
        if ("operator" in item) {
          rulesData[`${fieldId}_operator`] = {
            type: item.operator.type,
            operation: item.operator.operation,
            singleValue: true,
          };
          // item.operator.type;
          // rulesData[`${fieldId}_operation`] = item.operator.operation;
        }
        if ("renameOutput" in item) {
          rulesData[`${fieldId}_isRename`] = item.renameOutput;
          renameOutput[fieldId] = item.renameOutput;
        }
        if ("outputKey" in item) {
          rulesData[`${fieldId}_renameOutput`] = item.outputKey;
        }
      });
    }
    return {
      mode: data?.parameters?.mode,
      rulesIds,
      rulesData,
      onlyNameAndValueForMatching,
      renameOutput,
    };
  }
};
