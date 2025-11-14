import { createContext, useContext, useState, useMemo } from "react";
import { useFetch } from "../hooks/useFetch.jsx";
import { createGenreLookup } from "../utils/lookup.js";
import { genres } from "../data.js";

const API_KEY = "https://podcast-api.netlify.app/";

/**
 * Creating React context used to share states across components
 */
const PodcastContext = createContext();

/**
 * Custom hook for accessing the Podcast Context
 *
 * @returns {PodcastContext} The current podcast context values
 */
export function usePodcasts() {
  return useContext(PodcastContext);
}

/**
 * Provider Component: Wraps any part of the app that needs access to podcast data, filters, sorting etc.
 *
 * @param {Object} props - props.children - Components that should receive context data
 * @returns {JSX.Element} A PodcastContext provider containing all shared states.
 */
export function PodcastProvider({ children }) {
  // Using the custom hook to fetch data, along with loading and error states
  const { data, isLoading, error } = useFetch(API_KEY);

  //UI states for filtering, searching and sorting
  const [selectedGenre, setSelectedGenre] = useState("all-genres");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const genreLookup = createGenreLookup(genres);

  //Mapping API podcasts to include genre titles
  let podcasts = (data || []).map((podcast) => ({
    ...podcast,
    genres: genreLookup.getGenreTitlesByIds(podcast.genres),
  }));

  //Memoized filtering and sorting logic
  const filteredPodcasts = useMemo(() => {
    let pods = [...podcasts];

    // Apply genre filter if a specific genre has been selected
    if (selectedGenre !== "all-genres") {
      pods = pods.filter((pod) => pod.genres.includes(selectedGenre));
    }

    //Filtering by search term
    if (searchTerm.trim !== "") {
      pods = pods.filter((pod) =>
        pod.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
    }

    //Filtering by sorting options
    if (sortOption === "newest") {
      pods.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortOption === "az") {
      pods.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      pods.sort((a, b) => b.title.localeCompare(a.title));
    }

    return pods;

    //Update if these values change
  }, [podcasts, selectedGenre, searchTerm, sortOption]);

  return (
    // Supplies the context values to the children
    // React components inside {children} can now call usePodcasts()
    <PodcastContext.Provider
      value={{
        isLoading,
        error,
        genres,
        selectedGenre,
        setSelectedGenre,
        searchTerm,
        setSearchTerm,
        sortOption,
        setSortOption,
        podcasts: filteredPodcasts,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
