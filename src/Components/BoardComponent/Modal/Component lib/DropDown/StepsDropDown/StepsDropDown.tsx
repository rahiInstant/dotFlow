import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
  Show,
  Component,
} from "solid-js";
import "./stepsDropDown.css";

interface ChildOption {
  value: string;
  label: string;
}

interface ParentOption {
  value: string;
  label: string;
  children?: ChildOption[];
}

interface StepsDropDownProps {
  name: string;
  categoryLabel?: string;
  options: ParentOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  containerId?: string;
  defaultValue?: {
    parentOption: string;
    childOption: string;
  };
  onChange?: (selectedOption: {
    parentOption: string;
    childOption: ChildOption;
  }) => void;
}

const StepsDropDown: Component<StepsDropDownProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedOption, setSelectedOption] = createSignal<ChildOption | null>(
    null
  );
  const [selectedLabel, setSelectedLabel] = createSignal("Select an option");
  const [activeParent, setActiveParent] = createSignal<ParentOption | null>(
    null
  );


  let selectRef: any;
  let dropdownRef: any;



  // Close dropdown when clicking outside
  const handleOutsideClick = (e: any) => {
    if (selectRef && !selectRef.contains(e.target)) {
      setIsOpen(false);
      // Reset to main view when closing the dropdown
    }
  };

  // Close dropdown on various events
  const closeDropdown = () => {
    setIsOpen(false);
  };

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
    setIsOpen(!isOpen());
    if (!isOpen()) {
    }
  };

  const handleParentClick = (parentOption: ParentOption) => {
    setActiveParent(parentOption);
  };

  const handleChildClick = (childOption: ParentOption) => {
    setSelectedOption(childOption);
    setSelectedLabel(childOption.label);
    props.onChange?.({
      parentOption: activeParent()!.value,
      childOption: childOption,
    });
    setIsOpen(false);


    // Focus back on the select button after selection
    if (selectRef) {
      selectRef.focus();
    }
  };

  const handleBackClick = () => {

  };

  return (
    <div class="custom-select" ref={selectRef}>
      {/* Hidden native select for form submission */}
      <select
        title="native select for multi-steps dropdown"
        name={props.name}
        class="hidden-select"
        required={props.required}
        disabled={props.disabled}
      >

      </select>



    </div>
  );
};

export default StepsDropDown;
export type { ParentOption, ChildOption, StepsDropDownProps };
