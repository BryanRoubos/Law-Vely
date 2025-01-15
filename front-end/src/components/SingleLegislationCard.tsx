import ReactMarkdown from "react-markdown";
import { manipulateDateAndTime } from "../utils/utils";

interface SingleLegislation {
    id: string;
    summaryOfLegislation: string;
    summaryOfSubSections: string;
    timestamp: number;
    title: string;
}

interface SingleLegislationCardProps {
    legislation: SingleLegislation;
}

function SingleLegislationCard({ legislation }: SingleLegislationCardProps) {
    return (
        <div>
        <h1>{legislation.title}</h1>
        <p>{legislation.summaryOfLegislation}</p>
        <ReactMarkdown>{legislation.summaryOfSubSections}</ReactMarkdown>
        <p>Date Created: {manipulateDateAndTime(legislation.timestamp)}</p>
        </div>
    );
}
            // <>
            //     <h1 className='text-2xl font-bold text-gray-800 mb-4'>{title}</h1>
            //     <p className='text-gray-600 mb-4'>{summary}</p>
            //     <p className='text-gray-600 mb-4'>{subsections}</p>
            //     <p className='text-sm text-gray-500'>
            //         Date created: {manipulateDateAndTime(date)}
            //     </p>
            // </>

export default SingleLegislationCard;