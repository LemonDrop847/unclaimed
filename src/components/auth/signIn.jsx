import { signInWithEmailAndPassword, signInWithPopup ,GoogleAuthProvider} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import SignUp from "./signUp";
import Popup from "../popUp";

const SignIn = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signInWithGoogle = () => {
    const provider= new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In To Your Account</h1>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label >Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" id="sign">Log In</button>
        <br />
      </form>
      
      <span>or Login using <img src="https://i.postimg.cc/N00XbhCD/icons8-google-48.png" onClick={signInWithGoogle} alt="" /></span>
      <br />
      
      <span>New User?<Link to="#" onClick={()=>setButtonPopup(true)}>Register Here</Link></span>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <SignUp/>
                </Popup>
    </div>
  );
};

export default SignIn;