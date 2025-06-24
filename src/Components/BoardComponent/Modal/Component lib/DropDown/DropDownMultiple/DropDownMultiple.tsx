import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
  Show,
} from "solid-js";
import "./dropDownMultiple.css";
import Tooltip from "../../../BottomPart/MidPanel/Tooltip";

interface Option {
  value: string;
  label: string;
}

interface DropDownMultipleProps {
  options: Option[];
  defaultSelectedOptions?: string[];
  title?: string;
  footNote?: string;
  name?: string;
  toolTipText?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (selectedOptions: Option[]) => void;
}

const DropDownMultiple = (props: DropDownMultipleProps) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [selectedOptions, setSelectedOptions] = createSignal<Option[]>([]);
  const [selectedLabels, setSelectedLabels] = createSignal<string[]>([]);
  const [dropdownDirection, setDropdownDirection] = createSignal<"down" | "up">(
    "down"
  );

  let selectRef: HTMLDivElement | undefined;
  let dropdownRef: HTMLDivElement | undefined;

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: Event) => {
    if (selectRef && !selectRef.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Close dropdown on various events
  const closeDropdown = () => setIsOpen(false);

  onMount(() => {
    if (props.defaultSelectedOptions) {
      const defaultOptions = props.options.filter((opt) =>
        props.defaultSelectedOptions!.includes(opt.value)
      );
      if (defaultOptions) {
        setSelectedOptions(defaultOptions);
        const selectedLabels = defaultOptions.map((opt) => opt.label);
        setSelectedLabels(selectedLabels);
        props.onChange?.(defaultOptions)
      }
    }
    // Add all event listeners that should close the dropdown
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, {
      passive: true,
    });
    window.addEventListener("resize", closeDropdown);
    window.addEventListener("blur", closeDropdown);
  });

  onCleanup(() => {
    // Clean up all event listeners
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
    window.removeEventListener("resize", closeDropdown);
    window.removeEventListener("blur", closeDropdown);
  });

  //   createEffect(() => {
  //     // Notify parent component when selection changes
  //     if (selectedOption() !== "" && props.onChange) {
  //       props.onChange(selectedOption());
  //     }
  //   });

  const toggleDropdown = (e:Event) => {
    e.stopPropagation();
    if (!isOpen()) {
      // Check direction before opening
      checkDropdownDirection();
    }
    setIsOpen(!isOpen());
  };
  const handleOptionClick = (option: Option) => {
    const currentSelected = selectedOptions();
    const isAlreadySelected = currentSelected.some(
      (item) => item.value === option.value
    );

    if (isAlreadySelected) {
      return;
    }

    const newSelected = [...currentSelected, option];
    setSelectedOptions(newSelected);
    const selectedLabels = newSelected.map((item) => item.label);
    setSelectedLabels(selectedLabels);
    setIsOpen(false);

    // Notify parent component when selection changes
    if (props.onChange) {
      props.onChange(newSelected);
    }

    // Focus back on the select button after selection
    if (selectRef) {
      selectRef.focus();
    }
  };

  function handleRemove(e: MouseEvent, label: string) {
    e.stopPropagation();
    const newSelected = selectedOptions().filter(
      (item) => item.label !== label
    );
    setSelectedOptions(newSelected);
    setSelectedLabels(selectedLabels().filter((item) => item !== label));

    // Notify parent component when selection changes
    if (props.onChange) {
      props.onChange(newSelected);
    }
  }

  // Check dropdown position and calculate if it should open up or down
  const checkDropdownDirection = () => {
    if (!selectRef) return;

    const selectRect = selectRef.getBoundingClientRect();
    let viewportHeight = document.getElementById("mid-panel")?.clientHeight;

    // Available space below the dropdown
    const spaceBelow = viewportHeight! - selectRect.bottom;
    // Space needed for dropdown (can be adjusted based on your needs)
    const neededSpace = 200; // Using max-height from your CSS

    // If there's not enough space below, open upwards
    if (spaceBelow < neededSpace) {
      setDropdownDirection("up");
    } else {
      setDropdownDirection("down");
    }
  };

  return (
    <div class="w-full">
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
      <div class="custom-select" ref={selectRef}>
        <For each={selectedOptions()}>
          {(option, index) => (
            <input type="hidden" name={`${props.name}`} value={option.value} />
          )}
        </For>

        {/* Custom select button */}
        <div
          class={`select-selected ${isOpen() ? "active" : ""} ${
            props.disabled ? "disabled" : ""
          }`}
          onClick={!props.disabled ? toggleDropdown : undefined}
          // onKeyDown={!props.disabled ? handleKeyDown : undefined}
          tabIndex={props.disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen()}
          role="combobox"
        >
          {selectedLabels().length <= 0
            ? props.placeholder || "Select an option"
            : ""}
          <div class="flex gap-1.5">
            <For each={selectedLabels()}>
              {(label, index) => {
                if (index() < 3) {
                  return (
                    <div class="flex relative gap-1 rounded-md bg-[#323236] px-2 py-1 items-center group duration-200">
                      <div class="text-xs font-medium">{label}</div>
                      <div class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-75 group-hover:max-w-[20px] group-hover:opacity-100 ">
                        <div
                          class="text-[#c45454] font-bold cursor-pointer"
                          onClick={(e) => handleRemove(e, label)}
                        >
                          ×
                        </div>
                      </div>
                    </div>
                  );
                }
              }}
            </For>
            <Show when={selectedLabels().length > 3}>
              <div class="flex gap-1 rounded-md bg-[#323236] px-1 py-1 items-center">
                + {selectedLabels().length - 3}
              </div>
            </Show>
          </div>
        </div>

        {/* Dropdown items */}
        <div
          title="dropdown items"
          class={`select-items ${isOpen() ? "select-show" : "select-hide"} ${
            dropdownDirection() === "up" ? "select-direction-up" : ""
          }`}
          ref={dropdownRef}
          role="listbox"
        >
          <For each={props.options}>
            {(option, index) => (
              <div
                class={
                  selectedOptions().some((item) => item.value === option.value)
                    ? "selected"
                    : ""
                }
                onClick={[handleOptionClick, option]}
                // onKeyDown={(e) => handleOptionKeyDown(e, option, index())}
                tabIndex={isOpen() ? 0 : -1}
                role="option"
                aria-selected={selectedOptions().some(
                  (item) => item.value === option.value
                )}
              >
                {option.label}
              </div>
            )}
          </For>
        </div>
        <p class="foot-note">{props.footNote}</p>
      </div>
    </div>
  );
};

export default DropDownMultiple;

export type { Option, DropDownMultipleProps };
