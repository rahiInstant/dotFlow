import SwitchIcon from "./SwitchIcon";
import { nodeMarkType } from "./Types";
import ChatIcon from "./ChatIcon";
import EditIcon from "./EditIcon";
import FilterIcon from "./FilterIcon";
import AiAgent from "./AIAgentIcon";
import AiAgentIcon from "./AIAgentIcon";
import EmailIcon from "./EmailIcon";
import DatabaseIcon from "./DatabaseIcon";
import PgVectorIcon from "./PgVectorIcon";
import OllamaIcon from "./OllamaIcon";
import GmailIcon from "./GmailIcon";
import DraftIcon from "./DraftIcon";
import EmbeddingIcon from "./EmbeddingIcon";

export const nodeMark: nodeMarkType[] = [
  {
    name: "chat",
    title: "On Chat Message",
    description:
      " Runs the flow when a user send a chat message. For use with AI nodes.",
    icon: ChatIcon,
  },
  {
    name: "switch",
    title: "Switch",
    description: "Routes items depending on defined expression or rules",
    icon: SwitchIcon,
  },
  {
    name: "edit",
    title: "Edit",
    description: "Modify, Add or Remove item fields.",
    icon: EditIcon,
  },
  {
    name: "filter",
    title: "Filter",
    description: "Remove items matching a condition.",
    icon: FilterIcon,
  },
  {
    name: "ai-agent",
    title: "AI Agent",
    description:
      "Runs the flow when a user send a chat message. For use with AI nodes.",
    icon: AiAgentIcon,
  },
  {
    name: "customer-support-agent",
    title: "Customer Support Agent",
    description:
      "Runs the flow when a user send a chat message. For use with AI nodes.",
    icon: AiAgentIcon,
  },
  {
    name: "send-email",
    title: "Send Email",
    description: "Send email to a user.",
    icon: EmailIcon,
  },
  {
    name: "vector-store",
    title: "Vector Store",
    description: "Store and retrieve data from a vector database.",
    icon: DatabaseIcon,
  },
  {
    name: "pg-vector",
    title: "PgVector",
    description: "Answer questions with a vector store.",
    icon: PgVectorIcon,
  },
  {
    name: "ollama-chat",
    title: "Ollama Chat Model",
    description:
      "Runs the flow when a user send a chat message. For use with AI nodes.",
    icon: OllamaIcon,
  },
  {
    name: "gmail-trigger",
    title: "Gmail Trigger",
    description:
      "Runs the flow when a user send a chat message. For use with AI nodes.",
    icon: GmailIcon,
  },
  {
    name: "create-draft",
    title: "Create Draft",
    description: "Creates a draft with specified content and recipients.",
    icon: DraftIcon,
  },
  {
    name: "embedding",
    title: "Embed everything",
    description: "Generates text embeddings from input data for use in search or analysis.",
    icon: EmbeddingIcon,
  },
];
