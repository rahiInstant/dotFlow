import { createSignal, createMemo, createEffect } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { ReproductiveChildren } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { modeStore, options } from "./SwitchNodeParameterConfig";
import { switchNodeDataEncoder } from "./switchNodeDataEncoder";
import { switchNodeDataDecoder } from "./switchNodeDataDecoder";

export default function useSwitchNodeParameterState() {
  const {
    formData,
    setFormData,
    currentFormConfig,
    nodes,
    setNodes,
    edges,
    setEdges,
  } = useStateContext();
  const [currentMode, setCurrentMode] = createSignal<string>(
    modeStore[0].value
  );
  const [field, setField] = createSignal<
    Array<{ fieldId: string; vertexId: string }>
  >([]);

  const [matchInput, setMatchInput] = createSignal<Record<string, boolean>>({});

  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [switchOptions, setSwitchOptions] = createSignal<FilterOption[]>([]);
  const [renameOutput, setRenameOutput] = createSignal<Record<string, boolean>>(
    {}
  );

  const [inputStore, setInputStore] = createSignal<
    Record<
      string,
      {
        [key: string]: string;
      }
    >
  >({});
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [previousData, setPreviousData] = createSignal<Record<string, any>>({});
  const [uniqueKey, setUniqueKey] = createSignal<string>("");
  const triggerKey = new Set();

  const reset = () => {
    setSwitchOptions(options);
    setSelectedOptions([]);
    setField([]);
    setCurrentMode(modeStore[0].value);
    setSubmittedData({});
    setPreviousData({});
    setRenameOutput({});
    setInputStore({});
    setMatchInput({});
  };

  const addInitialField = () => {
    const newField = `rule_${Math.random().toString(36).substring(2, 8)}`;
    setField((prev) => [
      ...prev,
      {
        fieldId: newField,
        vertexId:
          nodes().find((node) => node.id === currentFormConfig().id)
            ?.outputVertexIds[0] || "",
      },
    ]);
    // setField((prev) => {
    //   const safePrev = Array.isArray(prev) ? prev : [];
    //   return [
    //     ...safePrev,
    //     {
    //       fieldId: newField,
    //       vertexId:
    //         nodes().find((node) => node.id === currentFormConfig().id)
    //           ?.outputVertexIds[0] || "",
    //     },
    //   ];
    // });
    setRenameOutput({
      ...renameOutput(),
      [newField]: false,
    });
    setMatchInput({
      ...matchInput(),
      [newField]: true,
    });
  };

  const handleRoutingRulesNameValueMatch = (
    itemId: string,
    fieldType: string,
    value: any
  ) => {
    // console.log({itemId, fieldId, value});
    setInputStore((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [fieldType]: value,
      },
    }));
    // console.log(inputStore()[itemId]);
    if (inputStore()[itemId]) {
      // console.log(inputStore()[itemId].name === inputStore()[itemId].value);
      if (inputStore()[itemId].name === inputStore()[itemId].value) {
        setMatchInput({
          ...matchInput(),
          [itemId]: true,
        });
      } else {
        setMatchInput({
          ...matchInput(),
          [itemId]: false,
        });
      }
    }
  };

  const handleIncreaseSwitchNodeVertex = (newVertexId: string) => {
    // const newVertexId = `vertex_${Math.random().toString(36).substring(2, 8)}`;
    setNodes(
      nodes().map((node) =>
        node.id === currentFormConfig().id
          ? {
              ...node,
              outputVertexIds: [...node.outputVertexIds, newVertexId],
              numberOutputs: field().length,
            }
          : node
      )
    );

    const node = nodes().find((node) => node.id === currentFormConfig().id);
    if (node) {
      node.outputVertexIds.forEach((id) => {
        console.log("from increase vertex ids", id);
        const vertexRef = document.getElementById(id);
        console.log("from vertex Ref", vertexRef);
        const { left, right, top, bottom } = vertexRef!.getBoundingClientRect();
        const centerX = left + Math.abs(left - right) / 2;
        const centerY = top + Math.abs(top - bottom) / 2;
        console.log('from center',{ x: centerX, y: centerY });
        edges()
          .filter((edge) => edge.outputVertexId === id)
          .forEach((edge) => {
            edge.currStartPosition.set({ x: centerX, y: centerY });
          });
        setEdges([...edges()]);
      });
    }
  };

  const handleDecreaseSwitchNodeVertex = (removeVertexId: string) => {
    setNodes(
      nodes().map((node) =>
        node.id === currentFormConfig().id
          ? {
              ...node,
              outputVertexIds: [
                ...node.outputVertexIds.filter((id) => {
                  return id !== removeVertexId;
                }),
              ],
              numberOutputs: field().length,
            }
          : node
      )
    );
  };

  const isEqual = (a: any, b: any): boolean => {
    // If both values are exactly the same (primitive or same reference)
    if (a === b) return true;

    // If types are different, they cannot be equal
    if (typeof a !== typeof b) return false;

    // If one is null but not both, they are not equal
    if (a === null || b === null) return false;

    // Fast check: stringified versions match
    if (typeof a === "object" && typeof b === "object") {
      if (JSON.stringify(a) === JSON.stringify(b)) return true;
    }

    // Handle array comparison
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;

      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // If one is array and the other is not, they are not equal
    if (Array.isArray(a) || Array.isArray(b)) return false;

    // Handle object comparison
    if (typeof a === "object" && typeof b === "object") {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.length !== bKeys.length) return false;

      for (let key of aKeys) {
        if (!b.hasOwnProperty(key)) return false;
        if (!isEqual(a[key], b[key])) return false;
      }
      return true;
    }

    // If none of the above matched, they are not equal
    return false;
  };

  const getValue = (fieldName: string) => {
    // const data = previousData();
    return previousData()[fieldName];
  };

  const dataInsertHandler = (fieldName: string, data: any) => {
    // const isKeyExistInPreviousData = previousData()[fieldName];
    console.log("from data handler raw >>>> ", fieldName, " >>>>> ", data);
    console.log("before check: previous data from dataHandler", previousData());
    if (fieldName in previousData()) {
      if (isEqual(previousData()[fieldName], data)) {
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
        console.log(
          "from data handler:::: >> forms data  >>> data unchanged, key unchanged",
          formData()
        );
        return;
      } else if (!isEqual(getValue(fieldName), data)) {
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

        const formatted = switchNodeDataEncoder(
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

      const formatted = switchNodeDataEncoder(
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
    const formattedPrev = switchNodeDataEncoder(
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
        addInitialField();
        return;
      }
      // reset();
      console.log("data2", data);
      const decoded = switchNodeDataDecoder(data);
      if (decoded) {
        console.log(
          "decoded from observer, >>>>>> ",
          currentFormConfig().id,
          decoded.rulesIds,
          decoded.rulesData
        );
        setCurrentMode(decoded.mode ?? "");
        setPreviousData((prev: any) => ({
          ...prev,
          mode: decoded.mode,
          ...decoded.rulesData,
          // ...decoded.pollTimes.parseModesData,
        }));
        console.log(previousData(), "from inside");
        console.log(decoded.rulesData, "from inside createEffect");
        setRenameOutput(decoded.renameOutput);

        console.log("previous setField in effect");
        setField((prev) => {
          const outputVertexIds = nodes().find(
            (node) => node.id === currentFormConfig().id
          )?.outputVertexIds;

          console.log("from setField and into createEffect", outputVertexIds);
          if (decoded.rulesIds.length === outputVertexIds?.length) {
            return decoded.rulesIds.map((id, index) => ({
              fieldId: id,
              vertexId: outputVertexIds[index],
            }));
          }
          // else {
          //   const restVertexNum = Math.abs(
          //     decoded.rulesIds.length - (outputVertexIds?.length ?? 0)
          //   );
          //   const restVertexIds = [
          //     ...Array(Number(restVertexNum))
          //       .keys()
          //       .map(() => {
          //         const id = `vertex_${Math.random()
          //           .toString(36)
          //           .substring(2, 8)}`;
          //         return id;
          //       }),
          //   ];
          //   restVertexIds.forEach((id) => {
          //     handleIncreaseSwitchNodeVertex(id);
          //   });

          //   const finalVertexIds = [...restVertexIds, ...(outputVertexIds ?? [])]
          //   return decoded.rulesIds.map((id, index) => ({
          //     fieldId: id,
          //     vertexId: finalVertexIds[index],
          //   }));

          // }

          return (outputVertexIds ?? []).map((id, index) => ({
            fieldId: decoded.rulesIds[index],
            vertexId: id,
          }));
        });
        console.log("after setField in effect", field());
      }
    }
  });

  return {
    selectedOptions,
    setSelectedOptions,
    dataInsertHandler,
    previousData,
    dataRemoveHandler,
    currentMode,
    setCurrentMode,
    field,
    setField,
    uniqueKey,
    renameOutput,
    setRenameOutput,
    inputStore,
    setInputStore,
    switchOptions,
    setSwitchOptions,
    matchInput,
    setMatchInput,
    handleRoutingRulesNameValueMatch,
    handleIncreaseSwitchNodeVertex,
    handleDecreaseSwitchNodeVertex,
    addInitialField,
    getValue,
  };
}
