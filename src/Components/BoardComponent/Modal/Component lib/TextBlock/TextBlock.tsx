import { Component, JSX, children } from "solid-js";

interface TextBlockProps {
  children: JSX.Element | HTMLElement;
}

const TextBlock: Component<TextBlockProps> = (props) => {
  const c = children(() => props.children);

  return (
    <div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-light text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">
      {c()}
    </div>
  );
};

export default TextBlock;
