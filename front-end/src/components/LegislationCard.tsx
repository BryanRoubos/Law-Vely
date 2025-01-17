import { manipulateDateAndTime } from "../utils/utils";

interface LegislationCardProps {
  title: string;
  date: number;
}

function LegislationCard({ title, date }: LegislationCardProps) {
  return (
    <div id="LegCard-1" className="md:m-3 m-1 bg-green-200 p-3 rounded-md shadow-md hover:brightness-90 w-full">
      <h2 id="LegCard-2" className="md:text-xl text-base">{title}</h2>
      <p className="md:text-lg text-sm">
        <strong>Date:</strong> {manipulateDateAndTime(date)}
      </p>
    </div>
  );
}

export default LegislationCard;
