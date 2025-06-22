import { Component, createSignal } from "solid-js";
import Parameters from "./parameterMain";
import Settings from "./Settings";
import style from "./style.module.css";
import useStateContext from "../../../useStateContext";

const MidPanel: Component<{}> = (props) => {
  const {currentFormConfig} = useStateContext()
  const [activeTab, setActiveTab] = createSignal(0);

  return (
    <div
      id="mid-panel"
      classList={{
        [style.midPanel]: true,
      }}
      class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"
    >
      {/* Header */}
      <div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50">
        <div class="flex items-center">
          <div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2">
            <svg
              class="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 12h10M9 6l6 6-6 6" />
            </svg>
          </div>
          <span class="text-white font-medium">{currentFormConfig().title}</span>
        </div>
        <button id="submitBtn" type="submit" form={`${currentFormConfig().name}Form`} class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">
          Test step
        </button>
      </div>

      {/* Content */}
      <div class="h-full flex-1 overflow-visible">
        <div class="w-full">
          <div class="border-b border-gray-700/50 bg-[#232130]">
            <div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer">
              <div
                onClick={() => setActiveTab(0)}
                // value="parameters"
                class={`rounded-none border-b-2 ${
                  activeTab() == 0 ? "border-purple-500" : "border-transparent"
                } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`}
              >
                Parameters
              </div>
              <div
                // value="settings"
                onClick={() => setActiveTab(1)}
                class={`rounded-none border-b-2 ${
                  activeTab() == 1 ? "border-purple-500" : "border-transparent"
                } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`}
              >
                Settings
              </div>
            </div>
          </div>
          <div class="overflow-visible">
            <div class={activeTab() === 0 ? "" : "hidden"}>
              <Parameters />
            </div>
            <div class={activeTab() === 1 ? "" : "hidden"}>
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidPanel;
