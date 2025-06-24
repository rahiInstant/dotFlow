import { Component } from "solid-js";

const LeftArrow: Component<{}> = (props) => {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      style="overflow: visible; color: currentcolor;"
    >
      <path
        fill-rule="evenodd"
        d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export default LeftArrow;
