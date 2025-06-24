import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import {
  ReproductiveChildren,
  ReproductiveDropDownOption,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";

export const toolDescriptionOption: ReproductiveDropDownOption[] = [
  {
    label: "Set Automatically",
    value: "setAutomatically",
    description: "Automatically set based on resource and option.",
  },
  {
    label: "Set Manually",
    value: "setManually",
    description: "Manually set description.",
  },
];

export const resourceOption: DropDownNOption[] = [
  {
    label: "Message",
    value: "message",
  },
  {
    label: "Label",
    value: "label",
  },
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Thread",
    value: "thread",
  },
];

const simplify: ReproductiveChildren = {
  type: "switch",
  title: "Simplify",
  name: "simplify",
  toolTipText:
    "Whether to return a simplified version of the response instead of the raw data.",
};

const emailType: ReproductiveChildren = {
  type: "DropDownN",
  title: "Email Type",
  name: "emailType",
  options: [
    {
      label: "HTML",
      value: "html",
    },
    {
      label: "Text",
      value: "text",
    },
  ],
};

const to: ReproductiveChildren = {
  type: "dynamicInput",
  title: "To",
  name: "to",
  placeholder: "info@example.com",
  toolTipText:
    "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
};

const subject: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Subject",
  name: "subject",
  placeholder: "Hello World!",
};

const message: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Message",
  name: "message",
};

const returnAll: ReproductiveChildren = {
  type: "switch",
  name: "returnAll",
  title: "Return All",
  toolTipText: "Whether to return all results or only up to a given limit",
};

const limit: ReproductiveChildren = {
  type: "dynamicInput",
  name: "limit",
  title: "Limit",
  toolTipText: "Maximum number of results to return",
  value: 10,
};

const labelNamesOrIds: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Label Names or Ids",
  name: "labelNamesOrIds",
};

const messageId: ReproductiveChildren = {
  type: "dynamicInput",
  name: "messageId",
  title: "Message ID",
};

