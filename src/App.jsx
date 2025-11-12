import { useState } from "react";
import { useFetch } from "./hooks/useFetch.jsx";
import { createGenreLookup } from "./utils/lookup.js";
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

  // State to track which genre is currently selected in the filter
  const [selectedGenre, setSelectedGenre] = useState("all-genres");

  // Handles loading and error states. displaying appropriate messages for both
  if (isLoading) return <p className="loading-msg">Loading Podcasts ⚙️</p>;
  if (error) return <p className="error-msg">⚠️ Error: {error}</p>;

  // Creating the genre lookup utility
  const genreLookup = createGenreLookup(genres);

  // Transforms the fetched data and replaces the podcasts genre key with an array of genre titles
  let podcasts = data.map((podcast) => ({
    ...podcast,
    genres: genreLookup.getGenreTitlesByIds(podcast.genres),
  }));

  // Apply genre filter if a specific genre has been selected
  if (selectedGenre !== "all-genres") {
    podcasts = podcasts.filter((pod) => pod.genres.includes(selectedGenre));
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
      <PodcastGrid podcasts={podcasts} />
    </>
  );
}
