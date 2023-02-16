import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import React, { useState } from "react";
  import { auth, db } from "../firebase";
  import { updateProfile } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import SignIn from "./signIn";
  import { Link } from "react-router-dom";
  import Popup from "../popUp";
  
  const SignUp = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const signUp = (e) => {
      console.log(name + email);
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://i.postimg.cc/59Y74t0J/spiderman.png",
          }).then(() => {
            setDoc(doc(db, "users", auth.currentUser.uid), {
              name: name,
              email: email,
              photoURL: "https://i.postimg.cc/59Y74t0J/spiderman.png",
              objects: [],
            });
            console.log("added email: " + email);
            console.log("displayName set: " + name);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const signUpWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(({ user }) => {
          setName(user.displayName);
          setEmail(user.email);
          setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            profile: user.photoURL,
            objects: [],
          });
          console.log("Signed up with Google:", user);
        })
        .catch((error) => {
          console.error("Error signing up with Google:", error);
        });
    };
  
    return (
      <div className="sign-in-container">
        <form onSubmit={signUp}>
          <h1>Register</h1>
          <label>Name</label>
          <input
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <button type="submit" onClick={console.log("press")} id="sign">
            Sign Up
          </button>
          <br />
          <span>
            or Register using{" "}
            <img
              src="https://i.postimg.cc/N00XbhCD/icons8-google-48.png"
              onClick={signUpWithGoogle}
              alt=""
            />
          </span>
          <br />
          <span>
            Already a member?
            <Link to="#" onClick={() => setButtonPopup(true)}>
              Log In here
            </Link>
          </span>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <SignIn />
          </Popup>
          {/* <button onClick={signUpWithGoogle}>Sign Up with Google</button> */}
        </form>
      </div>
    );
  };
  
  export default SignUp;