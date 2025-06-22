import { Component, useContext } from "solid-js";
import { StateContext } from "./StateContext";

const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context)
    throw new Error(
      "useStateContext must be used within StateContextProvider."
    );
  return context;
};

export default useStateContext;
