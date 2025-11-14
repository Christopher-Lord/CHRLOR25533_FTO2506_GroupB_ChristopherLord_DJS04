import "./Filter.css";

export default function SortFilter({ sortOption, setSortOption }) {
  return (
    <>
      <select
        name="filter-select"
        id="filter-updated"
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value)}
      >
        <option value="default">Default</option>
        <option value="newest">Most Recent</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </>
  );
}
