import useStateContext from "../useStateContext";

const { setInsideInput } = useStateContext();

//==================================================
// handle all things related to when cursor with edge
// come into input vertex area of the node (any node)
//==================================================

export function handleOnMouseEnterInput(
  inputPositionX: number,
  inputPositionY: number,
  nodeId: string,
  inputIndex: number
) {
  setInsideInput({
    nodeId,
    inputIndex,
    positionX: inputPositionX,
    positionY: inputPositionY,
  });
  // console.log(insideInput())

  // console.log({
  //   nodeId,
  //   inputIndex,
  //   positionX: inputPositionX,
  //   positionY: inputPositionY,
  // })
}
