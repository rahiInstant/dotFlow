import { Component, createSignal, For } from "solid-js";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import { modelConfig, optionStoreForOllamaNode } from "./OllamaChatNodeConfig";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import Switch from "../../../../Component lib/Switch/Switch";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import useStateContext from "../../../../../useStateContext";
import useOllamaChatNodeParameterState from "./useOllamaChatNodeParameter";
import { ollamaChatNodeDataEncoder } from "./ollamaChatNodeDataEncoder";

const OllamaChatNodeParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();
  const {
    selectedOptions,
    setSelectedOptions,
    dataInsertHandler,
    options,
    setOptions,
    previousData,
    dataRemoveHandler,
    uniqueKey,
  } = useOllamaChatNodeParameterState();
  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const ollamaChatData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(ollamaChatData.entries());

    const formattedOllamaChatNode = ollamaChatNodeDataEncoder(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedOllamaChatNode,
    });
    const customEvent = new CustomEvent("formSubmitEvent", {
      detail: data,
      bubbles: true,
    });
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.dispatchEvent(customEvent);
    }
  };
  return (
    <form class="form" id="ollama-chatForm" onSubmit={handleOnSubmit}>
      <div>
        <div class="space-y-5">
          <div>
            <DependentDropDown
              name="credential_ollama"
              placeholder="Select a Credential"
            />
          </div>
          <div>
            <DropDownN
              name="model"
              title="Model"
              uniqueKey={uniqueKey()}
              defaultValue={previousData()["model"]}
              options={modelConfig}
              onChange={(selectedOption) => {
                dataInsertHandler("model", selectedOption.value);
              }}
            />
          </div>
          <div>
            <div class="label hr-solid-line">Options</div>
            <div class="space-y-6 mt-5">
              <For each={selectedOptions()}>
                {(item: FilterOption, index) => {
                  if (item.content.type === "switch") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOptions().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedOptions(newSelectedOption);
                            setOptions([...options(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <Switch
                          uniqueKey={uniqueKey()}
                          checked={previousData()[item.content.name]}
                          name={item.content.name}
                          title={item.content.title ?? ""}
                          toolTipText={item.content.toolTipText}
                          onChange={(state) => {
                            dataInsertHandler(item.content.name, state);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dynamicInput") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOptions().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedOptions(newSelectedOption);
                            setOptions([...options(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DynamicInput
                          name={item.content.name}
                          uniqueKey={uniqueKey()}
                          value={
                            previousData()[item.content.name] ||
                            item.content.value
                          }
                          title={item.content.title}
                          toolTipText={item.content.toolTipText}
                          isArrow
                          footNote={item.content.footNote}
                          placeholder={item.content.placeholder ?? ""}
                          onInput={(value) => {
                            dataInsertHandler(item.content.name, value);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dropdownN") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOptions().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedOptions(newSelectedOption);
                            setOptions([...options(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DropDownN
                          name={item.content.name}
                          uniqueKey={uniqueKey()}
                          title={item.content.title}
                          defaultValue={
                            (previousData()[item.content.name] ||
                              item.content.options?.[0]?.value) ??
                            ""
                          }
                          options={item.content.options ?? []}
                          toolTipText={item.content.toolTipText}
                          footNote={item.content.footNote}
                          onChange={(selected) => {
                            dataInsertHandler(item.content.name, selected.value);
                          }}
                        />
                      </div>
                    );
                  }
                }}
              </For>
            </div>
          </div>

          <div class="mt-5">
            <DropDownFilter
              name="Add Option"
              placeholder="Add Option"
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              dropdownOptions={options}
              setDropdownOptions={setOptions}
              onChange={(selected: FilterOption[]) => {
                setSelectedOptions(selected);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default OllamaChatNodeParameter;
