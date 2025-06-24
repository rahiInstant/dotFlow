import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { ReproductiveDropDownOption } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";

export const operation: ReproductiveDropDownOption[] = [
  {
    label: "Get Many",
    value: "getMany",
    description: "Get many ranked documents from vector store for query.",
    children: [
      {
        type: "dynamicInput",
        title: "TableName",
        toolTipText:
          "The table name to store the vectors in. If table does not exist, it will be created.",
      },
      {
        type: "dynamicInput",
        title: "Prompt",
        toolTipText:
          "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
      },
      {
        type: "dynamicInput",
        title: "Limit",
        value: "10",
        toolTipText: "Number of top results to fetch from vector store.",
      },
      {
        type: "switch",
        title: "Include Metadata",
        toolTipText: "Whether or not to include document metadata.",
      },
    ],
  },
  {
    label: "Insert Documents",
    value: "insertDocuments",
    description: "Insert documents into vector store.",
    children: [
      {
        type: "dynamicInput",
        title: "TableName",
        toolTipText:
          "The table name to store the vectors in. If table does not exist, it will be created.",
      },
    ],
  },
  {
    label: "Retrieve Documents (As Vector Store for Chain/Tool)",
    value: "retrieveDocumentsAsVectorStore",
    description:
      "Retrieve documents from vector store to be used as vector store with AI nodes.",
    children: [
      {
        type: "textBlock",
        placeholder:
          "This node must be connected to a vector store retriever. Insert one",
      },
      {
        type: "dynamicInput",
        title: "TableName",
        toolTipText:
          "The table name to store the vectors in. If table does not exist, it will be created.",
      },
    ],
  },
  {
    label: "Retrieve Documents (As Tool for AI Agent)",
    value: "retrieveDocumentsAsTool",
    description:
      "Retrieve documents from vector store to be used as tool with AI nodes.",
    children: [
      {
        type: "dynamicInput",
        title: "Name",
        toolTipText: "name of the vector store.",
        placeholder: "e.g. company_knowledge_base",
      },
      {
        type: "textArea",
        title: "Description",
        toolTipText:
          "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
        placeholder:
          "e.g. work with your data in postgresql with the PgVector extension.",
      },
      {
        type: "dynamicInput",
        title: "Limit",
        value: "10",
        toolTipText: "Number of top results to fetch from vector store.",
      },
      {
        type: "dynamicInput",
        title: "TableName",
        toolTipText:
          "The table name to store the vectors in. If table does not exist, it will be created.",
      },
    ],
  },
];

export const columnNamesChild: {
  value: string;
  title: string;
  name: string;
}[] = [
  {
    title: "ID Column name",
    value: "idColumnName",
    name: "idColumnName",
  },
  {
    title: "Vector Column Name",
    value: "embedding",
    name: "vectorColumnName",
  },
  {
    title: "Content Column name",
    value: "text",
    name: "contentColumnName",
  },
  {
    title: "Metadata Column name",
    value: "metadata",
    name: "metadataColumnName",
  },
];

export const collectionChild: {
  value: string;
  title: string;
  name: string;
}[] = [
  {
    title: "Collection Name",
    value: "collectionName",
    name: "collectionName",
  },
  {
    title: "Collection Table Name",
    value: "collectionTableName",
    name: "collectionTableName",
  },
];

export const pgVectorOption: FilterOption[] = [
  {
    label: "Distance Strategy",
    value: "distanceStrategy",
    content: {
      type: "DropDown",
      name: "distanceStrategy",
      title: "Distance Strategy",
      toolTipText: "The method to calculate the distance between two vectors",
      options: [
        {
          label: "Cosine",
          value: "cosine",
        },
        {
          label: "Euclidean",
          value: "euclidean",
        },
        {
          label: "Inner Product",
          value: "innerProduct",
        },
      ],
    },
  },
  {
    label: "Collection",
    value: "collection",
    content: {
      type: "switch",
      name: "useCollection",
      title: "Use Collection",
      toolTipText: "Collection of vector",
    },
  },
  {
    label: "Column Names",
    value: "columnNames",
    content: {
      type: "plainBlock",
      name: "columnNames",
      toolTipText: "The names of the columns in the PGVector table.",
      title: "Column Names",
    },
    // [
    //   {
    //     type: "dynamicInput",
    //     title: "ID Column name",
    //     value: "id",
    //   },
    //   {
    //     type: "dynamicInput",
    //     title: "Vector Column Name",
    //     value: "embedding",
    //   },
    //   {
    //     type: "dynamicInput",
    //     title: "Content Column name",
    //     value: "text",
    //   },
    //   {
    //     type: "dynamicInput",
    //     title: "Metadata Column name",
    //     value: "metadata",
    //   },
    // ],
  },
  {
    label: "Metadata Filter",
    value: "metadataFilter",
    content: {
      type: "incrementBlock",
      name: "metadataFilter",
      title: "Metadata Filter",
      toolTipText: "Metadata to filter the document by.",
    },
  },
];
