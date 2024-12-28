import { useContext } from "react";
import { BookmarksContext } from "../../context/BookmardsContextProvider";

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within BookmarksContextProvider"
    );
  }

  return context;
}
