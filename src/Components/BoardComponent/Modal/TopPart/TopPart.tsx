import { Component } from "solid-js";
import LeftArrow from "../Icons/LeftArrow";
import PlusIcon from "../Icons/PlusIcon";
import CrossIcon from "../Icons/CrossIcon";
import MinusIcon from "../Icons/MinusIcon";
import useStateContext from "../../useStateContext";

const TopPart: Component<{}> = (props) => {
  const {currentFormConfig, setIsModalOpen} = useStateContext()
  return (
    <div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg">
      <div onClick={() => setIsModalOpen(false)} class="flex cursor-pointer items-center font-medium text-white gap-x-2.5">
        <div class="text-xl text-[#a7a4a4] ">
          <LeftArrow />
        </div>
        <div class="text-base">Back to canvas</div>
      </div>
      <div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs">
        <div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer">
          <CrossIcon />
        </div>
        <div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer">
          <MinusIcon />
        </div>
        <div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">
          <PlusIcon />
        </div>
      </div>
    </div>
  );
};

export default TopPart;
