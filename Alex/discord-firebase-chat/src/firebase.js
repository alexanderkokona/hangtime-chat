import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJ5Dh8JBSl7QYCjTf7PbyuAJ9LviSiMKo",
  authDomain: "hangtime-chat-discordformat.firebaseapp.com",
  projectId: "hangtime-chat-discordformat",
  storageBucket: "hangtime-chat-discordformat.firebasestorage.app",
  messagingSenderId: "1032920142000",
  appId: "1:1032920142000:web:0209ca27859db658676b75"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const sendMessage = async (text, user) => {
  await addDoc(collection(db, "messages"), {
    text,
    name: user.displayName,
    uid: user.uid,
    timestamp: serverTimestamp(),
  });
};

const listenForMessages = (callback) => {
  const q = query(collection(db, "messages"), orderBy("timestamp"));
  onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(msgs);
  });
};
