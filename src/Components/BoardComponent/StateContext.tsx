import { createContext } from "solid-js";
import {
  scale,
  setScale,
  draggable,
  isCtrlPressed,
  isSpacePressed,
  setDraggable,
  setIsCtrlPressed,
  setIsSpacePressed,
  edges,
  setEdges,
  newEdge,
  setNewEdge,
  busyIndex,
  setBusyIndex,
  edgeLength,
  setEdgeLength,
  isOpen,
  setIsOpen,
  inputRef,
  edgeEnd,
  setEdgeEnd,
  transform,
  setTransform,
  nodes,
  setNodes,
  preTransform,
  setPreTransform,
  selectedNode,
  setSelectedNode,
  pendingOutput,
  setPendingOutput,
  lastClickPosition,
  setLastClickPosition,
  isShowModal,
  setIsShowModal,
  setPositionButton,
  positionButton,
  isModalOpen,
  setIsModalOpen,
  isOpening,
  setIsOpening,
  typeOfVertex,
  setTypeOfVertex,
  currentFormConfig,
  setCurrentFormConfig,
  previousFormConfig,
  setPreviousFormConfig,
  isModalOpen2,
  setIsModalOpen2,
  isModalOpen3,
  setIsModalOpen3,
  credentialOptions,
  setCredentialOptions,
  selectedCredential,
  setSelectedCredential,
  formData,
  setFormData,
  settingConfig,
  setSettingConfig,
  clickedPosition,
  setClickedPosition,
  boardDragging,
  setBoardDragging,
  selectedEdge,
  setSelectedEdge,
  insideInput,
  setInsideInput,
  selectionBox,
  setSelectionBox,
  selectedNodesGroup,
  setSelectedNodesGroup,
  groupBoundingBox,
  setGroupBoundingBox,
  lastPointer,
  setLastPointer,
} from "./state";
import { CustomNode, Edge } from "../ButtonComponents/Types";

