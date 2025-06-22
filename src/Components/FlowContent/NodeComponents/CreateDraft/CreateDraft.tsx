import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import DraftIcon from "../../../ButtonComponents/DraftIcon";

const CreateDraft: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.createDraftNode}>
      <div class=" flex flex-row justify-center items-center gap-2 px-6">
        <div class={style.createDraftNodeIcon}>
          <DraftIcon/>
        </div>
        <div class={style.createDraftNodeText}>
          <div class={`${style.createDraftNodeTitle} text-nowrap`}>Create Draft</div>
          <div class={style.createDraftNodeDescription}>Create Draft</div>
        </div>
      </div>
    </div>
  );
};

export default CreateDraft;
