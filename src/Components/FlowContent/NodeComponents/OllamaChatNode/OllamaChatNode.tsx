import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import PgVectorIcon from "../../../ButtonComponents/PgVectorIcon";
import OllamaIcon from "../../../ButtonComponents/OllamaIcon";

const OllamaChatNode: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.ollamaChatNode}>
      <div class=" flex flex-row justify-center items-center gap-2 px-6">
        <div class={style.ollamaChatNodeIcon}>
          <OllamaIcon />
        </div>
        <div class={style.ollamaChatNodeText}>
          <div class={`${style.ollamaChatNodeTitle} text-nowrap`}>Ollama Chat Model</div>
          {/* <div class={style.VectorStoreNodeDescription}>send</div> */}
        </div>
      </div>
    </div>
  );
};

export default OllamaChatNode;
