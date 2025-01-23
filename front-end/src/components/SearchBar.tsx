import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    navigate(`/?${params.toString()}`);
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      id="Search-1"
      className="flex items-center rounded-md w-full sm:w-80 md:w-96 lg:w-1/2 xl:w-2/3 max-w-full mx-auto px-2 py-3"
    >
      <input
        type="search"
        id="Search-2"
        className="flex-grow text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
        placeholder=" Search..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        id="Search-3"
        className="ml-2 text-white rounded-md hover:bg-purple-600 px-4"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBar;
