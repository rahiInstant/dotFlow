import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
  Component,
} from "solid-js";
import "./dependentDropDown.css";
import useStateContext from "../../../../useStateContext";
import Tooltip from "../../../BottomPart/MidPanel/Tooltip";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface DropDownNProps {
  name: string;
  title?: string;
  toolTipText?: string;
  options?: Option[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  footNote?: string;
  // containerId: string;
  onChange?: (selectedOption: Option) => void;
}

const DependentDropDown: Component<DropDownNProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const { setIsModalOpen2 } = useStateContext();
  const [selectedOption, setSelectedOption] = createSignal<Option>({
    value: "",
    label: "",
    description: "",
  });
  const [dropdownDirection, setDropdownDirection] = createSignal<"down" | "up">(
    "down"
  );

  let selectRef: any;
  let dropdownRef: any;

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
    if (selectRef && !selectRef.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Close dropdown on various events
  const closeDropdown = () => setIsOpen(false);

  onMount(() => {
    if (props.defaultValue) {
      const defaultOption =
        props.options &&
        props.options.find((opt) => opt.value === props.defaultValue);
      defaultOption && setSelectedOption(defaultOption);
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

  createEffect(() => {
    // Notify parent component when selection changes
    if (selectedOption() && props.onChange) {
      props.onChange(selectedOption()!);
    }
  });

  const toggleDropdown = (e: any) => {
    e.stopPropagation();
    if (!isOpen()) {
      // Check direction before opening
      checkDropdownDirection();
    }
    setIsOpen(!isOpen());
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    // setSelectedLabel(option.label);
    setIsOpen(false);

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
    <div class="custom-select" ref={selectRef}>
      <label class="label" for={props.name}>
        {props.title}
        {props.toolTipText && (
          <div class="toolTipBtn">
            <Tooltip content={props.toolTipText} />
          </div>
        )}
      </label>
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
              classList={{
                "child-option": true,
                selected: option.value === selectedOption().value,
                "aria-selected-true": option.value === selectedOption().value,
              }}
              class={option.value === selectedOption().value ? "selected" : ""}
              onClick={[handleOptionClick, option]}
              // onKeyDown={(e) => handleOptionKeyDown(e, option, index())}
              tabIndex={isOpen() ? 0 : -1}
              role="option"
              aria-selected="true"
            >
              {option.label}
            </div>
          )}
        </For>
        <div
          onClick={(e) => {
            toggleDropdown(e);
            setIsModalOpen2(true);
          }}
          tabIndex={isOpen() ? 0 : -1}
          role="option"
          aria-selected="true"
        >
          + Create new credentials
        </div>
      </div>
      <p class="foot-note">{props.footNote}</p>
    </div>
  );
};

export default DependentDropDown;
