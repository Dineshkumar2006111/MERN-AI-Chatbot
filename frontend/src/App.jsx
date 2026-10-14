import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import ReactMarkdown from "react-markdown";

function App() {
  const API_URL = "http://localhost:8000/api/chat";
  const [message,setmessage]= useState([
    {
      role : "Assistant",
      content : "Hello! I am your AI assistant. How can I help you?"
    }
  ]) 

  const [input,setinput]= useState("")
  const [isload,setisload]=useState(false)

  const handlesend=async()=>{
    if(!input.trim() || isload) return ;

    const usermsg = {
      role : "user",
      content : input
    }

    setmessage((oldmsg)=>[...oldmsg,usermsg])
    setinput("")
    setisload(true)

    try{

      const response = await fetch(API_URL,{method:"POST",
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify({message : usermsg.content})
      })

      const data = await response.json();

      const aimsg = {
        role : "Assistant",
        content : data.reply
      }

      setmessage((oldmsg)=>[...oldmsg,aimsg])
      

    }catch(err){
      setmessage((oldmsg)=>[...oldmsg,{
        role : "Assistant",
        content : "Error : "+err.message
      }])
    }finally {
      setisload(false);
    }
  }

  useEffect(()=>{
    console.log(message)
  },[message])

  const handlekey =(event)=>{
    if(event.key === "Enter"){
      handlesend()
    }
  }

  const handleclear = ()=>{
    setmessage((oldmsg)=>[{
      role : "Assistant",
      content : "Hello! I am your AI assistant. How can I help you?"
    }])
  }

  return (
    <>
    <div id='app'>
      <nav>
        <strong>AI CHAT APP</strong>

        <button onClick={handleclear}>Clear chat</button>
      </nav>
      <div id='chatplace'>
        {message.map((msg,index)=>(
          <div className={`message ${msg.role}`} key={index}>
            <strong>{msg.role==="user"?"You":"AI"}</strong>
            <p><ReactMarkdown>
    {msg.content}
</ReactMarkdown></p>
          </div>
        ))}
        {isload &&
        <div className='message Assistant'>
          <strong>AI</strong>
          <p>Thinking...</p>
        </div>  
      }
      </div>
      <div id='input-area'>
        <input type="text" value={input} onChange={(e)=>{setinput(e.target.value)}} onKeyDown={handlekey}  placeholder='Ask anything...'/>
        {isload?<button>Sending...</button>:<button onClick={()=>{handlesend()}}>Send</button>}
      </div>
    </div>
      
    </>
  )
}

export default App
