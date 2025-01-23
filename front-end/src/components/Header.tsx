import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SignInButton from "./SignInButton";

const Header: React.FC = () => {
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
    <header className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-500 h-16 px-4 text-white">
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      <div className="flex-grow mx-4 hidden sm:flex justify-center">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 flex-nowrap">
        <Link to={generateLink()} className="flex items-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-xl hover:text-purple-300 transition-colors duration-200"
          />
        </Link>
        {isSignedIn && (
          <Link to="/account" className="flex items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-xl hover:text-purple-300 transition-colors duration-200"
            />
          </Link>
        )}
        <SignInButton isSignedIn={isSignedIn} />
      </div>
    </header>
  );
};

export default Header;
