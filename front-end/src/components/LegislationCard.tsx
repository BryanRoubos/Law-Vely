import { manipulateDateAndTime } from "../utils/utils";

interface LegislationCardProps {
  title: string;
  date: string;
  categories: string[];
}

function LegislationCard({ title, date, categories }: LegislationCardProps) {
  return (
    <div
      className="flex flex-col justify-between w-11/12 max-w-sm p-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 
      hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-out
      animate-fade-in"
    >
      <div className="text-center">
        <h3 className="mb-6 text-xl font-bold text-indigo-700 dark:text-indigo-300 font-inter">
          {title}
        </h3>
        <p className="mb-4 text-sm text-gray-800 dark:text-gray-200 font-roboto">
          <strong>Categories:</strong>{" "}
          {categories.length > 3
            ? `${categories.slice(0, 3).join(", ")}...`
            : categories.join(", ")}
        </p>
        <p className="text-sm italic text-gray-500 dark:text-gray-400 font-roboto">
          <strong>Date:</strong> {manipulateDateAndTime(date)}
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md 
          hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 
          transition-all duration-300 font-inter shadow-md hover:shadow-lg"
        >
          Find out more
        </button>
      </div>
    </div>
  );
}

export default LegislationCard;
