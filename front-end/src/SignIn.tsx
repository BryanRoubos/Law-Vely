import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import "./css/LoginPage.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/LoginPage.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in with email and password:", user.uid);

      localStorage.setItem("userUID", user.uid);

      navigate("/user-preferences");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const handleGoogleSignIn = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      event.preventDefault();
      const result: UserCredential = await signInWithPopup(
        auth,
        googleProvider
      );
      const user = result.user;
      const idToken: string = await user.getIdToken();
      console.log("Generated ID Token:", idToken);

      const response = await fetch(
        "http://localhost:3002/api/auth/verify-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      //Make an API URL for when front end is hosted
      //localhost should NOT be an finalized endpoint when it's hosted.
      //For testing purposes this work.

      if (response.ok) {
        console.log("User authenticated successfully");

        const userRef = ref(db, `users/${user.uid}`);
        await set(userRef, {
          uid: user.uid,
          displayName: user.displayName || "Anonymous",
          email: user.email || "No Email",
          photoURL: user.photoURL || "",
        });

        console.log("User data saved in database.");

        localStorage.setItem("userUID", user.uid);

        navigate("/");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="container">
      <button
        className="absolute top-4 right-4 text-4xl text-gray-600 hover:text-white transition-colors"
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="card">
        <div className="left-panel">
          <h1>Welcome!</h1>
          <p>Sign In To Your Account</p>
        </div>
        <div className="right-panel">
          <h2>Hello!</h2>
          <form onSubmit={handleEmailSignIn}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
            <div className="extra-options">
              <label>
                <input type="checkbox" /> Remember
              </label>
            </div>
            <p>OR</p>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
          </form>
          <p className="extra-options">
            <a href="/signup">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
