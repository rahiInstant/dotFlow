export function handleMouseDownOutput(
  outputRef: any,
  event: any,
  outputIndex: number,
  vertexId: string,
  typeOfEdge: string,
  props: any
) {

  event.stopPropagation();
  const { left, right, top, bottom } = outputRef.getBoundingClientRect();
  const centerX = left + Math.abs(left - right) / 2;
  const centerY = top + Math.abs(top - bottom) / 2;
  // console.log({ centerX, centerY });
  props.onMouseDownOutput(
    centerX,
    centerY,
    props.id,
    outputIndex,
    vertexId,
    typeOfEdge
  );
}

export function handleOnPointerDown(event: any, props: any) {
  event.stopPropagation();
  props.onMouseDownNode(event, props.id);
}
