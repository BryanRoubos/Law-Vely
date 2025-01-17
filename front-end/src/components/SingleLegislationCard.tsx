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
import { db } from "../../firebaseConfig"; // Ensure Firebase is configured

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

  // Mock user UID; replace this with your actual authentication
  const userUID = localStorage.getItem("userUID") || "test-user";

  // Check if the legislation is already tracked
  useEffect(() => {
    if (!userUID) return;

    const checkTrackedStatus = async () => {
      const trackRef = ref(db, `users/${userUID}/savedLegislations/${legislation.id}`);
      const snapshot = await get(trackRef);
      setIsTracked(snapshot.exists());
    };

    checkTrackedStatus();
  }, [userUID, legislation.id]);

  // Handle track/untrack action
  const handleTrackLegislation = async () => {
    if (!userUID) {
      alert("You must be logged in to track legislation.");
      return;
    }

    const trackRef = ref(db, `users/${userUID}/savedLegislations/${legislation.id}`);

    try {
      if (isTracked) {
        // Remove legislation from tracked list
        await remove(trackRef);
        setIsTracked(false);
      } else {
        // Add legislation to tracked list
        await set(trackRef, {
          title: legislation.title,
          timestamp: Date.now(), // Optional: Add timestamp for tracking
        });
        setIsTracked(true);
      }
    } catch (error) {
      console.error("Error updating tracked status:", error);
      alert("Failed to update tracked status. Please try again.");
    }
  };

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

      <p id="SLC-4" className="text-sm text-gray-500 m-1">
        Date Created: {manipulateDateAndTime(legislation.timestamp)}
      </p>
      <a href={legislation.url} target="_blank" rel="noopener noreferrer">
        Find more information here...
      </a>
      <div id="SLC-5" className="flex justify-between mt-4">
        <Button
          id="track-btn"
          variant="contained"
          type="button"
          onClick={handleTrackLegislation}
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
