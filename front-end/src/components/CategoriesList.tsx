import { useNavigate } from "react-router-dom";

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

  return (
    <aside
      id="CL-1"
      className="bg-purple-500 text-white w-full rounded-md shadow-xl m-1"
    >
      <ul id="CL-2" className="space-y-1">
        {categories.map((category, index) => (
          <li
            key={index}
            id="CL-3"
            className="text-lg md:font-bold md:hover:underline md:p-3 p-1 m-2 rounded-md hover:bg-green-300 w-3/4"
          >
            <button
              onClick={() => handleCategoryChange(category)}
              className="w-full text-left transform transition-transform duration-200 hover:scale-110 hover:text-blue-500"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoriesList;
