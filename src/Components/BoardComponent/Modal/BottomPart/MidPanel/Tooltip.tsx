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
    if (!triggerRef || !tooltipRef) return;

    const triggerRect: DOMRect = triggerRef.getBoundingClientRect();
    const tooltipRect: DOMRect = tooltipRef.getBoundingClientRect();
    const viewport: ViewportInfo = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };

    const spacing = 8;
    let placement: TooltipPlacement = props.placement || "top";

    // Calculate positions for each placement
    const positions: Record<TooltipPlacement, PositionCalculation> = {
      top: {
        x:
          triggerRect.left +
          triggerRect.width / 2 -
          tooltipRect.width / 2 +
          viewport.scrollX,
        y: triggerRect.top - tooltipRect.height - spacing + viewport.scrollY,
      },
      bottom: {
        x:
          triggerRect.left +
          triggerRect.width / 2 -
          tooltipRect.width / 2 +
          viewport.scrollX,
        y: triggerRect.bottom + spacing + viewport.scrollY,
      },
      left: {
        x: triggerRect.left - tooltipRect.width - spacing + viewport.scrollX,
        y:
          triggerRect.top +
          triggerRect.height / 2 -
          tooltipRect.height / 2 +
          viewport.scrollY,
      },
      right: {
        x: triggerRect.right + spacing + viewport.scrollX,
        y:
          triggerRect.top +
          triggerRect.height / 2 -
          tooltipRect.height / 2 +
          viewport.scrollY,
      },
    };

    // Check if preferred placement fits, otherwise find best alternative
    let pos: PositionCalculation = positions[placement];

    // Auto-adjust placement based on viewport boundaries
    if (placement === "top" && pos.y < viewport.scrollY) {
      placement = "bottom";
      pos = positions.bottom;
    } else if (
      placement === "bottom" &&
      pos.y + tooltipRect.height > viewport.height + viewport.scrollY
    ) {
      placement = "top";
      pos = positions.top;
    } else if (placement === "left" && pos.x < viewport.scrollX) {
      placement = "right";
      pos = positions.right;
    } else if (
      placement === "right" &&
      pos.x + tooltipRect.width > viewport.width + viewport.scrollX
    ) {
      placement = "left";
      pos = positions.left;
    }

    // Ensure tooltip stays within viewport horizontally
    if (pos.x < viewport.scrollX) {
      pos.x = viewport.scrollX + spacing;
    } else if (pos.x + tooltipRect.width > viewport.width + viewport.scrollX) {
      pos.x = viewport.width + viewport.scrollX - tooltipRect.width - spacing;
    }

    // Ensure tooltip stays within viewport vertically
    if (pos.y < viewport.scrollY) {
      pos.y = viewport.scrollY + spacing;
    } else if (
      pos.y + tooltipRect.height >
      viewport.height + viewport.scrollY
    ) {
      pos.y = viewport.height + viewport.scrollY - tooltipRect.height - spacing;
    }

    setPosition({ x: pos.x, y: pos.y });
    setActualPlacement(placement);
  };

  const showTooltip = (): void => {
    // If externally controlled, call the external handler
    if (props.visible !== undefined && props.onVisibilityChange) {
      props.onVisibilityChange(true);
      return;
    }

    // Otherwise use internal state
    if (hideTimeout) clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      setInternalVisible(true);
      // Wait for next tick to calculate position after render
      setTimeout(calculatePosition, 0);
    }, props.delay || 200);
  };

  const hideTooltip = (): void => {
    // If externally controlled, call the external handler
    if (props.visible !== undefined && props.onVisibilityChange) {
      props.onVisibilityChange(false);
      return;
    }

    // Otherwise use internal state
    if (showTimeout) clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      setInternalVisible(false);
    }, props.hideDelay || 100);
  };

  const handleMouseEnter = (): void => {
    if (!props.disableHover) showTooltip();
  };

  const handleMouseLeave = (): void => {
    if (!props.disableHover) hideTooltip();
  };

  const handleFocus = (): void => {
    if (!props.disableHover) showTooltip();
  };

  const handleBlur = (): void => {
    if (!props.disableHover) hideTooltip();
  };

  // Effect to recalculate position when visibility changes (for external control)
  const updatePositionOnVisibilityChange = (): void => {
    if (isVisible()) {
      setTimeout(calculatePosition, 0);
    }
  };

  // Watch for visibility changes to update position
  let prevVisibleState = isVisible();
  const checkVisibilityChange = (): void => {
    const currentVisible = isVisible();
    if (currentVisible !== prevVisibleState && currentVisible) {
      updatePositionOnVisibilityChange();
    }
    prevVisibleState = currentVisible;
  };

  // Update position on scroll/resize
  const updatePosition = (): void => {
    if (isVisible()) {
      calculatePosition();
    }
  };

  onMount(() => {
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    // Set up a reactive effect to watch for visibility changes
    const interval = setInterval(checkVisibilityChange, 16); // ~60fps check

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  onCleanup(() => {
    if (showTimeout) clearTimeout(showTimeout);
    if (hideTimeout) clearTimeout(hideTimeout);
    window.removeEventListener("scroll", updatePosition);
    window.removeEventListener("resize", updatePosition);
  });

  const getArrowClasses = (): string => {
    const base = "absolute w-2 h-2 bg-[#464668] transform rotate-45";
    switch (actualPlacement()) {
      case "top":
        return `${base} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${base} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${base} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${base} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return base;
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
            {props.showArrow !== false && <div class={getArrowClasses()} />}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Tooltip;
