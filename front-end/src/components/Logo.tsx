import logo from "../assets/logo-white-min-shadow.png";
import { Link, useSearchParams } from "react-router-dom";

function Logo() {
  const [searchParams] = useSearchParams(); 
  const categoryQueries: string[] = searchParams.getAll("category");
  const searchQuery: string = searchParams.get("search") || ""; 

  const generateLink = (): string => {
    const params = new URLSearchParams();

    categoryQueries.forEach((category) => {
      params.append("category", category);
    });

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    return `/?${params.toString()}`;
  };
  return (
    <div>
      <Link to={generateLink()}>
        <img
          src={logo}
          alt="Law-Vely Logo"
          className="h-auto max-h-8 md:max-h-12 w-auto max-w-full mt-1"
        />
      </Link>
    </div>
  );
}

export default Logo;
