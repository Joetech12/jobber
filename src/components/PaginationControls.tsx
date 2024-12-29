import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

type paginationButtonProps = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;

  direction: PageDirection;
  Icon: React.ReactNode;
};

export default function Pagination() {
  const { currentPage, handleChangePage, totalNumberOfPages } =
    useJobItemsContext();

  return (
    <section className='pagination'>
      {currentPage > 1 && (
        <PaginationButton
          direction='previous'
          currentPage={currentPage}
          Icon={<ArrowLeftIcon />}
          onClick={handleChangePage}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction='next'
          currentPage={currentPage}
          Icon={<ArrowRightIcon />}
          onClick={handleChangePage}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  Icon,
  onClick,
}: paginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick(direction);
        e.currentTarget.blur();
      }}
    >
      {direction === "previous" && (
        <>
          {Icon}
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          {Icon}
        </>
      )}
    </button>
  );
}
