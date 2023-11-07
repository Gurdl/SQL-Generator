import React from "react";
import Message from "../Message/Message";
import "./Messages.css";
interface userMessage {
  role: string;
  content: string;
}
interface MessagesDisplayProps {
  userMessages: userMessage[];
}
export default function MessagesDisplay({
  userMessages,
}: MessagesDisplayProps) {
  return (
    <div className="Messages">
      {userMessages.map((userMessage,index) => (
        <Message key={index} userMessage={userMessage}></Message>
      ))}
    </div>
  );
}
