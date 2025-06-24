import { Component, createSignal, onMount } from "solid-js";

interface DropdownProps {
  options: Array<{ label: string; value: string; description?: string }>;
  onOption?: (option: {
    label: string;
    value: string;
    description?: string;
  }) => void;
  name: string;
}

const Dropdown: Component<DropdownProps> = ({ options, onOption, name }) => {
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const handleChange = (e: Event) => {
    const index = (e.target as HTMLSelectElement).selectedIndex;
    setSelectedIndex(index);
    onOption?.(options[index]);
    // console.log(e)
  };

  onMount(() => {
    onOption?.(options[0]);
  });

  return (
    <div class="relative w-full">
      <select
        multiple
        name={name}
        title="select"
        onChange={handleChange}
        class="w-full appearance-none bg-[#1e1f2b] text-white text-sm px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"
      >
        {options.map((option) => (
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
  );
};

export default Dropdown;
