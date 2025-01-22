import { useNavigate } from "react-router-dom";
import getCategoryIcon from "../utils/GetCategoryIcon";

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
  "Technology",
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

  categories.forEach((category) => {
    getCategoryIcon(category);
  });

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
