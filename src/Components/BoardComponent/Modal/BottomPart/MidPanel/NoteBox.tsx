import { Component, createSignal } from "solid-js";
import Tooltip from "./Tooltip";

const NoteBox: Component<{
  toolTipContent: {
    label: string;
    text: string;
  };
}> = ({toolTipContent}) =>  {
  const [notes, setNotes] = createSignal("");
  const [showTooltip, setShowTooltip] = createSignal(false);

  return (
    <div class="flex flex-col text-sm text-gray-300 font-sans">
      <div class="text-sm flex items-center gap-1 group mb-1">
        <div>Notes</div>

        {/* Hover Target with Tooltip inside */}
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto"
        >
          ?
          <Tooltip showTooltip={showTooltip} toolTipContent={toolTipContent} />
        </div>
      </div>
      <textarea
        title="notes"
        id="notes"
        class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono"
        value={notes()}
        onInput={(e) => setNotes(e.target.value)}
      ></textarea>
    </div>
  );
}

export default NoteBox;
