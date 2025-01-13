import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
//import { faUser } from "@fortawesome/free-regular-svg-icons";

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
        <>
            <div className="header">
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
        </>
    )
}

export default Header;