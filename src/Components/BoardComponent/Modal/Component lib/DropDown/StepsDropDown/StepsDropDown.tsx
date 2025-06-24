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
  uniqueKey?: any;
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
  const [currentView, setCurrentView] = createSignal("main");
  const [activeParent, setActiveParent] = createSignal<ParentOption | null>(
    null
  );
  const [mountKey, setMountKey] = createSignal<any>("")


  let selectRef: any;
  let dropdownRef: any;

  const setDefaultValue = () => {
    if (props.defaultValue) {
      const defaultParentOption = props.options.find(
        (opt) => opt.value === props.defaultValue?.parentOption
      );
      let defaultOption: ChildOption | undefined;
      if (defaultParentOption && defaultParentOption.children) {
        setActiveParent(defaultParentOption);
        defaultOption = defaultParentOption.children.find(
          (child) => child.value === props.defaultValue?.childOption
        );

        if (defaultOption) {
          setSelectedOption(defaultOption);
          setSelectedLabel(defaultOption.label);
          props.onChange?.({
            parentOption: defaultParentOption.value,
            childOption: defaultOption,
          });
        } else if (props.placeholder) {
          setSelectedLabel(props.placeholder);
        }
      }
    }
  };

  createEffect(() => {
    const key = `${props.uniqueKey}-${props.name}`;
    console.log("from outside", props.defaultValue);
    if (key !== mountKey()) {
      setMountKey(key);
      setDefaultValue();
    }
  });

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: any) => {
    if (selectRef && !selectRef.contains(e.target)) {
      setIsOpen(false);
      // Reset to main view when closing the dropdown
      setCurrentView("main");
    }
  };

  // Close dropdown on various events
  const closeDropdown = () => {
    setIsOpen(false);
    setCurrentView("main");
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

  // createEffect(() => {
  //   Notify parent component when selection changes
  //   if (selectedOption() !== "" && props.onChange) {
  //     Find the selected child option object
  //     let selected: ChildOption | undefined;
  //     for (const parent of props.options) {
  //       if (parent.value === selectedOption()) {
  //         selected = { value: parent.value, label: parent.label };
  //         break;
  //       }
  //       if (parent.children) {
  //         const found = parent.children.find(
  //           (child) => child.value === selectedOption()
  //         );
  //         if (found) {
  //           selected = found;
  //           break;
  //         }
  //       }
  //     }
  //     if (selected) {
  //       props.onChange(selected);
  //     }
  //   }
  // });

  const toggleDropdown = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen());
    if (!isOpen()) {
      setCurrentView("main");
    }
  };

  const handleParentClick = (parentOption: ParentOption) => {
    setActiveParent(parentOption);
    setCurrentView(parentOption.value);
  };

  const handleChildClick = (childOption: ParentOption) => {
    setSelectedOption(childOption);
    setSelectedLabel(childOption.label);
    props.onChange?.({
      parentOption: activeParent()!.value,
      childOption: childOption,
    });
    setIsOpen(false);
    setCurrentView("main");

    // Focus back on the select button after selection
    if (selectRef) {
      selectRef.focus();
    }
  };

  const handleBackClick = () => {
    setCurrentView("main");
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
        <For each={props.options}>
          {(parentOption) => (
            <>
              <option
                value={parentOption.value}
                selected={parentOption.value === activeParent()?.value}
              >
                {parentOption.label}
              </option>
              {parentOption.children && (
                <For each={parentOption.children}>
                  {(childOption) => (
                    <option
                      value={childOption.value}
                      selected={childOption.value === selectedOption()?.value}
                    >
                      {childOption.label}
                    </option>
                  )}
                </For>
              )}
            </>
          )}
        </For>
      </select>

      {/* Custom select button */}
      <div
        title="custom select button"
        classList={{
          "select-selected": true,
          active: isOpen(),
          disabled: props.disabled,
          "aria-expanded-true": isOpen(),
        }}
        onClick={!props.disabled ? toggleDropdown : undefined}
        tabIndex={props.disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded="false"
        role="combobox"
      >
        {selectedLabel()}
      </div>

      {/* Dropdown items */}
      <div
        title="dropdown items"
        class={`select-items ${isOpen() ? "select-show" : "select-hide"}`}
        ref={dropdownRef}
        role="listbox"
      >
        <Show when={currentView() === "main"}>
          {/* Main view - parent categories */}
          <For each={props.options}>
            {(option) => (
              <div
                classList={{
                  "parent-option": true,
                  selected: option.value === activeParent()?.value,
                  "aria-selected-true": option.value === activeParent()?.value,
                }}
                onClick={() =>
                  option.children
                    ? handleParentClick(option)
                    : handleChildClick(option)
                }
                tabIndex={isOpen() ? 0 : -1}
                role="option"
                aria-selected="false"
              >
                {option.label}
                {option.children && <span class="chevron-right">❯</span>}
              </div>
            )}
          </For>
        </Show>

        <Show when={currentView() !== "main"}>
          {/* Child categories view */}
          <div class="nested-header" onClick={handleBackClick}>
            <span class="chevron-left">❮</span>
            {props.categoryLabel || ""}
            {/* Back to{" "}
            {props.categoryLabel || "Categories"} */}
          </div>

          <For each={activeParent()?.children || []}>
            {(childOption) => (
              <div
                classList={{
                  "child-option": true,
                  selected: childOption.value === selectedOption()?.value,
                  "aria-selected-true":
                    childOption.value === selectedOption()?.value,
                }}
                onClick={() => handleChildClick(childOption)}
                tabIndex={isOpen() ? 0 : -1}
                role="option"
                aria-selected="false"
              >
                {childOption.label}
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default StepsDropDown;
export type { ParentOption, ChildOption, StepsDropDownProps };
