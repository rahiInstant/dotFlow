import { Component, createEffect, createSignal, onMount } from "solid-js";
import Tooltip from "../../BottomPart/MidPanel/Tooltip";
import "./style.css";

const Switch: Component<{
  title: string;
  toolTipText?: string;
  name: string;
  checked: boolean;
  uniqueKey?: any;
  onChange?: (state: boolean) => void;
}> = (props) => {
  const handleChange = (e: Event) => {
    props.onChange?.((e.target as HTMLInputElement).checked);
  };
  const [mountKey, setMountKey] = createSignal<any>("");

  createEffect(() => {
    const key = `${props.uniqueKey}-${props.name}`;
    if (key !== mountKey()) {
      setMountKey(key);
      props.onChange?.(props.checked ?? false);
    }
  });
  // const hasSwitchTriggered = new Set<string>();
  // createEffect(() => {
  //   console.log("effect triggered");

  //   if (props.uniqueKey && props.checked !== undefined) {
  //     console.log("checked or unique key changed");

  //     if (!hasSwitchTriggered.has(props.uniqueKey)) {
  //       console.log("triggered");
  //       props.onChange?.(props.checked || false);
  //       hasSwitchTriggered.add(props.uniqueKey);
  //     }
  //   }
  // });

  onMount(() => {
    // props.onChange?.(props.checked || false);
  });

  return (
    <div class="text-white bg-[#1e1e2f] p-2 rounded w-full">
      <div class="flex flex-col gap-2">
        {/* Label + Tooltip */}
        <div class="flex items-center justify-between">
          <div class="text-sm flex items-center gap-1 group">
            {props.title && (
              <label class="label">
                {props.title}
                {props.toolTipText && (
                  <div class="toolTipBtn">
                    <Tooltip content={props.toolTipText} />
                  </div>
                )}
              </label>
            )}
          </div>

          <div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">
            Reset value
          </div>
        </div>

        {/* Toggle */}
        <label class="relative inline-block w-12 h-6">
          <input
            name={props.name}
            title="switch"
            type="checkbox"
            class="sr-only peer"
            checked={props.checked}
            onChange={handleChange}
          />
          <div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div>
          <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6"></div>
        </label>
      </div>
    </div>
  );
};

export default Switch;
