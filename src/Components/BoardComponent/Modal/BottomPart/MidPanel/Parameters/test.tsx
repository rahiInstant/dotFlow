import {
  Component,
  createSignal,
  For,
} from "solid-js";
import "./parameters.css";
import DeleteIcon from "../../../Icons/DeleteIcon";
import ButtonSolid from "../../../Component lib/Button/ButtonSolid";
import ReproductiveDropDown from "../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
const GmailNodeParameter: Component<{}> = (props) => {
  const [poolTimes, setPoolTimes] = createSignal(["poolTime_1"]);

  const [mode, setMode] = createSignal<
    Record<
      string,
      Array<
        | {
            type: string;
            title: string;
            toolTipText: string;
            options?: Array<{ label: string; value: string }>;
          }
        | string
      >
    >
  >();

  const poolTimesOptions = [
    { value: "Every Minute", label: "Every Minute", children: [""] },
    {
      value: "Every Hour",
      label: "Every Hour",
      children: [
        {
          type: "input",
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Day",
      label: "Every Day",
      children: [
        {
          type: "input",
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Week",
      label: "Every Week",
      children: [
        {
          type: "dropdownN",
          title: "Weekday",
          options: [
            { label: "Sunday", value: "Sunday" },
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
          ],
          toolTipText: "The weekday to trigger.",
        },
        {
          type: "input",
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Month",
      label: "Every Month",
      children: [
        {
          type: "input",
          title: "Day of Month",
          toolTipText: "The day of the month to trigger.",
        },
        {
          type: "input",
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every X",
      label: "Every X",
      children: [
        {
          type: "input",
          title: "Value",
          toolTipText: "All how many X minutes/hours it should trigger",
        },
        {
          type: "input",
          title: "Unit",
          toolTipText: "If it should trigger all X minutes or hours",
        },
      ],
    },
    {
      value: "Custom",
      label: "Custom",
      children: [
        {
          type: "input",
          title: "Cron Expression",
          toolTipText:
            "Use custom cron expression. Values and ranges as follows:Seconds: 0-59Minutes: 0 - 59Hours: 0 - 23Day of Month: 1 - 31Months: 0 - 11 (Jan - Dec)Day of Week: 0 - 6 (Sun - Sat)",
        },
      ],
    },
  ];


  return (
    <div>
      <form
        id="gmailParam"
        onSubmit={(e) => {
          e.preventDefault();

        }}
      >
        <div class="space-y-5">
          <div>
            <div class="label hr-solid-line">Pool Times</div>
            <div class="mt-5">
              {poolTimes().length <= 0 && (
                <div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                  Currently no items exist
                </div>
              )}
              <For each={poolTimes()}>
                {(item, index) => {
                  // console.log(item);
                  return (
                    <div
                      class={`mb-10 flex flex-row gap-1.5 items-top group ${
                        index() !== 0
                          ? "border-t border-dashed border-[#727171] pt-3"
                          : ""
                      }`}
                    >
                      <div class="pt-9">
                        <div
                          onClick={() => {
                            setPoolTimes(
                              poolTimes().filter((i, _) => i !== item)
                            );
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                      <ReproductiveDropDown
                        name={item}
                        defaultValue={poolTimesOptions[0].value}
                        options={poolTimesOptions}
                        title="Mode"
                        toolTipText="How often to trigger."
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          setMode((prev) => {
                            const newMode = { ...prev };
                            newMode[item] = selectedOption.children;
                            return newMode;
                          });
                          console.log(mode())
                        }}
                      />
                      <div>
                        {/* child */}

                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
            {/* add pool time button */}
            <ButtonSolid
              onClick={() => {
                setPoolTimes([
                  ...poolTimes(),
                  `poolTime_${poolTimes().length + 1}`,
                ]);
              }}
              label="Add Pool Time"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

