import getCategoryIcon from "../utils/GetCategoryIcon";

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
  console.log(categories);
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
          className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-sm md:text-sm text-black dark:text-black font-medium 
  tracking-wide"
        >
          <ul className="mt-2 flex flex-col items-center gap-2">
            {categories.length > 3 ? (
              <>
                {categories.slice(0, 3).map((category, index) => (
                  <li key={index} className="flex items-center gap-1">
                    {getCategoryIcon(category)} <span>{category}</span>
                  </li>
                ))}
                <li>...</li>
              </>
            ) : (
              categories.map((category, index) => (
                <li key={index} className="flex items-center gap-1">
                  {getCategoryIcon(category)} <strong>{category}</strong>
                </li>
              ))
            )}
          </ul>
        </p>

        <p
          className="text-sm mb-2 sm:mb-2 md:mb-3 lg:mb-3 italic text-black dark:text-black font-medium 
      tracking-wide text-black dark:text-black"
        >
          {legislationDate}
        </p>
        <div className="flex justify-center mt-3">
          <button className="px-4 py-2 text-base text-white bg-[#b960df] hover:bg-gradient-to-r hover:from-[#7F00FF] hover:to-[#d900e6] focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Find out more
          </button>
        </div>
      </div>
    </div>
  );
}

export default LegislationCard;
