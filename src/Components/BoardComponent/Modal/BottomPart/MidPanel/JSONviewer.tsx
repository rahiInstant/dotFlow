import { Component, createSignal, For, JSX, Show } from "solid-js";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

const JsonViewer: Component<{ data: JSONValue; indent?: number }> = ({ data, indent = 0 }) => {
  const [collapsed, setCollapsed] = createSignal(false);
  const padding = `${indent * 5}px`;

  const toggle = () => setCollapsed(!collapsed());

  const isObject = (val: any): val is JSONObject =>
    typeof val === "object" && val !== null && !Array.isArray(val);
  const isArray = Array.isArray;

  const renderValue = (value: JSONValue): JSX.Element => {
    if (typeof value === "string") return <span class="text-yellow-300">"{value}"</span>;
    if (typeof value === "number") return <span class="text-cyan-300">{value}</span>;
    if (typeof value === "boolean") return <span class="text-pink-300">{value.toString()}</span>;
    if (value === null) return <span class="text-gray-400">null</span>;
    return <JsonViewer data={value} indent={indent + 1} />;
  };

  return (
    <div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">
      <Show
        when={isObject(data)}
        fallback={
          <Show
            when={isArray(data)}
            fallback={renderValue(data)}
          >
            {(data as JSONArray).every(v => typeof v !== "object") ? (
              <span>
                [<For each={data as JSONArray}>{(item, i) => (
                  <>
                    {renderValue(item)}
                    {i() < (data as JSONArray).length - 1 ? ", " : ""}
                  </>
                )}</For>]
              </span>
            ) : (
              <>
                <span style={{ "padding-left": padding }}>[</span>
                <For each={data as JSONArray}>
                  {(item, i) => (
                    <div style={{ "padding-left": `${(indent + 1) * 4}px` }}>
                      <JsonViewer data={item} indent={indent + 1} />
                      {i() < (data as JSONArray).length - 1 ? "," : ""}
                    </div>
                  )}
                </For>
                <div style={{ "padding-left": padding }}>]</div>
              </>
            )}
          </Show>
        }
      >
        <>
          <div
            class="text-purple-400 cursor-pointer select-none"
            style={{ "padding-left": padding }}
            onClick={toggle}
          >
            {collapsed() ? "{...}" : "{"}
          </div>
          <Show when={!collapsed()}>
            <For each={Object.entries(data as JSONObject)}>
              {([key, value], i) => (
                <div style={{ "padding-left": `${(indent + 1) * 4}px` }}>
                  <span class="text-green-400">"{key}"</span>
                  <span class="text-white">: </span>
                  {renderValue(value)}
                  {i() < Object.entries(data as JSONObject).length - 1 ? "," : ""}
                </div>
              )}
            </For>
            <div style={{ "padding-left": padding }} class="text-purple-400">{"}"}</div>
          </Show>
        </>
      </Show>
    </div>
  );
};

export default JsonViewer;
