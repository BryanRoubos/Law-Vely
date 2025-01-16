import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faSearch, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../contexts/SearchContexts";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Header() {
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  if (!searchContext) {
    throw new Error("Header must be used within a SearchProvider");
  }

  const { searchQuery, setSearchQuery } = searchContext;

  const handleSearchBtnClick = () => {
    navigate(`/?search=${searchQuery}`);
    setSearchQuery("");
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="relative flex items-center justify-between h-16 bg-purple-700 px-4 text-white">
      <div className="flex-shrink-0">
        <Logo />
      </div>

      <Link to="/" className="hidden sm:block">
        <FontAwesomeIcon icon={faHome} className="text-xl" />
      </Link>

      <div className="flex items-center">
        <button
          onClick={toggleSearchBar}
          className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 sm:hidden"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {isSearchVisible && (
            <div className="absolute inset-0 top-0 bg-purple-700 pt-4 sm:hidden items-center flex justify-between ml-3">

            <button
            onClick={toggleSearchBar}
            className="text-white text-2xl mr-2"
            >
            <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
    

            <div className="w-full px-2 flex items-center">
                <SearchBar placeholder="Search..."          
                onSearchClick={handleSearchBtnClick} />
            </div>

            <button
            onClick={toggleSearchBar}
            className="absolute top-4 right-4 text-white text-2xl"
            >
            </button>
        </div>
)}

        <div className="hidden sm:block">
          <SearchBar placeholder="Search..." onSearchClick={handleSearchBtnClick} />
        </div>

        <FontAwesomeIcon
          icon={faUser}
          className="text-xl cursor-pointer hover:text-purple-300 ml-4"
        />
      </div>
    </header>
  );
}

export default Header;