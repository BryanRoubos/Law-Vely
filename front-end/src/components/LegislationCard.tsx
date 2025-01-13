interface Legislation {
    legislationTitle: string;
    legislationSummary: string;
    legislationCategory: string;
}

interface LegislationCardProps {
    legislation: Legislation;
}

function LegislationCard({ legislation }: LegislationCardProps): JSX.Element {
    return (
      <div className="legislation-card">
        <h2 className="legislation-title">{legislation.legislationTitle}</h2>
        <p className="legislation-summary">Summary: {legislation.legislationSummary}</p>
        <p>Category: {legislation.legislationCategory}</p>
      </div>
    );
}
export default LegislationCard;