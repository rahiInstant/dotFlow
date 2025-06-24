import { createSignal, createEffect } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import {
  agentOptions,
  dataSourceConfig,
  optionStore,
  sourceForPrompt,
} from "./AiAgentConfigs";
import { aiAgentNodeDataEncoder } from "./aiAgentNodeDataEncoder";
import { aiAgentNodeDataDecoder } from "./aiAgentNodeDataDecoder";

export default function useAiAgentNodeParameterState() {
  const { formData, setFormData, currentFormConfig } = useStateContext();
  const [currentAgent, setCurrentAgent] = createSignal<string>(
    agentOptions[0].value
  );
  const [currentSourceForPrompt, setCurrentSourceForPrompt] =
    createSignal<string>(sourceForPrompt[0].value);
  const [dataSource, setDataSource] = createSignal<string>(
    dataSourceConfig[0].value
  );

  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [options, setOptions] = createSignal<FilterOption[]>([]);
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [previousData, setPreviousData] = createSignal<Record<string, any>>({});
  const [uniqueKey, setUniqueKey] = createSignal<string>("");
  const triggerKey = new Set();

  const reset = () => {
    setOptions(optionStore);
    setSelectedOptions([]);
    setSubmittedData({});
    setPreviousData({});
  };

  const dataInsertHandler = (fieldName: string, data: any) => {
    // const isKeyExistInPreviousData = previousData()[fieldName];
    console.log("from data handler raw >>>> ", fieldName, " >>>>> ", data);
    console.log("before check: previous data from dataHandler", previousData());
    if (fieldName in previousData()) {
      if (previousData()[fieldName] === data) {
        console.log(
          "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
          submittedData()
        );
        setSubmittedData((prev) => ({
          ...prev,
          [fieldName]: data,
        }));
        console.log(
          "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
          submittedData()
        );
        return;
      } else if (previousData()[fieldName] !== data) {
        console.log(
          "from data handler, 2,>>> key unchanged but data changed",
          previousData()
        );
        console.log(
          "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
          submittedData()
        );
        setSubmittedData((prev) => ({
          ...prev,
          [fieldName]: data,
        }));
        console.log(
          "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
          submittedData()
        );

        const formatted = aiAgentNodeDataEncoder(
          submittedData(),
          currentFormConfig().id
        );
        console.log(
          "from data handler:::: >> formatted key >>>  unchanged but data changed",
          formatted
        );

        setFormData({
          ...formData(),
          [currentFormConfig().id]: formatted,
        });
        console.log(
          "from data handler:::: >> formData() >>> key unchanged but data changed",
          formData()
        );
      }
    } else {
      console.log(
        "from data handler, 2 >>> both key and data changed",
        previousData()
      );
      console.log(
        "from data handler:::: >> submitted data 1  >>> both key and data changed",
        submittedData()
      );
      setSubmittedData((prev) => ({
        ...prev,
        [fieldName]: data,
      }));
      console.log(
        "from data handler:::: >> submitted data 2 >>> both key and data changed",
        submittedData()
      );

      const formatted = aiAgentNodeDataEncoder(
        submittedData(),
        currentFormConfig().id
      );
      console.log(
        "from data handler:::: >> formatted >>> both key and data changed",
        formatted
      );

      setFormData({
        ...formData(),
        [currentFormConfig().id]: formatted,
      });
      console.log(
        "from data handler:::: >> formData() >>> both key and data changed",
        formData()
      );
    }
  };

  const dataRemoveHandler = (fieldName: string) => {
    console.log("from data remover raw >>>> ", fieldName, " >>>>>> ");
    setSubmittedData((prev) => {
      return Object.entries(prev).reduce((acc, [k, v]: [string, any]) => {
        if (!k.includes(fieldName)) {
          acc[k] = v;
        }
        return acc;
      }, {} as Record<string, any>);
    });
    console.log(" from data remover >>>> previous data", submittedData());
    const formattedPrev = aiAgentNodeDataEncoder(
      submittedData(),
      currentFormConfig().id
    );

    console.log("from data remover >>>>> formattedPrev", formattedPrev);

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedPrev,
    });
    console.log("from data remover >>> form data", formData());
  };

  const setDropDownFilterOption = (
    keys: string[],
    store: FilterOption[],
    setSelected: (update: (prev: FilterOption[]) => FilterOption[]) => void
  ) => {
    console.log(keys, "not ok");
    const newOptions = keys.flatMap((item) =>
      store.filter((option) => option.value === item)
    );
    console.log(newOptions, "ok");
    setSelected((prev) => [...prev, ...newOptions]);
  };

  createEffect(() => {
    console.log(
      currentFormConfig().id,
      "  >  node data  >  ",
      "\n",
      selectedOptions()
    );
    console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(parsedData(), "parsed data");
    console.log(previousData(), "from outside");
    if (!triggerKey.has(currentFormConfig().id)) {
      triggerKey.clear();
      triggerKey.add(currentFormConfig().id);
      setUniqueKey(currentFormConfig().id);
      const data = formData()[currentFormConfig().id];
      console.log("data1", data);
      reset();
      if (!data) {
        return;
      }
      // reset();
      console.log("data2", data);
      const decoded = aiAgentNodeDataDecoder(data);
      if (decoded) {
        console.log(
          "decoded from observer, >>>>>> ",
          currentFormConfig().id,
          decoded.agent,
          decoded.sourceForPrompt
        );
        setPreviousData((prev: any) => ({
          ...prev,
          agent: decoded.agent,
          sourceForPrompt: decoded.sourceForPrompt,
          promptDefineBelow: decoded.promptDefineBelow,
          promptConnectedChatTriggerNode:
            decoded.promptConnectedChatTriggerNode,
          ...decoded.options,
        }));
        console.log(previousData(), "from inside");
        console.log(decoded.sourceForPrompt, "from inside createEffect");
        setCurrentAgent(decoded.agent)
        setCurrentSourceForPrompt(decoded.sourceForPrompt);

        // setParsedData(decoded ?? {});
        setDropDownFilterOption(
          Object.keys(decoded.options),
          optionStore,
          setSelectedOptions
        );
        setOptions(() => {
          return optionStore.filter((item) => {
            return selectedOptions().every((selected) => {
              return selected.value !== item.value;
            });
          });
        });
      }
    }
  });

  return {
    selectedOptions,
    setSelectedOptions,
    submittedData,
    dataInsertHandler,
    options,
    setOptions,
    previousData,
    setPreviousData,
    setSubmittedData,
    dataRemoveHandler,
    reset,
    uniqueKey,
    currentAgent,
    setCurrentAgent,
    currentSourceForPrompt,
    setCurrentSourceForPrompt,
    dataSource,
    setDataSource,
  };
}
