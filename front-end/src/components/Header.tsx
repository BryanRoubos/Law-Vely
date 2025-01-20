import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faSearch,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { useState } from "react";
import SignInButton from "./SignInButton";

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="flex items-center justify-between h-16 bg-purple-700 px-4 text-white relative">
      {/* left logo and home icon */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Logo />
        <Link to="/">
          <FontAwesomeIcon
            icon={faHome}
            className="text-xl hover:text-purple-300"
          />
        </Link>
      </div>

      {/* center section: larger search bar */}
      <div className="flex-grow mx-4">
        <div className="hidden sm:flex justify-center">
          <SearchBar />
        </div>

        {/* mobile toggle bar */}
        {isSearchVisible && (
          <div className="absolute inset-0 top-0 bg-purple-700 flex items-center px-4 z-10">
            <button
              onClick={toggleSearchBar}
              className="text-white text-2xl mr-4"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
            <SearchBar />
          </div>
        )}
        <button onClick={toggleSearchBar} className="sm:hidden text-xl">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* right section: user and sign-in button */}
      <div className="flex items-center gap-4">
        <Link to="/account">
          <FontAwesomeIcon
            icon={faUser}
            className="text-xl hover:text-purple-300"
          />
        </Link>
        <SignInButton />
      </div>
    </header>
  );
}

export default Header;
