import { Component } from "solid-js";

const PlusIcon: Component<{}> = (props) => {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      style="overflow: visible; color: currentcolor;"
    >
      <defs>
        <style></style>
      </defs>
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
      <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z"></path>
    </svg>
  );
};

export default PlusIcon;
