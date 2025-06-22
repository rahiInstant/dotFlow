import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
  Component,
} from "solid-js";
import "./DropDownN.css";
import Tooltip from "../../../BottomPart/MidPanel/Tooltip";

interface DropDownNOption {
  value: string ;
  label: string;
  description?: string;
  icon?: string;
}

interface DropDownNProps {
  title?: string;
  toolTipText?: string;
  name: string;
  options: DropDownNOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  footNote?: string;
  onChange?: (selectedOption: DropDownNOption) => void;
}

const DropDownN: Component<DropDownNProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedOption, setSelectedOption] = createSignal<DropDownNOption>({
    value: "",
    label: "",
    description: "",
  });
  const [dropdownDirection, setDropdownDirection] = createSignal<"down" | "up">(
    "down"
  );

  let selectRef: any;
  let dropdownRef: any;
  const dnTriggered = new Set<string>();

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
    if (selectRef && !selectRef.contains(e.target)) {
      setIsOpen(false);
    }
  };
  let prevValue = props.defaultValue;



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

  const handleOptionClick = (option: DropDownNOption) => {
    setSelectedOption(option);
    // setSelectedLabel(option.label);
    setIsOpen(false);

    if (selectedOption() && props.onChange) {
      props.onChange(selectedOption());
    }

    // Focus back on the select button after selection
    if (selectRef) {
      selectRef.focus();
    }
  };

  // Check dropdown position and calculate if it should open up or down
  const checkDropdownDirection = () => {

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

    </div>
  );
};

export default DropDownN;
export type { DropDownNProps, DropDownNOption };
