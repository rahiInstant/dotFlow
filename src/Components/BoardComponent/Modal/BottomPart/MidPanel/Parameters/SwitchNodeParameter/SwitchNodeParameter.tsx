import {
  Component,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import DropDownN, {
  DropDownNOption,
} from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import MoveIcon from "../../../../Icons/MoveIcon";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import JsonEditor from "../../../../Component lib/JsonEditor/JsonEditor";
import Switch from "../../../../Component lib/Switch/Switch";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { modeStore, options, typeStore } from "./SwitchNodeParameterConfig";
import ButtonSolid from "../../../../Component lib/Button/ButtonSolid";
import Tooltip from "../../Tooltip";
import useStateContext from "../../../../../useStateContext";
import { Node } from "../../../../../../ButtonComponents/Types";
import DropDownMultiple from "../../../../Component lib/DropDown/DropDownMultiple/DropDownMultiple";
import StepsDropDown from "../../../../Component lib/DropDown/StepsDropDown/StepsDropDown";
import { switchNodeDataEncoder } from "./switchNodeDataEncoder";
import useSwitchNodeParameterState from "./useSwitchNodeParameter";

const ConvertTypeWhereRequired = (dataInsertHandler: any, checked: boolean) => {
  return (
    <div class="mt-5">
      <Switch
        checked={checked}
        name="convertTypeWhereRequired"
        title="Convert Type Where Required"
        toolTipText={`If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`}
        onChange={(state) => {
          dataInsertHandler("convertTypeWhereRequired", state);
        }}
      />
    </div>
  );
};

const SwitchNodeParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();

  const {
    selectedOptions,
    setSelectedOptions,
    dataInsertHandler,
    dataRemoveHandler,
    currentMode,
    setCurrentMode,
    field,
    setField,
    uniqueKey,
    renameOutput,
    setRenameOutput,
    switchOptions,
    setSwitchOptions,
    matchInput,
    setMatchInput,
    handleRoutingRulesNameValueMatch,
    handleDecreaseSwitchNodeVertex,
    handleIncreaseSwitchNodeVertex,
    getValue, previousData
  } = useSwitchNodeParameterState();

  onMount(() => {
    setSwitchOptions(options);
    if (field().length <= 0) {
    }
  });

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const switchNodeData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(switchNodeData.entries());

    const formattedSwitchData = switchNodeDataEncoder(
      data,
      currentFormConfig().id
    );
    setFormData({
      ...formData(),
      switchNode: formattedSwitchData,
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
    <form id="switchForm" onsubmit={handleOnSubmit}>
      <div>
        <DropDownN
          name={`${uniqueKey()}_mode`}
          title="Mode"
          uniqueKey={uniqueKey()}
          options={modeStore}
          defaultValue={previousData()['mode']}
          onChange={(selectedOption) => {
            setCurrentMode(selectedOption.value);
            dataInsertHandler("mode", selectedOption.value);
          }}
        />
        <div class="mt-5">
          {/* Rules */}
          <Show when={currentMode() === "Rules"}>
            <div class="label hr-solid-line">Routing Rules</div>
            <div class="mt-5">
              {field().length <= 0 && (
                <div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                  Currently no items exist
                </div>
              )}
              <div class="flex flex-col gap-8">
                <For each={field()}>
                  {(item, index) => {
                    return (
                      <div
                        class={`flex gap-1.5 ${
                          index() !== 0
                            ? "border-t pt-8 border-dashed border-[#575555]"
                            : ""
                        }`}
                      >
                        <div class="flex flex-col items-center gap-1">
                          <div
                            class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"
                            title="Drag to move"
                          >
                            <MoveIcon />
                          </div>
                          <div
                            onClick={() => {
                              setField(
                                field().filter(
                                  (opt, _) => opt.fieldId !== item.fieldId
                                )
                              );
                              handleDecreaseSwitchNodeVertex(item.vertexId);
                              dataRemoveHandler(item.fieldId);
                            }}
                            class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"
                          >
                            <DeleteIcon />
                          </div>
                          <div class="w-0.5 h-full bg-[#36373d] rounded-md"></div>
                        </div>
                        <div class="flex flex-col gap-1.5 w-full">
                          <div class="flex gap-1.5 items-start">
                            <div class="flex flex-col gap-1.5 w-full">
                              <div class="flex gap-1.5">
                                <div class="flex-1">
                                  <DynamicInput
                                    placeholder="name"
                                    name={`${item.fieldId}_name`}
                                    value={
                                      getValue(`${item.fieldId}_name`) || ""
                                    }
                                    uniqueKey={uniqueKey()}
                                    isArrow
                                    onInput={(value) => {
                                      handleRoutingRulesNameValueMatch(
                                        item.fieldId,
                                        `name`,
                                        value
                                      );
                                      dataInsertHandler(
                                        `${item.fieldId}_name`,
                                        value
                                      );
                                    }}
                                  />
                                </div>
                                <div class="min-w-[170px]">
                                  <StepsDropDown
                                    name={`${item.fieldId}_type`}
                                    options={typeStore}
                                    uniqueKey={uniqueKey()}
                                    defaultValue={
                                      getValue(`${item.fieldId}_operator`)
                                        ? {
                                            parentOption: getValue(
                                              `${item.fieldId}_operator`
                                            )["type"],
                                            childOption: getValue(
                                              `${item.fieldId}_operator`
                                            )["operation"],
                                          }
                                        : {
                                            parentOption:
                                              typeStore[0].value || "",
                                            childOption:
                                              typeStore[0].children?.[3]
                                                .value || "",
                                          }
                                    }
                                    categoryLabel="Back to main"
                                    onChange={(selectedOption) => {
                                      console.log(selectedOption);
                                      dataInsertHandler(
                                        `${item.fieldId}_operator`,
                                        {
                                          type: selectedOption.parentOption,
                                          operation:
                                            selectedOption.childOption.value,
                                          singleValue: true,
                                        }
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div>
                                <DynamicInput
                                  placeholder="value"
                                  name={`${item.fieldId}_value`}
                                  value={
                                    getValue(`${item.fieldId}_value`) || ""
                                  }
                                  uniqueKey={uniqueKey()}
                                  isArrow
                                  onInput={(value) => {
                                    handleRoutingRulesNameValueMatch(
                                      item.fieldId,
                                      `value`,
                                      value
                                    );
                                    dataInsertHandler(
                                      `${item.fieldId}_value`,
                                      value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <div class="mt-3 select-none">
                              <Tooltip
                                content={`This condition is ${
                                  matchInput()[item.fieldId]
                                } for the first input item`}
                              >
                                <div
                                  class={`text-[#7c81ca] text-xs bg-[#504f7e] p-1 w-4 h-4 font-[900] rounded-full flex items-center justify-center`}
                                >
                                  <Show
                                    when={matchInput()[item.fieldId] === true}
                                  >
                                    ✔
                                  </Show>
                                  <Show
                                    when={matchInput()[item.fieldId] === false}
                                  >
                                    ✘
                                  </Show>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                          <div class="mt-5">
                            <Switch
                              checked={getValue(`${item.fieldId}_isRename`)}
                              uniqueKey={uniqueKey()}
                              title="Rename Output"
                              name={`${item.fieldId}_isRename`}
                              onChange={(state) => {
                                setRenameOutput({
                                  ...renameOutput(),
                                  [item.fieldId]: state,
                                });
                                dataInsertHandler(
                                  `${item.fieldId}_isRename`,
                                  state
                                );
                              }}
                            />
                          </div>
                          <Show when={renameOutput()[item.fieldId]}>
                            <div class="mt-4">
                              <DynamicInput
                                name={`${item.fieldId}_renameOutput`}
                                value={
                                  getValue(`${item.fieldId}_renameOutput`) || ""
                                }
                                uniqueKey={uniqueKey()}
                                title="Output Name"
                                toolTipText="The label of output to which to send data to if rule matches."
                                isArrow
                                onInput={(value) => {
                                  dataInsertHandler(
                                    `${item.fieldId}_renameOutput`,
                                    value
                                  );
                                }}
                              />
                            </div>
                          </Show>
                        </div>
                      </div>
                    );
                  }}
                </For>
              </div>
              <ButtonSolid
                onClick={() => {
                  const newField = `rule_${Math.random()
                    .toString(36)
                    .substring(2, 8)}`;
                  const newVertexId = `vertex_${Math.random()
                    .toString(36)
                    .substring(2, 8)}`;
                  setField((prev) => [
                    ...prev,
                    {
                      fieldId: newField,
                      vertexId: newVertexId,
                    },
                  ]);
                  setRenameOutput({
                    ...renameOutput(),
                    [newField]: false,
                  });
                  setMatchInput({
                    ...matchInput(),
                    [newField]: true,
                  });
                  handleIncreaseSwitchNodeVertex(newVertexId);
                }}
                label="Add Pool Time"
              />
            </div>
            {/* switch */}
            <div class="mt-5">
              <Switch
                checked={getValue("convertTypeWhereRequired")}
                name="convertTypeWhereRequired"
                title="Convert Type Where Required"
                toolTipText={`If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`}
                onChange={(state) => {
                  // dataInsertHandler("convertTypeWhereRequired", state);
                }}
              />
            </div>
            <div class="mt-5">
              <div class="label hr-solid-line">Options</div>
              {/* Options */}
              <div class="mt-5 flex flex-col gap-6">
                <For each={selectedOptions()}>
                  {(item, index) => {
                    if (item.content.type === "switch") {
                      return (
                        <div class="flex gap-1.5">
                          <div
                            onClick={() => {
                              setSelectedOptions(
                                selectedOptions().filter(
                                  (opt) => opt.value !== item.value
                                )
                              );
                              setSwitchOptions([...switchOptions(), item]);
                              dataRemoveHandler(item.value);
                            }}
                            class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"
                          >
                            <DeleteIcon />
                          </div>
                          <div class="flex-1">
                            <Switch
                              checked={getValue(item.content.name)}
                              uniqueKey={uniqueKey()}
                              title={item.content.title ?? ""}
                              toolTipText={item.content.toolTipText ?? ""}
                              name={item.content.name}
                              onChange={(state) => {
                                dataInsertHandler(item.content.name, state);
                              }}
                            />
                          </div>
                        </div>
                      );
                    } else if (item.content.type === "DropDownN") {
                      return (
                        <div class="flex gap-1.5">
                          <div
                            onClick={() => {
                              setSelectedOptions(
                                selectedOptions().filter(
                                  (opt) => opt.value !== item.value
                                )
                              );
                              setSwitchOptions([...switchOptions(), item]);
                              dataRemoveHandler(item.value);
                            }}
                            class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"
                          >
                            <DeleteIcon />
                          </div>
                          <div class="flex-1">
                            <DropDownN
                              name={item.content.name}
                              title={item.content.title}
                              toolTipText={item.content.toolTipText}
                              options={item.content.options ?? []}
                              uniqueKey={uniqueKey()}
                              defaultValue={
                                getValue(item.content.name) ||
                                item.content.options?.[0]?.value
                              }
                              onChange={(selectedOption) => {
                                dataInsertHandler(
                                  item.content.name,
                                  selectedOption.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  }}
                </For>
              </div>
              <div class={`${selectedOptions().length <= 0 ? "" : "mt-5"}`}>
                <DropDownFilter
                  name="options_switch_node"
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  dropdownOptions={switchOptions}
                  setDropdownOptions={setSwitchOptions}
                  placeholder="Add options"
                  onChange={(selectedOptions) => {}}
                />
              </div>
            </div>
          </Show>
          {/* <div class={`${currentMode().value === "Rules" ? "" : "hidden"}`}>
       
        </div> */}
          <Show when={currentMode() === "Expression"}>
            <div class="space-y-5">
              <div>
                <DynamicInput
                  name="numberOfOutputs"
                  title="Number of Outputs"
                  toolTipText="How many outputs to create"
                  uniqueKey={uniqueKey()}
                  value={getValue("numberOfOutputs") || ""}
                  onInput={(value) => {
                    dataInsertHandler("numberOfOutputs", value);
                  }}
                />
              </div>
              <div>
                <DynamicInput
                  name="outputIndex"
                  title="Output Index"
                  placeholder={"{{}}"}
                  value={getValue("outputIndex") || ""}
                  uniqueKey={uniqueKey()}
                  footNote="[ERROR: invalid syntax]"
                  toolTipText="The output index to send the input item to. Use an expression to calculate which input item should be routed to which output. The expression must return a number."
                  isExpand
                  isArrow
                  onInput={(value) => {
                    dataInsertHandler("outputIndex", value);
                  }}
                />
              </div>
              <Switch
                checked={getValue("convertTypeWhereRequired")}
                name="convertTypeWhereRequired"
                title="Convert Type Where Required"
                toolTipText={`If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`}
                onChange={(state) => {
                  dataInsertHandler("convertTypeWhereRequired", state);
                }}
              />
            </div>
          </Show>
        </div>
      </div>
    </form>
  );
};

export default SwitchNodeParameter;
