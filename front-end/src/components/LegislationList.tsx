import LegislationCard from './LegislationCard';

const legislationData = [
    {
      legislationTitle: 'Legislation 1',
      legislationSummary: 'Legislation Summary 1',
      legislationCategory: 'Transport',
    },
    {
      legislationTitle: 'Legislation 2',
      legislationSummary: 'Legislation Summary 2',
      legislationCategory: 'Education',
    },
    {
      legislationTitle: 'Legislation 3',
      legislationSummary: 'Legislation Summary 3',
      legislationCategory: 'Policing',
    },
  ];

function LegislationList() {
    return (
      <ul className="legislation-list">
        {legislationData.map((legislation) => {
          return (
            <li key={legislation.legislationTitle}>
              <LegislationCard legislation={legislation} />
            </li>
          );
        })}
      </ul>
    );
  }

export default LegislationList;