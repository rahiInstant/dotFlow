import useStateContext from "../../../../../useStateContext";

const transFormPollTimeData = (data: any) =>
  Object.values(
    Object.entries(data)
      .filter(([k, v]) => k.startsWith("pollTime_"))
      .reduce((acc: any, curr: [string, any]) => {
        const [key, value] = curr;
        const parts = key.split("_");
        const baseKey = `${parts[0]}_${parts[1]}`;
        const field = parts[2];

        acc[baseKey] ??= {};

        if (!field) {
          acc[baseKey].mode = value;
        } else if (field === "Hour") {
          acc[baseKey].hour = value;
        } else if (field === "Minute") {
          acc[baseKey].minute = value;
        } else if (field === "Day of Month") {
          acc[baseKey].dayOfMonth = value;
        } else if (field === "Weekday") {
          acc[baseKey].weekday = value;
        } else if (field === "Value") {
          acc[baseKey].value = value;
        } else if (field === "Unit") {
          acc[baseKey].unit = value;
        } else if (field === "Cron Expression") {
          acc[baseKey].cronExpression = value;
        }
        return acc;
      }, {})
  );

export const gmailNodeDataEncoder = (gmailData: any, nodeId?: string) => {
  const { nodes } = useStateContext();
  console.log("from encoder top", gmailData);

  /**
   *
   * @param keys - all keys
   * @param booleanKeys - keys which hold boolean value
   * @returns {Record<string, string | boolean>}
   */

  const extractParameterByKey = (keys: string[], booleanKeys: string[]) => {
    return keys.reduce((acc: Record<string, string | boolean>, key: string) => {
      if (key in gmailData) {
        if (booleanKeys.includes(key)) {
          acc[key] = !!gmailData[key];
        } else {
          acc[key] = gmailData[key];
        }
      }
      return acc;
    }, {} as Record<string, string | boolean>);
  };

  const transformedFilterData = () => {
    const filterKey = [
      "includeSpamTrash",
      "includeDrafts",
      "labelIds",
      "q",
      "readStatus",
      "sender",
    ];
    return extractParameterByKey(filterKey, [
      "includeSpamTrash",
      "includeDrafts",
    ]);
  };

  console.log("transformed filter", transformedFilterData());

  const transformOptionData = () => {
    const optionKey = ["downloadAttachments", "attachmentPrefix"];
    return extractParameterByKey(optionKey, ["downloadAttachments"]);
  };

  console.log("transformed option", transformOptionData());

  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return node.currPosition.get();
    }
  };

  return {
    id: nodeId,
    name: "Gmail Trigger",
    description: "Gmail reader",
    type: "GmailReader",
    parameters: {
      credentials: {
        id: "d0esgqltcbthv6156tjg",
        name: "Gmail Account",
        provider: "gmail",
        ctype: "oauth2",
      },
      pollTimes: transFormPollTimeData(gmailData),
      simple: !!gmailData?.simplify,
      filters: transformedFilterData(),
      options: transformOptionData(),
    },
    position: getNodePosition(),
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "Last Email",
        description: "Read last email from your gmail inbox",
        type: "object",
      },
    ],
  };
};

// {
//   includeSpamTrash: !!gmailData?.includeSpamTrash,
//   includeDrafts: !!gmailData?.includeDrafts,
//   labelIds: gmailData?.labelNamesOrIds || "",
//   q: gmailData?.Search || "",
//   readStatus: gmailData?.readStatus || "",
//   sender: gmailData?.sender || "",
// },
