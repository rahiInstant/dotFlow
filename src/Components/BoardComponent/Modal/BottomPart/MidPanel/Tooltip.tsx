import { createSignal, onCleanup, onMount, Component, JSX } from "solid-js";
import { Portal } from "solid-js/web";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children?: JSX.Element;
  content?: string;
  placement?: TooltipPlacement;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  disableHover?: boolean;
  delay?: number;
  hideDelay?: number;
  showArrow?: boolean;
  focusable?: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface ViewportInfo {
  width: number;
  height: number;
  scrollX: number;
  scrollY: number;
}

interface PositionCalculation {
  x: number;
  y: number;
}

const Tooltip: Component<TooltipProps> = (props) => {
  // Use external control if provided, otherwise internal state
  const [internalVisible, setInternalVisible] = createSignal<boolean>(false);
  const isVisible = (): boolean =>
    props.visible !== undefined ? props.visible : internalVisible();

  const [position, setPosition] = createSignal<Position>({ x: 0, y: 0 });
  const [actualPlacement, setActualPlacement] = createSignal<TooltipPlacement>(
    props.placement || "top"
  );

  let triggerRef: HTMLDivElement | undefined;
  let tooltipRef: HTMLDivElement | undefined;
  let showTimeout: number | undefined;
  let hideTimeout: number | undefined;

  // Calculate tooltip width based on content length with breakpoints
  const getTooltipWidth = (content: string): string => {
    const length = content.length;
    if (length <= 50) return "max-w-xs"; // ~18rem (288px)
    if (length <= 120) return "max-w-sm"; // ~24rem (384px)
    if (length <= 200) return "max-w-md"; // ~28rem (448px)
    return "max-w-lg"; // ~32rem (512px)
  };

  const calculatePosition = (): void => {

  return (
    <>
      <div
        ref={triggerRef}
        class=""
        tabindex={props.focusable ? 0 : undefined}
      >
        {props.children ? (
          props.children
        ) : (
          <div class="w-3 h-3 rounded-full bg-[#dbdbdd] text-xs text-black flex items-center justify-center font-semibold select-none">
            ?
          </div>
        )}
      </div>

      {isVisible() && (
        <Portal>
          <div
            ref={tooltipRef}
            class={`
              fixed z-50 px-3 py-2 text-sm text-[#c9c9db] bg-[#464668] rounded-lg shadow-lg
              pointer-events-none select-none whitespace-pre-wrap break-words
              ${getTooltipWidth(props.content || "")}
              transition-opacity duration-200
            `}
            style={{
              left: `${position().x}px`,
              top: `${position().y}px`,
              opacity: isVisible() ? 1 : 0,
            }}
          >
            {props.content}
            {props.showArrow !== false && <div class={'getArrowClasses()'} />}
          </div>
        </Portal>
      )}
    </>
  );
}};

export default Tooltip;
