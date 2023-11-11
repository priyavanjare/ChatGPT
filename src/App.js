
import './App.css';
import logo from "./assets/chatgpt.svg";
import add from "./assets/add-30.png"
import msgIcon from "./assets/message.svg"
import home from "./assets/home.svg"
import saved from "./assets/bookmark.svg"
import rocket from "./assets/rocket.svg"
import send from "./assets/send.svg"
import userIcon from "./assets/user-icon.png"
import gptImgLogo from "./assets/chatgptLogo.svg"
import { sendMsgToOpenApi } from './openai';
import { useRef, useState,useEffect } from 'react';

function App() {
  const msgEnd = useRef(null)
  const[input,setInput]=useState("")
  const[message,setMessage]=useState([
    {
      text:"Hi, I am ChatGPT, a state-of-the-art language model developed by openAI.I am designed to understand and generate human-like text based on the input i receive. You can ask me question, have conversation, seek information, or even request assistance with various tasks. Just let me know how i can help you!",
      isBot:true,
    }
  ])
  const handleInput = async()=>{
    const text = input
    setInput("")
    setMessage([...message,
       {text,isBot:false}
    ])

    const res = await sendMsgToOpenApi(text)
    setMessage([...message,
      {text,isBot:false},
      {text:res,isBot:true}
    ])
  }
  
  const handleSend = async(e)=>{
    if(e.key === "Enter"){
     await handleInput()
    }
   } 
  useEffect(()=>{
    msgEnd.current.scrollIntoView()
  },[message])

  const handleQuery =async(e)=>{
    const text = e.target.value 
    setMessage([...message,
       {text,isBot:false}
    ])
    const res = await sendMsgToOpenApi(text)
    setMessage([...message,
      {text,isBot:false},
      {text:res,isBot:true}
    ])
  }
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperside-top">
            <img src={logo} className='logo' alt=''/><span className='brand'>ChatGPT</span>
          </div>
          <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={add} className='addBtn' alt=''/>New Chat</button>
          <div className="upperside-bottom">
            <button className='query' onClick={handleQuery} value={"What is programming?"} ><img src={msgIcon} alt=''/>What is programming?</button><br/>
            <button className='query'onClick={handleQuery} value={"How to use API?"} ><img src={msgIcon} alt=''/>How to use API?</button>
          </div>
        </div>
        <div className="lowerSide">
          <div className='listItems'><img src={home} alt='' className='listItemsImg'/>Home</div>
          <div className='listItems'><img src={saved} alt='' className='listItemsImg'/>Saved</div>
          <div className='listItems'><img src={rocket} alt='' className='listItemsImg'/>Upgrade to pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
         
        {message.map((message,i)=>{
          return <div key={i} className={message.isBot?"chat bot":"chat"}>
                 <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
          </div>
        })}
        <div ref={msgEnd}></div>

        </div>
        
        <div className="chatFooter">
          <div className="inp">
            <input value={input} onKeyDown={handleSend} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder='send a message' /><button onClick={handleInput} className="send"><img src={send} alt="" /></button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts.ChatGPT Agust 20 version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
