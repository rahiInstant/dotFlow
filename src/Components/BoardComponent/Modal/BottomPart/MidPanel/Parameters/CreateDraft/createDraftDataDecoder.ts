export const createDraftNodeDataDecoder = (data: any) => {
  if (data) {
    const { parameter } = data;
    const assignment = parameter?.assignment;
    const field: string[] = [];
    const fieldData: Record<string, string> = {};
    if (assignment) {
      assignment.forEach((item: any) => {
        const fieldId = `field_${Math.random().toString(36).substring(2, 8)}`;
        field.push(fieldId);
        console.log(item);
        if ("name" in item) {
          fieldData[`${fieldId}_name`] = item.name;
        }
        if ("value" in item) {
          fieldData[`${fieldId}_value`] = item.value;
        }
        if ("type" in item) {
          fieldData[`${fieldId}_type`] = item.type;
        }
      });
    }
    return {
      mode: data?.parameter?.mode,
      field,
      fieldData,
    };
  }
};
