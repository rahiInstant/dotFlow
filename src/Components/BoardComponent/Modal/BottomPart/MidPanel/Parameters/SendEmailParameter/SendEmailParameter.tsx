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
  addOption,
  addOptionForSend,
  approvalOption,
  defineFormOption,
  elementTypeOption,
  emailFormat,
  limitTypeOption,
  operationStore,
  responseTypeOption,
} from "./SendEmailParamConfig";

import TextArea from "../../../../Component lib/TextArea/TextArea";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import Switch from "../../../../Component lib/Switch/Switch";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import Button from "../../Button";
import { dynamicInputType } from "../../../../Component lib/Input/DynamicInput/inputType";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
// import JsonEditor from "../../../../Component lib/JsonEditor/jsonEditor";
import ButtonSolid from "../../../../Component lib/Button/ButtonSolid";
import MoveIcon from "../../../../Icons/MoveIcon";
import TextBlock from "../../../../Component lib/TextBlock/TextBlock";
import JsonEditor from "../../../../Component lib/JsonEditor/JsonEditor";
import { sendEmailNodeDataFormatter } from "./sendEmailNodeDataFormatter";
import useStateContext from "../../../../../useStateContext";

const SendEmailParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();
  const [currentOperation, setCurrentOperation] =
    createSignal<ReproductiveDropDownOption>(operationStore[0]);
  const [currentEmailFormat, setCurrentEmailFormat] =
    createSignal<ReproductiveDropDownOption>(emailFormat[0]);
  const [responseType, setResponseType] =
    createSignal<ReproductiveDropDownOption>(responseTypeOption[0]);
  const [isAddApprovalOption, setIsAddApprovalOption] =
    createSignal<boolean>(false);
  const [approval, setApproval] = createSignal<ReproductiveDropDownOption>(
    approvalOption[0]
  );
  const [isOption, setIsOption] = createSignal<boolean>(false);

  const [limitType, setLimitType] = createSignal<ReproductiveDropDownOption>(
    limitTypeOption[0]
  );

  const [option, setOption] = createSignal<FilterOption[]>([]);
  const [selectedOption, setSelectedOption] = createSignal<FilterOption[]>([]);

  const [defineForm, setDefineForm] = createSignal<ReproductiveDropDownOption>(
    defineFormOption[0]
  );
  const [formElementId, setFormElementId] = createSignal<string[]>([]);
  const [formElements, setFormElements] = createSignal<
    Record<string, ReproductiveChildren[]>
  >({});
  const [fieldOption, setFieldOption] = createSignal<Record<string, string[]>>(
    {}
  );

  onMount(() => {
    setOption(addOptionForSend);
  });

  createEffect(() => {
    if (currentOperation().value === "Send") {
      setOption(addOptionForSend);
      setSelectedOption([]);
    } else if (currentOperation().value === "sendAndWaitForResponse") {
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

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const sendEmailData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(sendEmailData.entries());
    
    // console.log(data)
    const formattedSendEmailNodeData = sendEmailNodeDataFormatter(
      data,
      currentFormConfig().id
    );
    // console.log(formattedSendEmailNodeData)

    setFormData({
      ...formData(),
      sendEmail: formattedSendEmailNodeData,
    });
  };

  return (
    <form id="send-emailForm" onSubmit={handleOnSubmit}>
      <div class="space-y-5">
        {/* credential dropdown */}
        <DependentDropDown
          name="credential"
          title="Credential to connect with"
          // toolTipText="Time at which polling should occur"
          placeholder="Create credential..."
        />
        <ReproductiveDropDown
          name="Operation"
          title="Operation"
          options={operationStore}
          defaultValue={operationStore[0].value}
          onChange={(selected) => {
            setCurrentOperation(selected);
          }}
        />
        <DynamicInput
          name="fromEmail"
          title="From Email"
          placeholder="admin@example.com"
          toolTipText="Email address of the sender. You can also specify a name: Nathan Doe <nate@n8n.io>."
          type={dynamicInputType.Email}
          isArrow
        />
        <DynamicInput
          name="toEmail"
          title="To Email"
          placeholder="info@example.com"
          toolTipText="Email address of the recipient. You can also specify a name: Nathan Doe <nate@n8n.io>."
          type={dynamicInputType.Email}
          isArrow
        />
        <DynamicInput
          name="subject"
          title="Subject"
          placeholder="e.g. Approval required"
          isArrow
        />
        {/* nesting */}
        <div class="space-y-5">
          <Show when={currentOperation().value === "Send"}>
            <ReproductiveDropDown
              name="emailFormat"
              title="Email Format"
              options={emailFormat}
              defaultValue={emailFormat[0].value}
              toolTipText="Select the format for the email"
              onChange={(selected) => {
                setCurrentEmailFormat(selected);
              }}
            />
            <div class="mt-5 space-y-5">
              <For each={currentEmailFormat()?.children}>
                {(child) => {
                  return (
                    <TextArea
                      name={`emailFormat${child.title}`}
                      title={child.title ?? ""}
                      toolTipText={child.toolTipText}
                    />
                  );
                }}
              </For>
            </div>
            <div>
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
                              title={child.content.title ?? ""}
                              toolTipText={child.content.toolTipText}
                              name={child.content.name}
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
                  name="optionsForSendOperation"
                  placeholder="Add option"
                  dropdownOptions={option}
                  setDropdownOptions={setOption}
                  selectedOptions={selectedOption}
                  setSelectedOptions={setSelectedOption}
                  onChange={(selected) => {
                    setSelectedOption(selected);
                  }}
                />
              </div>
            </div>
          </Show>
          <Show when={currentOperation().value === "sendAndWaitForResponse"}>
            <TextArea name="message" title="Message" />
            <ReproductiveDropDown
              name="responseType"
              title="Response Type"
              options={responseTypeOption}
              defaultValue={responseTypeOption[0].value}
              onChange={(selected) => {
                setResponseType(selected);
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
                          />
                          <Show
                            when={approval().value === "approvedAndDisapproved"}
                          >
                            <DynamicInput
                              name="disapproveButtonLabel"
                              title="Disapprove Button Label"
                              value={"Disapprove"}
                            />
                            <DropDownN
                              name="disapproveButtonStyle"
                              title="Disapprove Button Style"
                              options={[
                                { value: "primary", label: "Primary" },
                                { value: "secondary", label: "Secondary" },
                              ]}
                              defaultValue={"primary"}
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
                            }}
                          />
                          <div class="space-y-5">
                            <Show
                              when={limitType().value === "afterTimeInterval"}
                            >
                              <DynamicInput
                                name="amount"
                                title="Amount"
                                value={45}
                                toolTipText="The time to wait."
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
                              />
                            </Show>
                            <Show
                              when={limitType().value === "atSpecifiedTime"}
                            >
                              <DynamicInput
                                title="Max Date and Time"
                                name="maxDateAndTime"
                                toolTipText="Continue execution after the specified date and time"
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
                                    // setFormElements((prev) => {
                                    //   const newFormElements = { ...prev };
                                    //   newFormElements[item] =
                                    //     selected.children ?? [];
                                    //   return newFormElements;
                                    // });
                                    setFormElements((prev) => ({
                                      ...prev,
                                      [item]: selected.children || [],
                                    }));
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
                                            />
                                          );
                                        } else if (child.type === "switch") {
                                          return (
                                            <Switch
                                              name={`${item}_${child.title}`}
                                              title={child.title ?? ""}
                                              toolTipText={child.toolTipText}
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
                              }}
                            />

                            <div class="space-y-5">
                              <Show
                                when={limitType().value === "afterTimeInterval"}
                              >
                                <DynamicInput
                                  name="amount"
                                  title="Amount"
                                  value={45}
                                  toolTipText="The time to wait."
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
                                />
                              </Show>
                              <Show
                                when={limitType().value === "atSpecifiedTime"}
                              >
                                <DynamicInput
                                  title="Max Date and Time"
                                  name="maxDateAndTime"
                                  toolTipText="Continue execution after the specified date and time"
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

export default SendEmailParameter;
