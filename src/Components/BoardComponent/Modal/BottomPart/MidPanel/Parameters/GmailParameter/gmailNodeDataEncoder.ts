import useStateContext from "../../../../../useStateContext";



export const gmailNodeDataEncoder = (gmailData: any, nodeId?: string) => {
  const { nodes } = useStateContext();
  console.log("from encoder top", gmailData);
  const transformedFilterData = () => {
    const filterKey = [
      "includeSpamTrash",
      "includeDrafts",
      "labelIds",
      "q",
      "readStatus",
      "sender",
    ];
    return ""
  };

  console.log("transformed filter", transformedFilterData());

  const transformOptionData = () => {
    const optionKey = ["downloadAttachments", "attachmentPrefix"];
    return ""
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
      pollTimes: "",
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
