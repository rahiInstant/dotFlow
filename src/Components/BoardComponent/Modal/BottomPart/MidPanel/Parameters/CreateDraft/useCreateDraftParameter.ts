import { createSignal, createMemo, createEffect } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import {
  ReproductiveChildren,
  ReproductiveDropDownOption,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import {
  approvalOption,
  defineFormOption,
  limitTypeOption,
  messageOperationOption,
  resourceOption,
  responseTypeOption,
  toolDescriptionOption,
} from "./CreateDraftParameterConfig";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import { createDraftNodeDataEncoder } from "./createDraftDataEncoder";
import { createDraftNodeDataDecoder } from "./createDraftDataDecoder";

export default function useCreateDraftNodeParameterState() {
  const { formData, setFormData, currentFormConfig } = useStateContext();
  const [currentToolDescription, setCurrentToolDescription] =
    createSignal<ReproductiveDropDownOption>(toolDescriptionOption[0]);
  const [resource, setResource] = createSignal<string>(
    resourceOption[0].value
  );
  const [operation, setOperation] = createSignal<ReproductiveDropDownOption[]>(
    []
  );
  const [selectedOperation, setSelectedOperation] =
    createSignal<ReproductiveDropDownOption>(messageOperationOption[0]);

  const [selectedFilter, setSelectedFilter] = createSignal<FilterOption[]>([]);
  const [filters, setFilters] = createSignal<FilterOption[]>([]);
  const [option, setOption] = createSignal<FilterOption[]>([]);
  const [selectedOption, setSelectedOption] = createSignal<FilterOption[]>([]);
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
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [previousData, setPreviousData] = createSignal<Record<string, any>>({});
  const [uniqueKey, setUniqueKey] = createSignal<string>("");
  const triggerKey = new Set();

  const reset = () => {
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

        const formatted = createDraftNodeDataEncoder(
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

      const formatted = createDraftNodeDataEncoder(
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
    const formattedPrev = createDraftNodeDataEncoder(
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
      const decoded = createDraftNodeDataDecoder(data);
      if (decoded) {
        console.log(
          "decoded from observer, >>>>>> ",
          currentFormConfig().id,
          decoded.field,
          decoded.fieldData
        );
        setPreviousData((prev: any) => ({
          ...prev,
          mode: decoded.mode,
          ...decoded.fieldData,
          // ...decoded.pollTimes.parseModesData,
        }));
        console.log(previousData(), "from inside");
        console.log(decoded.fieldData, "from inside createEffect");
        // setParsedData(decoded ?? {});

      }
    }
  });

  return {
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
  };
}
