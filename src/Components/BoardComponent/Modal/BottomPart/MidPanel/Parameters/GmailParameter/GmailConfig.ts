import { ReproductiveDropDownOption } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import { FilterOption } from "./GmailType";

const filterStore: FilterOption[] = [
  {
    label: "Include Spam and Trash",
    value: "includeSpamTrash",
    content: {
      type: "switch",
      name: "includeSpamTrash",
      title: "Include Spam and Trash",
      toolTipText:
        "Whether to include messages from SPAM and TRASH in the results.",
      footNote: "",
      options: [],
      placeholder: "",
    },
  },
  {
    label: "Include Drafts",
    value: "includeDrafts",
    content: {
      type: "switch",
      name: "includeDrafts",
      title: "Include Drafts",
      toolTipText: "Whether to include email drafts in the results.",
      footNote: "",
      options: [],
      placeholder: "",
    },
  },
  {
    label: "Label Names or IDs",
    value: "labelIds",
    content: {
      type: "dropdownMultiple",
      name: "labelIds",
      title: "Label Names or IDs",
      toolTipText:
        "Only return messages with labels that match all of the specified label IDs. Choose from the list, or specify IDs using an expression.",
      footNote: "",
      options: [
        {
          label: "INBOX",
          value: "INBOX",
        },
        {
          label: "UNREAD",
          value: "UNREAD",
        },
        {
          label: "STARRED",
          value: "STARRED",
        },
        {
          label: "IMPORTANT",
          value: "IMPORTANT",
        },
      ],
      placeholder: "",
    },
  },
  {
    label: "Search",
    value: "q",
    content: {
      type: "dynamicInput",
      name: "q",
      title: "Search",
      toolTipText: "Only return messages matching the specified query",
      footNote: "Use the same format as in the Gmail search box. More info.",
      options: [],
      placeholder: "has:attachment",
    },
  },
  {
    label: "Read Status",
    value: "readStatus",
    content: {
      type: "dropdownN",
      name: "readStatus",
      title: "Read Status",
      toolTipText: "",
      footNote: "Filter emails by whether they have been read or not.",
      options: [
        {
          label: "unread and read email",
          value: "unread and read email",
        },
        {
          label: "read email only",
          value: "read email only",
        },
        {
          label: "read emails only",
          value: "read emails only",
        },
      ],
      placeholder: "",
    },
  },
  {
    label: "Sender",
    value: "sender",
    content: {
      type: "dynamicInput",
      name: "sender",
      title: "Sender",
      toolTipText: "Sender name or email to filter by.",
      footNote: "",
      options: [],
      placeholder: "",
    },
  },
];

const optionStore = [
  {
    label: "Attachment Prefix",
    value: "attachmentPrefix",
    content: {
      type: "dynamicInput",
      name: "attachmentPrefix",
      title: "Attachment Prefix",
      toolTipText:
        "Prefix for name of the binary property to which to write the attachment. An index starting with 0 will be added. So if name is 'attachment_' the first attachment is saved to 'attachment_0'.",
      footNote: "",
      options: [],
      placeholder: "attachment_",
      value: "attachment_",
    },
  },
  {
    label: "Download Attachments",
    value: "downloadAttachments",
    content: {
      type: "switch",
      name: "downloadAttachments",
      title: "Download Attachments",
      toolTipText: "Whether the email's attachments will be downloaded",
      footNote: "",
      options: [],
      placeholder: "",
      value: "",
    },
  },
];

const poolTimesOptions: ReproductiveDropDownOption[] = [
  { value: "Every Minute", label: "Every Minute", children: [] },
  {
    value: "Every Hour",
    label: "Every Hour",
    children: [
      {
        type: "input",
        title: "Minute",
        value: 10,
        toolTipText: "The minute of the day to trigger.",
      },
    ],
  },
  {
    value: "Every Day",
    label: "Every Day",
    children: [
      {
        type: "input",
        value: 14,
        title: "Hour",
        toolTipText: "The hour of the day to trigger(24 hour format).",
      },
      {
        type: "input",
        value: 10,
        title: "Minute",
        toolTipText: "The minute of the day to trigger.",
      },
    ],
  },
  {
    value: "Every Week",
    label: "Every Week",
    children: [
      {
        type: "dropdownN",
        title: "Weekday",
        options: [
          { label: "Sunday", value: "Sunday" },
          { label: "Monday", value: "Monday" },
          { label: "Tuesday", value: "Tuesday" },
          { label: "Wednesday", value: "Wednesday" },
          { label: "Thursday", value: "Thursday" },
          { label: "Friday", value: "Friday" },
          { label: "Saturday", value: "Saturday" },
        ],
        toolTipText: "The weekday to trigger.",
      },
      {
        type: "input",
        value: 10,
        title: "Hour",
        toolTipText: "The hour of the day to trigger(24 hour format).",
      },
      {
        type: "input",
        value: 0,
        title: "Minute",
        toolTipText: "The minute of the day to trigger.",
      },
    ],
  },
  {
    value: "Every Month",
    label: "Every Month",
    children: [
      {
        type: "input",
        title: "Day of Month",
        value: 1,
        toolTipText: "The day of the month to trigger.",
      },
      {
        type: "input",
        title: "Hour",
        value: 14,
        toolTipText: "The hour of the day to trigger(24 hour format).",
      },
      {
        type: "input",
        title: "Minute",
        value: 0,
        toolTipText: "The minute of the day to trigger.",
      },
    ],
  },
  {
    value: "Every X",
    label: "Every X",
    children: [
      {
        type: "input",
        title: "Value",
        value: 2,
        toolTipText: "All how many X minutes/hours it should trigger",
      },
      {
        type: "dropdownN",
        title: "Unit",
        toolTipText: "If it should trigger all X minutes or hours",
        options: [
          { label: "Minutes", value: "minutes" },
          { label: "Hours", value: "hours" },
        ],
      },
    ],
  },
  {
    value: "Custom",
    label: "Custom",
    children: [
      {
        type: "input",
        title: "Cron Expression",
        value: "0 0 14 * *",
        toolTipText:
          "Use custom cron expression. Values and ranges as follows:Seconds: 0-59Minutes: 0 - 59Hours: 0 - 23Day of Month: 1 - 31Months: 0 - 11 (Jan - Dec)Day of Week: 0 - 6 (Sun - Sat)",
      },
    ],
  },
];

export { filterStore, optionStore, poolTimesOptions };
