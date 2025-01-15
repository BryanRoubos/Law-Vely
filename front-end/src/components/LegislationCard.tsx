import { manipulateDateAndTime } from "../utils/utils";

interface LegislationCardProps {
  title: string;
  date: number;
}

function LegislationCard({ title, date }: LegislationCardProps) {
  return (
    <div className="m-10 bg-green-200 p-4 rounded-md shadow-md hover:brightness-90">
      <h2>{title}</h2>
      <p>
        <strong>Date:</strong> {manipulateDateAndTime(date)}
      </p>
    </div>
  );
}

export default LegislationCard;
