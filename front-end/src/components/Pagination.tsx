import React, { useState } from "react";
import { Button } from "@mui/material";
import "../css/Pagination.css";

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

  return (
    <div>
      {renderLegislations(currentLegislations)}

      <div className="pagination-container">
        <Button
          variant="contained"
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="page-numbers">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="contained"
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
