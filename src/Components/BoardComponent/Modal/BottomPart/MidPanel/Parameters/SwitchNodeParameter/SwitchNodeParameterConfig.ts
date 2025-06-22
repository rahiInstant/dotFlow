import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { Option } from "../../../../Component lib/DropDown/DropDownMultiple/DropDownMultiple";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import { ParentOption } from "../../../../Component lib/DropDown/StepsDropDown/StepsDropDown";

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

const options: FilterOption[] = [
  {
    label: "Fallback Output",
    value: "fallbackOutput",
    content: {
      type: "DropDownN",
      name: "fallbackOutput",
      title: "Fallback Output",
      toolTipText:
        "If no rule matches the item will be sent to this output, by default they will be ignored.",
      options: [
        {
          label: "None (Default)",
          value: "noneDefault",
          description: "Items will be ignored.",
        },
        {
          label: "Extra Output",
          value: "extraOutput",
          description: "Items will be sent to the extra, separate, output.",
        },
        {
          label: "Output 0",
          value: "output0",
          description:
            "Items will be sent to the same output as when matched rule 1.",
        },
      ],
    },
  },
  {
    label: "Ignore Case",
    value: "ignoreCase",
    content: {
      type: "switch",
      name: "ignoreCase",
      title: "Ignore Case",
      toolTipText: "Whether to ignore letter case when evaluating conditions.",
    },
  },
  {
    label: "Send data to all matching outputs",
    value: "sendDataToAllMatchingOutputs",
    content: {
      type: "switch",
      name: "sendDataToAllMatchingOutputs",
      title: "Send data to all matching outputs",
      toolTipText:
        "Whether to send data to all outputs meeting conditions (and not just the first one).",
    },
  },
];

const modeStore: DropDownNOption[] = [
  {
    label: "Rules",
    value: "Rules",
    description: "Build a matching rule for each output.",
  },
  {
    label: "Expression",
    value: "Expression",
    description: "write an expression to return the output index.",
  },
];

const typeStore: ParentOption[] = [
  {
    label: "𝔸  String",
    value: "String",
    children: [
      { label: "Exists", value: "exists" },
      { label: "Does not exist", value: "doesNotExist" },
      { label: "Is empty", value: "isEmpty" },
      { label: "Is not empty", value: "isNotEmpty" },
      { label: "Is equal to", value: "isEqualTo" },
      { label: "Is not equal to", value: "isNotEqualTo" },
      { label: "Contains", value: "contains" },
      { label: "Does not contain", value: "doesNotContain" },
      { label: "Starts with", value: "startsWith" },
      { label: "Does not start with", value: "doesNotStartWith" },
      { label: "Ends with", value: "endsWith" },
      { label: "Does not end with", value: "doesNotEndWith" },
      { label: "Matches regex", value: "matchesRegex" },
      { label: "Does not match regex", value: "doesNotMatchRegex" },
    ],
  },
  {
    label: "#  Number",
    value: "Number",
    children: [
      { label: "Exists", value: "exists" },
      { label: "Does not exist", value: "doesNotExist" },
      { label: "Is empty", value: "isEmpty" },
      { label: "Is not empty", value: "isNotEmpty" },
      { label: "Is equal to", value: "isEqualTo" },
      { label: "Is not equal to", value: "isNotEqualTo" },
      { label: "Is greater than", value: "isGreaterThan" },
      { label: "Is less than", value: "isLessThan" },
      { label: "Is greater than or equal to", value: "isGreaterThanOrEqualTo" },
      { label: "Is less than or equal to", value: "isLessThanOrEqualTo" },
    ],
  },
  {
    label: "🗓  Date & Time",
    value: "dateAndTime",
    children: [
      { label: "Exists", value: "exists" },
      { label: "Does not exist", value: "doesNotExist" },
      { label: "Is empty", value: "isEmpty" },
      { label: "Is not empty", value: "isNotEmpty" },
      { label: "Is equal to", value: "isEqualTo" },
      { label: "Is not equal to", value: "isNotEqualTo" },
      { label: "Is after", value: "isAfter" },
      { label: "Is before", value: "isBefore" },
      { label: "Is after or equal to", value: "isAfterOrEqualTo" },
      { label: "Is before or equal to", value: "isBeforeOrEqualTo" },
    ],
  },
  {
    label: "🗹  Boolean",
    value: "Boolean",
    children: [
      { label: "exists", value: "exists" },
      { label: "does not exist", value: "doesNotExist" },
      { label: "is empty", value: "isEmpty" },
      { label: "is not empty", value: "isNotEmpty" },
      { label: "is true", value: "isTrue" },
      { label: "is false", value: "isFalse" },
      { label: "is equal to", value: "isEqualTo" },
      { label: "is not equal to", value: "isNotEqualTo" },
    ],
  },
  {
    label: "⊞  Array",
    value: "Array",
    children: [
      { label: "exists", value: "exists" },
      { label: "does not exist", value: "doesNotExist" },
      { label: "is empty", value: "isEmpty" },
      { label: "is not empty", value: "isNotEmpty" },
      { label: "contains", value: "contains" },
      { label: "does not contain", value: "doesNotContain" },
      { label: "length equal to", value: "lengthEqualTo" },
      { label: "length not equal to", value: "lengthNotEqualTo" },
      { label: "length greater than", value: "lengthGreaterThan" },
      { label: "length less than", value: "lengthLessThan" },
      {
        label: "length greater than or equal to",
        value: "lengthGreaterThanOrEqualTo",
      },
      {
        label: "length less than or equal to",
        value: "lengthLessThanOrEqualTo",
      },
    ],
  },
  {
    label: "{.}  Object",
    value: "Object",
    children: [
      { label: "exists", value: "exists" },
      { label: "does not exist", value: "doesNotExist" },
      { label: "is empty", value: "isEmpty" },
      { label: "is not empty", value: "isNotEmpty" },
    ],
  },
];

export {
  optionStoreForJSON,
  optionStoreForManualMapping,
  modeStore,
  typeStore,
  options,
};
