import {
  createSignal,
  onMount,
  onCleanup,
  For,
  Component,
  createEffect,
  untrack,
} from "solid-js";
import "./reproductiveDropDown.css";
import Tooltip from "../../../BottomPart/MidPanel/Tooltip";

interface ReproductiveChildren {
  type: string;
  name?: string;
  title?: string;
  toolTipText?: string;
  value?: string ;
  defaultValue?: string ;
  placeholder?: string;
  footNote?: string;
  children?: ReproductiveChildren[];
  options?: Array<{
    label: string;
    title?: string;
    toolTipText?: string;
    placeholder?: string;
    value: string ;
    description?: string;
    children?: ReproductiveChildren[];
  }>;
}

interface ReproductiveDropDownOption {
  value: string ;
  label: string;
  description?: string;
  children?: ReproductiveChildren[];
}

interface ReproductiveDropDownProps {
  name: string;
  title?: string;
  toolTipText?: string;
  uniqueKey?: any;
  options: ReproductiveDropDownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string ;
  footNote?: string;
  onChange: (selectedOption: ReproductiveDropDownOption) => void;
}

const ReproductiveDropDown: Component<ReproductiveDropDownProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedOption, setSelectedOption] =
    createSignal<ReproductiveDropDownOption>({
      value: "",
      label: "",
      children: [],
    });
  const [dropdownDirection, setDropdownDirection] = createSignal<"down" | "up">(
    "down"
  );
  // let prevValue = props.defaultValue;
  const RDTriggered = new Set<string>();

  let selectRef: any;
  let dropdownRef: any;
  const [mountKey, setMountKey] = createSignal<any>("");

  const setDefaultValue = () => {
    console.log("hey, i am in setDefault value.");
    const defaultOption = props.options.find(
      (opt) => opt.value === props.defaultValue
    );
    setSelectedOption(defaultOption || props.options[0]);
    props.onChange?.(defaultOption || props.options[0]);
  };

  createEffect(() => {
    const key = `${props.uniqueKey}-${props.name}`;
    console.log("from outside", key);
    if (key !== mountKey()) {
      setMountKey(key);
      setDefaultValue();
    }
  });

  // const setDefaultValue = () => {
  //   const defaultOption = props.options.find(
  //     (opt) => opt.value === props.defaultValue
  //   );
  //   setSelectedOption(defaultOption || props.options[0]);
  //   props.onChange(defaultOption || props.options[0]);
  //   if (props.defaultValue) {
  //     // if (defaultOption) {
  //     //   // const key = `${props.uniqueKey}-${defaultOption.value}`;
  //     //   // if (!hasTriggered.has(key)) {
  //     //   //   hasTriggered.add(key);
  //     //   // }
  //     //   // props.onChange(defaultOption);
  //     // }
  //   }
  // };

  // createEffect(() => {
  //   const key = `${props.uniqueKey}-${props.name}`;
  //   if (!RDTriggered.has(key)) {
  //     // RDTriggered.clear();
  //     RDTriggered.add(key);
  //     setDefaultValue();
  //   }
  // });

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
    if (selectRef && !selectRef.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown on various events
  const closeDropdown = () => setIsOpen(false);

  onMount(() => {
    // setDefaultValue();
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

  const toggleDropdown = (e: any) => {
    e.stopPropagation();
    if (!isOpen()) {
      // Check direction before opening
      checkDropdownDirection();
    }
    setIsOpen(!isOpen());
  };

  const handleOptionClick = (option: ReproductiveDropDownOption) => {
    setSelectedOption(option);
    // setSelectedLabel(option.label);
    setIsOpen(false);

    if (selectedOption() && props.onChange) {
      props.onChange(selectedOption()!);
    }

    // Focus back on the select button after selection
    if (selectRef) {
      selectRef.focus();
    }
  };

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
        {/* Hidden native select for form submission */}

        <select
          // multiple
          title="single select"
          name={props.name}
          // value={selectedOption()}
          class="hidden-select"
          required={props.required}
          disabled={props.disabled}
        >
          {/* <option value="" disabled>
          {props.placeholder || "Select an option"}
        </option> */}
          <For each={props.options}>
            {(option) => (
              <option
                value={option.value}
                selected={option.value === selectedOption().value}
              >
                {option.label}
              </option>
            )}
          </For>
        </select>

        {/* Custom select button */}
        <div
          title="custom select button"
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
          {selectedOption().label || props.placeholder}
        </div>

        {/* Dropdown items */}
        <div
          title="dropdown items"
          class={`select-items ${isOpen() ? "select-show" : "select-hide"}
        ${dropdownDirection() === "up" ? "select-direction-up" : ""}`}
          ref={dropdownRef}
          role="listbox"
        >
          <For each={props.options}>
            {(option, index) => (
              <div
                class={
                  option.value === selectedOption().value ? "selected" : ""
                }
                onClick={[handleOptionClick, option]}
                // onKeyDown={(e) => handleOptionKeyDown(e, option, index())}
                tabIndex={isOpen() ? 0 : -1}
                role="option"
                aria-selected={option.value === selectedOption().value}
              >
                <p>{option.label}</p>
                {option.description && (
                  <p class="text-xs font-light text-[#b9b5b5]">
                    {option.description}
                  </p>
                )}
                {/* Render children if they exist */}
              </div>
            )}
          </For>
        </div>
        <p class="foot-note">{props.footNote}</p>
      </div>
    </div>
  );
};

export default ReproductiveDropDown;
export type {
  ReproductiveDropDownOption,
  ReproductiveDropDownProps,
  ReproductiveChildren,
};
