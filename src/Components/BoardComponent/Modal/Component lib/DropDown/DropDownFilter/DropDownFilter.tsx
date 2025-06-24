import {
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  For,
  Component,
  Show,
} from "solid-js";
import "./dropDownFilter.css";

interface Option {
  label: string;
  value: string;
  description?: string;
}

interface Content {
  type: string;
  name: string;
  title?: string;
  toolTipText?: string;
  footNote?: string;
  options?: Option[];
  placeholder?:string;
  value?: string;
}

interface FilterOption {
  value: string;
  label: string;
  content: Content;
  description?: string;
}

interface DropDownFilterProps {
  name: string;
  // options: FilterOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  selectedOptions: () => FilterOption[];
  setSelectedOptions: (selectedOptions: FilterOption[]) => void;
  dropdownOptions: () => FilterOption[];
  setDropdownOptions: (selectedOptions: FilterOption[]) => void;
  onChange: (selectedOptions: FilterOption[]) => void;
}

const DropDownFilter: Component<DropDownFilterProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [dropdownDirection, setDropdownDirection] = createSignal<"down" | "up">(
    "down"
  );
  //   const [selectedLabel, setSelectedLabel] = createSignal(
  //     props.options.find((opt) => opt.value === props.defaultValue)?.label ||
  //       props.placeholder ||
  //       "Select an option"
  //   );

  let selectRef: any;
  let dropdownRef: any;

  // Close dropdown when clicking outside
  const handleOutsideClick = (e) => {
    if (selectRef && !selectRef.contains(e.target)) {
      closeDropdown();
    }
  };

  // Close dropdown on various events
  //   const closeDropdown = () => setIsOpen(false);

  onMount(() => {
    // setDropdownOptions(props.options);
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
    if (props.selectedOptions().length >= 1 && props.onChange) {
      props.onChange(props.selectedOptions());
    }
  });

  // Close dropdown on various events
  const closeDropdown = () => {
    if (isOpen()) {
      setIsOpen(false);

      // Add a slight delay before removing the element from DOM to allow animation to complete
      setTimeout(() => {
        const dropdown = dropdownRef;
        if (dropdown) {
          dropdown.classList.add("select-hide-complete");
        }
      }, 200); // Match this timing with CSS animation duration
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (!isOpen()) {
      // Check direction before opening
      checkDropdownDirection();
    }
    setIsOpen(!isOpen());
  };

  const handleOptionClick = (option: FilterOption) => {
    const currentSelected = props.selectedOptions();
    const isAlreadySelected = currentSelected.some(
      (item) => item.value === option.value
    );

    if (isAlreadySelected) {
      return;
    }

    props.setSelectedOptions([...currentSelected, option]);
    props.setDropdownOptions(
      props.dropdownOptions().filter((opt: FilterOption) => opt.value !== option.value)
    );
    closeDropdown();

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
    <Show when={props.dropdownOptions().length >= 1}>
      <div class="custom-select" ref={selectRef}>
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
          {props.placeholder}
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
          <For each={props.dropdownOptions()}>
            {(option, index) => (
              <div
                //   class={selectedOptions().includes(option.value) ? "selected" : ""}
                onClick={[handleOptionClick, option]}
                // onKeyDown={(e) => handleOptionKeyDown(e, option, index())}
                tabIndex={isOpen() ? 0 : -1}
                role="option"
                //   aria-selected={selectedOptions().includes(option.value)}
              >
                {option.label}
              </div>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
};

export default DropDownFilter;
export type { DropDownFilterProps, FilterOption, Content, Option };
