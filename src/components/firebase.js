// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgLrgso0CxfykNVSikFrp2rOxVAnp4Ozw",
  authDomain: "unclaimed-41cf1.firebaseapp.com",
  projectId: "unclaimed-41cf1",
  storageBucket: "unclaimed-41cf1.appspot.com",
  messagingSenderId: "883366170748",
  appId: "1:883366170748:web:c38837925e77108313f9f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app,auth,db,storage};