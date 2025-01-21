interface LegislationCardProps {
  title: string;
  legislationDate: string;
  categories: string[];
}

function LegislationCard({
  title,
  legislationDate,
  categories,
}: LegislationCardProps) {
  return (
    <div
      className="flex flex-col justify-between w-11/12 max-w-sm p-4 sm:p-4 md:p-4 lg:p-5 mx-auto bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800 
    hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-out animate-fade-in
    h-[20rem] sm:h-[20rem] md:h-[20rem] lg:h-[20rem]"
    >
      <div className="text-center flex flex-col justify-between h-full">
        <h3
          className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-lg sm:text-xl md:text-lg lg:text-l font-bold text-teal-700 dark:text-teal-400 font-inter 
      tracking-wide"
        >
          {title}
        </h3>
        <p
          className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-sm md:text-sm text-gray-800 dark:text-gray-200 font-roboto font-medium 
      tracking-wide text-teal-600 dark:text-teal-400"
        >
          <strong>Categories:</strong>{" "}
          {categories.length > 3
            ? `${categories.slice(0, 3).join(", ")}...`
            : categories.join(", ")}
        </p>
        <p
          className="text-sm mb-2 sm:mb-2 md:mb-3 lg:mb-3 italic text-gray-700 dark:text-gray-300 font-roboto font-medium 
      tracking-wide text-teal-600 dark:text-teal-400"
        >
          <strong>Date: {legislationDate}</strong>
        </p>
        <div className="flex justify-center mt-3">
          <button
            className="px-4 py-2 text-sm md:text-base font-bold text-white bg-gradient-to-r from-teal-500 to-blue-500 rounded-md 
          hover:bg-gradient-to-br hover:from-teal-600 hover:to-blue-600 transition-all duration-300 font-inter shadow-md hover:shadow-lg"
          >
            Find out more
          </button>
        </div>
      </div>
    </div>
  );
}

export default LegislationCard;
