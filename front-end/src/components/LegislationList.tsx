import LegislationCard from "./LegislationCard";
import { Link } from "react-router-dom";

interface Legislation {
  id: string;
  summaryOfLegislation: string;
  summaryOfSubSections: string;
  timestamp: number;
  title: string;
}

interface LegislationListProps {
  legislation: Legislation[];
}

function LegislationList({ legislation }: LegislationListProps) {
  return (
    <div>
      {legislation.map((leg, index) => (
        <Link to={`/legislations/${leg.id}`}>
          <LegislationCard key={index} title={leg.title} date={leg.timestamp} />
        </Link>
      ))}
    </div>
  );
}

export default LegislationList;
