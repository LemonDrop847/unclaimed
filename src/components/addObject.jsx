import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const AddObject = () => {
  const [objectName, setObjectName] = useState("");
  const [ObjectDescription, setObjectDescription] = useState("");
  const [objectId, setObjectId] = useState("");
  const [imageJson, setImageJson] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      alert("Please log in to add an object.");
      navigate("/");
    }

    const objectRef = await addDoc(collection(db, "objects"), {
      name: objectName,
      description: ObjectDescription,
      owner: auth.currentUser.uid,
      ownerName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      phoneNumber: auth.currentUser.phoneNumber,
      image: imageJson,
      locations: [],
    });
    console.log(objectRef);
    setObjectId(objectRef.id);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log(reader.result);
      setImageJson(JSON.stringify({ image: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  const handleCameraClick = async () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext("2d").drawImage(video, 0, 0);

      setImageJson(JSON.stringify({ image: canvas.toDataURL("image/jpeg") }));
      setShowCamera(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (objectId) {
    const objectVal = {
      name: objectName,
      id: objectId,
      img: imageJson,
    };
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      objects: arrayUnion(objectVal),
    });
    return <Navigate to={`/objects/${objectId}`} />;
  }

  return (
    <form onSubmit={handleSubmit} id="obj-add">
      <input
        type="text"
        placeholder="Object name"
        value={objectName}
        onChange={(event) => setObjectName(event.target.value)}
        style={{
          marginBottom: "1rem",
        }}
      />
      <textarea
        placeholder="Description"
        cols="30"
        onChange={(event) => setObjectDescription(event.target.value)}
        rows="4"
      ></textarea>
      <div>
        <input
          style={{ width: "300px", display: "inline-block" }}
          type="file"
          onChange={handleImageChange}
        />
        OR
        <button onClick={handleCameraClick} className="btn btn-success">
          Take a photo
        </button>
      </div>

      {showCamera && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <video
              id="video"
              width="500"
              height="500"
              style={{ border: "1px solid black" }}
            ></video>
            <br />
            <button onClick={handleTakePhoto}>Take photo</button>
            <button onClick={handleCloseCamera}>Close</button>
          </div>
        </div>
      )}
      <br />
      <div align="center">
        <button type="submit" className="btn-land" id="sign">
          Add object
        </button>
      </div>
    </form>
  );
};

export default AddObject;