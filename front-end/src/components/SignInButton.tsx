import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignInButton() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignOut = () => {
    setIsSignedIn(false);

  };

  const handleSignIn = () => {
    setIsSignedIn(true);

  };

  return (
    <nav>
      {isSignedIn ? (
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
        >
          Sign out
        </button>
      ) : (
        <Link
          to="/signin"
          onClick={handleSignIn}
          className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Sign in
        </Link>
      )}
    </nav>
  );
}

export default SignInButton;

