import React from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, UserCredential } from "firebase/auth";

const SignIn: React.FC = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const idToken: string = await result.user.getIdToken();


      const response = await fetch("/api/auth/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        console.log("User authenticated successfully");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