export const StateContext = createContext<{
  scale: () => number;
  setScale: (scale: number) => void;
  draggable: () => boolean;
  setDraggable: (draggable: boolean) => void;
  isCtrlPressed: () => boolean;
  isSpacePressed: () => boolean;
  setIsCtrlPressed: (isCtrlPressed: boolean) => void;
  setIsSpacePressed: (isSpacePressed: boolean) => void;
  edges: () => Edge[];
  setEdges: (edges: Edge[]) => void;
  newEdge: () => Edge | null;
  setNewEdge: (newEdge: Edge | null) => void;
  busyIndex: () => Array<number | null>;
  setBusyIndex: (busyIndex: Array<number | null>) => void;
  edgeLength: () => number;
  setEdgeLength: (edgeLength: number) => number;
  isOpen: () => boolean;
  setIsOpen: (isOpen: boolean) => void;
  inputRef: HTMLInputElement;
  edgeEnd: () => { x: number; y: number };
  setEdgeEnd: (edgeEnd: { x: number; y: number }) => void;
  transform: () => { x: number; y: number };
  setTransform: (
    transform:
      | { x: number; y: number }
      | ((prev: any) => { x: number; y: number })
  ) => void;
  nodes: () => CustomNode[];
  setNodes: (nodes: CustomNode[]) => void;
  preTransform: () => { x: number; y: number };
  setPreTransform: (
    preTransform:
      | { x: number; y: number }
      | ((prev: any) => { x: number; y: number })
  ) => void;
  selectedNode: () => string | null;
  setSelectedNode: (selectedNode: string | null) => void;
  pendingOutput: () => {
    nodeId: string;
    outputVertexIndex: number;
  } | null;
  setPendingOutput: (
    pendingOutput: {
      nodeId: string;
      outputVertexIndex: number;
    } | null
  ) => void;
  lastClickPosition: () => { x: number; y: number } | null;
  setLastClickPosition: (
    lastClickPosition: { x: number; y: number } | null
  ) => void;
  isShowModal: () => boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  positionButton: () => { x: number; y: number };
  setPositionButton: (positionButton: { x: number; y: number }) => void;
  isOpening: () => boolean;
  setIsOpening: (isOpening: boolean) => void;
  isModalOpen: () => boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen2: () => boolean;
  setIsModalOpen2: (isModalOpen: boolean) => void;
  isModalOpen3: () => boolean;
  setIsModalOpen3: (isModalOpen: boolean) => void;
  typeOfVertex: () => string;
  setTypeOfVertex: (typeOfVertex: string) => void;
  currentFormConfig: () => {
    name: string;
    id: string;
    title: string;
  };
  setCurrentFormConfig: (currentFormConfig: {
    name: string;
    id: string;
    title: string;
  }) => void;
  previousFormConfig: () => {
    name: string;
    id: string;
    title: string;
  };
  setPreviousFormConfig: (currentFormConfig: {
    name: string;
    id: string;
    title: string;
  }) => void;
  credentialOptions: () => any[];
  setCredentialOptions: (credentialOptions: any[]) => void;
  selectedCredential: () => any;
  setSelectedCredential: (selectedCredential: any) => void;
  formData: () => {
    [key: string]: {
      [key: string]: any;
    };
  };
  setFormData: (formData: {
    [key: string]: {
      [key: string]: any;
    };
  }) => void;
  settingConfig: () => {
    parameters: any[];
    settings: any[];
  } | null;
  setSettingConfig: (
    settingConfig: {
      parameters: any[];
      settings: any[];
    } | null
  ) => void;
  clickedPosition: () => { x: number; y: number };
  setClickedPosition: (
    pos:
      | { x: number; y: number }
      | ((prev: { x: number; y: number }) => { x: number; y: number })
  ) => void;

  boardDragging: () => boolean;
  setBoardDragging: (dragging: boolean | ((prev: boolean) => boolean)) => void;

  selectedEdge: () => string | null;
  setSelectedEdge: (
    edgeId: string | null | ((prev: string | null) => string | null)
  ) => void;

  insideInput: () => {
    nodeId: string;
    inputIndex: number;
    positionX: number;
    positionY: number;
  } | null;
  setInsideInput: (
    input:
      | {
          nodeId: string;
          inputIndex: number;
          positionX: number;
          positionY: number;
        }
      | null
      | ((
          prev: {
            nodeId: string;
            inputIndex: number;
            positionX: number;
            positionY: number;
          } | null
        ) => typeof input)
  ) => void;

  selectionBox: () => {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  setSelectionBox: (
    box:
      | { x: number; y: number; width: number; height: number }
      | null
      | ((
          prev: { x: number; y: number; width: number; height: number } | null
        ) => { x: number; y: number; width: number; height: number } | null)
  ) => void;

  selectedNodesGroup: () => string[];
  setSelectedNodesGroup: (
    ids: string[] | ((prev: string[]) => string[])
  ) => void;

  groupBoundingBox: () => {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  setGroupBoundingBox: (
    box:
      | { x: number; y: number; width: number; height: number }
      | null
      | ((
          prev: { x: number; y: number; width: number; height: number } | null
        ) => { x: number; y: number; width: number; height: number } | null)
  ) => void;

  lastPointer: () => { x: number; y: number } | null;
  setLastPointer: (
    pointer:
      | { x: number; y: number }
      | null
      | ((
          prev: { x: number; y: number } | null
        ) => { x: number; y: number } | null)
  ) => void;
}>({
  scale,
  setScale,
  draggable,
  setDraggable,
  isCtrlPressed,
  setIsCtrlPressed,
  isSpacePressed,
  setIsSpacePressed,
  edges,
  setEdges,
  newEdge,
  setNewEdge,
  busyIndex,
  setBusyIndex,
  edgeLength,
  setEdgeLength,
  isOpen,
  setIsOpen,
  inputRef,
  edgeEnd,
  setEdgeEnd,
  transform,
  setTransform,
  nodes,
  setNodes,
  preTransform,
  setPreTransform,
  selectedNode,
  setSelectedNode,
  pendingOutput,
  setPendingOutput,
  lastClickPosition,
  setLastClickPosition,
  isShowModal,
  setIsShowModal,
  positionButton,
  setPositionButton,
  isOpening,
  setIsOpening,
  isModalOpen,
  setIsModalOpen,
  typeOfVertex,
  setTypeOfVertex,
  currentFormConfig,
  setCurrentFormConfig,
  previousFormConfig,
  setPreviousFormConfig,
  isModalOpen2,
  setIsModalOpen2,
  isModalOpen3,
  setIsModalOpen3,
  credentialOptions,
  setCredentialOptions,
  selectedCredential,
  setSelectedCredential,
  formData,
  setFormData,
  settingConfig,
  setSettingConfig,
  clickedPosition,
  setClickedPosition,
  boardDragging,
  setBoardDragging,
  selectedEdge,
  setSelectedEdge,
  insideInput,
  setInsideInput,
  selectionBox,
  setSelectionBox,
  selectedNodesGroup,
  setSelectedNodesGroup,
  groupBoundingBox,
  setGroupBoundingBox,
  lastPointer,
  setLastPointer,
});
