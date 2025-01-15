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
        <header className="bg-purple-400 text-white p-4 flex items-center justify-between">
            <div className="flex items-center w-full h-16 bg-purple-700 px-4">
                <Logo />
                <Link to='/' className="home-btn"><FontAwesomeIcon icon={faHome} /></Link>
                <SearchBar 
                    value={searchInput}
                    placeholder={'Search...'}
                    searchHandler={handleSearch}
                    searchBtnHandler={handleSearchBtnClick}
                    isSearchBtnClicked={isSearchBtnClicked}
                />
                <FontAwesomeIcon icon={faUser} className="user-icon"/>
            </div>
        </header>
    )
}

export default Header;