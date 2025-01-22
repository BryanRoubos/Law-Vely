import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
  categories: string[];
  url: string;
}

interface PaginationProps {
  legislations: Legislation[];
  legislationsPerPage: number;
  renderLegislations: (currentLegislations: Legislation[]) => React.ReactNode;
}

function Pagination({
  legislations,
  legislationsPerPage,
  renderLegislations,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * legislationsPerPage;
  const endIndex = startIndex + legislationsPerPage;
  const currentLegislations = legislations.slice(startIndex, endIndex);

  const totalPages = Math.ceil(legislations.length / legislationsPerPage);

  const handleChangePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // return (
  //   <div>
  //     {renderLegislations(currentLegislations)}

  //     <div className="pagination-container ">
  //       <Button
  //         variant="contained"
  //         onClick={() => handleChangePage(currentPage - 1)}
  //         disabled={currentPage === 1}
  //       >
  //         Previous
  //       </Button>
  //       <span className="page-numbers">
  //         Page {currentPage} of {totalPages}
  //       </span>
  //       <Button
  //         variant="contained"
  //         onClick={() => handleChangePage(currentPage + 1)}
  //         disabled={currentPage === totalPages}
  //       >
  //         Next
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content Section */}
      <div className="flex-grow">{renderLegislations(currentLegislations)}</div>

      {/* Pagination Section */}
      <div className="pagination-container flex justify-between items-center mt-4 p-4 bg-#7DC0EF">
        {/* Previous Button */}
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition duration-300 ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7f00ff] hover:bg-gradient-to-r hover:from-[#7F00FF] hover:to-[#d900e6]"
          }`}
        >
          <FiChevronLeft className="mr-2" size={20} />
          Previous
        </button>

        {/* Page Numbers */}
        <span className="text-black font-bold text-sm sm:text-md">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition duration-300 ${
            currentPage === totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#b960df] hover:bg-gradient-to-r hover:from-[#7F00FF] hover:to-[#d900e6]"
          }`}
        >
          Next
          <FiChevronRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
