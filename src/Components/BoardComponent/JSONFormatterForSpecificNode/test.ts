const ok = {
  name: "Email Analyzer",
  description: "A workflow demonstrating multiple inputs and outputs per node",
  nodes: [
    {
      id: "node_wvil6e_gmail-trigger",
      name: "Gmail Trigger",
      description: "Gmail reader",
      type: "GmailReader",
      parameters: {
        credentials: {
          id: "d0esgqltcbthv6156tjg",
          name: "Gmail Account",
          provider: "gmail",
          ctype: "oauth2",
        },
        pollTimes: [{ mode: "Every Hour", minute: 10 }],
        simple: false,
        filters: {},
        options: {},
      },
      position: { x: 374, y: 99.5 },
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "Last Email",
          description: "Read last email from your gmail inbox",
          type: "object",
        },
      ],
    },
    {
      id: "node_alx33o_edit",
      name: "Edit Fields",
      description: "Modify,add,or remove item fields.",
      type: "EditNode",
      parameters: {
        mode: "Manual Mapping",
        assignment: [{ id: 1, name: "cfg", type: "String", value: "d" }],
        inputs: [
          {
            id: "input",
            name: "Input",
            description: "Data to filter",
            type: "object",
          },
        ],
        outputs: [
          {
            id: "output",
            name: "Output",
            description: "Outcode of the node after process",
            type: "object",
          },
        ],
      },
      position: { x: 576, y: 99.5 },
    },
    {
      id: "node_svfcew_ai-agent",
      name: "AI Agent",
      description: "AI Agent",
      type: "LangChainAgent",
      parameters: {
        agent: "Tools Agent",
        promptType: "ConnectedChatTriggerNode",
        text: "dhdhdfh",
        options: {},
      },
      position: { x: 775, y: 99 },
      inputs: [
        {
          id: "input",
          name: "fromEdit",
          description: "data coming from previous node",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "agent output",
          description: "reAct agent",
          type: "object",
        },
        {
          id: "chatModel",
          name: "from ollamaChatModel1",
          description: "data coming from ollama node",
          type: "object",
        },
      ],
    },
    {
      id: "node_z8o681_ollama-chat",
      name: "Ollama Chat Model",
      description: "Ollama Chat Model",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: "llma 3.2:1b",
        options: { topK: "-1.0", topP: "1.0", keepAlive: "5m" },
      },
      position: { x: 685, y: 357 },
      inputs: [
        {
          id: "output",
          name: "ollma_output",
          description: "ollama output port",
          type: "object",
        },
      ],
      outputs: [],
    },
    {
      id: "node_3dltg5_switch",
      name: "Switch",
      description: "Route items depending on defined expression or rules.",
      type: "SwitchNode",
      parameters: {
        mode: "Rules",
        rules: [
          {
            id: 1,
            leftValue: "df",
            operator: {
              type: "String",
              operation: "isNotEmpty",
              singleValue: true,
            },
            rightValue: "fgdf",
            renameOutput: false,
          },
        ],
      },
      position: { x: 1113, y: 100.5 },
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "Data to filter",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "Yes",
          name: "rule 0",
          description: "langchainAgent2.input",
          type: "object",
        },
        {
          id: "No",
          name: "rule 1",
          description: "sendEmail1.input",
          type: "object",
        },
      ],
    },
    {
      id: "node_xn64x7_customer-support-agent",
      name: "AI Agent",
      description: "AI Agent",
      type: "LangChainAgent",
      parameters: {
        agent: "Tools Agent",
        promptType: "ConnectedChatTriggerNode",
        text: "fgjhfghfg",
        options: {},
      },
      position: { x: 1294, y: 102 },
      inputs: [
        {
          id: "input",
          name: "fromSwitch",
          description: "data coming from previous node",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "agent output",
          description: "tools agent",
          type: "object",
        },
        {
          id: "chatModel",
          name: "toOllama",
          description: "data sending to LangchainAgent chatModel",
          type: "object",
        },
        {
          id: "tool1",
          name: "toTool1",
          description: "data sending to customerSuppertDocs tool",
          type: "tool",
        },
        {
          id: "tool2",
          name: "toTool2",
          description: "data sending to createDraft tool",
          type: "tool",
        },
      ],
    },
    {
      id: "node_my2jq3_ollama-chat",
      name: "Ollama Chat Model",
      description: "Ollama Chat Model",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: "phi4:latest",
        options: { topK: "-1.0", vocabOnly: true, format: "Default" },
      },
      position: { x: 1070, y: 340 },
      inputs: [
        {
          id: "output",
          name: "ollma_output",
          description: "ollama output port",
          type: "object",
        },
      ],
      outputs: [],
    },
    {
      id: "node_vc0ybs_vector-store",
      name: "Vector Store Tool",
      description: "vectore store tool customerSuppertDocs",
      type: "VectoreStoreTool",
      parameters: { name: "dfsdfsd", description: "dsfsdf", limit: "fsdfsd" },
      position: { x: 1250.0027624309391, y: 372.53453038674036 },
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "data coming from pg vector store node",
          type: "tool",
        },
      ],
      outputs: [
        {
          id: "chatModel",
          name: "toChatModel3",
          description: "data sending to ollama model 3",
          type: "object",
        },
        {
          id: "vectorStore",
          name: "toPgVectorStore",
          description: "data sending to pgvector",
          type: "object",
        },
      ],
    },
    {
      id: "node_2vcesq_pg-vector",
      name: "PGVector Store",
      description: "pgvectore store",
      type: "PGVectorStore",
      parameters: {
        credentials: {
          id: "a",
          name: "Postgres account",
          provider: "postgres",
          ctype: "db",
        },
        operationMode: "getMany",
        tableName: "dfdsfsdfsd",
        limit: "10",
        prompt: "How Are you?",
        includeMetadata: true,
        options: {},
      },
      position: { x: 989.5773480662982, y: 525.4019337016575 },
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "data coming from Vector Store Tool",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "chatModel",
          name: "Output",
          description: "pgVector chat model for embeddings",
          type: "object",
        },
      ],
    },
    {
      id: "node_h8grki_ollama-chat",
      name: "Ollama Chat Model",
      description: "Ollama Chat Model",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: "deepseek-r1:r1.5b",
        options: { topP: "1.0", penalizeNewline: true, useMLock: true },
      },
      position: { x: 1440, y: 549 },
      inputs: [
        {
          id: "output",
          name: "ollma_output",
          description: "ollama output port",
          type: "object",
        },
      ],
      outputs: [],
    },
    {
      id: "node_dm3c3i_embedding",
      name: "Embeddings",
      description: "embeddings for PGVectore Store",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: "phi4:latest",
      },
      position: { x: 746.5911602209943, y: 645.0372928176796 },
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "embeddings vector as output",
          description: "turn text into vectors",
          type: "object",
        },
      ],
    },
  ],
  connections: [
    {
      id: "edge_node_wvil6e_gmail-trigger_0_node_alx33o_edit_0",
      sourceNodeId: "node_wvil6e_gmail-trigger",
      sourcePortId: "vertex_j3t0fc",
      targetNodeId: "node_alx33o_edit",
      targetPortId: "vertex_fxalmi",
    },
    {
      id: "edge_node_alx33o_edit_0_node_svfcew_ai-agent_0",
      sourceNodeId: "node_alx33o_edit",
      sourcePortId: "vertex_1cii0z",
      targetNodeId: "node_svfcew_ai-agent",
      targetPortId: "vertex_nz1xxk",
    },
    {
      id: "edge_4wqzg2_node_svfcew_ai-agent_0_node_z8o681_ollama-chat_0",
      sourceNodeId: "node_svfcew_ai-agent",
      sourcePortId: "vertex_2w3swk",
      targetNodeId: "node_z8o681_ollama-chat",
      targetPortId: "vertex_l2suea",
    },
    {
      id: "edge_node_svfcew_ai-agent_0_node_3dltg5_switch_0",
      sourceNodeId: "node_svfcew_ai-agent",
      sourcePortId: "vertex_3leijo",
      targetNodeId: "node_3dltg5_switch",
      targetPortId: "vertex_midq1u",
    },
    {
      id: "edge_9fk1p5_node_3dltg5_switch_0_node_xn64x7_customer-support-agent_0",
      sourceNodeId: "node_3dltg5_switch",
      sourcePortId: "vertex_t5zk99",
      targetNodeId: "node_xn64x7_customer-support-agent",
      targetPortId: "vertex_gectlr",
    },
    {
      id: "edge_kd2b4e_node_xn64x7_customer-support-agent_0_node_my2jq3_ollama-chat_0",
      sourceNodeId: "node_xn64x7_customer-support-agent",
      sourcePortId: "vertex_i45ck9",
      targetNodeId: "node_my2jq3_ollama-chat",
      targetPortId: "vertex_bsud5w",
    },
    {
      id: "edge_eipkq5_node_xn64x7_customer-support-agent_2_node_vc0ybs_vector-store_0",
      sourceNodeId: "node_xn64x7_customer-support-agent",
      sourcePortId: "vertex_ekebx4",
      targetNodeId: "node_vc0ybs_vector-store",
    },
    {
      id: "edge_eeeafy_node_vc0ybs_vector-store_0_node_2vcesq_pg-vector_0",
      sourceNodeId: "node_vc0ybs_vector-store",
      sourcePortId: "vertex_4qx5nd",
      targetNodeId: "node_2vcesq_pg-vector",
    },
    {
      id: "edge_4vdz5t_node_vc0ybs_vector-store_1_node_h8grki_ollama-chat_0",
      sourceNodeId: "node_vc0ybs_vector-store",
      sourcePortId: "vertex_z7tq55",
      targetNodeId: "node_h8grki_ollama-chat",
      targetPortId: "vertex_8gm2rv",
    },
    {
      id: "edge_bttjri_node_2vcesq_pg-vector_0_node_dm3c3i_embedding_0",
      sourceNodeId: "node_2vcesq_pg-vector",
      sourcePortId: "vertex_7s1afw",
      targetNodeId: "node_dm3c3i_embedding",
      targetPortId: "vertex_dtcgey",
    },
  ],
};
