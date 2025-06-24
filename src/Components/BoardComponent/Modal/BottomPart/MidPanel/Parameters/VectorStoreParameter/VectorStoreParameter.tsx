import { Component } from "solid-js";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import TextArea from "../../../../Component lib/TextArea/TextArea";
import { vectorStoreNodeDataEncoder } from "./vectorStoreDataEncoder";
import useStateContext from "../../../../../useStateContext";
import useVectorStoreNodeParameterState from "./useVectorStoreParameter";

const VectorStoreParameter: Component<{}> = (props) => {
  const { currentFormConfig, setFormData, formData } = useStateContext();
  const { dataInsertHandler, previousData, uniqueKey } =
    useVectorStoreNodeParameterState();
  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const vectorStoreData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(vectorStoreData.entries());

    const formattedVectorStoreNodeData = vectorStoreNodeDataEncoder(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedVectorStoreNodeData,
    });
  };
  return (
    <form id="vector-storeForm" onSubmit={handleOnSubmit}>
      <div class="space-y-6">
        <DynamicInput
          name="dataName"
          title="Data Name"
          placeholder="e.g. user_info"
          value={previousData()["dataName"]}
          uniqueKey={uniqueKey()}
          toolTipText="Name of the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question."
          isArrow
          onInput={(value) => {
            dataInsertHandler("dataName", value);
          }}
        />
        <TextArea
          name="dataDescription"
          title="Description of Data"
          uniqueKey={uniqueKey()}
          value={previousData()["dataDescription"]}
          placeholder="[describe your data here, e.g. a user's name, email e.t.c]"
          toolTipText="Describe the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question."
          onInput={(value) => {
            dataInsertHandler("dataDescription", value);
          }}
        />
        <DynamicInput
          name="limit"
          title="Limit"
          toolTipText="The maximum number of results to return"
          uniqueKey={uniqueKey()}
          value={previousData()["limit"]}
          isArrow
          isExpand
          onInput={(value) => {
            dataInsertHandler("limit", value);
          }}
        />
      </div>
    </form>
  );
};

export default VectorStoreParameter;
