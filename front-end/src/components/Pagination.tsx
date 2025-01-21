// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import "../css/Pagination.css";

// interface Legislation {
//   id: string;
//   summaryOfLegislation: string;
//   summaryOfSubSections: string;
//   timestamp: number;
//   title: string;
//   categories: string[];
//   url: string;
// }

// interface PaginationProps {
//   legislations: Legislation[];
//   legislationsPerPage: number;
//   renderLegislations: (currentLegislations: Legislation[]) => React.ReactNode;
// }

// function Pagination({
//   legislations,
//   legislationsPerPage,
//   renderLegislations,
// }: PaginationProps) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const startIndex = (currentPage - 1) * legislationsPerPage;
//   const endIndex = startIndex + legislationsPerPage;
//   const currentLegislations = legislations.slice(startIndex, endIndex);

//   const totalPages = Math.ceil(legislations.length / legislationsPerPage);

//   const handleChangePage = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   return (
//     <div>
//       {renderLegislations(currentLegislations)}

//       <div className="pagination-container">
//         <Button
//           variant="contained"
//           onClick={() => handleChangePage(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span className="page-numbers">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           variant="contained"
//           onClick={() => handleChangePage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Pagination;

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import icons
import "../css/Pagination.css"; // You can style the container here or use Tailwind
import { Button } from "@mui/material";

interface PaginationProps {
  legislations: any[];
  legislationsPerPage: number;
  renderLegislations: (currentLegislations: any[]) => React.ReactNode;
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

  return (
    <div>
      {renderLegislations(currentLegislations)}

      <div className="pagination-container mt-4 flex justify-center items-center space-x-4 w-full">
        <button
          className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition duration-300 flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <span className="text-white text-sm sm:text-sm md:text-md lg:text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500 transition duration-300 flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
