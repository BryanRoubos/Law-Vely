import CategoriesList from "./CategoriesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div
        id="Nav-1"
        className="flex items-center justify-between bg-purple-700 text-white p-3 md:hidden mb-10"
      >
        <h3 id="Nav-2" className="text-base font-bold">
          Topics
        </h3>
        <button onClick={toggleMenu} id="Nav-3" className="text-xl">
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="Nav-3"
          className="bg-purple-500 text-white p-4 md:hidden rounded-"
        >
          <CategoriesList />
        </div>
      )}

      <div id="Nav-4" className="hidden md:block">
        {/* <h3 id="Nav-5" className="text-xl font-bold text-purple-700 px-4 mb-2">Civil Law</h3> */}
        <CategoriesList />
      </div>
    </div>
  );
}

export default NavBar;

// import { useNavigate } from "react-router-dom";
