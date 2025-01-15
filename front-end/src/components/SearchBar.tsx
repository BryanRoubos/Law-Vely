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
        <div className="flex items-center rounded-md shadow-md  max-w-lg">
            <input className="flex text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                type="search"
               
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.searchHandler}
                
  />
                    <button onClick={props.searchBtnHandler} className="ml-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
                <FontAwesomeIcon icon={faSearch}/>
            </button>
        </div>
    )
}

export default SearchBar;