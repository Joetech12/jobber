import { useContext } from "react";
import { JobItemsContext } from "../../context/JobItemsContextProvider";
// import { JobItemsContext } from "../../context/JobItemsContextProvider";

export function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error(
      "useJobItemsContext must be used within JobItemsContextProvider"
    );
  }

  return context;
}
