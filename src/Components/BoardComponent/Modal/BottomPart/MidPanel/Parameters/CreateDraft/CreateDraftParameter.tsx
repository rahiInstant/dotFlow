import {
  Component,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import ReproductiveDropDown, {
  ReproductiveChildren,
  ReproductiveDropDownOption,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import {
  addFilterOption,
  addOption,
  addOptionForCreate,
  addOptionForGet,
  addOptionForGetMany,
  addOptionForReply,
  addOptionForSend,
  approvalOption,
  defineFormOption,
  draftOperationOption,
  elementTypeOption,
  labelOperationOption,
  limitTypeOption,
  messageOperationOption,
  resourceOption,
  responseTypeOption,
  threadOperationOption,
  toolDescriptionOption,
} from "./CreateDraftParameterConfig";
import TextArea from "../../../../Component lib/TextArea/TextArea";
import DropDownN, {
  DropDownNOption,
} from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import Switch from "../../../../Component lib/Switch/Switch";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import DropDownMultiple from "../../../../Component lib/DropDown/DropDownMultiple/DropDownMultiple";
import Button from "../../Button";
import JsonEditor from "../../../../Component lib/JsonEditor/JsonEditor";
import MoveIcon from "../../../../Icons/MoveIcon";
import TextBlock from "../../../../Component lib/TextBlock/TextBlock";
import ButtonSolid from "../../../../Component lib/Button/ButtonSolid";
import { createDraftNodeDataEncoder } from "./createDraftDataEncoder";
import useStateContext from "../../../../../useStateContext";
import useCreateDraftNodeParameterState from "./useCreateDraftParameter";

const Delete: Component<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
    >
      <DeleteIcon />
    </div>
  );
};

const CreateDraftParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();
  const {
    dataInsertHandler,
    previousData,
    dataRemoveHandler,
    uniqueKey,
    currentToolDescription,
    setCurrentToolDescription,
    resource,
    setResource,
    operation,
    setOperation,
    selectedOperation,
    setSelectedOperation,
    selectedFilter,
    setSelectedFilter,
    filters,
    setFilters,
    option,
    setOption,
    selectedOption,
    setSelectedOption,
    responseType,
    setResponseType,
    isAddApprovalOption,
    setIsAddApprovalOption,
    approval,
    setApproval,
    isOption,
    setIsOption,
    limitType,
    setLimitType,
    defineForm,
    setDefineForm,
    formElementId,
    setFormElementId,
    formElements,
    setFormElements,
    fieldOption,
    setFieldOption,
  } = useCreateDraftNodeParameterState();

  createEffect(() => {
    setSelectedOption([]);
    if (resource() === "message") {
      setOperation(messageOperationOption);
    } else if (resource() === "label") {
      setOperation(labelOperationOption);
    } else if (resource() === "draft") {
      setOperation(draftOperationOption);
    } else if (resource() === "thread") {
      setOperation(threadOperationOption);
    }
  });

  createEffect(() => {
    setSelectedOption([]);
    if (selectedOperation()?.value === "reply") {
      setOption(addOptionForReply);
    } else if (selectedOperation()?.value === "send") {
      setOption(addOptionForSend);
    } else if (selectedOperation()?.value === "create") {
      setOption(addOptionForCreate);
    } else if (selectedOperation()?.value === "get") {
      setOption(addOptionForGet);
    } else if (selectedOperation()?.value === "getMany") {
      setOption(addOptionForGetMany);
    } else if (selectedOperation().value === "sendAndWaitForResponse") {
      if (responseType().value === "Approval") {
        setOption([
          {
            value: "limitWaitTime",
            label: "Limit Wait Time",
            content: {
              type: "reproductiveDropDown",
              name: "limitWaitTime",
              title: "Limit Wait Time",
              toolTipText: "Time at which polling should occur",
            },
          },
        ]);
        setSelectedOption([]);
      } else if (
        responseType().value === "freeText" ||
        responseType().value === "customForm"
      ) {
        setOption(addOption);
        setSelectedOption([]);
      }
    }
  });

  onMount(() => {
    setOperation(messageOperationOption);
    setFilters(addFilterOption);
  });

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const createDraftData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(createDraftData.entries());

    const formattedCreateDraftNodeData = createDraftNodeDataEncoder(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedCreateDraftNodeData,
    });
  };
  return (
    <form id="create-draftForm" onSubmit={handleOnSubmit}>
      <div class="space-y-5">
        <DependentDropDown
          name="credential"
          placeholder="Select Credential"
          title="Credential to connect with"
        />
        <ReproductiveDropDown
          name="toolDescription"
          title="Tool Description"
          options={toolDescriptionOption}
          defaultValue={
            previousData()["toolDescription"] || toolDescriptionOption[0].value
          }
          onChange={(selected) => {
            setCurrentToolDescription(selected);
            dataInsertHandler("toolDescription", selected);
          }}
        />
        <Show when={currentToolDescription().value === "setManually"}>
          <TextArea
            name="description"
            title="Description"
            toolTipText="Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often."
            value={previousData()["description"] || "Consume the Gmail API"}
            placeholder="e.g. Consume the Gmail API"
            onInput={(value) => {
              dataInsertHandler("description", value);
            }}
          />
        </Show>
        <DropDownN
          name="resource"
          title="Resource"
          options={resourceOption}
          defaultValue={previousData()["resource"] || resourceOption[0].value}
          onChange={(selected) => {
            setResource(selected.value);
            dataInsertHandler("resource", selected);
          }}
        />

        <ReproductiveDropDown
          name="operation"
          title="Operation"
          options={operation()}
          defaultValue={previousData()["operation"] || operation()[0].value}
          onChange={(selected) => {
            setSelectedOperation(selected);
            dataInsertHandler("operation", selected);
          }}
        />
        <div class="space-y-5">
          <For each={selectedOperation()?.children}>
            {(item, i) => {
              if (item.type === "dynamicInput") {
                return (
                  <div>
                    <DynamicInput
                      name={item.name ?? ""}
                      title={item.title}
                      toolTipText={item.toolTipText}
                      placeholder={item.placeholder}
                      value={previousData()[item.name!] || item.value}
                      onInput={(value) => {
                        dataInsertHandler(item.name ?? "", value);
                      }}
                    />
                  </div>
                );
              } else if (item.type === "switch") {
                return (
                  <div>
                    <Switch
                      checked={previousData()[item.name!]}
                      name={item.name ?? ""}
                      title={item.title ?? ""}
                      toolTipText={item.toolTipText}
                      onChange={(state) => {
                        dataInsertHandler(item.name ?? "", state);
                      }}
                    />
                  </div>
                );
              } else if (item.type === "DropDownFilter") {
                return (
                  <div class="space-y-5">
                    <div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">
                      Filter
                    </div>
                    {selectedFilter().length <= 0 && (
                      <div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                        Currently no items exist
                      </div>
                    )}
                    <div class="space-y-5">
                      <For each={selectedFilter()}>
                        {(item, index) => {
                          if (item.content.type === "switch") {
                            return (
                              <div class="group flex items-start gap-1.5 w-full">
                                <Delete
                                  onClick={() => {
                                    const newSelectedOption =
                                      selectedFilter().filter(
                                        (opt) => opt.value !== item.value
                                      );
                                    setSelectedFilter(newSelectedOption);
                                    setFilters([...filters(), item]);
                                  }}
                                />
                                <Switch
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
                                <Delete
                                  onClick={() => {
                                    const newSelectedOption =
                                      selectedFilter().filter(
                                        (opt) => opt.value !== item.value
                                      );
                                    setSelectedFilter(newSelectedOption);
                                    setFilters([...filters(), item]);
                                  }}
                                />
                                <DynamicInput
                                  name={item.content.name}
                                  value={
                                    previousData()[item.content.name] || ""
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
                          } else if (item.content.type === "dropdownMultiple") {
                            return (
                              <div class="group flex items-start gap-1.5 w-full">
                                <Delete
                                  onClick={() => {
                                    const newSelectedOption =
                                      selectedFilter().filter(
                                        (opt) => opt.value !== item.value
                                      );
                                    setSelectedFilter(newSelectedOption);
                                    setFilters([...filters(), item]);
                                  }}
                                />
                                <DropDownMultiple
                                  name={item.content.name}
                                  title={item.content.title}
                                  defaultSelectedOptions={
                                    previousData()[item.content.name] || []
                                  }
                                  options={item.content.options ?? []}
                                  toolTipText={item.content.toolTipText}
                                  footNote={item.content.footNote}
                                  onChange={(selected) => {
                                    dataInsertHandler(
                                      item.content.name,
                                      selected
                                    );
                                  }}
                                />
                              </div>
                            );
                          } else if (item.content.type === "dropdownN") {
                            return (
                              <div class="group flex items-start gap-1.5 w-full">
                                <Delete
                                  onClick={() => {
                                    const newSelectedOption =
                                      selectedFilter().filter(
                                        (opt) => opt.value !== item.value
                                      );
                                    setSelectedFilter(newSelectedOption);
                                    setFilters([...filters(), item]);
                                  }}
                                />
                                <DropDownN
                                  placeholder={
                                    item.content?.options?.[0].label ?? ""
                                  }
                                  name={item.content.name}
                                  title={item.content.title}
                                  defaultValue={previousData()[item.content.name]}
                                  options={item.content.options ?? []}
                                  toolTipText={item.content.toolTipText}
                                  footNote={item.content.footNote}
                                  onChange={(selected) => {
                                    dataInsertHandler(
                                      item.content.name,
                                      selected
                                    );
                                  }}
                                />
                              </div>
                            );
                          }
                        }}
                      </For>
                    </div>
                    <DropDownFilter
                      name={item.name ?? ""}
                      placeholder="Add Filter"
                      selectedOptions={selectedFilter}
                      setSelectedOptions={setSelectedFilter}
                      dropdownOptions={filters}
                      setDropdownOptions={setFilters}
                      onChange={(selected) => {}}
                    />
                  </div>
                );
              } else if (item.type === "DropDownN") {
                return (
                  <div>
                    <DropDownN
                      name={item.name ?? ""}
                      title={item.title}
                      options={item.options ?? []}
                      defaultValue={previousData()[item.name!]|| item.options?.[0].value}
                      toolTipText={item.toolTipText}
                      onChange={(selected) => {
                        dataInsertHandler(item.name ?? "", selected);
                      }}
                    />
                  </div>
                );
              }
            }}
          </For>
        </div>
        <div class="space-y-5 mt-5">
          <Show
            when={
              selectedOperation().value === "reply" ||
              selectedOperation().value === "create" ||
              selectedOperation().value === "get" ||
              selectedOperation().value === "getMany" ||
              selectedOperation().value === "send"
            }
          >
            <div class="label hr-solid-line">Options</div>
            {selectedOption().length <= 0 && (
              <div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                Currently no items exist
              </div>
            )}
            <div class="mt-5 space-y-5">
              <For each={selectedOption()}>
                {(child) => {
                  if (child.content.type === "dynamicInput") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOption().filter(
                              (opt) => opt.value !== child.value
                            );
                            setSelectedOption(newSelectedOption);
                            setOption([...option(), child]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <div class="flex-1">
                          <DynamicInput
                            name={child.content.name}
                            title={child.content.title}
                            placeholder={child.content.placeholder}
                            toolTipText={child.content.toolTipText}
                            isArrow
                            value={previousData()[child.content.name]}
                            onInput={(value) => {
                              dataInsertHandler(child.content.name, value);
                            }}
                          />
                        </div>
                      </div>
                    );
                  } else if (child.content.type === "switch") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOption().filter(
                              (opt) => opt.value !== child.value
                            );
                            setSelectedOption(newSelectedOption);
                            setOption([...option(), child]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <div class="flex-1">
                          <Switch
                          checked={previousData()[child.content.name]}
                            title={child.content.title ?? ""}
                            toolTipText={child.content.toolTipText}
                            name={child.content.name}
                            onChange={(state) => {
                              dataInsertHandler(child.content.name, state);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                }}
              </For>
            </div>

            <DropDownFilter
              name={`optionsFor${selectedOperation()?.label}Operation`}
              placeholder="Add option"
              dropdownOptions={option}
              setDropdownOptions={setOption}
              selectedOptions={selectedOption}
              setSelectedOptions={setSelectedOption}
              onChange={(selected) => {
                setSelectedOption(selected);
              }}
            />
          </Show>
        </div>
        <div class="space-y-5 mt-5">
          <Show when={selectedOperation().value === "sendAndWaitForResponse"}>
            {/* <TextArea name="message" title="Message" />*/}
            <ReproductiveDropDown
              name="responseType"
              title="Response Type"
              options={responseTypeOption}
              defaultValue={previousData()["responseType"]|| responseTypeOption[0].value}
              onChange={(selected) => {
                setResponseType(selected);
                dataInsertHandler("responseType", selected);
              }}
            />
            <div class="space-y-5 mt-5">
              <Show when={responseType().value === "Approval"}>
                <div>
                  <div class="label hr-solid-line">Approval Options</div>
                  {!isAddApprovalOption() && (
                    <div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                      Currently no items exist
                    </div>
                  )}
                  <div class={`${isAddApprovalOption() ? "hidden" : "mt-5"}`}>
                    <Button
                      onClick={() => setIsAddApprovalOption(true)}
                      title="Add Option"
                      width="w-full"
                    />
                  </div>
                  <div class="space-y-5">
                    <Show when={isAddApprovalOption()}>
                      <div class="group flex items-start gap-1.5 w-full mt-5">
                        <div
                          onClick={() => {
                            setIsAddApprovalOption(false);
                            setApproval(approvalOption[0]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <div class="flex-1 space-y-5">
                          <ReproductiveDropDown
                            name="typeOfApproval"
                            title="Type of Approval"
                            options={approvalOption}
                            defaultValue={approvalOption[0].value}
                            onChange={(selected) => {
                              setApproval(selected);
                              dataInsertHandler("typeOfApproval", selected);
                            }}
                          />
                          <DynamicInput
                            name="approveButtonLabel"
                            title="Approve Button Label"
                            value={"Approve"}
                          />
                          <DropDownN
                            name="approveButtonStyle"
                            title="Approve Button Style"
                            options={[
                              { value: "primary", label: "Primary" },
                              { value: "secondary", label: "Secondary" },
                            ]}
                            defaultValue={"primary"}
                            onChange={(value) => {
                              dataInsertHandler("approveButtonStyle", value);
                            }}
                          />
                          <Show
                            when={approval().value === "approvedAndDisapproved"}
                          >
                            <DynamicInput
                              name="disapproveButtonLabel"
                              title="Disapprove Button Label"
                              value={"Disapprove"}
                              onInput={(value) => {
                                dataInsertHandler(
                                  "disapproveButtonLabel",
                                  value
                                );
                              }}
                            />
                            <DropDownN
                              name="disapproveButtonStyle"
                              title="Disapprove Button Style"
                              options={[
                                { value: "primary", label: "Primary" },
                                { value: "secondary", label: "Secondary" },
                              ]}
                              defaultValue={"primary"}
                              onChange={(value) => {
                                dataInsertHandler(
                                  "disapproveButtonStyle",
                                  value
                                );
                              }}
                            />
                          </Show>
                        </div>
                      </div>
                    </Show>
                  </div>
                </div>
                <div>
                  <div class="label hr-solid-line">Options</div>
                  {!isOption() && (
                    <div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                      Currently no items exist
                    </div>
                  )}
                  <div class={`${isOption() ? "hidden" : "mt-5"}`}>
                    <Button
                      onClick={() => setIsOption(true)}
                      title="Add Option"
                      width="w-full"
                    />
                  </div>
                  <div class="space-y-5">
                    <Show when={isOption()}>
                      <div class="group flex items-start gap-1.5 w-full mt-5">
                        <div
                          onClick={() => {
                            setIsOption(false);
                            setLimitType(approvalOption[0]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <div class="flex-1 space-y-5">
                          <ReproductiveDropDown
                            name="limitType"
                            title="Limit Type"
                            options={limitTypeOption}
                            defaultValue={limitTypeOption[0].value}
                            toolTipText="Sets the condition for the execution to resume. Can be a specified date or after some time."
                            onChange={(selected) => {
                              setLimitType(selected);
                              dataInsertHandler("limitType", selected);
                            }}
                          />
                          <div class="space-y-5">
                            <Show
                              when={limitType().value === "afterTimeInterval"}
                            >
                              <DynamicInput
                                name="amount"
                                title="Amount"
                                value={"45"}
                                toolTipText="The time to wait."
                                onInput={(value) => {
                                  dataInsertHandler("amount", value);
                                }}
                              />
                              <DropDownN
                                name="unit"
                                title="Unit"
                                toolTipText="Unit of the interval value"
                                options={[
                                  { value: "minutes", label: "Minutes" },
                                  { value: "hours", label: "Hours" },
                                  { value: "days", label: "Days" },
                                ]}
                                defaultValue={"minutes"}
                                onChange={(value) => {
                                  dataInsertHandler("unit", value);
                                }}
                              />
                            </Show>
                            <Show
                              when={limitType().value === "atSpecifiedTime"}
                            >
                              <DynamicInput
                                title="Max Date and Time"
                                name="maxDateAndTime"
                                toolTipText="Continue execution after the specified date and time"
                                onInput={(value) => {
                                  dataInsertHandler("maxDateAndTime", value);
                                }}
                              />
                            </Show>
                          </div>
                        </div>
                      </div>
                    </Show>
                  </div>
                </div>
              </Show>
            </div>

            <div class="space-y-5 mt-5">
              <Show when={responseType().value === "customForm"}>
                <ReproductiveDropDown
                  name="defineForm"
                  title="Define Form"
                  options={defineFormOption}
                  defaultValue={defineFormOption[0].value}
                  onChange={(selected) => {
                    setDefineForm(selected);
                    dataInsertHandler("defineForm", selected);
                  }}
                />
                <Show when={defineForm().value === "usingJSON"}>
                  <JsonEditor
                    name="formFieldsJson"
                    title="Form Fields"
                    footNote="See docs for file syntax."
                    value={JSON.stringify(
                      [
                        {
                          fieldLabel: "Name",
                          placeholder: "enter you name",
                          requiredField: true,
                        },
                      ],
                      null,
                      2
                    )}
                    onInput={(value) => {
                      dataInsertHandler("formFieldsJson", value);
                    }}
                  />
                </Show>
                <div class="space-y-5">
                  <Show when={defineForm().value === "usingFieldBelow"}>
                    <div class="label hr-solid-line">Form Elements</div>
                    {formElementId().length <= 0 && (
                      <div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                        Currently no items exist
                      </div>
                    )}
                    <div class="mt-5 space-y-5">
                      <For each={formElementId()}>
                        {(item, index) => {
                          return (
                            <div
                              class={`flex gap-1.5 ${
                                index() !== 0
                                  ? "border-t pt-6 border-dashed border-[#575555]"
                                  : ""
                              }`}
                            >
                              <div class="flex flex-col items-center gap-1 mt-7">
                                <div
                                  class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"
                                  title="Drag to move"
                                >
                                  <MoveIcon />
                                </div>
                                <div
                                  onClick={() => {
                                    setFormElementId(
                                      formElementId().filter(
                                        (opt, _) => opt !== item
                                      )
                                    );
                                  }}
                                  class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"
                                >
                                  <DeleteIcon />
                                </div>
                                <div class="w-0.5 h-full bg-[#36373d] rounded-md"></div>
                              </div>
                              <div class="flex flex-col gap-1.5 w-full">
                                <ReproductiveDropDown
                                  name="elementType"
                                  title="Element Type"
                                  toolTipText="The type of field to add to the form"
                                  options={elementTypeOption}
                                  defaultValue={elementTypeOption[0].value}
                                  onChange={(selected) => {
                                    setFormElements((prev) => ({
                                      ...prev,
                                      [item]: selected.children || [],
                                    }));
                                    dataInsertHandler("elementType", selected);
                                  }}
                                />
                                {/* child */}
                                <Show when={formElements()[item]}>
                                  <div class="space-y-4 mt-5">
                                    <For each={formElements()[item]}>
                                      {(child) => {
                                        if (child.type === "dynamicInput") {
                                          return (
                                            <DynamicInput
                                              name={`${item}_${child.title}`}
                                              title={child.title}
                                              toolTipText={child.toolTipText}
                                              value={child.value}
                                              placeholder={child.placeholder}
                                              onInput={(value) => {
                                                dataInsertHandler(
                                                  `${item}_${child.title}`,
                                                  value
                                                );
                                              }}
                                            />
                                          );
                                        } else if (child.type === "switch") {
                                          return (
                                            <Switch
                                              name={`${item}_${child.title}`}
                                              title={child.title ?? ""}
                                              toolTipText={child.toolTipText}
                                              onChange={(state) => {
                                                dataInsertHandler(
                                                  `${item}_${child.title}`,
                                                  state
                                                );
                                              }}
                                            />
                                          );
                                        } else if (child.type === "textBlock") {
                                          return (
                                            <TextBlock>
                                              {child.placeholder}
                                            </TextBlock>
                                          );
                                        } else if (
                                          child.type === "jsonEditor"
                                        ) {
                                          return (
                                            <JsonEditor
                                              name={`${item}_${child.title}`}
                                              title={child.title}
                                              footNote={child.footNote}
                                              value={JSON.stringify(
                                                {
                                                  street: "1234 Elm Street",
                                                  city: "Springfield",
                                                },
                                                null,
                                                2
                                              )}
                                              onInput={(value) => {
                                                dataInsertHandler(
                                                  `${item}_${child.title}`,
                                                  value
                                                );
                                              }}
                                            />
                                          );
                                        } else if (
                                          child.type === "inputBlock"
                                        ) {
                                          return (
                                            <div class="space-y-4">
                                              <div class="label hr-solid-line">
                                                Field Options
                                              </div>
                                              <div class="space-y-4 mt-4 w-full">
                                                <For each={fieldOption()[item]}>
                                                  {(option, idx) => {
                                                    return (
                                                      <div
                                                        class={`flex gap-1.5 ${
                                                          idx() !== 0
                                                            ? "border-t pt-6 border-dashed border-[#575555]"
                                                            : ""
                                                        }`}
                                                      >
                                                        <div class="flex flex-col items-center gap-1 mt-7">
                                                          <div
                                                            class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"
                                                            title="Drag to move"
                                                          >
                                                            <MoveIcon />
                                                          </div>
                                                          <div
                                                            onClick={() => {
                                                              // remove option
                                                              setFieldOption(
                                                                (prev) => ({
                                                                  ...prev,
                                                                  [item]: prev[
                                                                    item
                                                                  ].filter(
                                                                    (opt) =>
                                                                      opt !==
                                                                      option
                                                                  ),
                                                                })
                                                              );
                                                            }}
                                                            class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"
                                                          >
                                                            <DeleteIcon />
                                                          </div>
                                                          {/* <div class="w-0.5 h-full bg-[#36373d] rounded-md"></div> */}
                                                        </div>
                                                        <div class="flex flex-col gap-1.5 w-full">
                                                          <DynamicInput
                                                            name={`${item}_${child.name}_${option}`}
                                                            title="Option"
                                                            onInput={(
                                                              value
                                                            ) => {
                                                              dataInsertHandler(
                                                                `${item}_${child.name}_${option}`,
                                                                value
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </div>
                                                    );
                                                  }}
                                                </For>
                                              </div>
                                              <ButtonSolid
                                                label="Add Field Option"
                                                onClick={() => {
                                                  setFieldOption((prev) => ({
                                                    ...prev,
                                                    [item]: [
                                                      ...(prev[item] || []),
                                                      `${Math.random()
                                                        .toString(36)
                                                        .substring(2, 8)}`,
                                                    ],
                                                  }));
                                                }}
                                              />
                                            </div>
                                          );
                                        }
                                      }}
                                    </For>
                                  </div>
                                </Show>
                              </div>
                            </div>
                          );
                        }}
                      </For>
                    </div>
                    <ButtonSolid
                      label="Add Form Element"
                      onClick={() => {
                        setFormElementId([
                          ...formElementId(),
                          `form_elements_${Math.random()
                            .toString(36)
                            .substring(2, 8)}`,
                        ]);
                      }}
                    />
                  </Show>
                </div>
              </Show>
            </div>

            {/* common ground */}
            <div class="space-y-5 mt-5">
              <Show
                when={
                  responseType().value === "freeText" ||
                  responseType().value === "customForm"
                }
              >
                <div>
                  <div class="label hr-solid-line">Options</div>
                  {selectedOption().length <= 0 && (
                    <div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                      Currently no items exist
                    </div>
                  )}
                </div>
                <For each={selectedOption()}>
                  {(child) => {
                    if (child.content.type === "dynamicInput") {
                      return (
                        <div class="group flex items-start gap-1.5 w-full mt-5">
                          <div
                            onClick={() => {
                              const newSelectedOption = selectedOption().filter(
                                (opt) => opt.value !== child.value
                              );
                              setSelectedOption(newSelectedOption);
                              setOption([...option(), child]);
                            }}
                            class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                          >
                            <DeleteIcon />
                          </div>
                          <div class="flex-1 space-y-5">
                            <DynamicInput
                              name={child.content.name}
                              title={child.content.title}
                              toolTipText={child.content.toolTipText}
                              onInput={(value) => {
                                dataInsertHandler(child.content.name, value);
                              }}
                            />
                          </div>
                        </div>
                      );
                    } else if (child.content.type === "reproductiveDropDown") {
                      return (
                        <div class="group flex items-start gap-1.5 w-full mt-5">
                          <div
                            onClick={() => {
                              const newSelectedOption = selectedOption().filter(
                                (opt) => opt.value !== child.value
                              );
                              setSelectedOption(newSelectedOption);
                              setOption([...option(), child]);
                            }}
                            class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                          >
                            <DeleteIcon />
                          </div>
                          <div class="flex-1 space-y-5">
                            <ReproductiveDropDown
                              name="limitType"
                              title="Limit Type"
                              options={limitTypeOption}
                              defaultValue={limitTypeOption[0].value}
                              toolTipText="Sets the condition for the execution to resume. Can be a specified date or after some time."
                              onChange={(selected) => {
                                setLimitType(selected);
                                dataInsertHandler("limitType", selected);
                              }}
                            />

                            <div class="space-y-5">
                              <Show
                                when={limitType().value === "afterTimeInterval"}
                              >
                                <DynamicInput
                                  name="amount"
                                  title="Amount"
                                  value={"45"}
                                  toolTipText="The time to wait."
                                  onInput={(value) => {
                                    dataInsertHandler("amount", value);
                                  }}
                                />
                                <DropDownN
                                  name="unit"
                                  title="Unit"
                                  toolTipText="Unit of the interval value"
                                  options={[
                                    { value: "minutes", label: "Minutes" },
                                    { value: "hours", label: "Hours" },
                                    { value: "days", label: "Days" },
                                  ]}
                                  defaultValue={"minutes"}
                                  onChange={(value) => {
                                    dataInsertHandler("unit", value);
                                  }}
                                />
                              </Show>
                              <Show
                                when={limitType().value === "atSpecifiedTime"}
                              >
                                <DynamicInput
                                  title="Max Date and Time"
                                  name="maxDateAndTime"
                                  toolTipText="Continue execution after the specified date and time"
                                  onInput={(value) => {
                                    dataInsertHandler("maxDateAndTime", value);
                                  }}
                                />
                              </Show>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }}
                </For>

                <DropDownFilter
                  name="Option"
                  dropdownOptions={option}
                  setDropdownOptions={setOption}
                  selectedOptions={selectedOption}
                  setSelectedOptions={setSelectedOption}
                  placeholder="Add Options"
                  onChange={(selected) => {
                    setSelectedOption(selected);
                  }}
                />
              </Show>
            </div>
          </Show>
        </div>
      </div>
    </form>
  );
};

export default CreateDraftParameter;
