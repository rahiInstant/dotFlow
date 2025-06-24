import { Component, createSignal, onCleanup, onMount } from "solid-js";
import style from "../style.module.css";
import useStateContext from "../useStateContext";
import { Edge } from "../../ButtonComponents/Types";
import { domToJsonExtended } from "./domToJsonToDom";


const SendData: Component<{}> = (props) => {
  const { formData, nodes, edges } = useStateContext();
  const [backendUrl, setBackendUrl] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);

  // interface nodeDataType {
  //   id: string;
  //   description: string;
  //   type: string;
  //   parameters: {
  //     mode?: string;
  //     assignments?: Array<{
  //       id: string;
  //       name: string;
  //       value: string;
  //       type: string;
  //     }>;
  //     credentials?: {
  //       id: string;
  //       name: string;
  //       provider: string;
  //       ctype: string;
  //     };
  //     poolTime?: Array<{
  //       mode: string;
  //     }>;
  //     simple?: boolean;
  //     filter?: {
  //       includeSpamTrash?: boolean;
  //       includeDrafts?: boolean;
  //       labelIds?: string[];
  //       q?: string;
  //       readStatus?: string;
  //       sender?: string;
  //     };
  //     options?: {
  //       downloadAttachments: boolean;
  //       attachmentPrefix: string;
  //     };
  //   };
  //   position: {
  //     x: number;
  //     y: number;
  //   };
  //   inputs?: Array<{
  //     id: string;
  //     name: string;
  //     description: string;
  //     type: string;
  //   }>;
  //   outputs?: Array<{
  //     id: string;
  //     name: string;
  //     description: string;
  //     type: string;
  //   }>;
  // }

  //   interface edgeDataType {
  //     id: string;
  //     sourceNodeId: string;
  //     sourcePortId: string;
  //     targetNodeId: string;
  //     targetPortId: string;
  //   }

  //   const [nodeData, setNodeData] = createSignal<nodeDataType[]>([]);
  //   const [edgeData, setEdgeData] = createSignal<edgeDataType[]>([]);

  // const handleData = () => {
  //     // setLoading(true);

  //     const newNodeData: nodeDataType[] = [];
  //     const newEdgeData: edgeDataType[] = [];

  //     nodes().forEach((value) => {
  //       if (value.name === "gmail-trigger") {
  //         newNodeData.push({
  //           id: value.id,
  //           description: value.name,
  //           type: value.name,
  //           parameters: {
  //             credentials: {
  //               id: formData()[value.id]["Client ID"],
  //               name: "Gmail Account",
  //               provider: "gmail",
  //               ctype: formData()[value.id]["connection type"],
  //             },
  //             poolTime: formData()[value.id]["poolTime"],
  //             simple: formData()[value.id]["simplify"],
  //             filter: {
  //               includeSpamTrash: formData()[value.id]["includeSpamTrash"],
  //               includeDrafts: formData()[value.id]["includeDrafts"],
  //               labelIds: formData()[value.id]["labelNamesOrIds"],
  //               q: formData()[value.id]["search"],
  //               sender: formData()[value.id]["sender"],
  //               readStatus: formData()[value.id]["readStatus"],
  //             },
  //             options: {
  //               downloadAttachments: formData()[value.id]["downloadAttachments"],
  //               attachmentPrefix: formData()[value.id]["attachmentsPrefix"],
  //             },
  //           },
  //           position: {
  //             x: Math.round(value.currPosition.get().x),
  //             y: Math.round(value.currPosition.get().y),
  //           },
  //           inputs: [],
  //           outputs: [
  //             {
  //               id: "output",
  //               name: "Last Email",
  //               description: "Read last email from your gmail inbox",
  //               type: "object",
  //             },
  //           ],
  //         });
  //       } else if (value.name === "edit") {
  //         newNodeData.push({
  //           id: value.id,
  //           description: value.name,
  //           type: value.name,
  //           parameters: {
  //             mode: formData()[value.id]["mode"],
  //             assignments: formData()[value.id]["assignments"],
  //           },
  //           position: {
  //             x: Math.round(value.currPosition.get().x),
  //             y: Math.round(value.currPosition.get().y),
  //           },
  //           inputs: [
  //             {
  //               id: "input",
  //               name: "Input",
  //               description: "Data to filter",
  //               type: "array",
  //             },
  //           ],
  //           outputs: [
  //             {
  //               id: "output",
  //               name: "Output",
  //               description: "Outcode of the node after process",
  //               type: "object",
  //             },
  //           ],
  //         });
  //       }
  //     });

  //     edges().forEach((value) => {
  //       newEdgeData.push({
  //         id: value.id,
  //         sourceNodeId: value.nodeStartId,
  //         sourcePortId: value.outputVertexId,
  //         targetNodeId: value.nodeEndId,
  //         targetPortId: value.inputVertexId,
  //       });
  //     });

  //     setNodeData(newNodeData);
  //     setEdgeData(newEdgeData);

  //     const finalData = {
  //       name: "Email Analyzer",
  //       description:
  //         "A workflow demonstrating multiple inputs and outputs per node",
  //       nodes: nodeData(),
  //       connections: edgeData(),
  //     };

  //     const event = new CustomEvent("data", { detail: finalData });
  //     document.dispatchEvent(event);

  //     setNodeData([])
  //     setEdgeData([])
  //     return finalData;
  //   };

  function submitAllForms() {
    const connections = edges().map((item: Edge) => {
      return {
        id: item.id,
        sourceNodeId: item.nodeStartId,
        sourcePortId: item.outputVertexId,
        targetNodeId: item.nodeEndId,
        targetPortId: item.inputVertexId,
      };
    });

    const finalJSON = {
      name: "Email Analyzer",
      description:
        "A workflow demonstrating multiple inputs and outputs per node",
      nodes: Object.values(formData()),
      connections: connections,
    };
    console.log(JSON.stringify(finalJSON));
    const customEvent = new CustomEvent("sendAllData", {
      detail: JSON.stringify(finalJSON, null, 2),
      bubbles: true,
    });
    const submitAll = document.getElementById("allSubmit");
    if (submitAll) {
      submitAll.dispatchEvent(customEvent);
    }
  }

  const domToJsonOutput = () => {
    const workflow = document.getElementById("flow");
    console.log(workflow);
    const jsonFlow = domToJsonExtended(workflow);
    console.log(jsonFlow);
    console.log(JSON.stringify(jsonFlow));
  };

  return (
    <div class={style.testWorkFlow}>
      <div
        class={`fixed ${
          loading() ? "top-2" : "-top-20"
        } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`}
      >
        <span class={style.loader}></span>
        Data processing...
      </div>
      {/* <div>
        <input
          onChange={(e) => setBackendUrl(e.target.value)}
          class="border rounded-md px-4 py-2 outline-none border-white"
          title="backendUrl"
          name="url"
          type="text"
        />
      </div> */}
      <button
        id="allSubmit"
        onClick={submitAllForms}
        // type="submit"
        class={style.testButton}
      >
        Test WorkFlow
      </button>
      <button
        id="domJson"
        onClick={domToJsonOutput}
        // type="submit"
        class={style.testButton}
      >
        DOM to JSON
      </button>
    </div>
  );
};

export default SendData;
