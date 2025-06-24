import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { CustomNode, Edge } from "../ButtonComponents/Types";

export const [draggable, setDraggable] = createSignal<boolean>(false);
export const [isCtrlPressed, setIsCtrlPressed] = createSignal<boolean>(false);
export const [isSpacePressed, setIsSpacePressed] = createSignal<boolean>(false);
export const [scale, setScale] = createSignal<number>(1);
export const [edges, setEdges] = createSignal<Edge[]>([]);
export const [newEdge, setNewEdge] = createSignal<Edge | null>(null);
export const [busyIndex, setBusyIndex] = createSignal<Array<number | null>>([]);
export const [edgeLength, setEdgeLength] = createSignal<number>(0);
export let [isOpen, setIsOpen] = createSignal<boolean>(false);
export let inputRef: HTMLInputElement;
export const [edgeEnd, setEdgeEnd] = createSignal<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
export const [transform, setTransform] = createSignal({ x: 0, y: 0 });
export const [nodes, setNodes] = createSignal<CustomNode[]>([]);
export const [preTransform, setPreTransform] = createSignal({ x: 0, y: 0 });
export const [selectedNode, setSelectedNode] = createSignal<string | null>(
  null
);

export const [pendingOutput, setPendingOutput] = createSignal<{
  nodeId: string;
  outputVertexIndex: number;
} | null>(null);

export const [lastClickPosition, setLastClickPosition] = createSignal<{
  x: number;
  y: number;
} | null>(null);
export const [isShowModal, setIsShowModal] = createSignal<boolean>(false);
export const [positionButton, setPositionButton] = createSignal<{
  x: number;
  y: number;
}>({ x: 0, y: 0 });
export const [isOpening, setIsOpening] = createSignal<boolean>(false);
export const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
export const [isModalOpen2, setIsModalOpen2] = createSignal<boolean>(false);
export const [isModalOpen3, setIsModalOpen3] = createSignal<boolean>(false);
export const [typeOfVertex, setTypeOfVertex] = createSignal<string>("");
export const [settingConfig, setSettingConfig] = createSignal<{
  parameters: any[];
  settings: any[];
} | null>(null);
export const [currentFormConfig, setCurrentFormConfig] = createSignal<{
  name: string;
  id: string;
  title: string;
}>({
  name: "",
  id: "",
  title: "",
});
export const [previousFormConfig, setPreviousFormConfig] = createSignal<{
  name: string;
  id: string;
  title: string;
}>({
  name: "",
  id: "",
  title: "",
});
export const [credentialOptions, setCredentialOptions] = createSignal([]);
export const [selectedCredential, setSelectedCredential] = createSignal(null);
export const [formData, setFormData] = createSignal<{
  [key: string]: {
    [key: string]: any;
  };
}>({});

//////////////

export const [clickedPosition, setClickedPosition] = createSignal<{
  x: number;
  y: number;
}>({ x: -1, y: -1 });
export const [boardDragging, setBoardDragging] = createSignal<boolean>(false);
export const [selectedEdge, setSelectedEdge] = createSignal<string | null>(
  null
);
export const [insideInput, setInsideInput] = createSignal<{
  nodeId: string;
  inputIndex: number;
  positionX: number;
  positionY: number;
} | null>(null);
export const [selectionBox, setSelectionBox] = createSignal<null | {
  x: number;
  y: number;
  width: number;
  height: number;
}>(null);
export const [selectedNodesGroup, setSelectedNodesGroup] = createSignal<
  string[]
>([]);
export const [groupBoundingBox, setGroupBoundingBox] = createSignal<null | {
  x: number;
  y: number;
  width: number;
  height: number;
}>(null);
export const [lastPointer, setLastPointer] = createSignal<{
  x: number;
  y: number;
} | null>(null);





