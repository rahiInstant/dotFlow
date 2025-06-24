import useStateContext from "../useStateContext";

const { newEdge } = useStateContext();

//=====================================================
// get the live edge length
//=====================================================
export function getPathLength() {
  const dx =
    newEdge()!.currEndPosition.get().x - newEdge()!.currStartPosition.get().x;
  const dy =
    newEdge()!.currEndPosition.get().y - newEdge()!.currStartPosition.get().y;
  return Math.sqrt(dx * dx + dy * dy);
}
