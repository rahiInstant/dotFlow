import { Component } from "solid-js";
import Button from "../MidPanel/Button";
import JsonViewer from "../MidPanel/JSONviewer";
import style from './style.module.css'

const LeftPanel: Component<{}> = (props) => {
  return (
    <div 
    classList={{
      [style.leftPanel]: true,
    }}
    class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto">
      <div class="p-4 text-white h-full ">
        <h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">
          Input
        </h3>
        <JsonViewer
          data={[
            {
              threadid: "19535ae314ffe32b",
              sender: "bill.rassel@gmail.com",
              body: "Hey,\n\nI regret to inform you that I need to cancel my order. Could you please\nprovide the necessary steps to complete this process?\n\nThank you for your assistance.\n\nBest regards,\nBill Rassel\n",
            },
          ]}

        />
        {/* <div class="h-full flex items-center justify-center text-center">
          <div>
            <p class="font-medium mb-3">No input data yet</p>
            <Button title="Execute previous nodes"/>
            <p class="text-xs text-gray-400 mt-3">
              (From the earliest node that has no output data yet)
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeftPanel;
