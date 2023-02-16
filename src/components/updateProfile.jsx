import React, { useState } from "react";
import {  db } from "./firebase";
import { getAuth,updateProfile } from "firebase/auth";
import { updateDoc,doc} from "firebase/firestore"; 

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const updateProf = () => {
    const auth = getAuth();
    if (!auth.currentUser) {
      return;
    }

    const user = auth.currentUser;
    let updateObj = {};

    if (name) {
      updateObj["displayName"] = name;
    }
    if (email) {
      updateObj["email"] = email;
    }
    if (profilePic) {
      updateObj["photoURL"] = profilePic;
    }
    const userDocRef = doc(db, "users", user.uid);

    updateProfile(user, updateObj)
      .then(() => {
        updateDoc(userDocRef,{
          name: user.displayName,
          email: user.email,
          phone: phone,
          photoURL: user.photoURL,
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="update-profile-container">
      <form>
        <h1>Update Profile</h1>
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
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label>Profile Picture URL</label>
        <input
          type="url"
          placeholder="Enter your profile picture URL"
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
        />
        <br />
        <button type="submit" onClick={updateProf} className="btn-land" id="sign">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;