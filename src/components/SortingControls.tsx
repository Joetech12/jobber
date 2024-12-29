import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

export default function Sorting() {
  const { handleChangeSortBy, sortBy } = useJobItemsContext();

  return (
    <section className='sorting'>
      <i className='fa-solid fa-arrow-down-short-wide'></i>

      <SortingButton
        title='Relevant'
        onClick={() => handleChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      />
      <SortingButton
        title='Recent'
        onClick={() => handleChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      />
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
