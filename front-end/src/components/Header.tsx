// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome, faUser, faSearch, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
// import Logo from "./Logo";
// import SearchBar from "./SearchBar";
// import { SearchContext } from "../contexts/SearchContexts";
// import SignInButton from "./SignInButton";

// function Header() {
//   const searchContext = useContext(SearchContext);
//   const navigate = useNavigate();
//   const [isSearchVisible, setIsSearchVisible] = useState(false);

//   if (!searchContext) {
//     throw new Error("Header must be used within a SearchProvider");
//   }

//   const { searchQuery, setSearchQuery } = searchContext;

//   const handleSearchBtnClick = () => {
//     navigate(`/?search=${searchQuery}`);
//     setSearchQuery("");
//   };

//   const toggleSearchBar = () => {
//     setIsSearchVisible(!isSearchVisible);
//   };

//   return (
//     <header className="flex items-center justify-between h-16 bg-purple-700 px-4 text-white relative">
//       {/* left  logo and home icon*/}
//       <div className="flex items-center gap-4 flex-shrink-0">
//         <Logo />
//         <Link to="/">
//           <FontAwesomeIcon icon={faHome} className="text-xl hover:text-purple-300" />
//         </Link>
//       </div>

//       {/* center section larger search bar*/}
//       <div className="flex-grow mx-4">
//         <div className="hidden sm:flex justify-center">
//           <SearchBar
//             placeholder="Search..."
//             onSearchClick={handleSearchBtnClick}

//           />
//         </div>

//         {/* mobile toggle bar */}
//         {isSearchVisible && (
//           <div className="absolute inset-0 top-0 bg-purple-700 flex items-center px-4 z-10">
//             <button onClick={toggleSearchBar} className="text-white text-2xl mr-4">
//               <FontAwesomeIcon icon={faArrowLeftLong} />
//             </button>
//             <SearchBar
//               placeholder="Search..."
//               onSearchClick={handleSearchBtnClick}

//             />
//           </div>
//         )}
//         <button onClick={toggleSearchBar} className="sm:hidden text-xl">
//           <FontAwesomeIcon icon={faSearch} />
//         </button>
//       </div>

//       {/* right section user and sign in button */}
//       <div className="flex items-center gap-4">
//         <Link to="/account">
//           <FontAwesomeIcon icon={faUser} className="text-xl hover:text-purple-300" />
//         </Link>
//         <SignInButton />
//       </div>
//     </header>
//   );
// }

// export default Header;

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
    <header className="flex items-center justify-between h-16 bg-gradient-to-r from-purple-600 to-indigo-500 px-4 text-white shadow-md relative">
      {/* Left: Logo and Home Icon */}
      <div className="flex items-center gap-4">
        <Logo />
        <Link to="/" className="flex items-center">
          <FontAwesomeIcon
            icon={faHome}
            className="text-xl hover:text-purple-300 transition-colors duration-200"
          />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-grow mx-6">
        {/* Large screens: Show Search Bar */}
        <div className="hidden sm:flex justify-center">
          <SearchBar />
        </div>

        {/* Small screens: Toggleable Search Bar */}
        {isSearchVisible && (
          <div className="absolute inset-0 top-0 bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center px-4 z-20 shadow-lg">
            <button
              onClick={toggleSearchBar}
              className="text-white text-2xl mr-4 hover:text-purple-300 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
            <SearchBar />
          </div>
        )}
        {/* Mobile Search Icon */}
        <button
          onClick={toggleSearchBar}
          className="sm:hidden text-xl hover:text-purple-300 transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* Right: User Icon and Sign-In Button */}
      <div className="flex items-center gap-4">
        <Link to="/account" className="flex items-center">
          <FontAwesomeIcon
            icon={faUser}
            className="text-xl hover:text-purple-300 transition-colors duration-200"
          />
        </Link>
        <SignInButton />
      </div>
    </header>
  );
}

export default Header;
