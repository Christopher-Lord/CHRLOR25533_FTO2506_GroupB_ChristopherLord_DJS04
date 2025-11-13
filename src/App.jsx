import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch.jsx";
import { createGenreLookup } from "./utils/lookup.js";
import { usePagination } from "./hooks/usePagination.jsx";
import PodcastGrid from "./components/PodcastGrid.jsx";
import Filter from "./components/Filter.jsx";
import { genres } from "./data.js";
import "./App.css";

const API_KEY = "https://podcast-api.netlify.app/";

/**
 * Main app component that fetches, filters and displays podcasts
 *
 * @returns {JSX.Element} The rendered application UI
 */
export default function App() {
  // Using the custom hook to fetch data, along with loading and error states
  const { data, isLoading, error } = useFetch(API_KEY);
  const [selectedGenre, setSelectedGenre] = useState("all-genres");

  // Creating the genre lookup utility
  const genreLookup = createGenreLookup(genres);

  // Transforms the fetched data and replaces the podcasts genre key with an array of genre titles
  let podcasts = (data || []).map((podcast) => ({
    ...podcast,
    genres: genreLookup.getGenreTitlesByIds(podcast.genres),
  }));

  // Apply genre filter if a specific genre has been selected
  if (selectedGenre !== "all-genres") {
    podcasts = podcasts.filter((pod) => pod.genres.includes(selectedGenre));
  }

  const ITEMS_PER_PAGE = 12;
  const {
    paginatedData: visiblePodcasts,
    loadMore,
    currentPage,
    totalPages,
    resetPagination,
  } = usePagination(podcasts, ITEMS_PER_PAGE);

  useEffect(() => {
    resetPagination();
  }, [selectedGenre]);

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
      {/* Filter component: Allows user to select a genre */}
      <Filter
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

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
