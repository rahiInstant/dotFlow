import { Component, createEffect, onMount } from "solid-js";
import useStateContext from "../useStateContext";

interface ModalProps {
  children?: any;
  isOpen: () => boolean;
  onClose: () => void;
  zIndex?: number;
  widthClass?: string;
}

const Modal: Component<ModalProps> = (props) => {
  let modalRef: HTMLDivElement | undefined;

  const zIndex = props.zIndex ?? 9999;
  const widthClass =
    props.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";

  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === modalRef) {
        props.onClose();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  });

  return (
    <div
      ref={modalRef}
      class={`fixed inset-0 bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
        props.isOpen() ? "block" : "hidden"
      }`}
      style={{ "z-index": zIndex }}
    >
      <div class="border border-white/20 rounded-[9px] flex">
        <div
          class={`${widthClass} border border-purple-500/20 rounded-[9px] flex flex-col`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
