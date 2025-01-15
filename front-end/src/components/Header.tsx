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
        <header className="flex items-center justify-around w-full h-16 bg-purple-700 px-4 flex-wrap text-white p-4"> 
            <div className="flex-shrink-0 justify-left">
                <Logo /> 
            </div>
            <Link to='/' className="home-btn">
                    <FontAwesomeIcon icon={faHome} className="text-2xl md:text-3xl" />
                </Link>
            <div className="flex items-center space-x-10"> 
                
                <div className="flex-grow relative w-full"> 
                    <SearchBar 
                        value={searchInput} 
                        placeholder={'Search...'} 
                        searchHandler={handleSearch} 
                        searchBtnHandler={handleSearchBtnClick} 
                        isSearchBtnClicked={isSearchBtnClicked} 
                    /> 
                </div> 
                <FontAwesomeIcon icon={faUser} className="user-icon text-2xl md:text-3xl" /> 
            </div> 
        </header> )
}

export default Header;

