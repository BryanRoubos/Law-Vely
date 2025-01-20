import ReactMarkdown from "react-markdown";
import { manipulateDateAndTime } from "../utils/utils";
import ReportPopup from "./ReportPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import Button from "@mui/material/Button";
import { useState } from "react";

interface SingleLegislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
  url: string;
}

interface SingleLegislationCardProps {
  legislation: SingleLegislation;
}

function SingleLegislationCard({ legislation }: SingleLegislationCardProps) {
  const [isTrackedClicked, setIsTrackedClicked] = useState(false);
  const [showSubSections, setShowSubSections] = useState(false);

  return (
    <div id="SLC-1" className="md:mx-8">
      <h1 id="SLC-2" className="lg:text-2xl text-xl font-bold text-gray-800 mb-4">
        {legislation.title}
      </h1>
      <h2>
        <strong>Summary</strong>
      </h2>
      <p id="SLC-3" className="text-gray-600 mb-4">{legislation.summaryOfLegislation}</p>
      
      <div>
      <Button
        id="subsect-btn"
        variant="text"
        onClick={() => setShowSubSections(!showSubSections)}
        className="flex items-center text-blue-600"
      >
        {showSubSections ? (
          <>
          Show Less <FontAwesomeIcon icon={faChevronUp} className="ml-2" />
        </>
    ) : (
    <>
      Show More <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
    </>
  )}
</Button>
        
        {showSubSections && (
          <div>
            <h2>Subsection Summaries</h2>
          <ReactMarkdown className="text-gray-600 mb-4">
            {legislation.summaryOfSubSections}
          </ReactMarkdown>
          </div>
        )}
      </div>

      <a href={legislation.url} className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline mt-2">
          Read the full legislation here <svg className="w-4 h-4 ms-2 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </a>

      <p id="SLC-4" className="text-sm text-gray-500 mt-1 mb-2">
        Date Created: {manipulateDateAndTime(legislation.timestamp)}
      </p>
      
      <div id="SLC-5" className="flex justify-between">
        <Button
          id="track-btn"
          variant="contained"
          type="button"
          onClick={() => setIsTrackedClicked(!isTrackedClicked)}
        >
          <FontAwesomeIcon
            icon={isTrackedClicked ? solidBookmark : regularBookmark}
            className="mr-2"
          />
          {isTrackedClicked ? `Tracked` : `Track`}
        </Button>
        <ReportPopup />
      </div>
    </div>
  );
}

export default SingleLegislationCard;