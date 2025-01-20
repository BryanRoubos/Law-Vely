import LegislationCard from "./LegislationCard";
import { Link } from "react-router-dom";

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

interface LegislationListProps {
  legislation: Legislation[];
}

function LegislationList({ legislation }: LegislationListProps) {
  return (
    <div className="grid grid-cols-1 gap-10 p-4 md:grid-cols-2 lg:grid-cols-2">
      {legislation.map((leg) => (
        <Link
          key={leg.id}
          to={`/legislations/${leg.id}`}
          className="transition-transform duration-200 hover:scale-105"
        >
          <LegislationCard
            title={leg.title}
            date={leg.legislationDate}
            categories={leg.categories}
          />
        </Link>
      ))}
    </div>
  );
}

export default LegislationList;
