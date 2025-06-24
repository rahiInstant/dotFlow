import { createSignal, onCleanup, createEffect, JSX, onMount } from "solid-js";
import BoxArrowUpLeft from "../../../Icons/BoxArrowUpLeft";
import useStateContext from "../../../../useStateContext";
import "./dynamicInput.css";
import Tooltip from "../../../BottomPart/MidPanel/Tooltip";
import { dynamicInputType } from "./inputType";

interface DynamicInputProps {
  name: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string | number, event?: any) => void;
  uniqueKey?: any;
  disabled?: boolean;
  title?: string;
  footNote?: string;
  isArrow?: boolean;
  isExpand?: boolean;
  toolTipText?: string;
  class?: string;
  autocomplete?: boolean;
  type?: dynamicInputType;
  pattern?: string;
}

interface InputState {
  isExpanded: boolean;
  inputValue: string;
}

const DynamicInput = (props: DynamicInputProps) => {
  const { setIsModalOpen3 } = useStateContext();
  const [isExpanded, setIsExpanded] = createSignal<boolean>(false);
  const [inputValue, setInputValue] = createSignal<string | number>(
    props.value || ""
  );

  let inputRef: HTMLInputElement | undefined;
  let containerRef: HTMLDivElement | undefined;

  const [mountKey, setMountKey] = createSignal<any>("");

  createEffect(() => {
    const key = `${props.uniqueKey}-${props.name}`;
    if (key !== mountKey()) {
      setMountKey(key);
      setInputValue(props.value || "")
      props.onInput?.(props.value || "");
    }
  });

  // Handle clicks outside the component
  const handleClickOutside = (event: Event): void => {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      setIsExpanded(false);
    }
  };

  const closeExpandPortion = () => setIsExpanded(false);

  // Add event listeners when component mounts
  onMount(() => {
    // props.onInput?.(props.value || "");
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });
    window.addEventListener("resize", closeExpandPortion);
    window.addEventListener("blur", closeExpandPortion);
  });

  // Clean up event listeners
  onCleanup(() => {
    document.removeEventListener("click", handleClickOutside);
    // document.removeEventListener('keydown', handleKeyDown);
  });

  const handleFocus = (): void => {
    if (!props.disabled) {
      setIsExpanded(true);
    }
  };

  const handleInputChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setInputValue(value);
    props.onInput?.(value, e);
  };

  const toggleExpanded = (): void => {
    if (props.disabled) return;

    const newState = !isExpanded();
    setIsExpanded(newState);

    if (newState) {
      inputRef?.focus();
    }
  };

  const handleLearnMoreClick = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      class={`relative w-full group ${props.class || ""}`}
    >
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
      {/* Main Input Container */}
      <div class="relative">
        <input
          autocomplete={props.autocomplete ? "on" : "off"}
          ref={inputRef}
          type={props.type || "text"}
          name={props.name}
          onInput={handleInputChange}
          onFocus={handleFocus}
          disabled={props.disabled}
          value={props.value || ""}
          placeholder={props.placeholder || ""}
          pattern={props.pattern}
          class={`w-full px-3 py-2.5 pr-8 border font-normal rounded-sm border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />

        {/* Arrow Button */}
        {props.isArrow && (
          <button
            type="button"
            disabled={props.disabled}
            class={`absolute right-0 bottom-0 text-gray-400 text-[10px] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
              props.disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            aria-label="Toggle expanded view"
            onClick={() => setIsModalOpen3(true)}
          >
            <BoxArrowUpLeft />
          </button>
        )}
      </div>

      {/* Expanded Information Panel */}
      {props.isExpand && (
        <div
          class={`absolute top-[105%] rounded-sm  left-0 right-0 p-4 bg-[#1f1f2b] border border-gray-600 border-t-0 rounded-b transition-all duration-200 z-10 ${
            isExpanded() ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* <div class="px-3 py-1.5 text-gray-300">
            <b>Tips: </b>insert an input field to get result.
          </div> */}
          {/* Result Section */}
          <div class="">
            <div class="mb-3">
              <div class="flex justify-between items-center mb-2">
                <span class="text-white text-sm font-medium">Result</span>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400 text-xs">Item</span>
                  <span class="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                    0
                  </span>
                  <div class="flex gap-1">
                    <button
                      type="button"
                      class="text-gray-400 hover:text-white text-xs cursor-pointer"
                      aria-label="Previous item"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      class="text-gray-400 hover:text-white text-xs cursor-pointer"
                      aria-label="Next item"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
              <div class="text-white text-sm">{inputValue() || "threadid"}</div>
            </div>

            {/* Tip Section */}
            <div>
              <div class="text-yellow-400 text-xs font-medium mb-1">Tip:</div>
              <div class="text-gray-300 text-xs">
                Anything inside <span class="text-blue-400">{"{}"}</span> is
                JavaScript.
                <button
                  type="button"
                  class="text-blue-400 hover:underline ml-1 cursor-pointer"
                  onClick={handleLearnMoreClick}
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div class="mt-3 pt-3 border-t border-gray-600">
              <div class="text-gray-400 text-xs">
                Press{" "}
                <kbd class="bg-gray-600 px-1 rounded text-white">Escape</kbd> to
                close
              </div>
            </div>
          </div>
        </div>
      )}
      {props.footNote && <p class="foot-note">{props.footNote}</p>}
    </div>
  );
};
export default DynamicInput;
