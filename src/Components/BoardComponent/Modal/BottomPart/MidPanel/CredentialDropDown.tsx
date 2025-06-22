import { createSignal, onMount, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import useStateContext from "../../../useStateContext";

const CredentialDropDown = () => {
  const {
    setIsModalOpen2,
    credentialOptions,
    setCredentialOptions,
    selectedCredential,
    setSelectedCredential,
  } = useStateContext();

  const [isOpen, setIsOpen] = createSignal(false);
  const [coords, setCoords] = createSignal({ top: 0, left: 0, width: 0 });
  const [openUpward, setOpenUpward] = createSignal(false);
  let triggerRef: HTMLButtonElement | undefined;

  const toggleDropdown = () => {
    if (!triggerRef) return;
    const rect = triggerRef.getBoundingClientRect();
    const dropdownHeight = 200;

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

  const handleSelect = (option: any) => {
    setSelectedCredential(option);
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
    // Fetch from backend here if needed
    // fetch("/api/credentials")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCredentialOptions(data);
    //   });
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
        class="w-full bg-[#282a39] cursor-pointer text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm flex justify-between items-center"
      >
        {selectedCredential()?.label || "Select Credential"}
        <svg
          class={`w-4 h-4 ${isOpen() ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
          />
        </svg>
      </button>

      {isOpen() && (
        <Portal>
          <ul
            id="portal-dropdown"
            class={`absolute z-[9999] bg-neutral-800 border border-neutral-700 rounded-md shadow-lg divide-y divide-neutral-700`}
            style={{
              top: `${coords().top}px`,
              left: `${coords().left}px`,
              width: `${coords().width}px`,
              "max-height": "200px",
            }}
          >
            {credentialOptions().map((option) => (
              <li>
                <button
                  class={`w-full text-left px-4 py-2 hover:bg-[#dad7d742] ${
                    selectedCredential()?.value === option.value
                      ? "bg-[#282a39] text-[#ff6f5c]"
                      : "text-gray-200"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <div class="text-sm font-medium">{option.label}</div>
                  {option.description && (
                    <p class="text-xs text-[#979393]">{option.description}</p>
                  )}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                class="w-full text-left px-4 py-2 text-white hover:bg-[#dad7d742]"
                onClick={() => {
                  setIsOpen(false);
                  setIsModalOpen2(true);
                }}
              >
                + Create new credentials
              </button>
            </li>
          </ul>
        </Portal>
      )}
    </div>
  );
};

export default CredentialDropDown;
