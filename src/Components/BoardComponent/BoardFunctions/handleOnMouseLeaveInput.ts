import useStateContext from "../useStateContext";

const { insideInput, setInsideInput } = useStateContext();

//=====================================================
// handle all things related to when cursor with edge
// goes out of input vertex area of the node (any node)
//=====================================================

export function handleOnMouseLeaveInput(nodeId: string, inputIndex: number) {
  if (
    insideInput()?.nodeId == nodeId &&
    insideInput()?.inputIndex == inputIndex
  ) {
    setInsideInput(null);
  }
}
