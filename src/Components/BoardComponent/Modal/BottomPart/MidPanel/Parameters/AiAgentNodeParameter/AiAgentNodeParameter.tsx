import { Component, createSignal, For, Show } from "solid-js";
import ReproductiveDropDown, {
  ReproductiveDropDownOption,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import {
  agentOptions,
  sourceForPrompt,
  dataSourceConfig,
} from "./AiAgentConfigs";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import TextArea from "../../../../Component lib/TextArea/TextArea";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import Switch from "../../../../Component lib/Switch/Switch";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import TextBlock from "../../../../Component lib/TextBlock/TextBlock";
import useStateContext from "../../../../../useStateContext";

import useAiAgentNodeParameterState from "./useAiAgentNodeParameter";
import { aiAgentNodeDataEncoder } from "./aiAgentNodeDataEncoder";

const AiAgentNodeParameter: Component<{}> = (props) => {
  const { currentFormConfig } = useStateContext();

  const { formData, setFormData } = useStateContext();
  const {
    selectedOptions,
    setSelectedOptions,
    dataInsertHandler,
    options,
    setOptions,
    previousData,
    dataRemoveHandler,
    uniqueKey,
    currentAgent,
    setCurrentAgent,
    currentSourceForPrompt,
    setCurrentSourceForPrompt,
    dataSource,
    setDataSource,
  } = useAiAgentNodeParameterState();

  const isTopElement = () => {
    return (
      currentAgent() === "Tools Agent" ||
      currentAgent() === "Conversational Agent"
    );
  };
  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const aiAgentData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(aiAgentData.entries());

    const formattedAiAgentNodeData = aiAgentNodeDataEncoder(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedAiAgentNodeData,
    });

    console.log(formattedAiAgentNodeData);
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
    <form class="form" id="ai-agentForm" onSubmit={handleOnSubmit}>
      <div>
        <Show when={isTopElement()}>
          {/* <div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-light text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">

        </div> */}
          <TextBlock>
            Tip: Get a feel for agents with our quick{" "}
            <a href="#" class="font-semibold text-[#fe705a]">
              tutorial
            </a>{" "}
            or see an{" "}
            <a href="#" class="font-semibold text-[#fe705a]">
              example
            </a>{" "}
            of how this node works
          </TextBlock>
        </Show>
        <div class={`${isTopElement() ? "mt-5" : "mt-1"}`}>
          <ReproductiveDropDown
            name="agent"
            title="Agent"
            uniqueKey={uniqueKey()}
            defaultValue={agentOptions[0].value}
            options={agentOptions}
            onChange={(selectedOption: ReproductiveDropDownOption) => {
              setCurrentAgent(selectedOption.value);
              dataInsertHandler("agent", selectedOption.value);
            }}
          />
        </div>
        <Show when={currentAgent() === "SQL Agent"}>
          <div class="mt-5 space-y-5">
            <div>
              <DropDownN
                name="dataSource"
                options={dataSourceConfig}
                title="Data Source"
                uniqueKey={uniqueKey()}
                defaultValue={dataSourceConfig[0].value}
                onChange={(selected) => {
                  setDataSource(selected.value);
                  dataInsertHandler("dataSource", selected);
                }}
              />
            </div>
            <Show when={dataSource() === "sqlite"}>
              <div class="mt-5 space-y-5">
                <div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-extralight text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">
                  Pass the SQLite database into this node as binary data, e.g.
                  by inserting a 'Read/Write Files from Disk' node beforehand
                </div>
                <div>
                  <DynamicInput
                    name="inputBinaryField"
                    title="Input Binary Field"
                    uniqueKey={uniqueKey()}
                    placeholder="e.g. Data"
                    value=""
                    footNote="The name of the input binary field containing the file to be extracted"
                    isArrow
                    onInput={(value) => {
                      dataInsertHandler("inputBinaryField", value);
                    }}
                  />
                </div>
              </div>
            </Show>
            <div>
              <Show when={dataSource() !== "sqlite"}>
                <DependentDropDown
                  name={`credential_for_${dataSource()}`}
                  title={`Credential for ${dataSource()}`}
                  placeholder="Select Credential"
                />
              </Show>
            </div>
          </div>
        </Show>
        <div class="mt-5">
          <ReproductiveDropDown
            name="sourceForPrompt"
            title="Source for Prompt (User message)"
            uniqueKey={uniqueKey()}
            options={sourceForPrompt}
            defaultValue={sourceForPrompt[0].value}
            onChange={(selectedOption: ReproductiveDropDownOption) => {
              setCurrentSourceForPrompt(selectedOption.value);
              dataInsertHandler("sourceForPrompt", selectedOption.value);
            }}
          />
          <div class="mt-4">
            <Show when={currentSourceForPrompt() === "DefineBelow"}>
              <TextArea
                name={`promptDefineBelow`}
                title="Prompt (User message)"
                value={previousData()["promptDefineBelow"]}
                uniqueKey={uniqueKey()}
                placeholder="e.g. Hello, how can you help me?"
                onInput={(value) => {
                  dataInsertHandler(`prompt${currentSourceForPrompt()}`, value);
                }}
              />
            </Show>
            <Show
              when={currentSourceForPrompt() === "ConnectedChatTriggerNode"}
            >
              <DynamicInput
                name={`promptConnectedChatTriggerNode`}
                title="Prompt (User message)"
                placeholder="{{ $json.chatInput }}"
                uniqueKey={uniqueKey()}
                isArrow
                isExpand
                value={previousData()["promptConnectedChatTriggerNode"]}
                onInput={(value) => {
                  dataInsertHandler(`prompt${currentSourceForPrompt()}`, value);
                }}
              />
            </Show>
          </div>
        </div>
        <Show when={currentAgent() !== "SQL Agent"}>
          <div class="mt-5">
            <Switch
              checked
              uniqueKey={uniqueKey()}
              title="Require Specific Output Format"
              name="requireSpecificOutputFormat"
            />
          </div>
        </Show>
        <div class="mt-5">
          <div class="label hr-solid-line">Options</div>
          <div class="mt-5 space-y-5">
            <For each={selectedOptions()}>
              {(option: FilterOption) => {
                if (option.content.type === "textArea") {
                  return (
                    <div class="group flex items-start gap-1.5 w-full">
                      <div
                        onClick={() => {
                          const newSelectedOption = selectedOptions().filter(
                            (opt) => opt.value !== option.value
                          );
                          setSelectedOptions(newSelectedOption);
                          setOptions([...options(), option]);
                          dataRemoveHandler(option.value);
                        }}
                        class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                      >
                        <DeleteIcon />
                      </div>
                      <div class="flex-1">
                        <TextArea
                          name={option.content.name}
                          value={option.content.value}
                          title={option.content.title ?? ""}
                          toolTipText={option.content.toolTipText}
                          onInput={(value) => {
                            dataInsertHandler(option.content.name, value);
                          }}
                        />
                      </div>
                    </div>
                  );
                } else if (option.content.type === "input") {
                  return (
                    <div class="group flex items-start gap-1.5 w-full">
                      <div
                        onClick={() => {
                          const newSelectedOption = selectedOptions().filter(
                            (opt) => opt.value !== option.value
                          );
                          setSelectedOptions(newSelectedOption);
                          setOptions([...options(), option]);
                          dataRemoveHandler(option.value);
                        }}
                        class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                      >
                        <DeleteIcon />
                      </div>
                      <div class="flex-1">
                        <DynamicInput
                          name={option.content.name}
                          uniqueKey={uniqueKey()}
                          value={option.content.value}
                          title={option.content.title ?? ""}
                          toolTipText={option.content.toolTipText}
                          onInput={(value) => {
                            dataInsertHandler(option.content.name, value);
                          }}
                        />
                      </div>
                      ;
                    </div>
                  );
                } else if (option.content.type === "switch") {
                  return (
                    <div class="group flex items-start gap-1.5 w-full">
                      <div
                        onClick={() => {
                          const newSelectedOption = selectedOptions().filter(
                            (opt) => opt.value !== option.value
                          );
                          setSelectedOptions(newSelectedOption);
                          setOptions([...options(), option]);
                          dataRemoveHandler(option.value);
                        }}
                        class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                      >
                        <DeleteIcon />
                      </div>
                      <div class="flex-1">
                        <Switch
                          uniqueKey={uniqueKey()}
                          checked={previousData()[option.content.name]}
                          name={option.content.name}
                          title={option.content.title ?? ""}
                          toolTipText={option.content.toolTipText}
                          onChange={(state) => {
                            dataInsertHandler(option.content.name, state);
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              }}
            </For>
          </div>
          <div class="mt-5">
            <DropDownFilter
              name="Ai Agent Options"
              placeholder="Add Option"
              dropdownOptions={options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              setDropdownOptions={setOptions}
              onChange={(selectedOptions: FilterOption[]) => {
                setSelectedOptions(selectedOptions);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AiAgentNodeParameter;
