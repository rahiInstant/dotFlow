import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { sendEmailNodeDataFormatter } from "./sendEmailNodeDataFormatter";

const [sendEmailNodeData, setSendEmailNodeData] = createSignal<Record<string, any>>(
  {}
);
const { currentFormConfig, formData, setFormData } = useStateContext();
export const sendEmailNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setSendEmailNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedSendEmailNodeData = sendEmailNodeDataFormatter(
    sendEmailNodeData(),
    currentFormConfig().id
  );

  setFormData({
    ...formData(),
    sendEmail: formattedSendEmailNodeData,
  });
};
