import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import PgVectorIcon from "../../../ButtonComponents/PgVectorIcon";
import OllamaIcon from "../../../ButtonComponents/OllamaIcon";
import EmbeddingIcon from "../../../ButtonComponents/EmbeddingIcon";

const Embedding: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.embeddingNode}>
      <div class=" flex flex-row justify-center items-center gap-2 px-6">
        <div class={style.embeddingNodeIcon}>
          <EmbeddingIcon/>
        </div>
        <div class={style.embeddingNodeText}>
          <div class={`${style.embeddingNodeTitle} text-nowrap`}>Embedding</div>
          {/* <div class={style.VectorStoreNodeDescription}>send</div> */}
        </div>
      </div>
    </div>
  );
};

export default Embedding;
