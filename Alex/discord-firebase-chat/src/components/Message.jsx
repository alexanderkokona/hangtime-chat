// src/components/Message.jsx
import React from "react";
import { auth } from "../firebase";

const Message = ({ message }) => {
  const isUser = message.uid === auth.currentUser?.uid;
  return (
    <div className={`message ${isUser ? "user" : "guest"}`}>
      <p><strong>{message.name}:</strong> {message.text}</p>
    </div>
  );
};

export default Message;
