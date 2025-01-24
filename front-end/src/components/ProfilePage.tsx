import { useEffect, useState } from "react";
import { getAuth, reload } from "firebase/auth";
import SavedLegislations from "./SavedLegislations";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

interface User {
  name: string;
  title: string;

}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigate("/signin");
        return;
      }

      try {
        await reload(currentUser);

        setUser({
          name: currentUser.displayName || "User", 
          title: "Legislation Enthusiast",
        });
      } catch (error) {
        console.error("Error reloading user data:", error);
      }
    };

    fetchUser();
  }, [auth, navigate]);


  if (!user) {
    return <Spinner />;
  }

  return (
    <div id="PP-1" className="max-w-4xl m-5 w-full">
      <div id="PP-2" className="text-left my-3">
        <h1 id="PP-3" className="lg:text-2xl text-xl font-bold text-gray-800">
          Hello, {user.name}
        </h1>
        <p id="PP-4" className="text-gray-600">
          {user.title}
        </p>
      </div>

      <div id="PP-5" className="mb-1">
        <h2
          id="PP-6"
          className="lg:text-2xl text-xl font-bold text-gray-800 mb-2"
        >
          Your tracked legislations
        </h2>
        <SavedLegislations uid={auth.currentUser?.uid} />
      </div>

    
    </div>
  );
};

export default ProfilePage;