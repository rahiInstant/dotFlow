import { Component } from "solid-js";

const DownArrow: Component<{}> = (props) => {
  return (
    <svg
      fill="none"
      stroke-width="2"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style="overflow: visible; color: currentcolor;"
    >
      <path d="M6 9 12 15 18 9"></path>
    </svg>
  );
};

export default DownArrow;
