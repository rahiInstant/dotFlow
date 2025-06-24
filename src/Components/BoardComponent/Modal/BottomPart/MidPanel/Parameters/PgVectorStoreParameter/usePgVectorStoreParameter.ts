import { createSignal, createMemo, createEffect } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { pgVectorStoreNodeDataEncoder } from "./pgVectorStoreDataEncoder";
import { pgVectorNodeDataDecoder } from "./pgVectorStoreDataDecoder";
import { operation, pgVectorOption } from "./PgVectorStoreParameterConfig";
import { ReproductiveDropDownOption } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";

export default function usePgVectorNodeParameterState() {
  const { formData, setFormData, currentFormConfig } = useStateContext();
  const [currentOperation, setCurrentOperation] = createSignal<string>(
    operation[0].value
  );
  const [metadataFilter, setMetadataFilter] = createSignal<string[]>([]);
  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [options, setOptions] = createSignal<FilterOption[]>([]);
  const [isCollection, setIsCollection] = createSignal(false);
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [previousData, setPreviousData] = createSignal<Record<string, any>>({});
  const [uniqueKey, setUniqueKey] = createSignal<string>("");
  const triggerKey = new Set();

  const reset = () => {
    setOptions(pgVectorOption);
    setSelectedOptions([]);
    setSubmittedData({});
    setPreviousData({});
    setMetadataFilter([]);
    setCurrentOperation("");
    setIsCollection(false)
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

        const formatted = pgVectorStoreNodeDataEncoder(
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

      const formatted = pgVectorStoreNodeDataEncoder(
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
        if (!k.toLowerCase().includes(fieldName.toLowerCase())) {
          acc[k] = v;
        }
        return acc;
      }, {} as Record<string, any>);
    });
    console.log(" from data remover >>>> previous data", submittedData());
    const formattedPrev = pgVectorStoreNodeDataEncoder(
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
      const decoded = pgVectorNodeDataDecoder(data);
      if (decoded) {
        console.log(
          "decoded from observer, >>>>>> ",
          currentFormConfig().id,
          decoded.options,
          decoded.metadataFilter
        );
        console.log("from effect test ", {
          ...(decoded.options.useCollection && {
            ...decoded.options.useCollection.values,
          }),
        });
        setPreviousData((prev: any) => ({
          operationMode: decoded.operationMode,
          tableName: decoded.tableName,
          limit: decoded.limit,
          prompt: decoded.prompt,
          includeMetadata: decoded.includeMetadata,
          ...(decoded.options.distanceStrategy && {
            distanceStrategy: decoded.options.distanceStrategy,
          }),
          ...(decoded.options.collection && {
            ...decoded.options.collection.values,
          }),
          ...(decoded.options.columnNames && {
            ...decoded.options.columnNames.values,
          }),
          ...decoded.metadataFilter,

          // ...decoded.pollTimes.parseModesData,
        }));
        console.log(previousData(), "from inside");
        console.log(decoded.metadataFilter, "from inside createEffect");
        setCurrentOperation(decoded.operationMode);
        setMetadataFilter(decoded.metadataIds);
        // setParsedData(decoded ?? {});
        setDropDownFilterOption(
          Object.keys(decoded.options),
          pgVectorOption,
          setSelectedOptions
        );
        setOptions(() => {
          return pgVectorOption.filter((item) => {
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
  };
}
