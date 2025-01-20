import CategoriesList from "./CategoriesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div
        id="Nav-1"
        className="flex items-center justify-between bg-purple-700 text-white p-3 md:hidden mb-10 hover:gb-gray"
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
          <CategoriesList handleCategoryClick={handleCategoryClick} />
        </div>
      )}

      <div id="Nav-4" className="hidden md:block">
        <CategoriesList handleCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}

export default NavBar;