export const addFilterOption: FilterOption[] = [
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
    value: "labelNamesOrIds",
    content: {
      type: "dropdownMultiple",
      name: "labelNamesOrIds",
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
    value: "search",
    content: {
      type: "dynamicInput",
      name: "Search",
      title: "search",
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

export const responseTypeOption: ReproductiveDropDownOption[] = [
  {
    value: "Approval",
    label: "Approval",
    description: "User can approve/disapprove from within the message",
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
  },
];

export const messageOperationOption: ReproductiveDropDownOption[] = [
  {
    label: "Add Label",
    value: "addLabel",
    children: [
      messageId,
      {
        type: "dynamicInput",
        name: "labelNamesOrIds",
        title: "Label Names or IDs",
        toolTipText:
          "Choose from the list, or specify IDs using an expression.",
      },
    ],
  },
  {
    label: "Delete",
    value: "delete",
    children: [messageId],
  },
  {
    label: "Get",
    value: "get",
    children: [messageId, simplify],
  },
  {
    label: "Get Many",
    value: "getMany",
    children: [
      returnAll,
      limit,
      simplify,
      {
        type: "DropDownFilter",
        name: "Add Filter",
        title: "Add Filter",
      },
    ],
  },
  {
    label: "Mark as Read",
    value: "markAsRead",
    children: [messageId],
  },
  {
    label: "Mark as Unread",
    value: "markAsUnread",
    children: [messageId],
  },
  {
    label: "Remove Label",
    value: "removeLabel",
    children: [messageId, labelNamesOrIds],
  },
  {
    label: "Reply",
    value: "reply",
    children: [messageId, emailType, message],
  },
  {
    label: "Send",
    value: "send",
    children: [to, subject, emailType, message],
  },
  {
    label: "Send and Wait for Response",
    value: "sendAndWaitForResponse",
    children: [
      to,
      subject,
      emailType,
      message,
      // {
      //   type: "ReproductiveDropDown",
      //   title: "Response Type",
      //   name: "response Type",
      //   options: [
      //     {
      //       value: "Approval",
      //       label: "Approval",
      //       description: "User can approve/disapprove from within the message",
      //     },
      //     {
      //       value: "freeText",
      //       label: "Free Text",
      //       description: "User can submit a response via a form.",
      //     },
      //     {
      //       label: "Custom Form",
      //       value: "customForm",
      //       description: "User can submit a response via a form.",
      //     },
      //   ],
      // },
    ],
  },
];

const labelId: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Label Id",
  name: "labelId",
  toolTipText: "The ID of the label",
};

const draftId: ReproductiveChildren = {
  type: "dynamicInput",
  title: "Draft ID",
  name: "draftId",
  toolTipText: "The ID of the draft",
  placeholder: "r-52df502d5df55",
};

const getMany: ReproductiveDropDownOption = {
  label: "Get Many",
  value: "getMany",
  children: [returnAll, limit],
};

export const labelOperationOption: ReproductiveDropDownOption[] = [
  {
    label: "Create",
    value: "create",
    children: [
      {
        type: "dynamicInput",
        title: "Name",
        name: "name",
        toolTipText: "Label Name",
        placeholder: "invoice",
      },
    ],
  },
  {
    label: "Delete",
    value: "delete",
    children: [labelId],
  },
  {
    label: "Get",
    value: "get",
    children: [labelId],
  },
  getMany,
];

export const draftOperationOption: ReproductiveDropDownOption[] = [
  {
    label: "Create",
    value: "create",
    children: [subject, emailType, message],
  },
  {
    label: "Delete",
    value: "delete",
    children: [draftId],
  },
  {
    label: "Get",
    value: "get",
    children: [draftId],
  },
  getMany,
];

const threadId: ReproductiveChildren = {
  type: "dynamicInput",
  name: "threadId",
  title: "Thread ID",
  placeholder: "sdf5d7521df78csd",
};

export const threadOperationOption: ReproductiveDropDownOption[] = [
  {
    label: "Add Label",
    value: "addLabel",
    children: [
      threadId,
      {
        type: "dynamicInput",
        name: "labelNamesOrIds",
        title: "Label Names or IDs",
      },
    ],
  },
  {
    label: "Delete",
    value: "delete",
    children: [threadId],
  },
  {
    label: "Get",
    value: "get",
    children: [threadId, simplify],
  },
  getMany,
  {
    label: "Remove Label",
    value: "removeLabel",
    children: [threadId, labelNamesOrIds],
  },
  {
    label: "Reply",
    value: "reply",
    children: [
      threadId,
      emailType,
      message,
      {
        type: "dynamicInput",
        name: "messageSnippetOrId",
        title: "Message Snippet Or ID",
        toolTipText:
          "Choose from the list, or specify an ID using an expression.",
      },
    ],
  },
  {
    label: "Trash",
    value: "trash",
    children: [threadId],
  },
  {
    label: "Untrash",
    value: "untrash",
    children: [threadId],
  },
];

const attachment: FilterOption = {
  label: "Attachments",
  value: "attachments",
  content: {
    type: "dynamicInput",
    name: "attachments",
    title: "Attachments",
    toolTipText: `Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated. Reference embedded images or other content within the body of an email message, e.g. <img src="cid:image_1">`,
  },
};

const bcc: FilterOption = {
  label: "BCC Email",
  value: "bccEmail",
  content: {
    type: "dynamicInput",
    name: "bccEmail",
    title: "BCC Email",
    value: "cc@example.com",
    toolTipText: `Email address of BCC recipient`,
  },
};

const cc: FilterOption = {
  label: "CC Email",
  value: "ccEmail",
  content: {
    type: "dynamicInput",
    name: "ccEmail",
    title: "CC Email",
    value: "cc@example.com",
    toolTipText: `Email address of CC recipient`,
  },
};

const sendRepliesTo: FilterOption = {
  label: "Send Replies To",
  value: "sendRepliesTo",
  content: {
    type: "dynamicInput",
    name: "sendRepliesTo",
    title: "Send Replies To",
    toolTipText: `The email address that the reply message is sent to.`,
    value: "reply@example.com",
  },
};

const attachmentPrefix: FilterOption = {
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
};

const downloadAttachment: FilterOption = {
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
};

export const addOptionForGet: FilterOption[] = [
  attachmentPrefix,
  downloadAttachment,
];

export const addOptionForGetMany: FilterOption[] = [
  attachmentPrefix,
  downloadAttachment,
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
];

export const addOptionForCreate: FilterOption[] = [
  attachment,
  bcc,
  cc,
  sendRepliesTo,
  {
    label: "From Alias Name or ID",
    value: "fromAliasNameOrId",
    content: {
      type: "dynamicInput",
      name: "fromAliasNameOrId",
      title: "From Alias Name or ID",
      toolTipText: `Select the alias to send the email from. Choose from the list, or specify an ID using an expression.`,
    },
  },
  {
    label: "Thread ID",
    value: "threadId",
    content: {
      type: "dynamicInput",
      name: "threadId",
      title: "Thread ID",
      toolTipText: `The identifier of the thread to attach the draft`,
    },
  },
  {
    label: "To Email",
    value: "toEmail",
    content: {
      type: "dynamicInput",
      name: "toEmail",
      title: "To Email",
      toolTipText: `The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.`,
      placeholder: "info@example.com",
    },
  },
];

export const addOptionForReply: FilterOption[] = [
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
  attachment,
  cc,
  bcc,
  {
    label: "Sender Name",
    value: "senderName",
    content: {
      type: "switch",
      name: "senderName",
      title: "Sender Name",
      toolTipText: `The name that will be shown in recipients' inboxes.`,
    },
  },
  {
    label: "Reply To Sender Only",
    value: "replyToSenderOnly",
    content: {
      type: "dynamicInput",
      name: "replyToSenderOnly",
      title: "Reply To Sender Only",
      toolTipText: `Whether to reply to the sender only or to the entire list of recipients.`,
    },
  },
];

export const addOptionForSend: FilterOption[] = [
  ...addOptionForReply,
  sendRepliesTo,
];

export const approvalOption: ReproductiveDropDownOption[] = [
  {
    value: "approvedOnly",
    label: "Approved Only",
  },
  {
    value: "approvedAndDisapproved",
    label: "Approved and Disapproved",
  },
];

export const limitTypeOption: ReproductiveDropDownOption[] = [
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

export const defineFormOption: ReproductiveDropDownOption[] = [
  {
    label: "Using Field Below",
    value: "usingFieldBelow",
  },
  {
    label: "Using JSON",
    value: "usingJSON",
  },
];

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

export const elementTypeOption: ReproductiveDropDownOption[] = [
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

export const addOption: FilterOption[] = [
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
