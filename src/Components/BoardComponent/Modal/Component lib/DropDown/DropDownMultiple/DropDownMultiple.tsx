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



    // Notify parent component when selection changes
    if (props.onChange) {
      // props.onChange({});
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

    </div>
  );
};

export default DropDownMultiple;

export type { Option, DropDownMultipleProps };
