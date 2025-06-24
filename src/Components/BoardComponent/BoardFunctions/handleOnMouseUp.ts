import useStateContext from "../useStateContext";

const {
  setClickedPosition,
  setBoardDragging,
  setPreTransform,
  transform,
  selectionBox,
  nodes,
  scale,
  setSelectedNodesGroup,
  setSelectionBox,
  setGroupBoundingBox,
  newEdge,
  setNewEdge,
  insideInput,
  setEdges,
  edges,
  setLastPointer,
} = useStateContext();

export const handleOnMouseUp = () => {
  setClickedPosition({ x: -1, y: -1 });

  // ************ Stop grabbing board ************
  setBoardDragging(false);
  setPreTransform(transform());
  // setEdgeDragging(false);

  //**
  // compute selected nodes and bounding box after creation of selection box
  //* *
  if (selectionBox()) {
    const box = selectionBox()!;
    let normalizedBox = {
      x: Math.min(box.x, box.x + box.width),
      y: Math.min(box.y, box.y + box.height),
      width: Math.abs(box.width),
      height: Math.abs(box.height),
    };

    const selected = nodes().filter((node) => {
      const nodeRef = document.getElementById(node.id);
      if (!nodeRef) return false;

      const nodeX = node.currPosition.get().x * scale() + transform().x;
      const nodeY = node.currPosition.get().y * scale() + transform().y;
      const width = nodeRef.offsetWidth;
      const height = nodeRef.offsetHeight;

      return (
        nodeX + width > normalizedBox.x &&
        nodeX < normalizedBox.x + normalizedBox.width &&
        nodeY + height > normalizedBox.y &&
        nodeY < normalizedBox.y + normalizedBox.height
      );
    });

    setSelectedNodesGroup(selected.map((n) => n.id));
    setSelectionBox(null);

    // ********** Set bounding box for selection ************
    if (selected.length > 0) {
      const nodeRects = selected.map((node) => {
        const el = document.getElementById(node.id);
        const rect = el?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0, width: 0, height: 0 };
        const graphX = (rect.left - transform().x) / scale();
        const graphY = (rect.top - transform().y) / scale();
        const graphWidth = rect.width / scale();
        const graphHeight = rect.height / scale();
        return {
          x: graphX,
          y: graphY,
          width: graphWidth,
          height: graphHeight,
        };
      });

      const minX = Math.min(...nodeRects.map((r) => r.x));
      const minY = Math.min(...nodeRects.map((r) => r.y));
      const maxX = Math.max(...nodeRects.map((r) => r.x + r.width));
      const maxY = Math.max(...nodeRects.map((r) => r.y + r.height));

      setGroupBoundingBox({
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      });

      // ************ Set prev position of selected nodes for smooth dragging ***********
      selected.forEach((node) => {
        node.prevPosition.set({
          x: node.currPosition.get().x * scale(),
          y: node.currPosition.get().y * scale(),
        });
      });
    }
  }
  // console.log(newEdge(), insideInput())

  // *********** If newEdge is not inside input, remove it ************
  if (newEdge() !== null && insideInput() === null) {
    setNewEdge(null);
    // setEdgeDragging(false)
  }

  // *****
  // If a new edge is inside input,
  // connect with both target and source node,
  // convert new edge to permanent edge
  // *****
  if (newEdge() !== null && insideInput() !== null) {
    // console.log(newEdge(), insideInput())
    const nodeStartId = newEdge()!.nodeStartId;
    const nodeEndId = insideInput()!.nodeId;

    // console.log(nodeStartId, "nodeStartId");
    console.log(nodeEndId, "nodeEndId");

    const nodeStart = nodes().find((node) => node.id === nodeStartId);
    const nodeEnd = nodes().find((node) => node.id === nodeEndId);
    // console.log(nodeStart, "nodeStart");
    console.log(nodeEnd, "nodeEnd");

    const boardWrapperElement = document.getElementById("boardWrapper");

    if (nodeStart && nodeEnd && boardWrapperElement) {
      const edgeId = `edge_${Math.random().toString(36).substring(2, 8)}_${
        nodeStart.id
      }_${newEdge()?.outputIndex}_${nodeEnd.id}_${insideInput()?.inputIndex}`;

      if (
        nodeStart.outputEdgeIds.get().includes(edgeId) &&
        nodeEnd.inputEdgeIds.get().includes(edgeId)
      ) {
        setNewEdge(null);
        return;
      }

      nodeStart.outputEdgeIds.set([...nodeStart.outputEdgeIds.get(), edgeId]);
      nodeEnd.inputEdgeIds.set([...nodeEnd.inputEdgeIds.get(), edgeId]);

      // ********** Update edge current positions ********
      newEdge()!.prevStartPosition.set(() => {
        return {
          x: (newEdge()!.currStartPosition.get().x - transform().x) / scale(),
          y: (newEdge()!.currStartPosition.get().y - transform().y) / scale(),
        };
      });

      newEdge()!.prevEndPosition.set(() => {
        return {
          x: (insideInput()!.positionX - transform().x) / scale(),
          y: (insideInput()!.positionY - transform().y) / scale(),
        };
      });

      newEdge()!.currEndPosition.set(() => {
        return {
          x: (insideInput()!.positionX - transform().x) / scale(),
          y: (insideInput()!.positionY - transform().y) / scale(),
        };
      });

      // ******** setup a new permanent edge **********
      setEdges([
        ...edges(),
        {
          ...newEdge()!,
          id: edgeId,
          nodeEndId: nodeEnd.id,
          inputVertexId: nodeEnd.inputVertexIds[0] || nodeEnd.upVertexIds[0],
          nodeEndInputIndex: insideInput()!.inputIndex,
        },
      ]);
      const startNode = nodes().find(
        (node) => node.id == newEdge()?.nodeStartId
      );
      // console.log("startNode", newEdge());

      // ******** block vertex ********
      startNode!.busyIndex.set([
        ...startNode!.busyIndex.get(),
        newEdge()!.outputVertexId,
      ]);
      // if (startNode && newEdge()?.outputVertexId !== undefined) {
      // }
      // setEdgeDragging(false)
      setNewEdge(null);
      // console.log("edge", edges())
    }
  }

  // setNewEdge(null)
  setLastPointer(null);
};
