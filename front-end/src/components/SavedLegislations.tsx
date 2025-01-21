import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebaseConfig"; 
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    return(
      <>
        <Spinner />
      </>
  )
  }

  if (legislations.length === 0) {
    return (
      <div className="m-2 text-center text-xl">
          {<NoSaved />}
      </div>
    )
  }

  return (
    <div>
      {legislations.map((legislation) => (
        <Link
          to={`/legislations/${legislation.id}`}
          key={legislation.id}
          className="block mb-4 p-4 bg-gray-200 rounded-md shadow-md hover:bg-gray-300"
        >
          <h3 className="font-semibold text-lg">{legislation.title}</h3>
          <p className="text-sm">
            <strong>Timestamp:</strong> {new Date(legislation.timestamp).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SavedLegislations;
