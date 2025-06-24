enum Type {
  Switch = "switch",
  DropdownMultiple = "dropdownMultiple",
  DropdownN = "dropdownN",
  DynamicInput = "dynamicInput",
}

interface Option {
  label: string;
  value: string;
}

interface Content {
  type: string;
  name: string;
  title: string;
  toolTipText: string;
  footNote: string;
  options: Option[];
  placeholder?: string;
  value?: string;
}

interface FilterOption {
  value: string;
  label: string;
  content: Content;
  description?: string;
}

interface PoolTimeItem {
  name: string;
  value: string;
  children: string[];
}

interface SelectedOption {
  value: string;
  label: string;
  children: string[];
}

interface PoolTimeItemProps {
  item: PoolTimeItem;
  showBorder: boolean;
  onUpdate: (name: string, updates: Partial<PoolTimeItem>) => void;
  onDelete: (name: string) => void;
}

interface Mode {
  type: string;
  title: string;
  toolTipText: string;
  value?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string; description?: string }>;
}

export type { Type, Option, Content, FilterOption, PoolTimeItem, SelectedOption, PoolTimeItemProps, Mode}

