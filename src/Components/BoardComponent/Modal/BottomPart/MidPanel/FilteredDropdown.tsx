import { Component, createSignal, onMount } from "solid-js";

interface Option {
  label: string;
  value: string;
  description?: string;
}

interface DropdownProps {
  options: Option[];
  onOptionChange?: (selectedOptions: Option[]) => void;
  name?: string;
}

const FilteredDropDown: Component<DropdownProps> = ({
  options,
  onOptionChange,
  name,
}) => {
  const [currentOptions, setCurrentOptions] = createSignal<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = createSignal<Option[]>([]);

  onMount(() => {
    setCurrentOptions(options);
  });

  const handleChange = (e: Event) => {
    const selectedValue = (e.target as HTMLSelectElement).value;
    const selectedOption = currentOptions().find(
      (opt) => opt.value === selectedValue
    );
    if (!selectedOption) return;

    setFilteredOptions((prev) => [...prev, selectedOption]);
    setCurrentOptions((prev) =>
      prev.filter((opt) => opt.value !== selectedValue)
    );

    onOptionChange?.(filteredOptions());
  };

  const handleRemove = (value: string) => {
    const toRemove = filteredOptions().find((opt) => opt.value === value);
    if (!toRemove) return;

    setFilteredOptions((prev) => prev.filter((opt) => opt.value !== value));
    setCurrentOptions((prev) => [...prev, toRemove]);

    onOptionChange?.(filteredOptions().filter((opt) => opt.value !== value));
  };

  return (
    <div class="space-y-2 text-sm text-white">
      <div class="relative w-full">
        <select
          name={name ? name : ""}
          title="select"
          onChange={handleChange}
          class="w-full appearance-none bg-[#1e1f2b] text-white px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"
        >
          <option value="" disabled selected hidden>
            Select option...
          </option>
          {currentOptions().map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>

        {/* Dropdown icon */}
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Selected/Filtered Options */}
      {/* <div class="flex flex-wrap gap-2">
        {filteredOptions().map((opt) => (
          <div class="bg-[#2c2f3a] px-3 py-1 rounded-full flex items-center gap-1">
            {opt.label}
            <button
              class="ml-1 text-red-400 hover:text-red-200"
              onClick={() => handleRemove(opt.value)}
              title="Remove"
            >
              &times;
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FilteredDropDown;
