import { createSignal, createEffect } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { vectorStoreNodeDataEncoder } from "./vectorStoreDataEncoder";
import { vectorStoreNodeDataDecoder } from "./vectorStoreDataDecoder";

export default function useVectorStoreNodeParameterState() {
  const { formData, setFormData, currentFormConfig } = useStateContext();
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

        const formatted = vectorStoreNodeDataEncoder(
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

      const formatted = vectorStoreNodeDataEncoder(
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

  createEffect(() => {
    console.log(currentFormConfig().id, "  >  node data  >  ", "\n");
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
      const decoded = vectorStoreNodeDataDecoder(data);
      if (decoded) {
        console.log("decoded from observer, >>>>>> ", currentFormConfig().id);
        setPreviousData((prev: any) => ({
          ...prev,
          ...decoded,
        }));
        console.log(previousData(), "from inside");
      }
    }
  });

  return {
    dataInsertHandler,
    previousData,
    uniqueKey,
  };
}
