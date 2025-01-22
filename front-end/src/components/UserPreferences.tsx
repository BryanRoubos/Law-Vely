import React, { useState, useEffect } from "react";
import getCategoryIcon from "../utils/GetCategoryIcon";
import { useNavigate } from "react-router-dom";
import {db} from "../../firebaseConfig";
import { ref, set, get } from "firebase/database"; 

const categories = [
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

const UserPreferences: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const userUID = localStorage.getItem("userUID"); 
  
  useEffect(() => {
    if (!userUID) {
      navigate("/signin"); 
      return;
    }

    const fetchPreferences = async () => {
      const userRef = ref(db, `users/${userUID}/preferences`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setSelectedCategories(snapshot.val() || []); 
      }
    };

    fetchPreferences();
  }, [userUID, navigate]);

  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category) 
      : [...selectedCategories, category]; 

    setSelectedCategories(updatedCategories);

    const userRef = ref(db, `users/${userUID}/preferences`);
    set(userRef, updatedCategories);
  };

  const handleGetStarted = () => {
    const params = new URLSearchParams();
    selectedCategories.forEach((category) => params.append("category", category));
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="user-preferences-container">
      <div
        className="m-4 md:m-8 lg:m-12 bg-gradient-to-br from-lime-200 to-sky-200 rounded-lg shadow-lg dark:bg-gradient-to-br from-lime-200 to-sky-200"
        id="user-preferences-card"
      >
        <h3
          id="user-preferences-title"
          className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-xl sm:text-xl md:text-lg lg:text-xl font-bold text-blue-800 dark:text-blue-800 font-inter tracking-wide"
        >
          Select the areas of law you're interested in
        </h3>
        <div className="category-row">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => toggleCategory(category)}
              className={`flex items-center gap-2 text-lg font-medium md:font-semibold p-3 rounded-md transition-all duration-300 ease-in-out ${
                selectedCategories.includes(category)
                  ? "bg-gradient-to-r from-[#7F00FF] to-[#d900e6] text-white"
                  : "bg-white text-black"
              }`}
            >
              {getCategoryIcon(category)}
              <span>{category}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleGetStarted}
          id="get-started-button"
          className="px-4 py-2 text-base text-white bg-[#b960df] hover:bg-gradient-to-r hover:from-[#7F00FF] hover:to-[#d900e6] focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;