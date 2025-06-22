import {
  Component,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import style from "./style.module.css";
import { StateContext } from "./StateContext";
import useStateContext from "./useStateContext";
import { CustomNode } from "../ButtonComponents/Types";
// import { preTransform } from "./state";

interface ZoomProps {
  minScale?: number;
  maxScale?: number;
}

const Zoom: Component<ZoomProps> = ({ minScale = 0, maxScale = 2 }) => {
  const {
    setDraggable,
    setIsCtrlPressed,
    setIsSpacePressed,
    isCtrlPressed,
    isSpacePressed,
    scale,
    setScale,
    nodes,
    setTransform,
    setPreTransform,
    transform,
  } = useStateContext();

  onMount(() => {
    const boardElement = document.getElementById("pane");



    if (boardElement) {
      const handleWheel = (event: any) => {
        event.preventDefault();
        // console.log(event.deltaY);
        if (isCtrlPressed() || isSpacePressed()) {
          console.log("good");
          handleScale(
            event,
            () => {
              return scale() + event.deltaY * -0.0001;
            },
            "cursor"
          );
        } else {
          if (event.shiftKey) {
            // horizontal scroll by wheel
            setTransform((prev) => ({
              x: prev.x - event.deltaY * 0.5,
              y: prev.y,
            }));
          } else {
            // vertical scroll by wheel
            setTransform((prev) => ({
              x: prev.x,
              y: prev.y - event.deltaY * 0.5,
            }));
          }
        }
      };
      document.addEventListener("keyup", handleOnkeyUp);
      document.addEventListener("keydown", handleOnkeyDown);
      boardElement.addEventListener("wheel", handleWheel, { passive: false });

      onCleanup(() => {
        document.removeEventListener("keydown", handleOnkeyDown);
        document.removeEventListener("keyup", handleOnkeyUp);
        boardElement.removeEventListener("wheel", handleWheel);
      });
    }
  });

  //==================================================
  // measure current area of the node-edge network
  //==================================================

  function getBoundingBox(nodes: CustomNode[]) {
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, width: 0, height: 0 };
    }

    const minX = Math.min();
    const minY = Math.min();

    const maxX = Math.max(

    );

    const maxY = Math.max(

    );

    // console.log({ maxY, maxX });

    return {
      minX,
      minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  //==================================================
  // fit node-edge network in the viewport
  //==================================================
  function zoomToFit() {
    const pane = document.getElementById("pane");
    if (!pane) return;

    const bbox = getBoundingBox(nodes());
    if (!bbox) return;
    const padding = 80;
    // console.log(bbox)


    setScale();
    setTransform({ });
    setPreTransform({ });
  }

  //==================================================
  // cursor centric zoom in/out
  // center oriented zoom for zoom in/out button
  //==================================================
  const handleScale = (
    event: MouseEvent | WheelEvent,
    cb: () => number,
    mode: "cursor" | "center" = "cursor"
  ) => {
    const boardElement = document.getElementById("pane");
    if (!boardElement) return;

    event.preventDefault();



    setScale(newScale);
    setTransform({ x: newX, y: newY });
    setPreTransform({ x: newX, y: newY });
  };

  return (
    <div id="zoom-control" class={style.zoomControl}>
      <button
        title="fit"
        type="button"
        id="zoom-fit"
        class={style.zoomFit}
        onClick={() => zoomToFit()}
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="1.5em"
          width="1.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path>
        </svg>
      </button>
      <button
        title="in"
        type="button"
        id="zoom-in"
        class={style.zoomIn}
        onclick={(e) => handleScale(e, () => scale() + 0.01, "center")}
      >
        <svg
          fill="none"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          height="1.3em"
          width="1.3em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"
          ></path>
        </svg>
      </button>
      <button
        title="out"
        type="button"
        id="zoom-out"
        class={style.zoomOut}
        onclick={(e) =>
          handleScale(e, () => Math.max(0, scale() - 0.01), "center")
        }
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          height="1.3em"
          width="1.3em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"
          ></path>
        </svg>
      </button>
      <button
        title="reset"
        type="button"
        id="zoom-reset"
        class={
          scale() > 1 || scale() < 1 ? style.zoomReset : style.zoomResetHide
        }
        onclick={(e) =>
          handleScale(
            e,
            () => {
              setScale(1);
              setTransform({ x: 0, y: 0 });
              setPreTransform({ x: 0, y: 0 });
              return 1;
            },
            "center"
          )
        }
      >
        <svg
          fill="none"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="2em"
          width="2em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Zoom;
