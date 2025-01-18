// function CategoriesList() {
//     const categoryList = ["Contracts", "Torts", "Family Law", "Property Law", "Labour Law", "Consumer Protection", "Wills & Estates", "Personal Injury", "Dispute Resolution", "Civil Rights"]

//     return (
//         <aside id="CL-1" className="bg-purple-500 text-white w-full rounded-md shadow-xl m-1">
//             <ul id="CL-2" className="space-y-1">
//                 {categoryList.map((category, index) => (
//                     <li key={index} id="CL-3" className="text-lg md:font-bold md:hover:underline md:p-3 p-1 m-2">
//                     {category}
//                 </li>
//                 ))}
//             </ul>
//         </aside>
//     )
// }

// export default CategoriesList;

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

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams();
    if (category !== "All") {
      params.set("category", category);
    }
    navigate(`/?${params.toString()}`);
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
            className="text-lg md:font-bold md:hover:underline md:p-3 p-1 m-2"
          >
            <button
              onClick={() => handleCategoryChange(category)}
              className="w-full text-left"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NavBar;
