import { useEffect, useState } from "react";
import { fetchLegislationData } from "../api";
import { useSearchParams } from "react-router-dom";
import LegislationList from "./LegislationList";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
}

interface LegislationResponse {
  [key: string]: Legislation;
}

function LegislationSection() {
  const [legislationData, setLegislationData] = useState<LegislationResponse>(
    {}
  );
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setIsLoading("Legislations are loading...");
    fetchLegislationData()
      .then((legislations) => {
        setLegislationData(legislations);
        setIsLoading(null);
      })
      .catch(() => {
        setIsError("Failed to load legislations. Please try again later!");
        setIsLoading(null);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  const legislationArray = Object.entries(legislationData).map(
    ([id, legislation]) => ({
      id,
      ...legislation,
    })
  );

  const filteredLegislation = legislationArray.filter(
    (leg) =>
      leg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leg.summaryOfLegislation
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      leg.summaryOfSubSections.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-4 space-y-4">
      <h1 className="text-center font-bold md:text-5xl pt-6 text-sm">
        Latest Legislations
      </h1>

      {searchQuery && filteredLegislation.length === 0 ? (
        <p>No legislations match your search for "{searchQuery}".</p>
      ) : (
        <LegislationList legislation={filteredLegislation} />
      )}
    </div>
  );
}

export default LegislationSection;