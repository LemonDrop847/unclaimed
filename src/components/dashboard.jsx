import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db, auth } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import Popup from "./popUp";
import AddObject from "./addObject";
import UpdateProfile from './updateProfile'

const Dashboard = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfUserLoggedIn = setInterval(() => {
      if (auth.currentUser) {
        clearInterval(checkIfUserLoggedIn);

        const userRef = doc(db, "users", auth.currentUser.uid);
        getDoc(userRef)
          .then((doc) => {
            console.log("running");
            if (doc.exists) {
              setUser(doc.data());
            } else {
              console.error("User not found");
              alert("User Data Not Found");
              navigate("/");
            }
          })
          .catch((error) => {
            console.error("Error retrieving user data: ", error);
            alert("User Data Not Found");
            navigate("/");
          });
      }
    }, 500);

    setTimeout(() => {
      clearInterval(checkIfUserLoggedIn);
      if (!auth.currentUser) {
        console.error("User not logged in");
        alert("Login or Signup First");
        navigate("/");
      }
    }, 5000);
  }, [navigate]);
  return user == null ? (
    <p
      style={{
        height: "700vh",
      }}
    >
      Loading user data...
    </p>
  ) : (
    <div className="dashb">
      <h2
        style={{
          marginBottom: "2rem",
        }}
      >
        My Dashboard
      </h2>
      <p>Hi {user.name}!</p>
      <p>Email: {user.email}</p>
      <h3
        style={{
          margin: "2rem 0 1rem 0",
        }}
      >
        My Objects
      </h3>
      <div className="container">
        <div className="row">
          {user.objects.map((object, index) => (
            <div className="col-3" key={index}>
              <Link to={`/objects/${object.id}`} className="links">
                <div className="object-preview">
                  {object.img ? (
                    <img
                      src={JSON.parse(object.img).image}
                      alt="object-preview"
                      style={{
                        margin: "1rem",
                        maxHeight: "125px",
                        maxWidth: "125px",
                      }}
                    />
                  ) : (
                    <img
                      src="https://i.postimg.cc/zBsNpQQL/images.jpg"
                      alt="object-preview"
                      style={{
                        margin: "1rem",
                        maxHeight: "200px",
                        maxWidth: "200px",
                      }}
                    />
                  )}
                  <p
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    {object.name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <Link to="/addObject"> */}
      <button
        className="btn-land"
        id="sign"
        onClick={() => setButtonPopup(true)}
      >
        Add Object
      </button>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <AddObject />
      </Popup>
      {/* </Link> */}
      <br />
     
      <button
        onClick={() => {
          setButtonPopup1(true)
        }}
        className="btn-land" id="sign"
      >
        Update Profile
      </button>
      
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <UpdateProfile />
      </Popup>
      
    </div>
  );
};

export default Dashboard;