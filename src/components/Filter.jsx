import "./Filter.css"

/**
 *
 * @param {Object} genres - An array of available genres objects to filter by
 * Each genre object should include at least:
 *  - id - A unique ID for the genre
 *  - title - The display name of the genre
 * @param {string} selectedGenre - The currently selected genre value
 * @param {Function} setSelectedGenre - Function to update the selected genre state
 * @returns {JSX.Element} - A section containing dropdown filters for genre and sorting options
 */
export default function Filter({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <section className="filter">
      {/* Dropdown menu for selecting a podcast genre
          The selected value is controlled by the "selectedGenre" state
          Updated with "setSelectedGenre" function when the user changes their selection */}
      <select
        id="filter-genres"
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
      >
        <option value="all-genres">All Genres</option>
        {/* Dynamically generate a dropdown option for each genre in the genres array */}
        {genres.map((genre) => (
          <option key={genre.id} value={genre.title}>
            {genre.title}
          </option>
        ))}
      </select>
      {/* Secondary dropdown for sorting podcasts by dates (Currently non-functional) */}
      <select name="filter-select" id="filter-updated">
        <option value="default">Default</option>
        <option value="popular">Most Popular</option>
        <option value="newest">Most Recent</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </section>
  );
}
