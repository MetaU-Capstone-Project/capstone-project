import "./SearchBar.css";

/**
 * Component to display search bar
 * @param {object} props Component props
 * @param {Function} props.searchSongs Searches and retrieves song results that match the search input
 * @param {Function} props.setSearchInput Handler to set what is being searched for in the backend as the value that user types into search bar
 * @param {string} props.searchInput The value that is being searched for
 * @param {string} props.tab Identifier that indicates which tab user is currently viewing
 * @param {Function} props.handleTabChange Handler to change tabs and indicate which tab user is currently viewing
 */
export default function SearchBar({
  searchSongs,
  setSearchInput,
  searchInput,
  tab,
  handleTabChange,
}) {
  // Search for songs that match the search input when user presses enter in the search bar
  if (document.getElementById("search-input") != null) {
    document.getElementById("search-input").onkeydown = function (e) {
      if ((e.code || e.key) == "Enter") {
        searchSongs();
      }
    };
  }

  return (
    <div className="searchbar-component">
      <input
        id="search-input"
        className="search-input"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      ></input>
      <button
        id="search-songs"
        className={
          tab === "search-songs" ? "is-active-search" : "search-button"
        }
        onClick={handleTabChange}
      >
        Songs
      </button>
      <button
        id="search-profiles"
        className={
          tab === "search-profiles" ? "is-active-search" : "search-button"
        }
        onClick={handleTabChange}
      >
        Profiles
      </button>
    </div>
  );
}
