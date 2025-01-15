import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

function Header() {
    const [ searchInput, setSearchInput ] = useState('');
    const [ isSearchBtnClicked, setIsSearchBtnClicked ] = useState(false);
    
    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchInput(e.target.value);
        setIsSearchBtnClicked(false);
    }

    const handleSearchBtnClick = () => {
        setSearchInput('');
        setIsSearchBtnClicked(true);
    }

    return (
        <header className="flex items-center justify-between h-16 bg-purple-700 px-4   text-white p-4"> 
            <div className="flex-shrink-0 justify-left">
                <Logo /> 
            </div>
            <Link to='/' className="home-btn">
                    <FontAwesomeIcon icon={faHome} className="sm:text-xs md:text-xl" />
                </Link>
            <div className="flex items-center space-x-10"> 
                
                <div className="flex relative  max-w-xl"> 
                    <SearchBar 
                        value={searchInput} 
                        placeholder={'Search...'} 
                        searchHandler={handleSearch} 
                        searchBtnHandler={handleSearchBtnClick} 
                        isSearchBtnClicked={isSearchBtnClicked} 
                    /> 
                      <FontAwesomeIcon icon={faUser} className="user-icon sm:text-xs md:text-xl pl-6 pt-1" /> 
                </div> 
              
            </div> 
                    </header> )
}

export default Header;

