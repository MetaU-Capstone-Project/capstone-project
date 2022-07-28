import "./SearchBar.css";

export default function SearchBar({
  searchSongs,
  setSearchInput,
  searchProfiles,
  searchInput,
  tab,
  handleTabChange,
}) {
  if (document.getElementById("search-input")) {
    document.getElementById("search-input").onkeydown = function (e) {
      var keyCode = e.code || e.key;
      if (keyCode == "Enter") {
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
