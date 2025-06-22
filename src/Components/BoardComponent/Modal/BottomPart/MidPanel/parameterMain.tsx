import { Component, createSignal, Show } from "solid-js";
import style from "./style.module.css";
import useStateContext from "../../../useStateContext";
import GmailNodeParameter from "./Parameters/GmailParameter/GmailParameter";
import AiAgentNodeParameter from "./Parameters/AiAgentNodeParameter/AiAgentNodeParameter";
import OllamaChatNodeParameter from "./Parameters/OllamaChatNodeParameter/OllamaChatNodeParameter";
import SendEmailParameter from "./Parameters/SendEmailParameter/SendEmailParameter";
import EditNodeParameter from "./Parameters/EditNodeParameter/EditNodeParameter";
import SwitchNodeParameter from "./Parameters/SwitchNodeParameter/SwitchNodeParameter";
import VectorStoreParameter from "./Parameters/VectorStoreParameter/VectorStoreParameter";
import PgVectorStoreParameter from "./Parameters/PgVectorStoreParameter/PgVectorStoreParameter";
import Embeddings from "./Parameters/Embeddings/EmbeddingsParameter";
import EmbeddingsParameter from "./Parameters/Embeddings/EmbeddingsParameter";
import CreateDraft from "../../../../FlowContent/NodeComponents/CreateDraft/CreateDraft";
import CreateDraftParameter from "./Parameters/CreateDraft/CreateDraftParameter";
import CustomerSupportAgentNodeParameter from "./Parameters/CustomerSupportAgentNodeParameter/CustomerSupportAgentParameter";

const Parameters: Component = () => {
  const { currentFormConfig } = useStateContext();
  // console.log("currentFormConfig", currentFormConfig().id, currentFormConfig().name);

  const handleNewFormInstance = () => {
    return currentFormConfig().id.split("_")[1];
  };

  const [formInstances, setFormInstances] = createSignal<
    Record<
      string,
      {
        [key: string]: any;
      }
    >
  >();

  // const centralFormList = {
  //   edit: EditNodeParameter,
  // }

  return (
    <div
      id="parameter"
      class={`mt-0 px-5 py-4 `}
      classList={{ [style.param]: true }}
    >
      <Show when={currentFormConfig().name === "switch"}>
        <SwitchNodeParameter />
      </Show>
      <Show when={currentFormConfig().name === "edit"}>
        <EditNodeParameter />
      </Show>
      <Show when={currentFormConfig().name === "gmail-trigger"}>
        <GmailNodeParameter />
        {/* <GmailNodeParameterTK/> */}
      </Show>
      <Show when={currentFormConfig().name === "ai-agent"}>
        <AiAgentNodeParameter />
      </Show>
      <Show when={currentFormConfig().name === "customer-support-agent"}>
        <CustomerSupportAgentNodeParameter />
      </Show>
      <Show when={currentFormConfig().name === "ollama-chat"}>
        <OllamaChatNodeParameter />
      </Show>
      <Show when={currentFormConfig().name === "send-email"}>
        <SendEmailParameter />
      </Show>
      <Show when={currentFormConfig().name === "vector-store"}>
        <VectorStoreParameter />
      </Show>
      <Show when={currentFormConfig().name === "pg-vector"}>
        <PgVectorStoreParameter />
      </Show>
      <Show when={currentFormConfig().name === "embedding"}>
        <EmbeddingsParameter />
      </Show>
      <Show when={currentFormConfig().name === "create-draft"}>
        <CreateDraftParameter />
      </Show>
    </div>
  );
};

export default Parameters;
