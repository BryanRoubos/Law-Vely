import { useEffect, useState } from 'react';
import { fetchLegislationData } from '../api';
import LegislationList from './LegislationList';

// Define the Legislation type
interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
}

// LegislationResponse represents the structure of the fetched API data
interface LegislationResponse {
  [key: string]: Legislation; // Each key is the legislation ID, and the value is the legislation data
}

function LegislationSection() {
  const [legislationData, setLegislationData] = useState<LegislationResponse>(
    {}
  );
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoading('Legislations are loading...');
    fetchLegislationData()
      .then((legislations) => {
        setLegislationData(legislations);
        setIsLoading(null);
      })
      .catch(() => {
        setIsError('Failed to load legislations. Please try again later!');
        setIsLoading(null);
      });
  }, []);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (isError) {
    return <div>{isError}</div>;
  }
  
  // Convert the object (legislationData) to an array of legislation items
  const legislationArray = Object.entries(legislationData).map(
    ([id, legislation]) => ({
      id,
      ...legislation,
    })
  );

  return (
    <div className='flex-1 p-4 space-y-4'>
      <h1 className='text-center font-bold text-5xl pt-6'>Latest Legislation</h1>
      <LegislationList legislation={legislationArray} />
    </div>
  );
}

export default LegislationSection;
