import { ReproductiveDropDownOption } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";

const agentOptions: ReproductiveDropDownOption[] = [
  {
    value: "Tools Agent",
    label: "Tools Agent",
    description: `
        Utilizes structured tool schemas for precise and reliable tool selection and execution. Recommended for complex tasks requiring accurate and consistent tool usage, but only usable with models that support tool calling.`,
  },
  {
    value: "Conversational Agent",
    label: "Conversational Agent",
    description: `
        Describes tools in the system prompt and parses JSON responses for tool calls. More flexible but potentially less reliable than the Tools Agent. Suitable for simpler interactions or with models not supporting structured schemas.`,
  },
  {
    value: "OpenAI Functions Agent",
    label: "OpenAI Functions Agent",
    description: `
        Leverages OpenAI's function calling capabilities to precisely select and execute tools. Excellent for tasks requiring structured outputs when working with OpenAI models.`,
  },
  {
    value: "Plan and Execute Agent",
    label: "Plan and Execute Agent",
    description: `Creates a high-level plan for complex tasks and then executes each step. Suitable for multi-stage problems or when a strategic approach is needed.`,
  },
  {
    value: "ReAct Agent",
    label: "ReAct Agent",
    description: `Combines reasoning and action in an iterative process. Effective for tasks that require careful analysis and step-by-step problem-solving.`,
  },
  {
    value: "SQL Agent",
    label: "SQL Agent",
    description: `Specializes in interacting with SQL databases. Ideal for data analysis tasks, generating queries, or extracting insights from structured data.`,
  },
];

const sourceForPrompt: ReproductiveDropDownOption[] = [
  {
    value: "ConnectedChatTriggerNode",
    label: "Connected Chat Trigger Node",
    description: `Looks for an input field called 'chatInput' that is coming from a directly connected Chat Trigger.`,
    children: [],
  },
  {
    value: "Define below",
    label: "DefineBelow",
    description: `Use an expression to reference data in previous nodes or enter static text.`,
    children: [],
  },
];

const optionStore: FilterOption[] = [
  {
    label: "System Message",
    value: "systemMessage",
    content: {
      type: "textArea",
      title: "System Message",
      value: "You are a helpful assistant.",
      name: "systemMessage",
      toolTipText:
        "The message that will be sent to the agent before the conversation starts.",
    },
  },
  {
    label: "Max Iterations",
    value: "maxIterations",
    content: {
      type: "input",
      title: "Max Iterations",
      value: "10",
      name: "maxIterations",
      toolTipText:
        "The maximum number of iterations the agent will run before stopping.",
    },
  },
  {
    label: `Return Intermediate Steps`,
    value: "returnIntermediateSteps",
    content: {
      type: "switch",
      title: "Return Intermediate Steps",
      name: "returnIntermediateSteps",
      toolTipText:
        "Whether or not the output should include intermediate steps the agent took",
    },
  },
  {
    label: "Automatically Passthrough Binary Images",
    value: "passthroughBinaryImages",
    content: {
      type: "switch",
      title: "Automatically Passthrough Binary Images",
      name: "passthroughBinaryImages",
      toolTipText:
        "Whether or not binary images should be automatically passed through to the agent as image type messages.",
    },
  }
];

const dataSourceConfig: DropDownNOption[] = [
  {
    label: "MySQL",
    value: "mysql",
    description: "Connected to a MySQL Database"
  },
  {
    label: "Postgres",
    value: "postgres",
    description: "Connected to a Postgres Database"
  },
  {
    label: "SQLite",
    value: "sqlite",
    description: "Use SQLite by connecting a database file as binary input."
  }
];

export { agentOptions, sourceForPrompt, optionStore, dataSourceConfig };
