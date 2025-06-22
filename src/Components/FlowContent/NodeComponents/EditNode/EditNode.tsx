import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";

const EditNode: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.node}>
      <div class={style.switchIcon}>
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="3.5em"
          width="3.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path>
        </svg>
      </div>
      <div class={style.switchNodeText}>
        <div class={style.switchTitle}>Edit Fields</div>
        <div class={style.switchDescription}>manual</div>
      </div>
    </div>
  );
};

export default EditNode;
