import { ChangeEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchTermProps {
    value: string,
    searchHandler: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    searchBtnHandler: () => void,
    isSearchBtnClicked: boolean
}

function SearchBar(props: SearchTermProps) {
    return (
        <>
            <input
                type="search"
                className="search-bar"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.searchHandler}
            />
            <button onClick={props.searchBtnHandler} className="search-btn">
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </>
    )
}

export default SearchBar;