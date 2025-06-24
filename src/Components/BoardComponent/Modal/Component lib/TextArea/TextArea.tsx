import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";
import Tooltip from "../../BottomPart/MidPanel/Tooltip";

interface TextAreaProps {
  name: string;
  placeholder?: string;
  value?: string;
  title?: string;
  uniqueKey?: any;
  toolTipText?: string;
  onInput?: (value: string) => void;
}

const TextArea: Component<TextAreaProps> = (props) => {
  const [text, setText] = createSignal<string>("");
  const [isEmpty, setIsEmpty] = createSignal<boolean>(true);
  const [mountKey, setMountKey] = createSignal<any>("");

  createEffect(() => {
    const key = `${props.uniqueKey}-${props.name}`;
    if (key !== mountKey()) {
      console.log('unique key from inside', props.uniqueKey)
      setIsEmpty(props.value?.trim() === "" || false);
      setMountKey(key);
      props.onInput?.(props.value || "");
    }
  });

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    setText(value);
    setIsEmpty(value.trim() === "");
    props.onInput?.(value || "")
  };

  return (
    <div class="relative">
      {props.title && (
        <label class="label" for={props.name}>
          {props.title}
          {props.toolTipText && (
            <div class="toolTipBtn">
              <Tooltip content={props.toolTipText} />
            </div>
          )}
        </label>
      )}
      <textarea
        name={props.name}
        autocomplete="off"
        value={props.value || ""}
        onInput={handleInput}
        placeholder={props.placeholder || "Type here..."}
        class={`
              w-full px-4 py-3 pr-12 
              bg-[#252434] text-white 
              rounded-lg resize-none 
              placeholder-gray-400
              focus:outline-none
              transition-all duration-200
              ${
                isEmpty()
                  ? "border-1 border-[#b46262] focus:border-[#888484]"
                  : "border-1 border-[#dad7d742] focus:border-[#888484]"
              }
            `}
        rows="3"
      />

      {/* Warning Icon */}
      {isEmpty() && (
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-red-500"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="m12 17 .01 0" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default TextArea;
