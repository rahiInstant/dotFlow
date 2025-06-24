import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import EmailIcon from "../../../ButtonComponents/EmailIcon";

const SendEmail: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.EmailNode}>
      <div class={style.mailIcon}>
        <EmailIcon />
      </div>
      <div class={style.mailNodeText}>
        <div class={style.mailTitle}>Send Email</div>
        <div class={style.mailDescription}>send</div>
      </div>
    </div>
  );
};

export default SendEmail;
