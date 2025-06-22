import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import DatabaseIcon from "../../../ButtonComponents/DatabaseIcon";

const VectorStore: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.VectorStoreNode}>
      <div class=" flex flex-row justify-center items-center gap-2 px-6">
        <div class={style.VectorStoreNodeIcon}>
          <DatabaseIcon />
        </div>
        <div class={style.VectorStoreNodeText}>
          <div class={style.VectorStoreNodeTitle}>
            Answer questions with a vector store
          </div>
          {/* <div class={style.VectorStoreNodeDescription}>send</div> */}
        </div>
      </div>
    </div>
  );
};

export default VectorStore;
