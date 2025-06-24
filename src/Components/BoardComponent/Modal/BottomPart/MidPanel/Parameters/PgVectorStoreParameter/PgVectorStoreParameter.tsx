import {
  Component,
  createEffect,
  createSignal,
  For,
  Show,
  untrack,
} from "solid-js";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import ReproductiveDropDown, {
  ReproductiveDropDownOption,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import {
  collectionChild,
  columnNamesChild,
  operation,
  pgVectorOption,
} from "./PgVectorStoreParameterConfig";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import Switch from "../../../../Component lib/Switch/Switch";
import TextBlock from "../../../../Component lib/TextBlock/TextBlock";
import TextArea from "../../../../Component lib/TextArea/TextArea";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import ButtonSolid from "../../../../Component lib/Button/ButtonSolid";
import useStateContext from "../../../../../useStateContext";
import { pgVectorStoreNodeDataEncoder } from "./pgVectorStoreDataEncoder";
import usePgVectorNodeParameterState from "./usePgVectorStoreParameter";
// import { dataInsertHandler } from "./pgVectorStoreDataManager";

const TableName = (
  name: string,
  toolTipText: string,
  title: string,
  value?: string
) => {
  return (
    <DynamicInput
      name={name}
      title={title}
      toolTipText={toolTipText}
      value={value}
    />
  );
};

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

const PgVectorStoreParameter: Component<{}> = (props) => {
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
    currentOperation,
    setCurrentOperation,
    metadataFilter,
    setMetadataFilter,
    isCollection,
    setIsCollection,
  } = usePgVectorNodeParameterState();
  createEffect(() => {
    if (currentOperation() === "insertDocuments") {
      setOptions(pgVectorOption.slice(1, 3));
    } else {
      setOptions(pgVectorOption);
    }
  });

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const pgVectorStoreData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(pgVectorStoreData.entries());

    const formattedPgVectorStoreNodeData = pgVectorStoreNodeDataEncoder(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedPgVectorStoreNodeData,
    });
  };

  return (
    <form id="pg-vectorForm" onSubmit={handleOnSubmit}>
      <div class="space-y-5">
        <DependentDropDown
          name="credential"
          placeholder="Select Credential"
          title="Credential to connect with"
        />
        <div class="space-y-5">
          <ReproductiveDropDown
            name="operationMode"
            title="Operation Mode"
            uniqueKey={uniqueKey()}
            options={operation}
            defaultValue={previousData()["operationMode"] || operation[0].value}
            onChange={(selected) => {
              setCurrentOperation(selected.value);
              dataInsertHandler("operationMode", selected.value);
            }}
          />
          <Show when={currentOperation() === "retrieveDocumentsAsVectorStore"}>
            <TextBlock>
              This node must be connected to a vector store retriever.{" "}
              <a href="#" class="font-semibold text-[#fe705a]">
                Insert one
              </a>
            </TextBlock>
          </Show>
          <Show when={currentOperation() === "retrieveDocumentsAsTool"}>
            <DynamicInput
              name="name"
              title="Name"
              uniqueKey={uniqueKey()}
              value={previousData()["name"]}
              toolTipText="Name of the vector store."
              placeholder="e.g. company_knowledge_base"
              isArrow
              onInput={(value) => {
                dataInsertHandler("name", value);
              }}
            />
            <TextArea
              name="description"
              title="Description"
              uniqueKey={uniqueKey()}
              value={previousData()["name"]}
              toolTipText="Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often."
              placeholder="e.g. work with your data in postgresql with the PgVector extension."
              onInput={(value) => {
                dataInsertHandler("description", value);
              }}
            />
          </Show>
          <DynamicInput
            name="tableName"
            title="Table Name"
            uniqueKey={uniqueKey()}
            toolTipText="The table name to store the vectors in. If table does not exist, it will be created."
            value={previousData()["tableName"] || "repoRunner_vectors"}
            isArrow
            onInput={(value) => {
              dataInsertHandler("tableName", value);
            }}
          />
          <Show when={currentOperation() === "getMany"}>
            <DynamicInput
              name="limit"
              title="Limit"
              uniqueKey={uniqueKey()}
              toolTipText="Number of top results to fetch from vector store."
              value={previousData()["limit"] || "4"}
              onInput={(value) => {
                dataInsertHandler("limit", value);
              }}
            />
          </Show>
          <Show when={currentOperation() === "getMany"}>
            <DynamicInput
              name="prompt"
              title="Prompt"
              uniqueKey={uniqueKey()}
              value={previousData()["prompt"] || "How Are you?"}
              toolTipText="Search prompt to retrieve matching documents from the vector store using similarity-based ranking."
              onInput={(value) => {
                dataInsertHandler("prompt", value);
              }}
            />
          </Show>
          <Show
            when={
              currentOperation() === "getMany" ||
              currentOperation() === "retrieveDocumentsAsTool"
            }
          >
            <Switch
              name="includeMetadata"
              title="Include Metadata"
              uniqueKey={uniqueKey()}
              checked={previousData()["includeMetadata"]}
              toolTipText="Whether or not to include document metadata."
              onChange={(state) => {
                dataInsertHandler("includeMetadata", state);
              }}
            />
          </Show>
        </div>
        <div class="mt-5">
          <div class="label hr-solid-line">Options</div>
          <div class={`mt-5`}>
            <div class="space-y-10">
              <For each={selectedOptions()}>
                {(item, index) => {
                  if (item.value === "distanceStrategy") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <Delete
                          onClick={() => {
                            const newSelectedOption = selectedOptions().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedOptions(newSelectedOption);
                            setOptions([...options(), item]);
                            dataRemoveHandler(item.value);
                          }}
                        />
                        <div class="flex-1">
                          <DropDownN
                            name={item.content.name}
                            options={item.content.options ?? []}
                            defaultValue={
                              previousData()[item.content.name] ||
                              item.content.options?.[0]?.value
                            }
                            uniqueKey={uniqueKey()}
                            toolTipText={item.content.toolTipText}
                            title={item.content.title}
                            onChange={(selected) => {
                              dataInsertHandler(
                                item.content.name,
                                selected.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  } else if (item.value === "collection") {
                    // dataInsertHandler(item.value, "");
                    return (
                      <div>
                        <div class="group flex items-start gap-1.5 w-full">
                          <Delete
                            onClick={() => {
                              const newSelectedOption =
                                selectedOptions().filter(
                                  (opt) => opt.value !== item.value
                                );
                              setSelectedOptions(newSelectedOption);
                              setOptions([...options(), item]);
                              dataRemoveHandler(item.value);
                            }}
                          />
                          <div class="flex-1">
                            <div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">
                              Collection
                            </div>
                            <div class="group flex items-start gap-1.5 w-full mt-5">
                              <Delete
                                onClick={() => {
                                  const newSelectedOption =
                                    selectedOptions().filter(
                                      (opt) => opt.value !== item.value
                                    );
                                  setSelectedOptions(newSelectedOption);
                                  setOptions([...options(), item]);
                                  dataRemoveHandler(item.value);
                                }}
                              />
                              <div class="flex-1 space-y-5">
                                <Switch
                                  uniqueKey={uniqueKey()}
                                  checked={previousData()[item.content.name]}
                                  name={item.content.name}
                                  title={item.content.title ?? ""}
                                  onChange={(state) => {
                                    setIsCollection(state);
                                    dataInsertHandler(item.content.name, state);
                                  }}
                                />
                                <Show when={isCollection()}>
                                  <For each={collectionChild}>
                                    {(item, _) => {
                                      return (
                                        <DynamicInput
                                          name={item.name}
                                          value={
                                            previousData()[item.name] || "---"
                                          }
                                          title={item.title}
                                          uniqueKey={uniqueKey()}
                                          isArrow
                                          onInput={(value) => {
                                            dataInsertHandler(item.name, value);
                                          }}
                                        />
                                      );
                                    }}
                                  </For>
                                </Show>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else if (item.value === "columnNames") {
                    // dataInsertHandler(item.value, "");
                    return (
                      <div>
                        <div class="group flex items-start gap-1.5 w-full">
                          <Delete
                            onClick={() => {
                              const newSelectedOption =
                                selectedOptions().filter(
                                  (opt) => opt.value !== item.value
                                );
                              setSelectedOptions(newSelectedOption);
                              setOptions([...options(), item]);
                              dataRemoveHandler(item.value);
                            }}
                          />
                          <div class="flex-1">
                            <div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">
                              Column Names
                            </div>
                            <div class="group flex items-start gap-1.5 w-full mt-5">
                              <Delete
                                onClick={() => {
                                  const newSelectedOption =
                                    selectedOptions().filter(
                                      (opt) => opt.value !== item.value
                                    );
                                  setSelectedOptions(newSelectedOption);
                                  setOptions([...options(), item]);
                                  dataRemoveHandler(item.value);
                                }}
                              />
                              <div class="flex-1 space-y-5">
                                <For each={columnNamesChild}>
                                  {(item, _) => {
                                    return (
                                      <DynamicInput
                                        name={item.name}
                                        value={
                                          previousData()[item.name] || "---"
                                        }
                                        title={item.title}
                                        uniqueKey={uniqueKey()}
                                        isArrow
                                        onInput={(value) => {
                                          dataInsertHandler(item.name, value);
                                        }}
                                      />
                                    );
                                  }}
                                </For>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else if (item.value === "metadataFilter") {
                    return (
                      <div>
                        <div class="group flex items-start gap-1.5 w-full">
                          <Delete
                            onClick={() => {
                              const newSelectedOption =
                                selectedOptions().filter(
                                  (opt) => opt.value !== item.value
                                );
                              setSelectedOptions(newSelectedOption);
                              setOptions([...options(), item]);
                              dataRemoveHandler("metadata");
                            }}
                          />
                          <div class="flex-1">
                            <div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">
                              Metadata Filter
                            </div>
                            <div class="group flex items-start gap-1.5 w-full mt-5">
                              <div class="flex-1 space-y-10">
                                {metadataFilter().length <= 0 && (
                                  <div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                                    Currently no items exist
                                  </div>
                                )}
                                <div class="">
                                  <For each={metadataFilter()}>
                                    {(id, i) => {
                                      return (
                                        <div
                                          class={`group flex items-start gap-1.5 w-full ${
                                            i() !== 0
                                              ? "border-t border-dashed border-[#727171] pt-8 mt-8"
                                              : ""
                                          }`}
                                        >
                                          <Delete
                                            onClick={() => {
                                              setMetadataFilter((prev) =>
                                                prev.filter(
                                                  (item) => item !== id
                                                )
                                              );
                                              dataRemoveHandler(id);
                                            }}
                                          />
                                          <div class="flex flex-col gap-5 w-full">
                                            <DynamicInput
                                              name={`${id}_name`}
                                              value={
                                                previousData()[`${id}_name`]
                                              }
                                              title="Name"
                                              isArrow
                                              onInput={(value) => {
                                                dataInsertHandler(
                                                  `${id}_name`,
                                                  value
                                                );
                                              }}
                                            />
                                            <DynamicInput
                                              name={`${id}value`}
                                              title="Value"
                                              value={
                                                previousData()[`${id}_value`]
                                              }
                                              isArrow
                                              onInput={(value) => {
                                                dataInsertHandler(
                                                  `${id}_value`,
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
                                <div class="">
                                  <ButtonSolid
                                    onClick={() => {
                                      setMetadataFilter([
                                        ...metadataFilter(),
                                        `metadata_${Math.random()
                                          .toString(36)
                                          .substring(2, 8)}`,
                                      ]);
                                    }}
                                    label="Add Filter Field"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              </For>
            </div>
            {/* <Show when={!!selectedOptions().find(opt => opt.value === "distanceStrategy")}>
          <DropDownN
          
          />
          </Show> */}
            <div class="mt-5">
              <DropDownFilter
                name="options_edit_node"
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                dropdownOptions={options}
                setDropdownOptions={setOptions}
                placeholder="Add options"
                onChange={(selectedOption) => {
                  setSelectedOptions(selectedOption);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PgVectorStoreParameter;
