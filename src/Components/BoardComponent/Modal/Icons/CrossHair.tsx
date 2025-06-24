import { Component } from "solid-js";

const CrossHair: Component<{}> = (props) => {
  return (
    <svg
      fill="none"
      stroke-width="2"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-crosshair"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="overflow: visible; color: currentcolor;"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
      <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
      <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
      <path d="M9 12l6 0"></path>
      <path d="M12 9l0 6"></path>
    </svg>
  );
};

export default CrossHair;
