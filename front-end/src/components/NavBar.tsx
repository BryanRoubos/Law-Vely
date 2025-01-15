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
        <div className="flex items-center justify-between bg-purple-700 text-white p-4 md:hidden">
          <h3 className="text-lg font-bold">Civil Law</h3>
          <button onClick={toggleMenu} className="text-xl">
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
  
        {isMenuOpen && (
          <div className="bg-purple-500 text-white p-4 md:hidden">
            <CategoriesList />
          </div>
        )}
  
        <div className="hidden md:block">
          <h3 className="text-xl font-bold text-purple-700 px-4 mb-2">Civil Law</h3>
          <CategoriesList />
        </div>
      </div>
    );
}

export default NavBar;