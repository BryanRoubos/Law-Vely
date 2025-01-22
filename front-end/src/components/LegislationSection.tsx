import { useEffect, useState, useMemo } from "react";
import { fetchLegislationData } from "../api";
import { useSearchParams } from "react-router-dom";
import LegislationList from "./LegislationList";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import NoResults from "./NoResults";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const categoryQueries = useMemo(() => searchParams.getAll("category") || [], [searchParams]);
  const searchQuery = useMemo(() => searchParams.get("search") || "", [searchParams]);

  useEffect(() => {
    console.log("categoryQueries:", categoryQueries);
    console.log("searchQuery:", searchQuery);

    setIsLoading(true);
    setIsError(null);

    fetchLegislationData(categoryQueries, searchQuery)
      .then((legislations) => {
        setLegislationData(legislations);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching legislations:", error);
        setIsError("Failed to load legislations. Please try again later.");
        setIsLoading(false);
      });
  }, [categoryQueries, searchQuery]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="m-2 text-center text-xl">{isError}</div>;
  }

  const legislationArray = Object.entries(legislationData).map(
    ([id, legislation]) => ({
      id,
      ...legislation,
    })
  );

  return (
    <div id="LS-1" className="flex-1 p-6 space-y-6">
      <h1
        id="LS-2"
        className="text-center font-bold text-4xl pt-6 text-white font-oswald"
      >
        Legislations for{" "}
        {categoryQueries.length > 0
          ? categoryQueries.join(", ")
          : searchQuery
          ? `Search: "${searchQuery}"`
          : "All Categories"}
      </h1>
      {legislationArray.length === 0 ? (
        <NoResults />
      ) : (
        <Pagination
          legislations={legislationArray}
          legislationsPerPage={9}
          renderLegislations={(currentLegislations) => (
            <div>
              <LegislationList legislation={currentLegislations} />
            </div>
          )}
        />
      )}
    </div>
  );
}

export default LegislationSection;