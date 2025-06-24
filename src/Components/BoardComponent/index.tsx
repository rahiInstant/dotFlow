import {
  Accessor,
  Component,
  createEffect,
  createRoot,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  ParentComponent,
  Setter,
} from "solid-js";
import style from "./style.module.css";
import Zoom from "./Zoom";
import SideBar from "../ButtonComponents/index";
import Board from "./Board";
import StateContextProvider from "./StateContextProvider";
import { nodeMark } from "../ButtonComponents/nodeMark";
import {
  CustomNode,
  customNodeProps,
  Edge,
  nodeType,
  outputVertexDuty,
} from "../ButtonComponents/Types";
import useStateContext from "./useStateContext";
import Background from "./Background";
import Modal from "./Modal";
import BottomPart from "./Modal/BottomPart/BottomPart";
import TopPart from "./Modal/TopPart/TopPart";
import SubModal from "./Modal2";
import Modal3 from "./Modal3/Modal3";
import DataCapture from "./AllConverter/DataCapture";
import { jsonToDomExtended } from "./AllConverter/domToJsonToDom";
import SendData from "./AllConverter/SendData";
import {
  handleMouseDownOutput,
  // handleOnPointerDown,
} from "../FlowContent/NodeComponents/NodeFunctions/AllFunctionForNodeAndVertex";

interface DotFlowProps {
  node: nodeType;
}

