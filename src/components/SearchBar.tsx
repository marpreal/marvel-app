import { useState } from "react";
import { SearchBarProps } from "./types";
import "../styles/SearchBar.css";

function SearchBar({ onSearch, resultsCount }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <span className="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          className="search-bar"
          type="text"
          placeholder="SEARCH A CHARACTER..."
          value={search}
          onChange={handleChange}
        />
      </div>
      <p className="search-results">{resultsCount} RESULTS</p>
    </div>
  );
}

export default SearchBar;
