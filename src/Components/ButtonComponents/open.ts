import useStateContext from "../BoardComponent/useStateContext";

const { isOpen, setIsOpen } = useStateContext();

export const handleOpen = (inputRef: HTMLInputElement) => {
  setIsOpen(true);
  const sidebarContent = document.getElementById("sidebar-content");
  if (isOpen()) {
    if (sidebarContent) {
      sidebarContent.style.right = "0px";
    }

    if (inputRef) {
      inputRef.focus();
    }
  }
};


