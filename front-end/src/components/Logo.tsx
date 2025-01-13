const Logo: React.FC = () => {
    return (
      <div className="logo-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="logo-svg"
        >
          <circle
            className="circle"
            cx="100"
            cy="100"
            r="90"
            stroke="#4CAF50"
            strokeWidth="5"
            fill="none"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="#4CAF50"
            fontSize="20"
            fontFamily="Arial, sans-serif"
            dy=".3em"
          >
            Law-Vely
          </text>
        </svg>
        <p className="tagline">Simplifying Legislation</p>
      </div>
    );
  };

export default Logo;