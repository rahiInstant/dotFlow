import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onMount,
  ParentComponent,
  Setter,
} from "solid-js";
import style from "./style.module.css";
import Vertex from "./Vertex";
import { customNodeProps } from "../../ButtonComponents/Types";
import PlayIcon from "./PlayIcon";
import PowerIcon from "./PowerIcon";
import DeleteIcon from "./DeleteIcon";
import OptionIcon from "./OptionIcon";
import useStateContext from "../../BoardComponent/useStateContext";
import ModalConfig from "./ModalConfig";
import PlusIcon from "./PlusIcon";

interface NodeProps {
  id: string;
  name: string;
  title: string;
  x: number;
  y: number;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  isDownVertex: boolean;
  isUpVertex: boolean;
  downVertexNumber: number;
  upVertexNumber: number;
  downVertexOrientation: string;
  downVertexIds: Array<string>;
  upVertexIds: Array<string>;
  // inputVertexIds: Record<string, HTMLElement | undefined>;
  // outputVertexIds: Record<string, HTMLElement | undefined>;
  inputVertexIds: Array<string>;
  outputVertexIds: Array<string>;
  busyIndex: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
  content: Component<customNodeProps>;
  selected: boolean;
  onMouseDownNode: (event: any, id: string) => void;
  onMouseDownOutput: (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
    vertexId: string,
    typeOfVertex: string
  ) => void;
  onMouseEnterInput: (
    inputPositionX: number,
    inputPositionY: number,
    // inputBuffX: number,
    // inputBuffY: number,
    nodeId: string,
    inputIndex: number
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
  onClickDeleteNode: (nodeId: string) => void;
}

const NodeMain: Component<NodeProps> = (props) => {
  const {
    setIsModalOpen,
    setCurrentFormConfig,
    setSettingConfig,
    currentFormConfig,
    setIsOpen,
    setPendingOutput,
    newEdge,
    edgeLength,
  } = useStateContext();
  let nodeRef: HTMLDivElement | undefined = undefined;
  // createEffect(() => {
  //   console.log("from nodeMain", props.outputVertexIds);
  // });

  function handleMouseDownOutput(
    outputRef: any,
    event: any,
    outputIndex: number,
    vertexId: string,
    typeOfEdge: string
  ) {
    // console.log(props.busyIndex.get());
    // console.log(typeOfEdge)
    event.stopPropagation();
    const { left, right, top, bottom } = outputRef.getBoundingClientRect();
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    // console.log({ centerX, centerY });
    props.onMouseDownOutput(
      centerX,
      centerY,
      props.id,
      outputIndex,
      vertexId,
      typeOfEdge
    );
  }

  return (
    <div
      id={props.id}
      class={props.selected ? style.nodeSelected : style.node}
      onDblClick={() => {
        setIsModalOpen(true);
        console.log(props.name);
        setCurrentFormConfig({
          name: props.name,
          id: props.id,
          title: props.title,
        });
        console.log(currentFormConfig());
        setSettingConfig(ModalConfig[props.name]);
      }}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onPointerDown={(event: any) => {
        event.stopPropagation();
        props.onMouseDownNode(event, props.id);
      }}
      ref={(el) => (nodeRef = el)}
    >
      <div class={style.functionWrapper}>
        <div id="function" class={style.function}>
          <div onClick={(e) => e.stopPropagation()}>
            <PlayIcon />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <PowerIcon />
          </div>
          <div
            onPointerDown={(event: any) => {
              event.stopPropagation();
              props.onClickDeleteNode(props.id);
            }}
          >
            <DeleteIcon />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <OptionIcon />
          </div>
        </div>
      </div>
      <div>
        <props.content selected={props.selected} title={props.title} />
      </div>
      {/* <TestNode selected={props.selected} onMouseDownNode={props.onMouseDownNode} id={props.id}/> */}
      <Vertex
        id={props.id}
        name={props.name}
        numberInputs={props.numberInputs}
        numberOutputs={0} //props.numberOutputs
        isInputVertex={props.isInputVertex}
        isOutputVertex={false} //props.isOutputVertex
        inputVertexIds={props.inputVertexIds}
        outputVertexIds={props.outputVertexIds}
        isDownVertex={props.isDownVertex}
        isUpVertex={props.isUpVertex}
        downVertexNumber={props.downVertexNumber}
        upVertexNumber={props.upVertexNumber}
        downVertexIds={props.downVertexIds}
        upVertexIds={props.upVertexIds}
        downVertexOrientation={props.downVertexOrientation}
        busyIndex={props.busyIndex}
        onMouseDownOutput={props.onMouseDownOutput}
        onMouseEnterInput={props.onMouseEnterInput}
        onMouseLeaveInput={props.onMouseLeaveInput}
      />
      {/* render all output vertex of a node */}
      {props.isOutputVertex && (
        <div class={style.outputsWrapper}>
          <For each={props.outputVertexIds}>
            {(id, index: Accessor<number>) => {
              let outputRef: any = null;
              return (
                <div
                  id={`output-${id}`}
                  class={style.output}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(true);
                    setPendingOutput({
                      nodeId: props.id,
                      outputVertexIndex: index(),
                    });
                  }}
                  onMouseDown={(event: any) =>
                    handleMouseDownOutput(
                      outputRef,
                      event,
                      index(),
                      id,
                      "solid"
                    )
                  }
                >
                  <div id={id} ref={outputRef} class={style.outputCircle}></div>
                  <div
                    classList={{
                      [style.plusLine]: true,
                      [style.plusLineHidden]:
                        (newEdge()?.outputVertexId == id &&
                          edgeLength() > 10) ||
                        props.busyIndex.get().includes(id),
                    }}
                  >
                    {props.numberOutputs > 1 && (
                      <div class={style.vertexNum}>{index()}</div>
                    )}
                    <div class={style.outputLine}></div>
                    <div class={style.outputPlus} id="plus">
                      <PlusIcon />
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      )}
    </div>
  );
};

export default NodeMain;
