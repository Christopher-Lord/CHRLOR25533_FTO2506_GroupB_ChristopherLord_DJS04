import "./SearchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Search podcasts"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </section>
  );
}
