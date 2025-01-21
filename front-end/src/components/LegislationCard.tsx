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
      className="flex flex-col justify-between w-11/12 max-w-sm p-4 sm:p-4 md:p-4 lg:p-5 mx-auto bg-gradient-to-br from-lime-200 to-sky-200 rounded-lg shadow-lg dark:bg-gradient-to-br from-lime-200 to-sky-200
    hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-out animate-fade-in
    h-[20rem] sm:h-[20rem] md:h-[20rem] lg:h-[22rem]"
    >
      <div className="text-center flex flex-col justify-between h-full">
        <h3
          className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-xl sm:text-xl md:text-lg lg:text-xl font-bold text-blue-800 dark:text-blue-800 font-inter 
      tracking-wide"
        >
          {title}
        </h3>
        <p
          className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-sm md:text-sm text-black dark:text-black  font-medium 
      tracking-wide text-black dark:text-black"
        >
          <span className="font-extrabold">Categories:</span>{" "}
          {categories.length > 3
            ? `${categories.slice(0, 3).join(", ")}...`
            : categories.join(", ")}
        </p>
        <p
          className="text-sm mb-2 sm:mb-2 md:mb-3 lg:mb-3 italic text-black dark:text-black font-medium 
      tracking-wide text-black dark:text-black"
        >
          <span className="font-extrabold">Date:</span> {legislationDate}
        </p>
        <div className="flex justify-center mt-3">
          <button
            className="px-4 py-2 text-base font-oswald text-white bg-gradient-to-r from-purple-600 to-purple-4text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-30000 rounded-md 
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
