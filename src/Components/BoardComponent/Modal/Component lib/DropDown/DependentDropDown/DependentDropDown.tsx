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

      <p class="foot-note">{props.footNote}</p>
    </div>
  );
};

export default DependentDropDown;
