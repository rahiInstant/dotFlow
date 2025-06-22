import useStateContext from "../useStateContext";

const { insideInput, setInsideInput } = useStateContext();


export function handleOnMouseLeaveInput(nodeId: string, inputIndex: number) {
  if (
    insideInput()?.nodeId == nodeId &&
    insideInput()?.inputIndex == inputIndex
  ) {
    setInsideInput(null);
  }
}
