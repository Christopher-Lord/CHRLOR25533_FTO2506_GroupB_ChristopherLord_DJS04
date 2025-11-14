import { usePagination } from "./hooks/usePagination.jsx";
import { usePodcasts } from "./context/PodcastContext.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PodcastGrid from "./components/PodcastGrid.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import SortFilter from "./components/SortFilter.jsx";
import "./App.css";

/**
 * Main app component
 *
 * This component:
 * - Retrieves podcast data and UI state from PodcastContext
 * - Applies pagination using the usePagination hook
 * - Renders search, filters and paginated podcast grid
 *
 * @returns {JSX.Element} The rendered application UI
 */
export default function App() {
  // Access shared podcast state and actions from PodcastContext
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

  // Call pagination hook to be used in the component
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
      {/* Search bar and filters section */}
      <div className="filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="filter">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />

          <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      {/* PodcastGrid component: Displays the podcast cards in a responsive grid layout */}
      <PodcastGrid podcasts={visiblePodcasts} />

      {/* Pagination controls */}
      <div className="load-more">
        {currentPage < totalPages && (
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        )}

        {/* Info text showing count of displayed items */}
        <p className="page-info">
          Showing {visiblePodcasts.length} of {podcasts.length} podcasts
        </p>
      </div>
    </>
  );
}
