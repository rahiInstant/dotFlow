import useStateContext from "../useStateContext";

const {
  setSelectedNode,
  setClickedPosition,
  nodes,
  scale,
  edges,
  selectedNode,
} = useStateContext();

//==================================================
// handle the mouse down event but only
// specific for node, node position
//==================================================

export function handleOnMouseDownNode(event: any, id: string) {
  // console.log(event);
  setSelectedNode(id);
  setClickedPosition({ x: event.x, y: event.y });
  const node = nodes().find((node) => node.id == selectedNode());
  if (node) {
    node.prevPosition.set((_) => {
      return {
        x: node.currPosition.get().x * scale(),
        y: node.currPosition.get().y * scale(),
      };
    });
    // ********** Update input edges positions ***********
    for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
      const edgeId = node.inputEdgeIds.get()[i];
      const edge = edges().find((edge) => edge.id === edgeId);

      if (edge) {
        edge.prevEndPosition.set(() => {
          return {
            x: edge.currEndPosition.get().x * scale(),
            y: edge.currEndPosition.get().y * scale(),
          };
        });
      }
    }

    // *********** Update output edges positions *************
    for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
      const edgeId = node.outputEdgeIds.get()[i];
      const edge = edges().find((edge) => edge.id === edgeId);

      if (edge) {
        edge.prevStartPosition.set(() => {
          return {
            x: edge.currStartPosition.get().x * scale(),
            y: edge.currStartPosition.get().y * scale(),
          };
        });
      }
    }
  }
}
