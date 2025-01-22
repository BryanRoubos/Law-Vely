import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import NoSaved from "./NoSaved";

interface Legislation {
  id: string;
  title: string;
  timestamp: number;
}

interface SavedLegislationsProps {
  uid: string | undefined;
}

const SavedLegislations = ({ uid }: SavedLegislationsProps) => {
  const [legislations, setLegislations] = useState<Legislation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setIsLoading(false);
      return;
    }

    const fetchLegislations = async () => {
      const userRef = ref(db, `users/${uid}/savedLegislations`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedLegislations = Object.entries(data).map(
            ([id, legislation]: any) => ({
              id,
              title: legislation.title,
              timestamp: legislation.timestamp,
            })
          );
          setLegislations(formattedLegislations);
        } else {
          setLegislations([]);
        }
      } catch (error) {
        console.error("Error fetching legislations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLegislations();
  }, [uid]);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (legislations.length === 0) {
    return <div className="m-2 text-center text-xl">{<NoSaved />}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-10 p-4 md:grid-cols-2 lg:grid-cols-3">
      {legislations.map((legislation) => (
        <Link
          to={`/legislations/${legislation.id}`}
          key={legislation.id}
          className="flex flex-col justify-between w-11/12 max-w-sm p-4 sm:p-4 md:p-4 lg:p-5 mx-auto bg-gradient-to-br from-lime-200 to-sky-200 rounded-lg shadow-lg dark:bg-gradient-to-br from-lime-200 to-sky-200
          hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-out animate-fade-in
          h-auto md:h-[12rem] lg:h-[12rem]"
        >
          <div className="text-center flex flex-col justify-between h-full">
            <h3 className="mb-3 text-xl font-bold text-blue-800 tracking-wide">
              {legislation.title}
            </h3>
            <p className="text-sm italic text-black font-medium tracking-wide">
              <strong>Timestamp:</strong>{" "}
              {new Date(legislation.timestamp).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SavedLegislations;
