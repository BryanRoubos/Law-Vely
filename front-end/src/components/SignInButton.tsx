import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";

function SignInButton() {
  const auth = getAuth();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  const handleSignOut = async () => {
    try{
      await signOut(auth);
      console.log("user signed out")
      navigate("/signin")
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  return (
    <nav>
      {currentUser ? (
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Sign out
        </button>
      ) : (
        <Link
          to="/signin"
          className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}

export default SignInButton