import { manipulateDateAndTime } from "../utils/utils";

interface LegislationCardProps {
  title: string;
  date: number;
  summaryOfLegislation: string;
}

function LegislationCard({
  title,
  date,
}: LegislationCardProps) {
  return (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm">
        <strong>Date:</strong> {manipulateDateAndTime(date)}
      </p>
      {/* <p>
        <strong>Summary:</strong> {summary}
      </p> */}
    </>
  );
}

export default LegislationCard;