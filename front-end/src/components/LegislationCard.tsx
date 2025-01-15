import { manipulateDateAndTime } from "../utils/utils";

interface LegislationCardProps {
  title: string;
  date: number;
}

function LegislationCard({ title, date }: LegislationCardProps) {
  return (
    <div className="legislation-card">
      <h2>{title}</h2>
      <p>
        <strong>Date:</strong> {manipulateDateAndTime(date)}
      </p>
    </div>
  );
}

export default LegislationCard;
