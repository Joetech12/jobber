import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";
import JobList from "./JobList";

type BookmarksPopoverProps ={
  isOpen: boolean
}

const BookmarksPopover = forwardRef<HTMLDivElement, BookmarksPopoverProps>(function BookmarksPopover(_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return (
    <div ref={ref} className='bookmarks-popover'>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
});

export default BookmarksPopover;
