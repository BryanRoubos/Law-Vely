import LegislationList from "./LegislationList";
import LegislationSection from "./LegislationSection";
import LegislationCard from "./LegislationCard";
import { Link } from "react-router-dom";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
}

const savedLegislations: Legislation[] = [
    {
        id: "101",
        title: "Universal Healthcare Act",
        summaryOfLegislation:
        "This act ensures free access to healthcare services for all citizens.",
        summaryOfSubSections: `- **Section 1**: Funding initiatives\n- **Section 2**: Eligibility criteria`,
        timestamp: 1678901234567,
    },
    {
        id: "102",
        title: "Clean Water Bill",
        summaryOfLegislation:
        "A bill focused on protecting freshwater resources and reducing pollution.",
        summaryOfSubSections: `- **Section 1**: Industrial waste management\n- **Section 2**: Water conservation programs`,
        timestamp: 1678901234567,
    },
    {
        id: "1",
        title: "Climate Change Bill 2025",
        summaryOfLegislation:
            "This bill aims to reduce greenhouse gas emissions by 50% by 2030.",
        summaryOfSubSections: `- **Section 1**: Renewable energy initiatives\n- **Section 2**: Carbon tax regulations`,
        timestamp: 1678901234567,
        },
        {
        id: "2",
        title: "Data Privacy Act",
        summaryOfLegislation:
            "An act to strengthen user privacy and regulate data collection.",
        summaryOfSubSections: `- **Section 1**: User consent policies\n- **Section 2**: Data breach penalties`,
        timestamp: 1678901234567,
    },
];

const popularLegislations: Legislation[] = [
  {
    id: "101",
    title: "Universal Healthcare Act",
    summaryOfLegislation:
      "This act ensures free access to healthcare services for all citizens.",
    summaryOfSubSections: `- **Section 1**: Funding initiatives\n- **Section 2**: Eligibility criteria`,
    timestamp: 1678901234567,
  },
  {
    id: "102",
    title: "Clean Water Bill",
    summaryOfLegislation:
      "A bill focused on protecting freshwater resources and reducing pollution.",
    summaryOfSubSections: `- **Section 1**: Industrial waste management\n- **Section 2**: Water conservation programs`,
    timestamp: 1678901234567,
  },
  {
    id: "1",
    title: "Climate Change Bill 2025",
    summaryOfLegislation:
        "This bill aims to reduce greenhouse gas emissions by 50% by 2030.",
    summaryOfSubSections: `- **Section 1**: Renewable energy initiatives\n- **Section 2**: Carbon tax regulations`,
    timestamp: 1678901234567,
    },
    {
    id: "2",
    title: "Data Privacy Act",
    summaryOfLegislation:
        "An act to strengthen user privacy and regulate data collection.",
    summaryOfSubSections: `- **Section 1**: User consent policies\n- **Section 2**: Data breach penalties`,
    timestamp: 1678901234567,
    },
];

function SavedLegislations() {
  return (
    <>
      {savedLegislations.length > 0 ? (
        savedLegislations.map((legislation) => (
          <Link to={`/legislations/${legislation.id}`} key={legislation.id}>
            <LegislationCard
              title={legislation.title}
              date={legislation.timestamp}
            />
          </Link>
        ))
      ) : (
        <div>
          <h2 id="SavedLeg-1" className="text-lg text-gray-800">
            You have no tracked legislation, here are all available legislations:
          </h2>
          <LegislationSection />
        </div>
      )}
    </>
  );
}

export default SavedLegislations;
