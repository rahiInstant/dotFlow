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


    </div>
  );
};
export default DynamicInput;
