import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS7UKPZH-fBp2p4rNX1XZnPupc5NPL3Fg",
  authDomain: "frecious-store.firebaseapp.com",
  databaseURL:
    "https://frecious-store-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "frecious-store",
  storageBucket: "frecious-store.appspot.com",
  messagingSenderId: "209256353443",
  appId: "1:209256353443:web:1735d2e273ee089254b916",
};

const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
