import { createSignal, createMemo, createEffect, onMount } from "solid-js";
import { FilterOption } from "./GmailType";
import { filterStore, optionStore, poolTimesOptions } from "./GmailConfig";
import { gmailNodeDataEncoder } from "./gmailNodeDataEncoder";
import useStateContext from "../../../../../useStateContext";
import { ReproductiveChildren } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import { gmailNodeDataDecoder } from "./gmailNodeDataDecoder";

export default function useGmailParameterState() {
  const { formData, setFormData, currentFormConfig } = useStateContext();
  const [filters, setFilters] = createSignal<FilterOption[]>([]);
  const [options, setOptions] = createSignal<FilterOption[]>([]);
  const [pollTimes, setPollTimes] = createSignal<string[]>([]);
  const [mode, setMode] = createSignal<Record<string, string>>({});
  const [modeChild, setModeChild] = createSignal<Record<string, any>>({});
  const [modeChildValue, setModeChildValue] = createSignal<
    Record<string, string | number | boolean>
  >({});
  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [selectedFilter, setSelectedFilter] = createSignal<FilterOption[]>([]);
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [previousData, setPreviousData] = createSignal<Record<string, any>>({});
  const [uniqueKey, setUniqueKey] = createSignal<string>("");

  const triggerKey = new Set();
  onMount(() => {
    setFilters(filterStore);
    setOptions(optionStore);
  });
  const reset = () => {
    setSubmittedData({});
    setPollTimes([]);
    setMode({});
    setModeChild({});
    setSelectedFilter([]);
    setSelectedOptions([]);
    setPreviousData({});
    setFilters(filterStore);
    setOptions(optionStore);
  };

  // const dataHandler = (fieldName: string, data: any) => {
  //   // const isKeyExistInPreviousData = previousData()[fieldName];
  //   console.log("from data handler raw >>>> ", fieldName, " >>>>> ", data);
  //   console.log(
  //     "from data handler, 2 >>> both key and data changed",
  //     previousData()
  //   );
  //   console.log(
  //     "from data handler:::: >> submitted data 1  >>> both key and data changed",
  //     submittedData()
  //   );
  //   setSubmittedData((prev) => ({
  //     ...prev,
  //     [fieldName]: data,
  //   }));
  //   console.log(
  //     "from data handler:::: >> submitted data 2 >>> both key and data changed",
  //     submittedData()
  //   );

  //   const formatted = gmailNodeDataEncoder(
  //     submittedData(),
  //     currentFormConfig().id
  //   );
  //   console.log(
  //     "from data handler:::: >> formatted >>> both key and data changed",
  //     formatted
  //   );

  //   setFormData({
  //     ...formData(),
  //     [currentFormConfig().id]: formatted,
  //   });
  //   console.log(
  //     "from data handler:::: >> formData() >>> both key and data changed",
  //     formData()
  //   );
  // };
  const dataHandler = (fieldName: string, data: any) => {
    // const isKeyExistInPreviousData = previousData()[fieldName];
    console.log("from data handler raw >>>> ", fieldName, " >>>>> ", data);
    console.log("before check from data handler", previousData());
    if (fieldName in previousData()) {
      if (previousData()[fieldName] === data) {
        console.log(
          "from data handler:::: >> submitted Data,>>> data unchanged, key unchanged",
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
        console.log(
          "from data handler:::: >> form data >>> data unchanged, key unchanged",
          formData()
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

        const formatted = gmailNodeDataEncoder(
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

      const formatted = gmailNodeDataEncoder(
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
    console.log(" from data remover submitted>>>> pre data", submittedData());
    setSubmittedData((prev) => {
      return Object.entries(prev).reduce((acc, [k, v]: [string, any]) => {
        if (!k.includes(fieldName)) {
          acc[k] = v;
        }
        return acc;
      }, {} as Record<string, any>);
    });
    console.log(" from data remover submitted>>>> post data", submittedData());
    const formattedPrev = gmailNodeDataEncoder(
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
      selectedOptions(),
      "\n",
      selectedFilter()
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
      if (!data) {
        reset();
        return;
      }
      reset();
      console.log("data2", data);
      const decoded = gmailNodeDataDecoder(data);
      if (decoded) {
        console.log(
          "decoded from observer, >>>>>> ",
          currentFormConfig().id,
          decoded?.filters,
          decoded.options
        );
        setPreviousData((prev: any) => ({
          ...prev,
          simplify: decoded.simplify,
          ...decoded.pollTimes.parseModesData,
          ...decoded.filters,
          ...decoded.options,
          // ...decoded.pollTimes.parseModesData,
        }));
        console.log(previousData(), "from inside");
        console.log(
          decoded.pollTimes.parseModesData,
          "from inside parseModesData"
        );
        // setParsedData(decoded ?? {});
        setPollTimes(decoded.pollTimes.parsedPollTimes ?? []);
        setMode(decoded.pollTimes.parsedModes ?? {});
        setDropDownFilterOption(
          Object.keys(decoded.filters),
          filterStore,
          setSelectedFilter
        );
        setFilters(() => {
          return filterStore.filter((item) => {
            return selectedFilter().every((selected) => {
              return selected.value !== item.value;
            });
          });
        });
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
      // setSelectedFilter(decoded.selectedFilter);
      // setSelectedOptions(decoded.selectedOptions);
    }
  });

  return {
    pollTimes,
    setPollTimes,
    mode,
    setMode,
    selectedOptions,
    setSelectedOptions,
    selectedFilter,
    setSelectedFilter,
    submittedData,
    dataHandler,
    modeChild,
    setModeChild,
    filters,
    setFilters,
    options,
    setOptions,
    previousData,
    setPreviousData,
    setSubmittedData,
    dataRemoveHandler,
    uniqueKey,
  };
}
