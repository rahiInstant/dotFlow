import { Component } from "solid-js";

const DataCapture: Component<{
  handleOnSubmit: (e: any) => void;
}> = (props) => {
  return (
    <div class="">
      <form
        onSubmit={props.handleOnSubmit}
        class="z-[4000] absolute flex flex-col top-3 left-3"
      >
        <textarea
          class=" w-[400px] h-[150px] border indent-4 text-white border-white outline-none rounded-xl"
          name="dataCapture"
          id=""
          title="any"
        ></textarea>
        <input
          class="bg-[#5a5555] text-white mt-3 rounded-md"
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
};

export default DataCapture;
