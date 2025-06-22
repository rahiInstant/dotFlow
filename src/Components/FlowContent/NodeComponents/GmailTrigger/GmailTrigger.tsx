import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import GmailIcon from "../../../ButtonComponents/GmailIcon";

const GmailTrigger: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.gmailTriggerNode}>
      <div class={style.gmailTriggerNodeIcon}>
        <GmailIcon />
      </div>
      <div class={style.gmailTriggerNodeText}>
        <div class={style.gmailTriggerNodeTitle}>Gmail Trigger</div>
        <div class={style.gmailTriggerNodeDescription}>Gmail Trigger</div>
      </div>
    </div>
  );
};

export default GmailTrigger;
