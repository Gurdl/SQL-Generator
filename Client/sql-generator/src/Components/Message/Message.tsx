import React from 'react'
import "./Message.css"
interface userMessageType {
  role: string;
  content: string;
}
interface UserMessageProps{
  userMessage:userMessageType
}
function Message({userMessage}:UserMessageProps) {
  return (
    <div className='message'>
      <p id="icon">&#8858;</p>
      <p>{userMessage.content}</p>
    </div>
  )
}

export default Message
