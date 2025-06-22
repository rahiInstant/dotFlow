import { Component } from "solid-js";
import useStateContext from "../useStateContext";

const Modal3: Component = () => {
  const { setIsModalOpen3 } = useStateContext();
  return (
    // main
    <div class="bg-[#20202c] text-white rounded-lg w-full min-h-[400px] max-h-[800px] flex flex-col">
      {/* Header */}
      <div class="flex items-center justify-between p-4 border-b border-[#39393b] flex-shrink-0">
        <h2 class="text-xl font-medium">Edit Sender</h2>
        <div
          onClick={() => setIsModalOpen3(false)}
          class="text-gray-400 hover:text-white text-xs cursor-pointer bg-[#151520] rounded-md w-6 h-6 flex justify-center items-center"
        >
          ✕
        </div>
      </div>

      {/* Content */}
      <div class="p-4 flex flex-col flex-1">
        <label class="text-base text-gray-300 mb-2 font-semibold">Sender</label>
        <textarea
          placeholder="..."
          class="min-h-[300px] border rounded p-3 border-neutral-700 bg-[#252631] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors resize-y"
        />
      </div>
    </div>
  );
};

export default Modal3;
