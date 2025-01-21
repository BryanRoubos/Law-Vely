import ReactMarkdown from "react-markdown";
import { manipulateDateAndTime } from "../utils/utils";
import ReportPopup from "./ReportPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { ref, get, set, remove } from "firebase/database";
import { db } from "../../firebaseConfig";
import LegislationNotes from "./LegislationNotes";

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
  const [isTracked, setIsTracked] = useState(false);
  const [showSubSections, setShowSubSections] = useState(false);
  const userUID = localStorage.getItem("userUID");

  useEffect(() => {
    if (!userUID) return;

    const checkTrackedStatus = async () => {
      const trackRef = ref(
        db,
        `users/${userUID}/savedLegislations/${legislation.id}`
      );
      const snapshot = await get(trackRef);
      setIsTracked(snapshot.exists());
    };

    checkTrackedStatus();
  }, [userUID, legislation.id]);

  const handleTrackLegislation = async () => {
    if (!userUID) {
      alert("You must be logged in to track legislation.");
      return;
    }

    const trackRef = ref(
      db,
      `users/${userUID}/savedLegislations/${legislation.id}`
    );

    try {
      if (isTracked) {
        await remove(trackRef);
        setIsTracked(false);
      } else {
        await set(trackRef, {
          title: legislation.title,
          timestamp: Date.now(),
        });
        setIsTracked(true);
      }
    } catch (error) {
      console.error("Error updating tracked status:", error);
      alert("Failed to update tracked status. Please try again.");
    }
  };

  return (
      <div id="SLC-1" className="md:mx-8 px-4">
          <div className="mt-2 mb-4 p-4 text-xs text-gray-500 ">
      <p className="italic text-center">
        Disclaimer: This summary and information about the legislation is provided for informational purposes only and is not intended to serve as legal advice. Please refer to official legislative sources for full details.
      </p>
    </div>
      <h1
        id="SLC-2"
        className="lg:text-3xl text-xl font-bold text-gray-800 mt-4 mb-4 text-center"
      >
        {legislation.title}
      </h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Summary</h2>
        <p id="SLC-3" className="text-gray-600 leading-relaxed">
          {legislation.summaryOfLegislation}
        </p>
      </div>

      <div className="mb-6">
        <Button
          id="subsect-btn"
          variant="text"
          onClick={() => setShowSubSections(!showSubSections)}
          className="flex items-center text-black"
        >
          {showSubSections ? (
            <>
              Show Less <FontAwesomeIcon icon={faChevronUp} className="ml-2" />
            </>
          ) : (
            <>
              Show More{" "}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </>
          )}
        </Button>

        {showSubSections && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Subsection Summaries
            </h2>
            <ReactMarkdown className="text-gray-600 leading-relaxed">
              {legislation.summaryOfSubSections}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 mb-4">
        <p id="SLC-4">
          Date Created: {manipulateDateAndTime(legislation.timestamp)}
        </p>
      </div>

      {legislation.url && (
        <div className="mb-6">
          <a
            href={legislation.url}
            className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline mt-2"
            target="_blank"
          >
            Read the full legislation here{" "}
            <svg
              className="w-4 h-4 ms-2 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      )}

      {userUID && (
              <LegislationNotes legislationId={legislation.id} userUID={userUID} />
      )}
      
      <div id="SLC-5" className="flex justify-between items-center">
        <Button
          id="track-btn"
          variant="contained"
          type="button"
          onClick={handleTrackLegislation}
          className="text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300"
        >
          <FontAwesomeIcon
            icon={isTracked ? solidBookmark : regularBookmark}
            className="mr-2"
          />
          {isTracked ? `Tracked` : `Track`}
        </Button>
        <ReportPopup />
      </div>
          </div>
  );
}


export default SingleLegislationCard;
