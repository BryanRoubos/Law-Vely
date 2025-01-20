// import LegislationCard from "./LegislationCard";
// import { Link } from "react-router-dom";

// interface Legislation {
//   id: string;
//   summaryOfLegislation: string;
//   summaryOfSubSections: string;
//   timestamp: number;
//   title: string;
// }

// interface LegislationListProps {
//   legislation: Legislation[];
// }

// function LegislationList({ legislation }: LegislationListProps) {
//   return (
//     <div>
//       {legislation.map((leg, index) => (
//         <Link to={`/legislations/${leg.id}`}>
//           <LegislationCard key={index} title={leg.title} date={leg.timestamp} />
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default LegislationList;

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
    <div
      id="LegList-Container"
      className="grid grid-cols-1 gap-10 md:grid-cols-2 p-4"
    >
      {legislation.map((leg) => (
        <Link key={leg.id} to={`/legislations/${leg.id}`}>
          <LegislationCard
            title={leg.title}
            legislationDate={leg.legislationDate}
            categories={leg.categories}
          />
        </Link>
      ))}
    </div>
  );
}

export default LegislationList;
