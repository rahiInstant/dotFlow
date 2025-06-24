import { Component, createSignal } from "solid-js";
import Tooltip from "../../../BottomPart/MidPanel/Tooltip";

const InputField: Component<{
  onInput?: (input: string) => void;
  name: string;
}> = ({ onInput, name }) => {
  const [showTooltip, setShowTooltip] = createSignal(false);

  return (
    <Tooltip
      visible={showTooltip()}
      content="Execute previous nodes to use input data."
      placement="top"
    >
      <div class="relative w-full">
        <input
          // id="name"
          name={name}
          type="text"
          title="input"
          placeholder="placeHolder"
          autocomplete="off"
          onFocusIn={() => setShowTooltip(true)}
          onFocusOut={() => setShowTooltip(false)}
          onChange={(e) => {
            onInput?.(e.target.value);
          }}
          class="w-full px-4 py-2 rounded-md border border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition"
        />
      </div>
    </Tooltip>
  );
};

export default InputField;
