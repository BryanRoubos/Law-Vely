import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome, faUser, faSearch, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo";
import { useState } from "react";
import SearchBar from "./SearchBar";
import SignInButton from "./SignInButton";

const Header: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const [searchParams] = useSearchParams(); 
  const categoryQueries: string[] = searchParams.getAll("category");
  const searchQuery: string = searchParams.get("search") || ""; 
  
  const isSignedIn: boolean = !!localStorage.getItem("userUID");

  const generateLink = (): string => {
    const params = new URLSearchParams();

    categoryQueries.forEach((category) => {
      params.append("category", category);
    });

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    return `/?${params.toString()}`;
  };
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-500 h-16 px-3 text-white relative">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
  
      <div className="flex-grow mx-4 hidden sm:flex justify-center">
        <SearchBar />
      </div>

      <div className="flex items-center gap-2 sm:hidden ml-auto ml-10">
        <button onClick={toggleSearchBar} className={`text-xl sm:text-2xl lg:text-3xl mt-1 ${!isSearchVisible ? "block" : "hidden"
        } sm:hidden`}>
          <FontAwesomeIcon
            icon={faSearch}
            className="hover:text-purple-300 transition-colors duration-200"/>
        </button>
      </div>

      <div
        className={`absolute top-16 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-300 ${
          isSearchVisible ? "block" : "hidden"
        } sm:hidden`}
      >
        <div className="flex items-center justify-between pl-3">
          <button
            onClick={toggleSearchBar}
            className="text-white text-2xl"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
          <SearchBar />
        </div>
      </div>
  
      <div className="flex items-center gap-2 flex-nowrap ml-auto ml-6 sm:ml-2">
        <Link to={generateLink()} className="flex items-center hidden sm:block">
          <FontAwesomeIcon

            icon={faHome}
            className="text-xl sm:text-2xl hover:text-purple-300 transition-colors duration-200" 

          />
        </Link>
  
        {isSignedIn && (
          <Link to="/account" className="flex items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-xl sm:text-2xl hover:text-purple-300 transition-colors duration-200"
            />
          </Link>
        )}
  
        <SignInButton />
      </div>
    </header>
  );
} 
export default Header