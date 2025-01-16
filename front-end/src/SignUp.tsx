import { useState } from "react";
import {auth, db} from "../firebaseConfig"
import {ref, set} from "firebase/database"
import "./css/LoginPage.css"

import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp:  React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userRef = ref(db, `users/${user.uid}`)
            await set(userRef, {
                uid: user.uid,
                displayName,
                email,
                photoURL: "",
            });

            console.log("User signed up successfully and saved in DB")
        } catch (error) {
            console.error("Error signing up:", error)
        }
    };

    return (
        <div className="container">
          <div className="card">
            <div className="left-panel">
              <h1>Welcome!</h1>
              <p>Create Your Account</p>
            </div>
            <div className="right-panel">
              <h2>Join Us!</h2>
              <form onSubmit={handleSignUp}>
                <label>Display Name</label>
                <input
                  type="text"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign Up</button>
              </form>
              <p>
                Already have an account? <a href="/signin">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      );
    };
    
    export default SignUp;
