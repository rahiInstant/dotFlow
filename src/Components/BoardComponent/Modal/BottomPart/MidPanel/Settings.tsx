import { Component, createSignal } from "solid-js";
// import Switch from "./Switch";
import Dropdown from "./Dropdown";
import NoteBox from "./NoteBox";
import Tooltip from "./Tooltip";
import useStateContext from "../../../useStateContext";
import ModalConfig from "../../../../FlowContent/NodeComponents/ModalConfig";
import Switch from "../../Component lib/Switch/Switch";

const Settings: Component<{}> = (props) => {
  const [showTooltip, setShowTooltip] = createSignal(false);
  const { currentFormConfig, settingConfig } = useStateContext();
  // const componentConfig = {
  //   switch: Switch,
  //   dropdown: Dropdown,
  //   // "note-box": NoteBox,
  // };

  const options = [
    {
      value: "Stop workflow",
      label: "Stop workflow",
      description: "Halt execution and fail workflow.",
    },
    {
      value: "Continue",
      label: "Continue",
      description: "Press Error message as item in regular output.",
    },
    {
      value: "Continue(using error output)",
      label: "Continue(using error output)",
      description: "Pass item to an extra `error` output.",
    },
  ];
  return (
    <div class="mt-0 px-5 py-4 overflow-visible">
      <div class="text-white">
        {/* <h3 class="text-lg mb-4">Options</h3>
        <p class="text-gray-400">Settings content would go here.</p> */}
        {/* <Switch
          switchText="Always Output Data"
          toolTipContent={{
            label: "",
            text: "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
          }}
        /> */}

        <div class="mt-3 space-y-3">
          {settingConfig()?.settings.map((item, index) => {
            if (item.type === "dropdown") {
              return (
                <Dropdown
                  // key={index}
                  options={options}
                />
              );
            } else if (item.type === "switch") {
              // return (
              //   <Switch
              //     // key={index}
              //     switchText={item.label}
              //     toolTipContent={{
              //       label: "",
              //       text: item.description,
              //     }}
              //   />
              // );
            }
          })}
          <NoteBox
            toolTipContent={{
              label: "",
              text: "Optional note to save with the node",
            }}
          />
          <Switch
            switchText=""
            toolTipContent={{
              label: "",
              text: "",
            }}
          />
          <div class="mt-6">
            <hr class="border-[#373749]" />
            <p class="mt-1 text-[#737475] text-sm">
              Switch node version 2.3.2(latest)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
