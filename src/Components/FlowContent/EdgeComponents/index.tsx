import { Component, createEffect, createSignal } from "solid-js";
import style from "./style.module.css";
import useStateContext from "../../BoardComponent/useStateContext";

interface EdgeProps {
  selected: boolean;
  isNew: boolean;
  typeOfEdge: string;
  position: { x0: number; y0: number; x1: number; y1: number };
  onMouseDownEdge: () => void;
  onClickDeleteEdge: () => void;
}

const EdgeComponent: Component<EdgeProps> = (props) => {
  const [middlePoint, setMiddlePoint] = createSignal<{ x: number; y: number }>({
    x: props.position.x0 + (props.position.x1 - props.position.x0) / 2,
    y: props.position.y0 + (props.position.y1 - props.position.y0) / 2,
  });

  const [dx, setDx] = createSignal(0);

  createEffect(() => {
    const x0 = props.position.x0;
    const y0 = props.position.y0;
    const x1 = props.position.x1;
    const y1 = props.position.y1;
    const dx = x1 - x0;
    const dy = y1 - y0;
    // console.log(dy)

    // Check if we're using smooth step path
    const usingSmoothStep =
      props.typeOfEdge !== "dash" &&
      ((props.isNew && dx < 40) || (!props.isNew && dx < 40));

    let middleX, middleY;
  });

  const handleOnMouseDownEdge = (event: any) => {
    event.stopPropagation();
    props.onMouseDownEdge();
  };

  const handleOnMouseDeleteEdge = (event: any) => {
    event.stopPropagation();
    props.onClickDeleteEdge();
  };

  // smooth the middle of curved path
  const getSmoothCurvedOffset = () =>
    Math.abs(props.position.x1 - props.position.x0) / 2;

  //==================================================
  // calculate conditional path
  //==================================================
  const getPathString = (x0: number, y0: number, x1: number, y1: number) => {
    const dx = x1 - x0;
    setDx(dx);
    const dy = y1 - y0;
    const verticalBuffer = 120;
    const edgeDirectionChangeThreshold = 105;
    const offset = getSmoothCurvedOffset();

    // ******* logical 5 step path
    function getSmoothSteep() {
      return `

    `;
    }

    if (props.typeOfEdge === "dash") {
      return `M ${x0} ${y0} C ${x0} ${y0 + offset}, ${x1} ${
        y1 - offset
      }, ${x1} ${y1}`;
    } else {
      // ******* control new edge creation to avoid
      // ******* edge creation mismatch
      if (props.isNew && dx < 40) {
        return getSmoothSteep();
      } else if (!props.isNew && dx < 40) {
        return getSmoothSteep();
      }
      // ****** fallback to curve edge
      return `M ${x0} ${y0} C ${x0 + offset} ${y0}, ${
        x1 - offset
      } ${y1}, ${x1} ${y1}`;
    }
  };

  return (
    <svg class={style.wrapper}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 6 3 L 0 6 z" fill="#c3c9d5" />
        </marker>
      </defs>


      {/* Visible path for display */}
      <path
        class={`${props.isNew ? style.edgeNew : style.edge} ${
          props.typeOfEdge == "dash" ? style.edgeDash : ""
        } ${props.selected ? style.edgeSelected : ""}`}
        d={getPathString(
          props.position.x0,
          props.position.y0,
          props.position.x1,
          props.position.y1
        )}
        onMouseDown={handleOnMouseDownEdge}
        fill="none"
        marker-end="url(#arrowhead)"
        style="pointer-events: none;"
      />

      <g
        class={props.isNew ? style.deleteHidden : style.delete}
        transform={`translate(${middlePoint().x}, ${middlePoint().y})`}
        onMouseDown={handleOnMouseDeleteEdge}
      >
        <circle class={style.circle}></circle>
        <svg
          fill="currentColor"
          stroke-width="0"
          width="30"
          height="30"
          viewBox="210 240 1000 1000"
          style="overflow: visible;"
          class={style.icon}
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </g>
    </svg>
  );
};

export default EdgeComponent;
