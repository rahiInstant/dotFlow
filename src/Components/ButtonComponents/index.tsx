import { Accessor, Component, createSignal, For, onMount } from "solid-js";
import style from "./style.module.css";
import { nodeMarkType } from "./Types";
import useStateContext from "../BoardComponent/useStateContext";

interface SideBarProps {
  onClickAdd: (nodeName: string) => void;
  // onClickDelete: () => void;
  nodeMark: nodeMarkType[];
}

const SideBar: Component<SideBarProps> = (props) => {
  const { isOpen, setIsOpen } = useStateContext();
  let inputRef: HTMLInputElement;
  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById("sidebar-main");
    // const sidebarContent = document.getElementById("sidebar-content");
    const outputVertex = document.querySelectorAll('[id^="output-"]');
    // console.log(outputVertex);
    let clickedOnPlus = false;
    outputVertex.forEach((vertex) => {
      if (vertex.contains(event.target as Node)) {
        clickedOnPlus = true;
      }
    });

    if (sidebar && !sidebar.contains(event.target as Node) && !clickedOnPlus) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  const handleOnClickAdd = (event: any, nodeName: string) => {
    event.stopPropagation();
    // console.log(nodeName)
    props.onClickAdd(nodeName);
  };

  return (
    <aside id="sidebar-main" class={style.sidebarMain}>
      <button
        title="add"
        type="button"
        id="add-node"
        class={style.addNode}
        onclick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
          if (inputRef) {
            inputRef.focus();
          }
        }}
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1.5em"
          width="1.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
      <div
        id="sidebar-content"
        class={``}
        classList={{
          [style.sidebarContent]: true,
          [style.sidebarContentShow]: isOpen(),
          [style.sidebarContentHide]: !isOpen(),
        }}
      >
        {/* title */}
        <div id="sidebar-title" class={style.sidebarTitle}>
          What happens next?
        </div>
        {/* search */}
        <div class={style.searchContainer}>
          <div class={style.inputFieldContainer}>
            <div class={style.searchIcon}>
              <svg
                fill="currentColor"
                stroke-width="0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                height=".8em"
                width=".8em"
                style="overflow: visible; color: currentcolor;"
              >
                <path
                  fill="currentColor"
                  d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                ></path>
              </svg>
            </div>
            <input
              ref={(el) => (inputRef = el)}
              class={style.inputField}
              title="search"
              type="text"
              placeholder="Search nodes..."
            />
          </div>
        </div>
        {/* nodes */}
        <div class={style.nodeList}>
          <For each={props.nodeMark}>
            {(nodeMark: nodeMarkType, index: Accessor<number>) => {
              return (
                <div
                  class={
                    index() == 0 ? style.firstWrapper : style.restNodeWrapper
                  }
                  onclick={(event) => {
                    event.stopPropagation();

                    handleOnClickAdd(event, nodeMark.name);
                  }}
                >
                  <div class={style.node}>
                    <div class={style.nodeIcon}>
                      <nodeMark.icon />
                    </div>
                    <div>
                      <div class={style.title}>{nodeMark.title}</div>
                      <div class={style.description}>
                        {nodeMark.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
