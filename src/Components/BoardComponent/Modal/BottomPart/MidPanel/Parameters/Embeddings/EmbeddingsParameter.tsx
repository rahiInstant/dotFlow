import { Component } from "solid-js";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import { modelConfig } from "./EmbeddingsParameterConfig";
import useStateContext from "../../../../../useStateContext";
import { embeddingNodeDataEncoder } from "./embeddingDataEncoder";
import useEmbeddingNodeParameterState from "./useEmbeddingParameter";

const EmbeddingsParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();
  const { dataInsertHandler, previousData, uniqueKey } =
    useEmbeddingNodeParameterState();
  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const pgVectorStoreData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(pgVectorStoreData.entries());

    const formattedEmbeddingNodeData = embeddingNodeDataEncoder(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedEmbeddingNodeData,
    });
  };

  return (
    <form id="embeddingForm" onSubmit={handleOnSubmit}>
      <div class="space-y-5">
        <DependentDropDown
          name="credential"
          placeholder="Select Credential"
          title="Credential to connect with"
        />
        <DropDownN
          name="model"
          title="Model"
          uniqueKey={uniqueKey()}
          options={modelConfig}
          defaultValue={previousData()["model"] || modelConfig[0].value}
          onChange={(selected) => {
            dataInsertHandler("model", selected.value);
          }}
        />
      </div>
    </form>
  );
};

export default EmbeddingsParameter;
