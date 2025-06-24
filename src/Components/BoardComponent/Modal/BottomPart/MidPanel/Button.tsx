import { Component } from "solid-js";

const Button: Component<{
  title: string;
  width?: string;
  onClick?: () => void;
}> = ({ title, width = "w-auto", onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      //   variant="outline"
      class={`bg-[#2A2A40] border ${width} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`}
    >
      {title}
    </button>
  );
};

export default Button;
