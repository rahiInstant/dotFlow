const ModalConfig:{
  [key: string]: {
    parameters: any[];
    settings: any[];
  };
} = {
  chat: {
    parameters: [],
    settings: [],
  },
  filter: {
    parameters: [],
    settings: [],
  },

  "pg-vector": {
    parameters: [],
    settings: [],
  },
  "ollama-chat": {
    parameters: [],
    settings: [],
  },
  "gmail-trigger": {
    parameters: [],
    settings: [],
  },
  "create-draft": {
    parameters: [],
    settings: [],
  },
  embedding: {
    parameters: [],
    settings: [],
  },
  edit: {
    parameters: [],
    settings: [
      {
        type: "switch",
        label: "Duplicate item",
        tooltipText: "",
      },
      {
        type: "switch",
        label: "Always output data",
        tooltipText:
          "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
      },
      {
        type: "switch",
        label: "Execute once",
        tooltipText:
          "If active, the node executes only once, with data from the first item it receives",
      },
      {
        type: "switch",
        label: "Retry on fail",
        tooltipText: "If active, the node tries to execute again when it fails",
      },
      {
        type: "dropdown",
        label: "on Error",
        tooltipText: "Action to take when the node execution fails",
      },
    ],
  },
  switch: {
    parameters: [],
    settings: [
      {
        type: "switch",
        label: "Duplicate item",
        tooltipText: "",
      },
      {
        type: "switch",
        label: "Execute once",
        tooltipText:
          "If active, the node executes only once, with data from the first item it receives",
      },
      {
        type: "switch",
        label: "Retry on fail",
        tooltipText: "If active, the node tries to execute again when it fails",
      },
      {
        type: "dropdown",
        label: "on Error",
        tooltipText: "Action to take when the node execution fails",
      },
    ],
  },
  "ai-agent": {
    parameters: [],
    settings: [
      {
        type: "switch",
        label: "Duplicate item",
        tooltipText: "",
      },
      {
        type: "switch",
        label: "Always output data",
        tooltipText:
          "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
      },
      {
        type: "switch",
        label: "Execute once",
        tooltipText:
          "If active, the node executes only once, with data from the first item it receives",
      },
      {
        type: "switch",
        label: "Retry on fail",
        tooltipText: "If active, the node tries to execute again when it fails",
      },
      {
        type: "dropdown",
        label: "on Error",
        tooltipText: "Action to take when the node execution fails",
      },
    ],
  },
  "vector-store": {
    parameters: [],
    settings: [

    ],
  },

  "send-email": {
    parameters: [],
    settings: [
      {
        type: "switch",
        label: "Duplicate item",
        tooltipText: "",
      },
      {
        type: "switch",
        label: "Always output data",
        tooltipText:
          "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
      },
      {
        type: "switch",
        label: "Execute once",
        tooltipText:
          "If active, the node executes only once, with data from the first item it receives",
      },
      {
        type: "switch",
        label: "Retry on fail",
        tooltipText: "If active, the node tries to execute again when it fails",
      },
      {
        type: "dropdown",
        label: "on Error",
        tooltipText: "Action to take when the node execution fails",
      },
    ],
  },
};

export default ModalConfig;
