import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import {
  ReproductiveChildren,
  ReproductiveDropDownOption,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";

const addOption: FilterOption[] = [
  {
    label: "Message Button Label",
    value: "messageButtonLabel",
    content: {
      type: "dynamicInput",
      name: "messageButtonLabel",
      title: "Message Button Label",
      value: "Respond",
    },
  },
  {
    label: "Response From Title",
    value: "responseFromTitle",
    content: {
      type: "dynamicInput",
      name: "responseFromTitle",
      title: "Response From Title",
      toolTipText:
        "Title of the form that the user can access to provide their response.",
    },
  },
  {
    label: "Response From Description",
    value: "responseFromDescription",
    content: {
      type: "dynamicInput",
      name: "responseFromDescription",
      title: "Response From Description",
      toolTipText:
        "Description of the form that the user can access to provide their response",
    },
  },
  {
    label: "Response Form Button Label",
    value: "responseFormButtonLabel",
    content: {
      type: "dynamicInput",
      name: "responseFormButtonLabel",
      title: "Response Form Button Label",
      value: "Submit",
    },
  },
  {
    label: "Limit Wait Time",
    value: "limitWaitTime",
    content: {
      type: "reproductiveDropDown",
      name: "limitWaitTime",
      title: "Limit Wait Time",
      options: [
        {
          label: "After Time Interval",
          value: "afterTimeInterval",
          description: "Waits for a certain amount of time.",
        },
        {
          label: "At Specified Time",
          value: "atSpecifiedTime",
          description: "Waits until the set date and time to continue",
        },
      ],
      toolTipText:
        "Sets the condition for the execution to resume. Can be a specified date or after some time.",
    },
  },
];

const emailFormat: ReproductiveDropDownOption[] = [
  {
    value: "Text",
    label: "Text",
    description: "Send Email as Plain Text",
    children: [
      {
        type: "textArea",
        title: "Text",
        toolTipText: "Plain text message of email",
      },
    ],
  },
  {
    value: "HTML",
    label: "HTML",
    description: "Send Email as HTML",
    children: [
      {
        type: "textArea",
        title: "HTML",
        toolTipText: "HTML text message of email",
      },
    ],
  },
  {
    value: "Both",
    label: "Both",
    description:
      "Send both formats, recipient's client select version to display",
    children: [
      {
        type: "textArea",
        title: "Text",
        toolTipText: "Plain text message of email",
      },
      {
        type: "textArea",
        title: "HTML",
        toolTipText: "HTML text message of email",
      },
    ],
  },
];

const addOptionForSend: FilterOption[] = [
  {
    label: "Append n8n Attribution",
    value: "appendAttribution",
    content: {
      type: "switch",
      name: "appendAttribution",
      title: "Append n8n Attribution",
      toolTipText:
        "Whether to include the phrase “This email was sent automatically with n8n” to the end of the email",
    },
  },
  {
    label: "Attachments",
    value: "attachments",
    content: {
      type: "dynamicInput",
      name: "attachments",
      title: "Attachments",
      toolTipText: `Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated. Reference embedded images or other content within the body of an email message, e.g. <img src="cid:image_1">`,
    },
  },
  {
    label: "CC Email",
    value: "ccEmail",
    content: {
      type: "dynamicInput",
      name: "ccEmail",
      title: "CC Email",
      value: "cc@example.com",
      toolTipText: `Email address of CC recipient`,
    },
  },
  {
    label: "BCC Email",
    value: "bccEmail",
    content: {
      type: "dynamicInput",
      name: "bccEmail",
      title: "BCC Email",
      value: "cc@example.com",
      toolTipText: `Email address of BCC recipient`,
    },
  },
  {
    label: "Ignore SSL Issues (Insecure)",
    value: "ignoreSSL",
    content: {
      type: "switch",
      name: "ignoreSSL",
      title: "Ignore SSL Issues (Insecure)",
      toolTipText: `Whether to connect even if SSL certificate validation is not possible`,
    },
  },
  {
    label: "Reply To",
    value: "replyTo",
    content: {
      type: "dynamicInput",
      name: "replyTo",
      title: "Reply To",
      toolTipText: `The email address to send the reply to`,
    },
  },
];

const approvalOption: ReproductiveDropDownOption[] = [
  {
    value: "approvedOnly",
    label: "Approved Only",
  },
  {
    value: "approvedAndDisapproved",
    label: "Approved and Disapproved",
  },
];

const limitTypeOption: ReproductiveDropDownOption[] = [
  {
    label: "After Time Interval",
    value: "afterTimeInterval",
    description: "Waits for a certain amount of time.",
  },
  {
    label: "At Specified Time",
    value: "atSpecifiedTime",
    description: "Waits until the set date and time to continue",
  },
];

const responseTypeOption: ReproductiveDropDownOption[] = [
  {
    value: "Approval",
    label: "Approval",
    description: "User can approve/disapprove from within the message",
    // children: [
    //   {
    //     type: "dropDownFilter",
    //     title: "Add Option",
    //     children: [
    //       {
    //         type: "reproductiveDropDown",
    //         title: "Type of Approval",
    //       },
    //       {
    //         type: "dynamicInput",
    //         title: "Approve Button Label",
    //         value: "Approve",
    //       },
    //       {
    //         type: "dropDownN",
    //         title: "Approve Button Style",
    //         options: [
    //           {
    //             value: "Primary",
    //             label: "Primary",
    //           },
    //           {
    //             value: "Secondary",
    //             label: "Secondary",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     type: "dropDownFilter",
    //     title: "Add Option",
    //     children: [
    //       {
    //         type: "reproductiveDropDown",
    //         title: "Limit Type",
    //         toolTipText:
    //           "Sets the condition for the execution to resume. Can be a specified date or after some time.",
    //         options: [
    //           {
    //             label: "After Time Interval",
    //             value: "afterTimeInterval",
    //             description: "Waits for a certain amount of time.",
    //             children: [
    //               {
    //                 type: "dynamicInput",
    //                 title: "Amount",
    //                 value: 45,
    //                 toolTipText: "The time to wait.",
    //               },
    //               {
    //                 type: "dropDownN",
    //                 title: "Unit",
    //                 toolTipText: "Unit of the interval value.",
    //                 options: [
    //                   {
    //                     label: "Minutes",
    //                     value: "minutes",
    //                   },
    //                   {
    //                     label: "Hours",
    //                     value: "hours",
    //                   },
    //                   {
    //                     label: "Days",
    //                     value: "days",
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //           {
    //             label: "At Specified Time",
    //             value: "atSpecifiedTime",
    //             description: "Waits until the set date and time to continue",
    //             children: [
    //               {
    //                 type: "dynamicInput",
    //                 title: "Max Date and Time",
    //                 toolTipText:
    //                   "Continue execution after the specified date and time",
    //                 placeholder: "Select Date and Time",
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
  {
    value: "freeText",
    label: "Free Text",
    description: "User can submit a response via a form.",
  },
  {
    label: "Custom Form",
    value: "customForm",
    description: "User can submit a response via a form.",
    // children: [
    //   {
    //     type: "reproductiveDropDown",
    //     title: "Define form",
    //     options: [
    //       {
    //         label: "Using Field Below",
    //         value: "usingFieldBelow",
    //         children: [],
    //       },
    //       {
    //         label: "Using JSON",
    //         value: "usingJSON",
    //         children: [
    //           {
    //             title: "Form Fields",
    //             type: "jsonEditor",
    //             footNote: "<link>See docs<link> for field syntax",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
];

const defineFormOption: ReproductiveDropDownOption[] = [
  {
    label: "Using Field Below",
    value: "usingFieldBelow",
  },
  {
    label: "Using JSON",
    value: "usingJSON",
  },
];

const operationStore: ReproductiveDropDownOption[] = [
  {
    value: "Send",
    label: "Send",
  },
  {
    value: "sendAndWaitForResponse",
    label: "Send and Wait for Response",
  },
];

// under elementTypeOption

const fieldName: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Field Name",
  toolTipText: "Label that appears above the input field.",
  placeholder: "e.g. What is your name?",
};

const requiredField: ReproductiveChildren = {
  type: "switch",
  title: "Required Field",
  toolTipText:
    "Whether to require the user to enter a value for this field before submitting the form",
};

const placeHolder: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Placeholder",
  toolTipText: "Sample text to display inside the field.",
};

const elementTypeOption: ReproductiveDropDownOption[] = [
  {
    value: "text",
    label: "Text",
    children: [fieldName, requiredField, placeHolder],
  },
  {
    value: "customHTML",
    label: "Custom HTML",
    children: [
      {
        type: "dynamicInput",
        title: "Element Name",
        toolTipText:
          "Optional field. It can be used to include the html in the output.",
        placeholder: "e.g. content section",
      },
      {
        type: "jsonEditor",
        title: "HTML",
        toolTipText: "HTML elements to display on the form page",
        footNote: "Does not accept <script>, <style> or <input> tags",
      },
    ],
  },
  {
    value: "date",
    label: "Date",
    children: [
      fieldName,
      {
        type: "textBlock",
        placeholder:
          "The displayed date is formatted based on the locale of the user's browser",
      },
      requiredField,
    ],
  },
  {
    value: "dropDownList",
    label: "DropDown List",
    children: [
      {
        type: "inputBlock",
        title: "Field Options",
        name: "fieldOption",
        placeholder: "Add Field Option",
      },
      {
        type: "switch",
        title: "Multiple Choice",
        toolTipText:
          "Whether to allow the user to select multiple options from the dropdown list.",
      },
      requiredField,
      fieldName,
    ],
  },
  {
    value: "email",
    label: "Email",
    children: [fieldName, requiredField, placeHolder],
  },
  {
    value: "file",
    label: "File",
    children: [
      fieldName,
      requiredField,
      {
        type: "switch",
        title: "Multiple Files",
        toolTipText:
          "Whether to allow the user to select multiple files from the file input or just one",
      },
      {
        type: "dynamicInput",
        title: "Accepted File Types",
        toolTipText: "Comma-separated list of allowed file extensions",
        footNote: "Leave empty to allow all file types",
      },
    ],
  },
  {
    value: "hiddenField",
    label: "Hidden Field",
    children: [
      {
        type: "dynamicInput",
        title: "Field Name",
        toolTipText:
          "The name of the field, used in input attributes and referenced by the workflow",
      },
      {
        type: "dynamicInput",
        title: "Field Value",
        toolTipText:
          "Input value can be set here or will be passed as a query parameter via Field Name if no value is set",
      },
    ],
  },
  {
    value: "number",
    label: "Number",
    children: [fieldName, requiredField, placeHolder],
  },
  {
    value: "password",
    label: "Password",
    children: [fieldName, requiredField, placeHolder],
  },
  {
    value: "textArea",
    label: "Textarea",
    children: [fieldName, requiredField, placeHolder],
  },
];

export {
  operationStore,
  addOptionForSend,
  emailFormat,
  responseTypeOption,
  approvalOption,
  addOption,
  limitTypeOption,
  defineFormOption,
  elementTypeOption,
};
