import { useEffect, useState } from "react";
import { fetchLegislationData } from "../api";
import LegislationList from "./LegislationList";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import LegislationListSkeleton from "./LoadingStyling/legislationListSkeleton";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
  categories: string[];
  url: string;
  legislationDate: string;
}

interface LegislationResponse {
  [key: string]: Legislation;
}

function LegislationSection() {
  const [legislationData, setLegislationData] = useState<LegislationResponse>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    fetchLegislationData(categoryQuery, searchQuery)
      .then((legislations) => {
        setLegislationData(legislations);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(
          searchQuery
            ? `No legislations found for the search: ${searchQuery}`
            : categoryQuery
            ? `No legislations found for the category: ${categoryQuery}`
            : "Failed to load legislations. Please try again later!"
        );
        setIsLoading(false);
      });
  }, [categoryQuery, searchQuery]);

  if (isError) {
    return <div>{isError}</div>;
  }

  const legislationArray = Object.entries(legislationData).map(
    ([id, legislation]) => ({
      id,
      ...legislation,
    })
  );

  return (
    <div id="LS-1" className="flex-1 p-6 space-y-6">
      {isLoading ? (
        <LegislationListSkeleton count={10} />
      ) : (
        <>
          <h1 id="LS-2" className="text-center font-bold text-3xl pt-6">
            Legislations for{" "}
            {categoryQuery
              ? categoryQuery
              : searchQuery
              ? searchQuery
              : "All Categories"}
          </h1>
          {categoryQuery && legislationArray.length === 0 && (
            <p>No legislations found for this category.</p>
          )}
          <Pagination
            legislations={legislationArray}
            legislationsPerPage={12}
            renderLegislations={(currentLegislations) => (
              <div>
                <LegislationList legislation={currentLegislations} />
              </div>
            )}
          />
        </>
      )}
    </div>
  );
}

export default LegislationSection;
