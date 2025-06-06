import { useEffect, useState, useMemo } from "react";
import { fetchLegislationData } from "../api";
import { useSearchParams } from "react-router-dom";
import LegislationList from "./LegislationList";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import NoResults from "./NoResults";

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

interface LegislationResponse {
  [key: string]: Legislation;
}

function LegislationSection() {
  const [legislationData, setLegislationData] = useState<LegislationResponse>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const categoryQueries = useMemo(
    () => searchParams.getAll("category") || [],
    [searchParams]
  );
  const searchQuery = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const isPreferencesPage = searchParams.has("preferences");

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    if (isPreferencesPage) {
      console.log("Displaying user preferences");
      setIsLoading(false);
    } else {
      fetchLegislationData(categoryQueries, searchQuery)
        .then((legislations) => {
          setLegislationData(legislations);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching legislations:", error);
          setIsError("Failed to load legislations. Please try again later.");
          setIsLoading(false);
        });
    }
  }, [categoryQueries, searchQuery, isPreferencesPage]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="m-2 text-center text-xl">
        <NoResults />
      </div>
    );
  }

  const legislationArray = Object.entries(legislationData).map(
    ([legislationId, legislation]) => ({
      legislationId,
      ...legislation,
    })
  );

  return (
    <div id="LS-1" className="flex-1 p-6 space-y-6">
      <h1
        id="LS-2"
        className="text-center font-bold lg:text-3xl text-2xl pt-6 text-black text-shadow-thin"
      >
        Legislations for{" "}
        {categoryQueries.length > 0
          ? categoryQueries.join(", ")
          : searchQuery
          ? `Search: "${searchQuery}"`
          : "All Categories"}
      </h1>
      {legislationArray.length === 0 ? (
        <NoResults />
      ) : (
        <Pagination
          legislations={legislationArray}
          legislationsPerPage={9}
          renderLegislations={(currentLegislations) => (
            <div>
              <LegislationList legislation={currentLegislations} />
            </div>
          )}
        />
      )}
    </div>
  );
}

export default LegislationSection;

// import { useEffect, useState, useMemo } from "react";
// import { fetchLegislationData } from "../api";
// import { useSearchParams } from "react-router-dom";
// import LegislationList from "./LegislationList";
// import Pagination from "./Pagination";
// import Spinner from "./Spinner";
// import NoResults from "./NoResults";
// import { Legislation } from "../types/Legislation"; // Ensure the single source of truth for the Legislation type

// interface LegislationResponse {
//   [key: string]: Legislation;
// }

// function LegislationSection() {
//   const [legislationData, setLegislationData] = useState<LegislationResponse>(
//     {}
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState<string | null>(null);
//   const [searchParams] = useSearchParams();

//   const categoryQueries = useMemo(
//     () => searchParams.getAll("category") || [],
//     [searchParams]
//   );
//   const searchQuery = useMemo(
//     () => searchParams.get("search") || "",
//     [searchParams]
//   );

//   const isPreferencesPage = searchParams.has("preferences");

//   useEffect(() => {
//     setIsLoading(true);
//     setIsError(null);
//     if (isPreferencesPage) {
//       console.log("Displaying user preferences");
//       setIsLoading(false);
//     } else {
//       fetchLegislationData(categoryQueries, searchQuery)
//         .then((legislations) => {
//           console.log(legislations);
//           setLegislationData(legislations);
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching legislations:", error);
//           setIsError("Failed to load legislations. Please try again later.");
//           setIsLoading(false);
//         });
//     }
//   }, [categoryQueries, searchQuery, isPreferencesPage]);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (isError) {
//     return (
//       <div className="m-2 text-center text-xl">
//         <NoResults />
//       </div>
//     );
//   }

//   const legislationArray: Legislation[] = Object.entries(legislationData).map(
//     ([legislationId, legislation]) => ({
//       legislationId,
//       ...legislation,
//     })
//   );

//   return (
//     <div id="LS-1" className="flex-1 p-6 space-y-6">
//       <h1
//         id="LS-2"
//         className="text-center font-bold lg:text-3xl text-2xl pt-6 text-black text-shadow-thin"
//       >
//         Legislations for{" "}
//         {categoryQueries.length > 0
//           ? categoryQueries.join(", ")
//           : searchQuery
//           ? `Search: "${searchQuery}"`
//           : "All Categories"}
//       </h1>
//       {legislationArray.length === 0 ? (
//         <NoResults />
//       ) : (
//         <Pagination
//           legislations={legislationArray}
//           legislationsPerPage={9}
//           renderLegislations={(currentLegislations) => (
//             <div>
//               <LegislationList legislation={currentLegislations} />
//             </div>
//           )}
//         />
//       )}
//     </div>
//   );
// }

// export default LegislationSection;
