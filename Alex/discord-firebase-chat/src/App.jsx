import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";
import ChatRoom from "./components/ChatRoom";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <div className="App">
      <header>
        <h1>HangTime Chat</h1>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </header>
      {user ? <ChatRoom /> : <p>Please log in to join the conversation.</p>}
    </div>
  );
};

export default App;
