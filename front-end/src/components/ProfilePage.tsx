import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import SavedLegislations from "./SavedLegislations";
import Spinner from "./Spinner";

interface User {
  name: string;
  title: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingPreferences, setIsCheckingPreferences] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      setUser({
        name: currentUser.displayName || "User",
        title: "Legislation Enthusiast",
      });

      const preferenceRef = ref(db, `users/${currentUser.uid}/preferences`);
      const snapshot = await get(preferenceRef);

      if (!snapshot.exists()) {
        navigate("/user-preferences");
      }

      setIsCheckingPreferences(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  if (isCheckingPreferences || !user) {
    return <Spinner />;
  }

  return (
    <div id="PP-1" className="max-w-4xl m-5 w-full">
      <div id="PP-2" className="text-left my-3">
        <h1 id="PP-3" className="lg:text-2xl text-xl font-bold text-gray-800">
          Hello, {user.name}
        </h1>
        <p id="PP-4" className="text-gray-600">{user.title}</p>
      </div>

      <div id="PP-5" className="mb-1">
        <h2 id="PP-6" className="lg:text-2xl text-xl font-bold text-gray-800 mb-2">
          Your tracked legislations
        </h2>
        <SavedLegislations uid={auth.currentUser?.uid} />
      </div>
    </div>
  );
};

export default ProfilePage;
