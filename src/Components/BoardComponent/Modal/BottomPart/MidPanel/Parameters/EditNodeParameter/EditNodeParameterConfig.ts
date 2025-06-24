import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";

const optionStoreForJSON: FilterOption[] = [
  {
    label: "Support Dot Notation",
    value: "supportDotNotation",
    content: {
      type: "switch",
      name: "supportDotNotation",
      title: "Support Dot Notation",
      toolTipText: `By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }. If that is not intended this can be deactivated, it will then set { "a.b": value } instead.`,
    },
  },
];

const optionStoreForManualMapping: FilterOption[] = [
  {
    label: "Ignore Type Conversion Errors",
    value: "ignoreTypeConversionErrors",
    content: {
      type: "switch",
      name: "ignoreTypeConversionErrors",
      title: "Ignore Type Conversion Errors",
      toolTipText:
        "Whether to ignore field type errors and apply a less strict type conversion",
    },
  },
  ...optionStoreForJSON,
];

const modeStore: DropDownNOption[] = [
  {
    label: "Manual Mapping",
    value: "Manual Mapping",
    description: "Edit itemFields one by one.",
  },
  {
    label: "JSON",
    value: "JSON",
    description: "Customize item output with JSON.",
  },
];

const typeStore: DropDownNOption[] = [
  {
    label: "𝔸  String",
    value: "String",
  },
  {
    label: "#  Number",
    value: "Number",
  },
  {
    label: "🗹  Boolean",
    value: "Boolean",
  },
  {
    label: "⊞  Array",
    value: "Array",
  },
  {
    label: "{.}  Object",
    value: "Object",
  },
];

export { optionStoreForJSON, optionStoreForManualMapping, modeStore, typeStore};
