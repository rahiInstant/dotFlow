import useStateContext from "../useStateContext";

const { setInsideInput } = useStateContext();


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
