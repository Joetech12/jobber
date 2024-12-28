import { useState } from "react";
import useDebounce from "../lib/hooks/useDebouce";
import useSearchQuery from "../lib/hooks/useSearchQuery";
import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import Sorting from "./SortingControls";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText);
  const { jobItems, isLoading } = useSearchQuery(debouncedValue);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived state
  const jobItemsSorted =
    [...(jobItems ?? [])]?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      }
      return a.daysAgo - b.daysAgo;
    }) ?? [];
  const jobItemsSortedAndSliced = jobItemsSorted?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );
  const totalNumberOfResults = jobItems?.length;
  const totalNumberOfPages = jobItems?.length / RESULTS_PER_PAGE;

  // event handler

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSortBy = (newSortBy: SortBy) => {
    setCurrentPage(1); // reset page to 1 when sorting is changed to avoid incorrect results page index calculation for sorted results.
    setSortBy(newSortBy);
  };

  return (
    <div>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <Sorting onClick={handleChangeSortBy} sortBy={sortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />

          <Pagination
            onClick={handleChangePage}
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

        <Footer />

      <Toaster position='top-right' />
    </div>
  );
}

export default App;
