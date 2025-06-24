import { Component, createSignal, For, onMount, Show } from "solid-js";
import "../parameters.css";
import Switch from "../../../../Component lib/Switch/Switch";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import DropDownMultiple from "../../../../Component lib/DropDown/DropDownMultiple/DropDownMultiple";
import DropDownFilter from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import ButtonSolid from "../../../../Component lib/Button/ButtonSolid";
import ReproductiveDropDown from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import { FilterOption } from "./GmailType";
import { filterStore, optionStore, poolTimesOptions } from "./GmailConfig";
import useStateContext from "../../../../../useStateContext";
import { gmailNodeDataEncoder } from "./gmailNodeDataEncoder";
import useGmailParameterState from "./useGmailParameterState";

const GmailNodeParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();
  // const [filters, setFilters] = createSignal<FilterOption[]>([]);
  // const [options, setOptions] = createSignal<FilterOption[]>([]);

  const {
    pollTimes,
    setPollTimes,
    mode,
    setMode,
    selectedOptions,
    setSelectedOptions,
    selectedFilter,
    setSelectedFilter,
    previousData,
    dataHandler,
    modeChild,
    setModeChild,
    setFilters,
    filters,
    options,
    setOptions,
    dataRemoveHandler,
    uniqueKey,
  } = useGmailParameterState();



  const filterObj = (obj: Record<string, any>, item: string) => {
    return Object.entries(obj).reduce((acc, [k, v]: [string, any]) => {
      if (!k.startsWith(item)) {
        acc[k] = v;
      }
      return acc;
    }, {} as Record<string, any>);
  };

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const gmailData = new FormData(e.target as HTMLFormElement);
    let data = {
      ...Object.fromEntries(gmailData.entries()),
      labelIds: gmailData.getAll("labelIds"),
    };
    console.log("unformatted data", data);

    const nodeData = gmailNodeDataEncoder(data, currentFormConfig().id);

    setFormData({
      ...formData(),
      [currentFormConfig().id]: nodeData,
    });

    console.log("formattedData", nodeData);

    const customEvent = new CustomEvent("RIN", {
      detail: data,
      bubbles: true,
    });
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.dispatchEvent(customEvent);
    }
  };

  return (
    <div id={currentFormConfig().id}>
      <form class="form" id="gmail-triggerForm" onSubmit={handleOnSubmit}>
        <div class="space-y-5">
          <DependentDropDown
            name="credential"
            title="Credential to connect with"
            // toolTipText="Time at which polling should occur"
            placeholder="Create credential..."
          />
          <div>
            <div class="label hr-solid-line">Pool Times</div>
            <div class="mt-5">
              {pollTimes().length <= 0 && (
                <div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                  Currently no items exist
                </div>
              )}
              <For each={pollTimes()}>
                {(item, index) => {
                  // console.log(item);
                  return (
                    <div
                      class={`mb-10 flex flex-row gap-1.5 items-top group ${
                        index() !== 0
                          ? "border-t border-dashed border-[#727171] pt-3"
                          : ""
                      }`}
                    >
                      <div class="pt-9">
                        <div
                          onClick={() => {
                            setPollTimes(
                              pollTimes().filter((i, _) => i !== item)
                            );
                            console.log("pre-previous", previousData());
                            // setSubmittedData((prev) => filterObj(prev, item));
                            console.log(
                              "from delete handler: previous",
                              mode(),
                              modeChild()
                            );
                            // delete mode()[item];
                            // delete modeChild()[item];
                            setMode((prev) => filterObj(prev, item));
                            setModeChild((prev) => filterObj(prev, item));
                            console.log(
                              "from delete handler:after",
                              mode(),
                              modeChild()
                            );
                            dataRemoveHandler(item);
                            console.log("post-previous", previousData());
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                      <div class="w-full">
                        <ReproductiveDropDown
                          name={item}
                          uniqueKey={uniqueKey()}
                          defaultValue={
                            mode()[item] || poolTimesOptions[1].value
                          }
                          options={poolTimesOptions}
                          title="Mode"
                          toolTipText="How often to trigger."
                          onChange={(selectedOption) => {
                            // console.log(
                            //   "call from reproductive dropdown",
                            //   selectedOption
                            // );

                            // console.log(`
                            //   >
                            //   >
                            //   >
                            //   > ====================
                            //   >
                            //   >
                            //   >
                            //   `)
                            dataHandler(item, selectedOption.value);
                            setMode((prev) => {
                              const newMode = { ...prev };
                              newMode[item] = `${selectedOption.value}`;
                              return newMode;
                            });
                            // console.log("handling done");
                            // console.log(mode());
                            setModeChild((prev) => {
                              const newMode = { ...prev };
                              newMode[item] = selectedOption.children ?? [];
                              return newMode;
                            });

                            // console.log({item, selectedOption: selectedOption.value})

                            // console.log(mode());
                          }}
                        />
                        {/* child */}
                        <Show when={modeChild()[item]}>
                          <div class={`space-y-4 mt-5`}>
                            <For each={modeChild()[item]}>
                              {(child, index) => {
                                if (child.type === "input") {
                                  return (
                                    <DynamicInput
                                      name={`${item}_${child.title}`}
                                      title={child.title}
                                      toolTipText={child.toolTipText}
                                      isArrow
                                      value={
                                        previousData()[
                                          `${item}_${child.title}`
                                        ] ||
                                        child.value ||
                                        ""
                                      }
                                      onInput={(value, event) => {
                                        dataHandler(
                                          `${item}_${child.title}`,
                                          value
                                        );
                                      }}
                                    />
                                  );
                                } else if (child.type === "dropdownN") {
                                  return (
                                    <DropDownN
                                      name={`${item}_${child.title}`}
                                      uniqueKey={uniqueKey()}
                                      title={child.title}
                                      options={child.options ?? []}
                                      defaultValue={
                                        previousData()[
                                          `${item}_${child.title}`
                                        ] || child.options?.[0]?.value
                                      }
                                      toolTipText={child.toolTipText}
                                      onChange={(selectedOption) => {
                                        dataHandler(
                                          `${item}_${child.title}`,
                                          selectedOption.value
                                        );
                                      }}
                                    />
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
              onClick={() => {
                setPollTimes([
                  ...pollTimes(),
                  `pollTime_${Math.random().toString(36).substring(2, 8)}`,
                ]);
              }}
              label="Add Poll Time"
            />
          </div>
          <div>
            <DropDownN
              name="event"
              title="Event"
              uniqueKey={uniqueKey()}
              defaultValue={previousData()["event"]}
              options={[
                { label: "Message received", value: "Message received" },
              ]}
              onChange={(selectedOption) => {
                // dataHandler("Event", selectedOption.value);
              }}
            />
          </div>
          <div>
            <Switch
              title="Simplify"
              name="simplify"
              uniqueKey={uniqueKey()}
              checked={previousData()["simplify"]}
              toolTipText="Whether to return a simplified version of the response instead of the raw data."
              onChange={(state) => {
                // console.log(`
                //   >
                //   >
                //   >
                //   > ====================
                //   >
                //   >
                //   >
                //   `);
                dataHandler("simplify", state);
              }}
            />
          </div>
          <div>
            <div class="label hr-solid-line">Filters</div>
            <div class="space-y-6 mt-5">
              <For each={selectedFilter()}>
                {(item: FilterOption, index) => {
                  if (item.content.type === "switch") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <Switch
                          name={item.content.name}
                          title={item.content.title}
                          uniqueKey={uniqueKey()}
                          checked={previousData()[item.content.name]}
                          toolTipText={item.content.toolTipText}
                          onChange={(state) => {
                            dataHandler(item.content.name, state);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dynamicInput") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DynamicInput
                          name={item.content.name}
                          title={item.content.title}
                          toolTipText={item.content.toolTipText}
                          isArrow
                          footNote={item.content.footNote}
                          placeholder={item.content.placeholder ?? ""}
                          value={previousData()[item.content.name]}
                          onInput={(value) => {
                            dataHandler(item.content.name, value);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dropdownMultiple") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DropDownMultiple
                          name={item.content.name}
                          title={item.content.title}
                          options={item.content.options}
                          toolTipText={item.content.toolTipText}
                          defaultSelectedOptions={
                            previousData()[item.content.name] || []
                          }
                          footNote={item.content.footNote}
                          onChange={(selectedOptions) => {
                            dataHandler(
                              item.content.name,
                              selectedOptions.map((opt) => opt.value)
                            );
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dropdownN") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                            dataRemoveHandler(item.value);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DropDownN
                          uniqueKey={uniqueKey()}
                          // placeholder={item.content.options[0].label}
                          defaultValue={
                            previousData()[item.content.name] ??
                            item.content.options[0].value
                          }
                          name={item.content.name}
                          title={item.content.title}
                          options={item.content.options}
                          toolTipText={item.content.toolTipText}
                          footNote={item.content.footNote}
                          onChange={(selectedOption) => {
                            dataHandler(
                              item.content.name,
                              selectedOption.value
                            );
                          }}
                        />
                      </div>
                    );
                  }
                }}
              </For>
            </div>

            <div class="mt-6">
              <DropDownFilter
                name="filter"
                dropdownOptions={filters}
                setDropdownOptions={setFilters}
                selectedOptions={selectedFilter}
                setSelectedOptions={setSelectedFilter}
                placeholder="Add filter"
                onChange={(item) => {}}
              />
            </div>
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
                          name={item.content.name}
                          title={item.content.title}
                          uniqueKey={uniqueKey()}
                          toolTipText={item.content.toolTipText}
                          checked={previousData()[item.content.name] ?? false}
                          onChange={(state) => {
                            dataHandler(item.content.name, state);
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
                          title={item.content.title}
                          toolTipText={item.content.toolTipText}
                          isArrow
                          footNote={item.content.footNote}
                          value={
                            previousData()[item.content.name] ||
                            item.content.value ||
                            ""
                          }
                          onInput={(value) => {
                            dataHandler(item.content.name, value);
                          }}
                        />
                      </div>
                    );
                  }
                }}
              </For>
            </div>

            <div class="mt-6">
              <DropDownFilter
                name="options_gmail_node"
                dropdownOptions={options}
                setDropdownOptions={setOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                placeholder="Add Options"
                onChange={(item) => {}}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GmailNodeParameter;
