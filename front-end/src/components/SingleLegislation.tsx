import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchLegislationById } from "../api";
import SingleLegislationCard from "./SingleLegislationCard";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
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

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Error: {hasError}</p>;
  if (!legislation) return <p>No legislation found.</p>;

  return (<div id="SL-1" className='flex flex-col items-center md:p-5  p-3 bg-green-200 shadow-lg rounded-lg m-2 md:m-5'>
    <SingleLegislationCard legislation={legislation} />
    </div>  );
}

export default SingleLegislation;
