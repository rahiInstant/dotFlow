import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";

interface DropdownProps {
  options: Array<{ label: string; value: string }>;
  onOption?: (options: { label: string; value: string }[]) => void;
}

const DynamicDropdown: Component<DropdownProps> = ({ options, onOption }) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selected, setSelected] = createSignal(options[0]);
  const [coords, setCoords] = createSignal({ top: 0, left: 0, width: 0 });
  const [openUpward, setOpenUpward] = createSignal(false);
  let triggerRef: HTMLButtonElement | undefined;

  // onMount(() => {
  //   onOption?.(options);
  // });

  const toggleDropdown = () => {
    if (!triggerRef) return;

    const rect = triggerRef.getBoundingClientRect();
    const dropdownHeight = 200; // estimated dropdown height

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const shouldOpenUpward =
      spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
    setOpenUpward(shouldOpenUpward);

    setCoords({
      top: shouldOpenUpward
        ? rect.top + window.scrollY - dropdownHeight
        : rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });

    setIsOpen(!isOpen());
  };

  const handleSelect = (option: (typeof options)[0]) => {
    setSelected(option);
    onOption?.(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const dropdown = document.getElementById("portal-dropdown");
    if (
      dropdown &&
      !dropdown.contains(e.target as Node) &&
      !triggerRef?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return (
    <div class="overflow-visible">
      <button
        type="button"
        ref={(el) => (triggerRef = el)}
        onClick={toggleDropdown}
        class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"
      >
        {selected().label}
        <svg
          class={`w-4 h-4 transition-transform ${isOpen() ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen() && (
        <Portal>
          <ul
            id="portal-dropdown"
            class={`absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700 overflow-hidden transition-transform duration-150 ${
              openUpward() ? "origin-bottom" : "origin-top"
            }`}
            style={{
              top: `${coords().top}px`,
              left: `${coords().left}px`,
              width: `${coords().width}px`,
              "max-height": "200px",
            }}
          >
            {options.map((option) => {
              // onOption
              return (
                <li>
                  <button
                    class={`w-full text-left px-4 py-2 hover:bg-[#dad7d742] hover:text-white transition ${
                      selected().value === option.value
                        ? "bg-[#282a39] text-[#ff6f5c]"
                        : "text-gray-200"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <div class="text-sm font-medium">{option.label}</div>
                    {/* <p class="text-xs font-nor text-[#979393]">
                      {option?.description}
                    </p> */}
                  </button>
                </li>
              );
            })}
          </ul>
        </Portal>
      )}
    </div>
  );
};

export default DynamicDropdown;
