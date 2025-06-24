import { Component } from "solid-js";
import BoardComponent from "../Components/BoardComponent";
import { node } from "../Components/BoardComponent/nodes";

const Test: Component = (props) => {
  
  return <BoardComponent node={node}/>;
};

export default Test; 