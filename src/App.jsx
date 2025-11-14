import { usePagination } from "./hooks/usePagination.jsx";
import { usePodcasts } from "./context/PodcastContext.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PodcastGrid from "./components/PodcastGrid.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import SortFilter from "./components/SortFilter.jsx";
import "./App.css";

/**
 * Main app component that fetches, filters and displays podcasts
 *
 * @returns {JSX.Element} The rendered application UI
 */
export default function App() {
  const {
    isLoading,
    error,
    podcasts,
    genres,
    selectedGenre,
    setSelectedGenre,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
  } = usePodcasts();

  const {
    paginatedData: visiblePodcasts,
    loadMore,
    currentPage,
    totalPages,
  } = usePagination(podcasts, 12);

  // Handles loading and error states. displaying appropriate messages for both
  if (isLoading) {
    document.querySelector("main").style.height = "100vh";
    return <p className="loading-msg">Loading Podcasts ⚙️</p>;
  }
  if (error) {
    document.querySelector("main").style.height = "100vh";
    return <p className="error-msg">⚠️ Error: {error}</p>;
  }

  return (
    <>
      <div className="filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="filter">
          {/* Filter component: Allows user to select a genre */}
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />

          <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      {/* PodcastGrid component: Displays the podcast cards in a grd layout */}
      <PodcastGrid podcasts={visiblePodcasts} />

      <div className="load-more">
        {currentPage < totalPages && (
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        )}

        <p className="page-info">
          Showing {visiblePodcasts.length} of {podcasts.length} podcasts
        </p>
      </div>
    </>
  );
}
