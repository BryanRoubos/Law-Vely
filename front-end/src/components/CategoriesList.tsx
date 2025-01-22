import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faHome,
  faCar,
  faHeart,
  faLeaf,
  faBolt,
  faGraduationCap,
  faGavel,
  faHandshake,
  faShoppingCart,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";

const categories: string[] = [
  "All",
  "Finance",
  "Housing",
  "Transportation",
  "Health",
  "Environment",
  "Energy",
  "Education",
  "Justice",
  "Trade",
  "Consumer",
  "Governance",
];

interface CategoriesListProps {
  handleCategoryClick: () => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  handleCategoryClick,
}) => {
  const navigate = useNavigate();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams();
    if (category !== "All") {
      params.set("category", category);
    }
    navigate(`/?${params.toString()}`);
    handleCategoryClick();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Finance":
        return <FontAwesomeIcon icon={faCoins} className="text-yellow-300" />;
      case "Housing":
        return <FontAwesomeIcon icon={faHome} className="text-blue-300" />;
      case "Transportation":
        return <FontAwesomeIcon icon={faCar} className="text-red-400" />;
      case "Health":
        return <FontAwesomeIcon icon={faHeart} className="text-pink-400" />;
      case "Environment":
        return <FontAwesomeIcon icon={faLeaf} className="text-green-400" />;
      case "Energy":
        return <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />;
      case "Education":
        return (
          <FontAwesomeIcon icon={faGraduationCap} className="text-indigo-400" />
        );
      case "Justice":
        return <FontAwesomeIcon icon={faGavel} className="text-gray-400" />;
      case "Trade":
        return <FontAwesomeIcon icon={faHandshake} className="text-cyan-400" />;
      case "Consumer":
        return (
          <FontAwesomeIcon icon={faShoppingCart} className="text-orange-400" />
        );
      case "Governance":
        return (
          <FontAwesomeIcon icon={faLandmark} className="text-purple-400" />
        );
      default:
        return null;
    }
  };

  return (
    <aside
      id="CL-1"
      className="bg-[#b960df] text-white w-full md:rounded-lg shadow-lg p-4 md:m-2 md:mt-3"
    >
      <ul id="CL-2" className="space-y-3">
        {categories.map((category, index) => (
          <li
            key={index}
            id="CL-3"
            className="text-lg font-medium md:font-semibold p-3 rounded-md hover:bg-gradient-to-r hover:from-[#7F00FF] hover:to-[#d900e6] hover:text-white transition-all duration-300 ease-in-out"
          >
            <button
              onClick={() => handleCategoryChange(category)}
              className="w-full text-left transform transition-transform duration-200 hover:scale-105 flex items-center gap-2"
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoriesList;
