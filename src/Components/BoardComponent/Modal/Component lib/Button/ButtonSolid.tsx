import { Component } from "solid-js";

interface ButtonSolidProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonSolid: Component<ButtonSolidProps> = (props) => {
  return <div onClick={props.onClick} class="text-[#dfe0e3] mt-5 select-none bg-[#383649] text-[15px] font-light text-center py-1.5 rounded-md cursor-pointer hover:bg-[#3d3b4e]">{props.label}</div>;
};

export default ButtonSolid;
