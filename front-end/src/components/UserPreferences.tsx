import React, { useState } from "react";
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
import { ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

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
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Finance":
      return faCoins;
    case "Housing":
      return faHome;
    case "Transportation":
      return faCar;
    case "Health":
      return faHeart;
    case "Environment":
      return faLeaf;
    case "Energy":
      return faBolt;
    case "Education":
      return faGraduationCap;
    case "Justice":
      return faGavel;
    case "Trade":
      return faHandshake;
    case "Consumer":
      return faShoppingCart;
    case "Governance":
      return faLandmark;
    default:
      return faCoins;
  }
};

const UserPreferences: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const userUID = auth.currentUser?.uid;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleGetStarted = async () => {
    if (!userUID) {
      alert("You must be logged in to save preferences.");
      return;
    }

    const params = new URLSearchParams();
    selectedCategories.forEach((category) => params.append("category", category));

    try {
      await set(ref(db, `users/${userUID}/preferences`), selectedCategories);
      navigate(`/?${params.toString()}`);
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Failed to save preferences. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your Preferences</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="p-4">
            <button
              onClick={() => toggleCategory(category)}
              className={`w-full p-4 rounded-lg border-2 flex items-center gap-3 ${
                selectedCategories.includes(category)
                  ? "border-green-500 bg-green-100"
                  : "border-gray-300"
              } transition-all`}
            >
              <FontAwesomeIcon icon={getCategoryIcon(category)} className="text-xl" />
              <span>{category}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={selectedCategories.length === 0}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default UserPreferences;
