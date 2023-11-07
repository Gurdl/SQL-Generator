import React,{useState} from "react";
import "./App.css";
import CodeDisplay from "./Components/CodeDisplay/CodeDisplay";
import MessagesDisplay from "./Components/Messages/MessagesDisplay";

interface chatData{
   role:string,
   content:string
}
function App() {
  const [value, setValue]=useState<string>("");
  const [chat,setChat]=useState<chatData[]>([]);
  const [loader,setLoader]=useState<boolean>(false);
  const getQuery = async () => 
  {
    try {
      setLoader(true);
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      const userMessage={
        role:"user",
        content:value
      }
      setChat((oldChat)=>[...oldChat,userMessage,data]);
      setValue("");
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
  const clearChats=()=>{
    setValue("");
    setChat([]);
  }
  
  const userMessages=chat.filter(message=>message.role==='user');
  const chatResponse=chat.filter(message=>message.role==='assistant').pop();
  return (
    
    <div className="App">
      <MessagesDisplay userMessages={userMessages}></MessagesDisplay>
      <input value={value} onChange={e=>setValue(e.target.value)}></input>
      <CodeDisplay loader={loader} text={chatResponse?.content || " "}></CodeDisplay>
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          {" "}
          Get Query!
        </button>
        <button id="clear-chats" onClick={clearChats}> Clear-Chats</button>
      </div>
    </div>
  );
}

export default App;
