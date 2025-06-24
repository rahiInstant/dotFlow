import { Component } from "solid-js";
import style from "./style.module.css";
import { customNodeProps } from "../../../ButtonComponents/Types";
import AiAgentIcon from "../../../ButtonComponents/AIAgentIcon";

const AiAgent: Component<customNodeProps> = (props) => {
  return (
    <div class={props.selected ? style.selectedNode : style.AiAgentNode}>
      <div class={style.AiAgentNodeIcon}>
        <AiAgentIcon/>
      </div>
      <div class={style.AiAgentNodeText}>
        <div class={style.AiAgentNodeTitle}>{props.title}</div>
        <div class={style.AiAgentNodeDescription}>Tools Agent</div>
      </div>
    </div>
  );
};

export default AiAgent;
