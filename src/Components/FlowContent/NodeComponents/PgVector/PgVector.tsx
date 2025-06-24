import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import PgVectorIcon from "../../../ButtonComponents/PgVectorIcon";

const PgVector: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.pgVectorNode}>
      <div class=" flex flex-row justify-center items-center gap-2 px-6">
        <div class={style.pgVectorNodeIcon}>
          <PgVectorIcon/>
        </div>
        <div class={style.pgVectorNodeText}>
          <div class={style.pgVectorNodeTitle}>
            Postgres PgVector Store
          </div>
          {/* <div class={style.VectorStoreNodeDescription}>send</div> */}
        </div>
      </div>
    </div>
  );
};

export default PgVector;
