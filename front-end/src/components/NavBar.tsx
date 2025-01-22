import CategoriesList from "./CategoriesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div
        id="Nav-1"
        className="flex items-center justify-between bg-[#b960df] text-white p-3 md:hidden hover:gb-gray"
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
        <div id="Nav-3" className="text-white md:hidden rounded-md">
          <CategoriesList handleCategoryClick={handleCategoryClick} />
        </div>
      )}

      <div id="Nav-4" className="hidden md:block">
        <CategoriesList handleCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
};

export default NavBar;
