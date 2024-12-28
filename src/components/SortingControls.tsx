import { SortBy } from "../lib/types";

type SortProps = {
  onClick: (value: SortBy) => void;
  sortBy: SortBy;
};

export default function Sorting({ onClick, sortBy }: SortProps) {
  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>

      <SortingButton
        title='Relevant'
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      />
      <SortingButton
        title='Recent'
        onClick={() => onClick("recent")}
        isActive={sortBy === "recent"}
      />

      {/* <button
        onClick={() => onClick("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => onClick("recent")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" ? "sorting__button--active" : ""
        }`}
      >
        Recent
      </button> */}
    </section>
  );
}

function SortingButton({
  title,
  onClick,
  isActive,
}: {
  title: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button    ${
        isActive ? "sorting__button--active" : ""
      }`}
    >
      {title}
    </button>
  );
}
