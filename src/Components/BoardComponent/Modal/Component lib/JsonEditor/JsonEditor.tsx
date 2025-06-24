import { Component, createSignal, createEffect } from "solid-js";
import BoxArrowUpLeft from "../../Icons/BoxArrowUpLeft";
import useStateContext from "../../../useStateContext";
import "./jsonEditor.css";
import Tooltip from "../../BottomPart/MidPanel/Tooltip";

interface JsonEditorProps {
  name: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  onLearnMore?: () => void;
  disabled?: boolean;
  title?: string;
  footNote?: string;
  isArrow?: boolean;
  isExpand?: boolean;
  toolTipText?: string;
  class?: string;
}

interface JsonError {
  line: number;
  message: string;
}

const JsonEditor: Component<JsonEditorProps> = (props: JsonEditorProps) => {
  const { setIsModalOpen3 } = useStateContext();

  let inputRef: HTMLTextAreaElement | undefined;
  let containerRef: HTMLDivElement | undefined;
  let lineNumbersRef: HTMLDivElement | undefined;

  const [jsonError, setJsonError] = createSignal<JsonError | null>(null);
  // const [lineCount, setLineCount] = createSignal(1);

  const validateJson = (text: string): JsonError | null => {
    if (!text.trim()) {
      setJsonError(null);
      return null;
    }

    try {
      JSON.parse(text);
      setJsonError(null);
      return null;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid JSON";

      // Try to extract line number from error message
      const lineMatch =
        errorMessage.match(/line (\d+)/i) ||
        errorMessage.match(/position (\d+)/i);

      let lineNumber = 1;
      if (lineMatch) {
        const position = parseInt(lineMatch[1]);
        // Convert position to line number by counting newlines
        const textUpToPosition = text.substring(0, position);
        lineNumber = (textUpToPosition.match(/\n/g) || []).length + 1;
      }

      const jsonError = { line: lineNumber, message: errorMessage };
      setJsonError(jsonError);
      return jsonError;
    }
  };

  const formatJson = (text: string): string => {
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return text; // Return original if invalid
    }
  };

  const updateLineNumbers = (text: string) => {
    const lines = text.split("\n");
    // setLineCount(lines.length);

    if (lineNumbersRef) {
      const lineNumbers = lines.map((_, index) => `${index + 1}`).join("\n");
      lineNumbersRef.textContent = lineNumbers;
    }
  };

  const handleInputChange = (e: Event): void => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;

    updateLineNumbers(value);
    validateJson(value);
    props.onInput?.(value);
  };

  const handlePaste = (e: ClipboardEvent): void => {
    e.preventDefault();
    const pastedText = e.clipboardData?.getData("text") || "";

    if (pastedText.trim()) {
      try {
        // Try to format the pasted JSON
        const formatted = formatJson(pastedText);
        if (inputRef) {
          inputRef.value = formatted;
          updateLineNumbers(formatted);
          validateJson(formatted);
          props.onInput?.(formatted);
        }
      } catch {
        // If formatting fails, just paste as-is
        if (inputRef) {
          inputRef.value = pastedText;
          updateLineNumbers(pastedText);
          validateJson(pastedText);
          props.onInput?.(pastedText);
        }
      }
    }
  };

  const handleScroll = (): void => {
    if (inputRef && lineNumbersRef) {
      lineNumbersRef.scrollTop = inputRef.scrollTop;
    }
  };

  const handleFocus = (): void => {
    if (!props.disabled) {
      // Focus behavior if needed
    }
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    // Trigger scroll sync on arrow keys
    setTimeout(() => handleScroll(), 0);
  };

  // Initialize line numbers when component mounts
  createEffect(() => {
    if (props.value) {
      updateLineNumbers(props.value);
      validateJson(props.value);
    }
  });

  return (
    <div
      ref={containerRef}
      class={`relative h-full w-full group ${props.class || ""}`}
    >
      {props.title && (
        <label class="label" for={props.name}>
          {props.title}
          {props.toolTipText && (
            <div class="toolTipBtn">
              <Tooltip content={props.toolTipText} />
            </div>
          )}
        </label>
      )}

      {/* JSON Error Display */}
      {jsonError() && (
        <div class="mb-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm">
          <span class="font-semibold">Line {jsonError()?.line}:</span>{" "}
          {jsonError()?.message}
        </div>
      )}

      {/* Main Input Container */}
      <div class="flex font-mono rounded bg-[#252631] min-h-[200px] max-h-[220px] ">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          class="w-12 bg-[#1a1b26] border-r border-neutral-600 text-gray-400 text-sm leading-6 px-2 py-4 text-right select-none overflow-hidden"
          style={{
            "font-family": "Monaco, Menlo, 'Ubuntu Mono', monospace",
            "white-space": "pre-line",
            "pointer-events": "none",
          }}
        >
          1
        </div>

        <div class="flex-1 relative">
          <textarea
            autocomplete="off"
            ref={inputRef}
            name={props.name}
            onInput={handleInputChange}
            onPaste={handlePaste}
            onScroll={handleScroll}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={props.disabled}
            value={props.value || ""}
            placeholder={props.placeholder || ""}
            class={`${
              props.disabled ? "opacity-50 cursor-not-allowed" : ""
            } w-full h-full min-h-[200px] max-h-[220px] bg-transparent jsonMain text-white placeholder-gray-500 outline-none transition-colors resize-none px-4 py-4 leading-6`}
            spellcheck={false}
          />

          {props.isArrow && (
            <button
              type="button"
              disabled={props.disabled}
              class={`absolute right-0 bottom-0 text-gray-400 text-[10px] bg-[#2c2e2f] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                props.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              aria-label="Toggle expanded view"
              onClick={() => setIsModalOpen3(true)}
            >
              <BoxArrowUpLeft />
            </button>
          )}
        </div>
      </div>

      {props.footNote && <p class="foot-note">{props.footNote}</p>}
    </div>
  );
};

export default JsonEditor;
