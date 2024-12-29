import { useContext } from "react";
import { ActiveIdContext } from "../../context/ActiveIdContextProvider";

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error(
      "useActiveIdContext must be used within ActiveIdContextProvider"
    );
  }

  return context;
}
