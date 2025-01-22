import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchLegislationById } from "../api";
import SingleLegislationCard from "./SingleLegislationCard";
import Spinner from "./Spinner";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
  url: string;
}

function SingleLegislation() {
  const [legislation, setLegislation] = useState<Legislation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);
  const { legislation_id } = useParams<{ legislation_id: string }>();

  useEffect(() => {
    setIsLoading(true);
    fetchLegislationById(legislation_id!)
      .then((data) => {
        setLegislation(data);
      })
      .catch((error) => {
        setHasError(error.message || "Failed to fetch legislation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [legislation_id]);

  if (isLoading) {
    return (
    <>
      <Spinner />
    </>
  )
};
  if (hasError) return <p>Error: {hasError}</p>;
  if (!legislation) return <p>No legislation found.</p>;

  return (
    <div
      id="SL-1"
      className="flex flex-col bg-gradient-to-br from-lime-200 to-sky-200 items-center md:p-10 p-6 shadow-lg rounded-lg m-2 md:m-5 h-fit"
    >
      <SingleLegislationCard legislation={legislation} />
    </div>
  );
}

export default SingleLegislation;
