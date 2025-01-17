import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContexts";

interface SearchBarProps {
  placeholder: string;
  onSearchClick: () => void;
}

function SearchBar({ placeholder, onSearchClick }: SearchBarProps) {
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("SearchBar must be used within a SearchProvider");
  }

  const { searchQuery, setSearchQuery } = searchContext;

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div id="Search-1" className="flex items-center rounded-md w-full sm:w-80 md:w-96 lg:w-1/2 xl:w-2/3 max-w-full mx-auto px-2">
      <input
        type="search"
        id="Search-2"
        className="flex-grow text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        id="Search-3"
        className="ml-2 text-white rounded-md hover:bg-purple-600 px-4"
        onClick={onSearchClick}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default SearchBar;
