import React, { useState, useEffect } from "react";
import QRGenerator from "./qrcode";
import { useParams, useNavigate } from "react-router-dom";
import {  db } from "./firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import GoogleMaps from "./Googlemap";

const Objects = () => {
  const [object, setObject] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { id } = useParams();
  const [isLogin, setLogin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // setName(user.displayName);
        setLogin(true);
      } else {
        setLogin(null);
      }
    });
  }, [auth]);
  useEffect(() => {
    const objectRef = doc(db, "objects", id);
    getDoc(objectRef)
      .then((doc) => {
        console.log("running");
        if (doc.exists) {
          setObject(doc.data());
          if (auth.currentUser && auth.currentUser.uid === doc.data().owner) {
            setIsOwner(true);
          }
          setIsChecked(true);
        } else {
          console.error("Object not found");
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error retrieving object data: ", error);
        return  navigate("/home");
      });
  }, [id, auth.currentUser, navigate]);
 
  const delObject = async (objectId) => {
    try {
      await deleteDoc(doc(db, "objects", id));
      const currentUser = auth.currentUser;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const updatedObjects = userSnapshot.data().objects.filter(
        (obj) => obj.id !== id
      );
      await updateDoc(userRef, { objects: updatedObjects });
      console.log(`Successfully deleted object with id ${objectId}`);
      navigate("/Dashboard")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const objectRef = doc(db, "objects", id);
    if (!isChecked) {
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date(),
        };
        if (!isOwner) {
          console.log(isOwner);
          updateDoc(objectRef, {
            locations: arrayUnion(loc),
          }).then(() => {
            getDoc(objectRef).then((doc) => {
              console.log("running");
              if (doc.exists) {
                const locations = doc.data().locations;
                if (locations.length > 10) {
                  const removeLocation = locations[0];
                  updateDoc(objectRef, {
                    locations: arrayRemove(removeLocation),
                  });
                }
              }
            });
          });
        }
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, [id, isChecked, isOwner]);

  return (
    <div>
      {object ? (
        <div className="container-fluid">
          <div className="row ob-detail">
            <div className="col-6">
              {/* <h1>Object</h1> */}
              <div className="row">
                <div className="col-lg-4 col-sm-2">
                  {object.image ? (
                    <img
                      src={JSON.parse(object.image).image}
                      id="obj-img"
                      alt="Object"
                    />
                  ) : (
                    <img
                      src="https://i.postimg.cc/zBsNpQQL/images.jpg"
                      id="obj-img"
                      alt="Object"
                    />
                  )}
                </div>
                <div
                  className="col-sm-2 col-lg-4"
                  style={{
                    float: "left",
                  }}
                >
                  <h2>{object.name}</h2>
                  <p>Owner: {object.ownerName}</p>
                  <p>Email: {object.email}</p>
                  <p>{object.description}</p>
                  {isLogin && (
                    <div><button onClick={delObject} className="btn btn-danger" style={{
                      margin:"1rem"
                    }}>Delete Object</button>
                    <QRGenerator objectId={id} objectName={object.name} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4">
              {isOwner && (
                <>
                  <h1>Last Location</h1>
                  <GoogleMaps locations={object.locations} />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p
          style={{
            height: "700vh",
          }}
        >
          Loading object data...
        </p>
      )}
    </div>
  );
};

export default Objects;