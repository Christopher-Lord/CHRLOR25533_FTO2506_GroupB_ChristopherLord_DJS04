import "./SearchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <section className="search-bar">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search podcasts"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {searchTerm && (
          <span className="clear-icon" onClick={() => setSearchTerm("")}>
            ✖
          </span>
        )}
      </div>
    </section>
  );
}