const BoardComponent: ParentComponent<DotFlowProps> = ({ node }) => {
  // const [nodes, setNodes] = createSignal<CustomNode[]>([]);

  const [baseNode, setBaseNode] = createSignal<CustomNode>();

  const {
    nodes,
    setNodes,
    selectedNode,
    setSelectedNode,
    pendingOutput,
    lastClickPosition,
    setEdges,
    edges,
    transform,
    scale,
    setIsModalOpen,
    isModalOpen,
    isModalOpen2,
    setIsModalOpen2,
    isModalOpen3,
    setIsModalOpen3,
    currentFormConfig,
    setPreviousFormConfig,
    setFormData,
    formData,
  } = useStateContext();

  const nodeMaker = (
    nodeId: string,
    nodeName: string,
    inputVertexIds?: any,
    outputVertexIds?: any,
    downVertexIds?: any,
    upVertexIds?: any,
    position?: { x: number; y: number }
  ) => {
    let nodeX = window.innerWidth / 2;
    let nodeY = window.innerHeight / 2;
    if (position) {
      nodeX = position.x;
      nodeY = position.y;
    }
    const selected = selectedNode();
    const pending = pendingOutput();
    const lastClick = lastClickPosition();

    function getOffsetPositionFromNode(
      nodeId: string,
      offsetX = 200,
      offsetY = 0
    ): { x: number; y: number } | null {
      const selectedNodeData = nodes().find((n) => n.id === nodeId);
      // setBaseNode(baseNode);
      setBaseNode(selectedNodeData);
      if (!selectedNodeData) return null;

      const pos = selectedNodeData.currPosition.get();
      return {
        x: pos.x + offsetX,
        y: pos.y + offsetY,
      };
    }

    if (selected) {
      let position = getOffsetPositionFromNode(selected);
      if (position) {
        nodeX = position.x;
        nodeY = position.y;
      }
    } else if (pending) {
      let position = getOffsetPositionFromNode(pending.nodeId);
      if (position) {
        nodeX = position.x;
        nodeY = position.y;
      }
    } else if (lastClick) {
      nodeX = (lastClick.x - transform().x) / scale();
      nodeY = (lastClick.y - transform().y) / scale();
    }

    const [inputsEdgeIds, setInputsEdgeIds] = createSignal<string[]>([]);
    const [outputsEdgeIds, setOutputsEdgeIds] = createSignal<string[]>([]);
    const [busyIndex, setBusyIndex] = createSignal<string[]>([]);

    const [nodePrev, setNodePrev] = createSignal<{ x: number; y: number }>({
      x: nodeX,
      y: nodeY,
    });
    const [nodeCurr, setNodeCurr] = createSignal<{ x: number; y: number }>({
      x: nodeX,
      y: nodeY,
    });
    createRoot(() => {
      return setNodes([
        ...nodes(),
        {
          id: nodeId,
          name: nodeName,
          title: node[nodeName].title,
          numberInputs: node[nodeName].numberInputs,
          numberOutputs: node[nodeName].numberOutputs,
          isInputVertex: node[nodeName].isInputVertex,
          isOutputVertex: node[nodeName].isOutputVertex,
          inputVertexIds: inputVertexIds,
          outputVertexIds: outputVertexIds,
          isDownVertex: node[nodeName].isDownVertex || false,
          isUpVertex: node[nodeName].isUpVertex || false,
          downVertexNumber: node[nodeName].downVertexNumber || 0,
          upVertexNumber: node[nodeName].upVertexNumber || 0,
          downVertexIds: downVertexIds,
          upVertexIds: upVertexIds,
          downVertexOrientation: node[nodeName].downVertexOrientation,
          busyIndex: { get: busyIndex, set: setBusyIndex },
          content: node[nodeName].content,
          prevPosition: { get: nodePrev, set: setNodePrev },
          currPosition: { get: nodeCurr, set: setNodeCurr },
          inputEdgeIds: { get: inputsEdgeIds, set: setInputsEdgeIds },
          outputEdgeIds: { get: outputsEdgeIds, set: setOutputsEdgeIds },
        },
      ]);
    });
  };

  function autoConnectEdge(outputVertexIndex: number = 0) {
    console.log(baseNode());
    const newNode = nodes()[nodes().length - 1];
    let centerX;
    let centerY;
    let centerX2;
    let centerY2;
    let typeOfEdge;
    if (baseNode()?.isDownVertex && newNode.isUpVertex) {
      let downVertexRef = document.getElementById(
        baseNode()!.downVertexIds[outputVertexIndex]
      );
      const { left, right, top, bottom } =
        downVertexRef!.getBoundingClientRect();
      centerX = left + Math.abs(left - right) / 2;
      centerY = top + Math.abs(top - bottom) / 2;
      const upVertexRef = document.getElementById(newNode.upVertexIds[0]);
      const {
        left: left2,
        right: right2,
        top: top2,
        bottom: bottom2,
      } = upVertexRef!.getBoundingClientRect();
      centerX2 = left2 + Math.abs(left2 - right2) / 2;
      centerY2 = top2 + Math.abs(top2 - bottom2) / 2;
      typeOfEdge = "dash";
    } else {
      let outputVertexRef = document.getElementById(
        baseNode()!.outputVertexIds[outputVertexIndex]
      );
      // console.log(outputVertexRef);

      const { left, right, top, bottom } =
        outputVertexRef!.getBoundingClientRect();
      centerX = left + Math.abs(left - right) / 2;
      centerY = top + Math.abs(top - bottom) / 2;
      const inputVertexRef = document.getElementById(newNode.inputVertexIds[0]);
      const {
        left: left2,
        right: right2,
        top: top2,
        bottom: bottom2,
      } = inputVertexRef!.getBoundingClientRect();
      centerX2 = left2 + Math.abs(left2 - right2) / 2;
      centerY2 = top2 + Math.abs(top2 - bottom2) / 2;
      typeOfEdge = "solid";
    }

    const [prevEdgeStart, setPrevEdgeStart] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX - transform().x) / scale(),
      y: (centerY - transform().y) / scale(),
    });
    const [prevEdgeEnd, setPrevEdgeEnd] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX2 - transform().x) / scale(),
      y: (centerY2 - transform().y) / scale(),
    });
    const [currEdgeStart, setCurrEdgeStart] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX - transform().x) / scale(),
      y: (centerY - transform().y) / scale(),
    });
    const [currEdgeEnd, setCurrEdgeEnd] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX2 - transform().x) / scale(),
      y: (centerY2 - transform().y) / scale(),
    });

    const edgeId = `edge_${baseNode()!.id}_${outputVertexIndex}_${
      newNode.id
    }_${0}`;

    baseNode()!.outputEdgeIds.set([...baseNode()!.outputEdgeIds.get(), edgeId]);

    newNode.inputEdgeIds.set([...newNode.inputEdgeIds.get(), edgeId]);

    setEdges([
      ...edges(),
      {
        id: edgeId,
        nodeStartId: baseNode()!.id,
        nodeEndId: newNode.id,
        inputIndex: 0,
        typeOfEdge: typeOfEdge,
        outputIndex: outputVertexIndex,
        inputVertexId: newNode.inputVertexIds[0],
        outputVertexId: baseNode()!.outputVertexIds[outputVertexIndex],
        prevStartPosition: { get: prevEdgeStart, set: setPrevEdgeStart },
        prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
        currStartPosition: { get: currEdgeStart, set: setCurrEdgeStart },
        currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
      },
    ]);

    // ******** block vertex ********
    baseNode()!.busyIndex.set([
      ...baseNode()!.busyIndex.get(),
      baseNode()!.outputVertexIds[outputVertexIndex],
    ]);
  }

  //==================================================
  // inject node in the board,
  // dynamic node injection also, node inject based on
  // ---> random screen cord
  // ---> selected node
  // ---> pending trigger (when click on output vertex side panel trigger)
  // ---> last click position
  //==================================================

  function handleOnClickAddNode(
    nodeName: string,
    Id?: string,
    position?: { x: number; y: number }
  ) {
    const inputVertexIds = [
      ...Array(Number(node[nodeName].numberInputs))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const outputVertexIds = [
      ...Array(Number(node[nodeName].numberOutputs))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const downVertexIds = [
      ...Array(Number(node[nodeName].downVertexNumber || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];

    const upVertexIds = [
      ...Array(Number(node[nodeName].upVertexNumber || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const nodeId = `node_${Math.random()
      .toString(36)
      .substring(2, 8)}_${nodeName}`;
    // **** node injection

    nodeMaker(
      nodeId,
      nodeName,
      inputVertexIds,
      outputVertexIds,
      downVertexIds,
      upVertexIds
    );

    //=======================================================
    // connect edge of selected/pending node with new node
    //=======================================================
    const newNode = nodes()[nodes().length - 1];

    if (selectedNode()) {
      baseNode()?.isOutputVertex && newNode.isInputVertex
        ? autoConnectEdge()
        : "";
    } else if (pendingOutput()) {
      baseNode()?.isOutputVertex && newNode.isInputVertex
        ? autoConnectEdge(pendingOutput()!.outputVertexIndex)
        : "";
    }

    if (nodes().length <= 1 && nodes()[0].isOutputVertex) {
      setSelectedNode(nodes()[0].id);
    } else if (
      (baseNode()?.isOutputVertex || baseNode()?.isDownVertex) &&
      newNode.isInputVertex
    ) {
      setSelectedNode(newNode.id);
    }
  }

  const handleOnPasteAddNode = (json: any) => {
    const [currentNode, setCurrentNode] = createSignal();
    const nodeNames: any = {
      Switch: "switch",
      "Edit Fields": "edit",
      "AI Agent": "ai-agent",
      "customer-support-agent": "customer-support-agent",
      "Vector Store Tool": "vector-store",
      "PGVector Store": "pg-vector",
      "Ollama Chat Model": "ollama-chat",
      "Gmail Trigger": "gmail-trigger",
      Embeddings: "embedding",
    };

    console.log(json);
    const nodes = json.nodes;
    const edges = json.connections;
    nodes.forEach((element: any) => {
      if (node[nodeNames[element.name]].isOutputVertex) {
        const outputEdge = edges.filter(
          (item: any) => item.sourceNodeId === element.id
        );
        const inputEdge = edges.filter(
          (item: any) => item.targetNodeId === element.id
        );
        const sourceOutputVertexIds: any = [];
        const sourceInputVertexIds: any = [];
        const targetNodes: any = [];
        if (outputEdge.length > 0) {
          // nodeMaker(element.id, nodeNames[element.name], );
          outputEdge.forEach((oEdge: any) => {
            sourceOutputVertexIds.push(oEdge.sourcePortId);
            const targetNodeId = oEdge.targetNodeId;
            const targetNode = nodes.find(
              (item: any) => item.id === targetNodeId
            );
            targetNodes.push(targetNode);
          });
        }

        if (inputEdge.length > 0) {
          inputEdge.forEach((iEdge: any) => {
            sourceInputVertexIds.push(iEdge.sourcePortId);
          });
        }
        const sourceNodeId = nodes().find(
          (item: any) => item.id === element.id
        );
        if (!sourceNodeId) {
          nodeMaker(
            element.id,
            nodeNames[element.name],
            [],
            [],
            [],
            [],
            element.position
          );
        }

        targetNodes.forEach((element: any) => {
          const targetNodeId = nodes().find(
            (item: any) => item.id === element.id
          );
          if (!targetNodeId) {
            nodeMaker(
              element.id,
              nodeNames[element.name],
              [],
              [],
              [],
              [],
              element.position
            );
          }
        });

        // setSelectedNode(element.id);
        // targetNodes.forEach((item: any) => {
        //   const outputEdge = edges.filter(
        //     (item: any) => item.sourceNodeId === element.id
        //   );
        //   const targetOutputVertexIds: any = [];
        //   const targetNodes2: any = [];
        //   if (outputEdge.length > 0) {
        //     // nodeMaker(element.id, nodeNames[element.name], );
        //     outputEdge.forEach((oEdge: any) => {
        //       targetOutputVertexIds.push(oEdge.sourcePortId);
        //       const targetNodeId = oEdge.targetNodeId;
        //       const targetNode = nodes.find(
        //         (item: any) => item.id === targetNodeId
        //       );
        //       targetNodes2.push(targetNode);
        //     });
        //   }
        //   if (hasDownVertex.includes(nodeNames[item.name])) {
        //     targetNodes2.forEach((element: any) => {
        //       if (hasUpVertex.includes(nodeNames[element.name])) {
        //       }
        //     });
        //     node[nodeNames[item.name]].downVertexNumber;
        //   } else {
        //     const inputEdge = edges.filter(
        //       (item: any) => item.targetNodeId === element.id
        //     );
        //     const targetInputVertexIds: any = [];

        //     if (inputEdge.length > 0) {
        //       inputEdge.forEach((iEdge: any) => {
        //         targetInputVertexIds.push(iEdge.sourcePortId);
        //       });
        //     }
        //   }
        // });
      }
    });
  };

  const handleModalClose = () => {
    const modal = document.getElementById("modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
      setIsModalOpen(false);
    }
  };

  // const handleOnSubmit = (e: any) => {
  //   e.preventDefault();
  //   const value = JSON.parse(e.target.dataCapture.value);
  //   const submittedFormsData: { [key: string]: any } = {};
  //   const nodeNames = {
  //     Switch: "switch",
  //     "Edit Fields": "edit",
  //     "AI Agent": "ai-agent",
  //     "customer-support-agent": "customer-support-agent",
  //     "Vector Store Tool": "vector-store",
  //     "PGVector Store": "pg-vector",
  //     "Ollama Chat Model": "ollama-chat",
  //     "Gmail Trigger": "gmail-trigger",
  //     Embeddings: "embedding",
  //   };

  //   value.nodes.forEach((element: any) => {
  //     handleOnClickAddNode(nodeNames[element.name], element.id);
  //     submittedFormsData[element.id] = element;
  //   });

  //   setFormData(submittedFormsData);

  //   console.log(submittedFormsData);

  //   console.log(value);
  // };

  interface NodeMakerProps {
    nodeId: string;
    nodeName: string;
    restNumberInput?: number;
    restNumberOutput?: number;
    restDownVertexNumber?: number;
    restUpVertexNumber?: number;
    inputVertexIds?: Array<string>;
    outputVertexIds?: Array<string>;
    downVertexIds?: Array<string>;
    upVertexIds?: Array<string>;
    currentPosition: { x: number; y: number };
  }

  const [horizontalCurrentNode, setHorizontalCurrentNode] =
    createSignal<CustomNode | null>(null);
  const [verticalCurrentNode, setVerticalCurrentNode] =
    createSignal<CustomNode | null>(null);

  const makingNode = (NodeMakerProps: NodeMakerProps) => {
    let nodeX = NodeMakerProps.currentPosition.x;
    let nodeY = NodeMakerProps.currentPosition.y;
    const restInputVertexIds = [
      ...Array(Number(NodeMakerProps.restNumberInput || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const restOutputVertexIds = [
      ...Array(Number(NodeMakerProps.restNumberOutput || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const restDownVertexIds = [
      ...Array(Number(NodeMakerProps.restDownVertexNumber || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];

    const restUpVertexIds = [
      ...Array(Number(NodeMakerProps.restUpVertexNumber || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];

    const [inputsEdgeIds, setInputsEdgeIds] = createSignal<string[]>([]);
    const [outputsEdgeIds, setOutputsEdgeIds] = createSignal<string[]>([]);
    const [busyIndex, setBusyIndex] = createSignal<string[]>([]);

    const [nodePrev, setNodePrev] = createSignal<{
      x: number;
      y: number;
    }>({
      x: nodeX,
      y: nodeY,
    });
    const [nodeCurr, setNodeCurr] = createSignal<{
      x: number;
      y: number;
    }>({
      x: nodeX,
      y: nodeY,
    });

    const finalInputVertexIds = [
      ...(NodeMakerProps.inputVertexIds ?? []),
      ...restInputVertexIds,
    ];
    const finalOutputVertexIds = [
      ...(NodeMakerProps.outputVertexIds ?? []),
      ...restOutputVertexIds,
    ];
    const finalDownVertexIds = [
      ...(NodeMakerProps.downVertexIds ?? []),
      ...restDownVertexIds,
    ];
    const finalUpVertexIds = [
      ...(NodeMakerProps.upVertexIds ?? []),
      ...restUpVertexIds,
    ];

    createRoot(() => {
      return setNodes([
        ...nodes(),
        {
          id: NodeMakerProps.nodeId,
          name: NodeMakerProps.nodeName,
          title: node[NodeMakerProps.nodeName].title,
          numberInputs: finalInputVertexIds.length,
          numberOutputs: finalOutputVertexIds.length,
          downVertexNumber: finalDownVertexIds.length || 0,
          upVertexNumber: finalUpVertexIds.length || 0,
          isInputVertex: node[NodeMakerProps.nodeName].isInputVertex,
          isOutputVertex: node[NodeMakerProps.nodeName].isOutputVertex,
          isDownVertex: node[NodeMakerProps.nodeName].isDownVertex || false,
          isUpVertex: node[NodeMakerProps.nodeName].isUpVertex || false,
          inputVertexIds: finalInputVertexIds,
          outputVertexIds: finalOutputVertexIds,
          downVertexIds: finalDownVertexIds,
          upVertexIds: finalUpVertexIds,
          downVertexOrientation:
            node[NodeMakerProps.nodeName].downVertexOrientation,
          busyIndex: { get: busyIndex, set: setBusyIndex },
          content: node[NodeMakerProps.nodeName].content,
          prevPosition: { get: nodePrev, set: setNodePrev },
          currPosition: { get: nodeCurr, set: setNodeCurr },
          inputEdgeIds: { get: inputsEdgeIds, set: setInputsEdgeIds },
          outputEdgeIds: { get: outputsEdgeIds, set: setOutputsEdgeIds },
        },
      ]);
    });
  };

  const makingEdge = (
    sourceNode: CustomNode,
    targetNode: CustomNode,
    sourceVertexId: string,
    targetVertexId: string,
    typeOfEdge: string
  ) => {
    const newNode = nodes()[nodes().length - 1];
    const prevVertexRef = document.getElementById(sourceVertexId);
    const { left, right, top, bottom } = prevVertexRef!.getBoundingClientRect();
    let centerX = left + Math.abs(left - right) / 2;
    let centerY = top + Math.abs(top - bottom) / 2;
    const currentVertexRef = document.getElementById(targetVertexId);
    const {
      left: left2,
      right: right2,
      top: top2,
      bottom: bottom2,
    } = currentVertexRef!.getBoundingClientRect();
    let centerX2 = left2 + Math.abs(left2 - right2) / 2;
    let centerY2 = top2 + Math.abs(top2 - bottom2) / 2;
    const [prevEdgeStart, setPrevEdgeStart] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX - transform().x) / scale(),
      y: (centerY - transform().y) / scale(),
    });
    const [prevEdgeEnd, setPrevEdgeEnd] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX2 - transform().x) / scale(),
      y: (centerY2 - transform().y) / scale(),
    });
    const [currEdgeStart, setCurrEdgeStart] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX - transform().x) / scale(),
      y: (centerY - transform().y) / scale(),
    });
    const [currEdgeEnd, setCurrEdgeEnd] = createSignal<{
      x: number;
      y: number;
    }>({
      x: (centerX2 - transform().x) / scale(),
      y: (centerY2 - transform().y) / scale(),
    });
    const edgeId = `edge_${sourceNode.id}_${0}_${targetNode.id}_${0}`;
    sourceNode!.outputEdgeIds.set([...sourceNode!.outputEdgeIds.get(), edgeId]);
    targetNode.inputEdgeIds.set([...targetNode.inputEdgeIds.get(), edgeId]);

    setEdges([
      ...edges(),
      {
        id: edgeId,
        nodeStartId: sourceNode.id,
        nodeEndId: targetNode.id,
        inputIndex: 0,
        typeOfEdge: typeOfEdge,
        outputIndex:
          sourceNode?.outputVertexIds.findIndex((v) => v === sourceVertexId) ||
          0,
        inputVertexId: targetVertexId,
        outputVertexId: sourceVertexId,
        prevStartPosition: {
          get: prevEdgeStart,
          set: setPrevEdgeStart,
        },
        prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
        currStartPosition: {
          get: currEdgeStart,
          set: setCurrEdgeStart,
        },
        currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
      },
    ]);

    sourceNode.busyIndex.set([...sourceNode.busyIndex.get(), sourceVertexId]);
  };

  onMount(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedText = e.clipboardData?.getData("text/plain");

      if (pastedText) {
        const workFlowJSON = JSON.parse(pastedText);
        // handleOnPasteAddNode(workFlowJSON);
        const submittedFormsData: { [key: string]: any } = {};
        const nodeNames = {
          Switch: "switch",
          "Edit Fields": "edit",
          "AI Agent": "ai-agent",
          "Customer Support Agent": "customer-support-agent",
          "Vector Store Tool": "vector-store",
          "PGVector Store": "pg-vector",
          "Ollama Chat Model": "ollama-chat",
          "Gmail Trigger": "gmail-trigger",
          Embeddings: "embedding",
        };

        console.log(workFlowJSON);
        const parseNodes = workFlowJSON.nodes;
        const parseEdges = workFlowJSON.connections;

        parseNodes.forEach((element: any) => {
          submittedFormsData[element.id] = element;
        });
        setFormData(submittedFormsData);
        parseNodes.forEach((element: any, index: number) => {
          // setFormData(element);
          // console.log(element.position);
          // console.log(element)

          //////////////
          // Only for node which have output vertex
          ////////////
          interface NodeMakerProps {
            nodeId: string;
            nodeName: string;
            restNumberInput?: number;
            restNumberOutput?: number;
            restDownVertexNumber?: number;
            restUpVertexNumber?: number;
            inputVertexIds?: Array<string>;
            outputVertexIds?: Array<string>;
            downVertexIds?: Array<string>;
            upVertexIds?: Array<string>;
            currentPosition: { x: number; y: number };
          }

          /**
           * which node have output vertex.
           *
           */
          if (node[nodeNames[element.name]].isOutputVertex) {
            if (node[nodeNames[element.name]].isDownVertex) {
              // console.log("down", element);
              const makingNodeParam: any = {};
              makingNodeParam["nodeId"] = element.id;
              makingNodeParam["nodeName"] = nodeNames[element.name];
              makingNodeParam["currentPosition"] = element.position;

              const outputEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.sourceNodeId === element.id) {
                  const targetNode = parseNodes.find(
                    (node: any) => node.id === item.targetNodeId
                  );
                  console.log;
                  if (!node[nodeNames[targetNode.name]].isUpVertex) {
                    if (!outputEdge.includes(item)) {
                      outputEdge.push(item);
                    }
                  }
                }
              });
              // const outputVertex = outputEdge.map(
              //   (item: any) => item.sourcePortId
              // );

              const outputVertex: Array<any> = [];
              outputEdge.forEach((item: any) => {
                if (!outputVertex.includes(item.sourcePortId)) {
                  outputVertex.push(item.sourcePortId);
                }
              });

              if (outputVertex.length > 0) {
                makingNodeParam["outputVertexIds"] = outputVertex;
              } else {
                makingNodeParam["restNumberOutput"] = 1;
              }

              const downEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.sourceNodeId === element.id) {
                  const targetNode = parseNodes.find(
                    (node: any) => node.id === item.targetNodeId
                  );

                  if (node[nodeNames[targetNode.name]].isUpVertex) {
                    if (!downEdge.includes(item)) {
                      downEdge.push(item);
                    }
                  }
                }
              });
              // const downVertex = downEdge.map((item: any) => item.sourcePortId);
              const downVertex: Array<any> = [];
              downEdge.forEach((item: any) => {
                if (!downVertex.includes(item.sourcePortId)) {
                  downVertex.push(item.sourcePortId);
                }
              });

              if (downVertex.length > 0) {
                const downVertexNum =
                  node[nodeNames[element.name]].downVertexNumber;
                const restNumber = downVertexNum - downVertex.length;
                makingNodeParam["downVertexIds"] = downVertex;
                makingNodeParam["restDownVertexNumber"] = restNumber;
              } else {
                makingNodeParam["restDownVertexNumber"] = 3;
              }

              const inputEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.targetNodeId === element.id) {
                  if (!inputEdge.includes(item)) {
                    inputEdge.push(item);
                  }
                }
              });
              // const inputVertex = inputEdge.map(
              //   (item: any) => item.targetPortId
              // );
              const inputVertex: Array<any> = [];
              inputEdge.forEach((item: any) => {
                if (!inputVertex.includes(item.targetPortId)) {
                  inputVertex.push(item.targetPortId);
                }
              });

              if (inputVertex.length > 0) {
                makingNodeParam["inputVertexIds"] = inputVertex;
              } else {
                makingNodeParam["restNumberInput"] = 1;
              }

              // console.log(makingNodeParam);
              makingNode(makingNodeParam);
            } else {
              /**
               * only output
               *
               * */
              // console.log("only output", element.name);
              const makingNodeParam: any = {};
              makingNodeParam["nodeId"] = element.id;
              makingNodeParam["nodeName"] = nodeNames[element.name];
              makingNodeParam["currentPosition"] = element.position;

              const outputEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.sourceNodeId === element.id) {
                  if (!outputEdge.includes(item)) {
                    outputEdge.push(item);
                  }
                }
              });
              // const outputVertex = outputEdge.map(
              //   (item: any) => item.sourcePortId
              // );

              const outputVertex: Array<any> = [];
              outputEdge.forEach((item: any) => {
                if (!outputVertex.includes(item.sourcePortId)) {
                  outputVertex.push(item.sourcePortId);
                }
              });

              if (outputVertex.length > 0) {
                makingNodeParam["outputVertexIds"] = outputVertex;
              } else {
                makingNodeParam["restNumberOutput"] = 1;
              }
              const inputEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.targetNodeId === element.id) {
                  if (!inputEdge.includes(item)) {
                    inputEdge.push(item);
                  }
                }
              });
              const inputVertex: Array<any> = [];
              inputEdge.forEach((item: any) => {
                if (!inputVertex.includes(item.targetPortId)) {
                  inputVertex.push(item.targetPortId);
                }
              });

              if (inputVertex.length > 0) {
                makingNodeParam["inputVertexIds"] = inputVertex;
              } else {
                makingNodeParam["restNumberInput"] = 1;
              }

              makingNode(makingNodeParam);
            }
          } else {
            /**
             * only up and down
             */
            if (node[nodeNames[element.name]].isDownVertex) {
              // console.log(element);
              const makingNodeParam: any = {};
              makingNodeParam["nodeId"] = element.id;
              makingNodeParam["nodeName"] = nodeNames[element.name];
              makingNodeParam["currentPosition"] = element.position;
              const upEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.targetNodeId === element.id) {
                  if (!upEdge.includes(item)) {
                    upEdge.push(item);
                  }
                }
              });
              // const upVertex = upEdge.map((item: any) => item.targetPortId);
              const upVertex: Array<any> = [];
              upEdge.forEach((item: any) => {
                if (!upVertex.includes(item.targetPortId)) {
                  upVertex.push(item.targetPortId);
                }
              });
              // console.log("from down up vertex", upEdge);
              if (upVertex.length > 0) {
                makingNodeParam["upVertexIds"] = upVertex;
              } else {
                makingNodeParam["restUpVertexNumber"] = 1;
              }

              const downEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.sourceNodeId === element.id) {
                  if (!downEdge.includes(item)) {
                    downEdge.push(item);
                  }
                }
              });
              // const downVertex = downEdge.map((item: any) => item.sourcePortId);

              const downVertex: Array<any> = [];
              downEdge.forEach((item: any) => {
                if (!downVertex.includes(item.sourcePortId)) {
                  downVertex.push(item.sourcePortId);
                }
              });
              // console.log("downVertex in up and down", downVertex);
              if (downVertex.length > 0) {
                const downVertexNum =
                  node[nodeNames[element.name]].downVertexNumber;
                // console.log(downVertexNum, element.name);
                const restNumber = downVertexNum - downVertex.length;
                makingNodeParam["downVertexIds"] = downVertex;
                makingNodeParam["restDownVertexNumber"] = restNumber;
              } else {
                makingNodeParam["restDownVertexNumber"] =
                  node[nodeNames[element.name]].downVertexNumber;
              }
              console.log("from down", makingNodeParam);
              makingNode(makingNodeParam);
            } else {
              /**
               * only up
               */
              const makingNodeParam: any = {};
              makingNodeParam["nodeId"] = element.id;
              makingNodeParam["nodeName"] = nodeNames[element.name];
              makingNodeParam["currentPosition"] = element.position;

              const upEdge: Array<any> = [];
              parseEdges.forEach((item: any) => {
                if (item.targetNodeId === element.id) {
                  if (!upEdge.includes(item)) {
                    upEdge.push(item);
                  }
                }
              });
              // const upVertex = upEdge.map((item: any) => item.targetPortId);
              const upVertex: Array<any> = [];
              upEdge.forEach((item: any) => {
                if (!upVertex.includes(item.targetPortId)) {
                  upVertex.push(item.targetPortId);
                }
              });
              // console.log("from up vertex", upVertex);

              if (upVertex.length > 0) {
                makingNodeParam["upVertexIds"] = upVertex;
              } else {
                makingNodeParam["restUpVertexNumber"] = 1;
              }

              makingNode(makingNodeParam);
              // console.log("from up", makingNodeParam);
            }
          }
        });
        nodes().forEach((item: CustomNode, index) => {
          if (item.isInputVertex) {
            const edge: Array<any> = [];
            parseEdges.forEach((element: any) => {
              if (element.targetNodeId === item.id) {
                edge.push(element);
              }
            });
            const sourceAndTargetVertex: any = {};
            const sourceAndTargetNode: any = {};
            edge.forEach((item: any) => {
              sourceAndTargetVertex[item.sourcePortId] = item.targetPortId;
              const sourceNode = nodes().find(
                (node: CustomNode) => node.id === item.sourceNodeId
              );
              const targetNode = nodes().find(
                (node: CustomNode) => node.id === item.targetNodeId
              );
              sourceAndTargetNode[item.sourcePortId] = {
                sourceNode,
                targetNode,
              };
            });
            // console.log("from add edge", sourceAndTargetNode);
            Object.entries(sourceAndTargetVertex).forEach((item: any) => {
              const [sourceVertexId, targetVertexId] = item;
              makingEdge(
                sourceAndTargetNode[sourceVertexId]["sourceNode"],
                sourceAndTargetNode[sourceVertexId]["targetNode"],
                sourceVertexId,
                targetVertexId,
                "solid"
              );
            });
            // console.log("incoming edge", pair);
          } else if (item.isUpVertex) {
            const edge: Array<any> = [];
            parseEdges.forEach((element: any) => {
              if (element.targetNodeId === item.id) {
                edge.push(element);
              }
            });
            const sourceAndTargetVertex: any = {};
            const sourceAndTargetNode: any = {};
            edge.forEach((item: any) => {
              sourceAndTargetVertex[item.sourcePortId] = item.targetPortId;
              const sourceNode = nodes().find(
                (node: CustomNode) => node.id === item.sourceNodeId
              );
              const targetNode = nodes().find(
                (node: CustomNode) => node.id === item.targetNodeId
              );
              sourceAndTargetNode[item.sourcePortId] = {
                sourceNode,
                targetNode,
              };
            });
            // console.log("from add edge", sourceAndTargetNode);
            Object.entries(sourceAndTargetVertex).forEach((item: any) => {
              const [sourceVertexId, targetVertexId] = item;
              makingEdge(
                sourceAndTargetNode[sourceVertexId]["sourceNode"],
                sourceAndTargetNode[sourceVertexId]["targetNode"],
                sourceVertexId,
                targetVertexId,
                "dash"
              );
            });
            // console.log("incoming edge", pair);
          }
        });
      }
    };
    document.addEventListener("paste", handlePaste);

    onCleanup(() => {
      document.removeEventListener("paste", handlePaste);
    });
  });

  const eventRegistry = {
    onMouseDownForDownVertex: handleMouseDownOutput,
    handleOnPointerDownForNode: (event: any, props: any) => {
      handleOnPointerDown(event, props);
    },
  };

  function handleOnPointerDown(event: any, props: any) {
    event.stopPropagation();
    props.onMouseDownNode(event, props.id);
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const value = e.target.dataCapture.value;
    console.log(value);
    const workflow = document.getElementById("flow");
    const elements = JSON.parse(value).elements;
    elements.forEach((element: any) => {
      workflow?.appendChild(jsonToDomExtended(element, eventRegistry));
    });
  };

  return (
    <div
      id="boardWrapper"
      class="w-screen h-screen overflow-hidden relative z-0"
      tabIndex={0}
    >
      {/* <ModalForm isShowModal={isShowModal}/> */}
      {/* <StateContextProvider>
        <DataCapture handleOnSubmit={handleOnSubmit} />
      </StateContextProvider> */}
      <StateContextProvider>
        <SendData />
      </StateContextProvider>
      <StateContextProvider>
        {/* <DialogForm handleModalClose={handleModalClose} /> */}
        <Modal
          isOpen={() => isModalOpen()}
          onClose={() => setIsModalOpen(false)}
          zIndex={9999}
        >
          <TopPart />
          <BottomPart />
        </Modal>
        <Modal
          isOpen={() => isModalOpen2()}
          onClose={() => setIsModalOpen2(false)}
          zIndex={100000}
          widthClass="w-[1100px] min-w-[750px] max-w-[1200px] h-fit max-h-[90vh]"
        >
          <SubModal />
        </Modal>
        <Modal
          isOpen={() => isModalOpen3()}
          onClose={() => setIsModalOpen3(false)}
          zIndex={100000}
          widthClass="w-[80vw] max-w-[85vw] h-fit max-h-[90vh]"
        >
          <Modal3 />
        </Modal>
        {/* <Effect /> */}
      </StateContextProvider>
      <StateContextProvider>
        <SideBar onClickAdd={handleOnClickAddNode} nodeMark={nodeMark} />
      </StateContextProvider>
      <StateContextProvider>
        <Zoom />
      </StateContextProvider>
      <StateContextProvider>
        <Board />
      </StateContextProvider>
    </div>
  );
};

export default BoardComponent;
