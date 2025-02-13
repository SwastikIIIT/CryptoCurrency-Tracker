import React, { useEffect, useState ,useRef} from "react";
import "../Chatbot.css"
import { Avatar ,Button} from "antd";
import { WechatFilled, WechatWorkOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import Form from "../componentBot/Form.jsx";
import Message from "../componentBot/Message.jsx";
import {cryptoDefault} from "../cryptoDefault.js";

const ChatBot = () => {

  const [chatHistory,setChatHistory]=useState([
    {
      hideinChat:true,
      role:"model",
      text:cryptoDefault
    }
  ]);

  const [show,setShow]=useState(false);
  const chatBodyRef=useRef()

  useEffect(() => {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: "smooth",
        })
  }, [chatHistory.length]);

  const updateHistory=(data)=>{
     setChatHistory((history)=>{
      const newArr=history.filter((item)=>( item.text!=='Thinking...'));
      return [...newArr,{role:'model',text:data}];
    }
    )
  }

  const botResponse=async(history)=>{
  
    history=history.map(({role,text})=>({role,parts:[{text}]}));
     
    const headerData={
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({contents:history}),
     };

    // console.log(headerData); 
    // console.log(history); 

   try{
      const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAr9Azi0PGIadM9oMAfuytqNw92gdSSfQo',headerData);
      try
      {
        const resText=await res.json();
        const apiRes=resText.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
        updateHistory(apiRes);
        // console.log(resText);
      }
      catch(error)
      {
        console.log("Erroor in parsing:",error);
      }

   }
   catch(error)
   {
     console.log("Error in fetching:",error);
   }

  }
  console.log(show);
  return (
    <div className={`container ${show===true?"show-chatbot":""}`}>
     <button className="popupBtn" onClick={()=>setShow(!show)}>
     <Avatar
              style={{ color: "white", backgroundColor: "rgb(36, 36, 112)" }}
              icon={<WechatWorkOutlined />}
              size={50}/>
      </button>
      <div className="popup">
        <div className="chat-header">
          {/* ChatBot header */}
          <div className="header-info">
            <Avatar
              style={{ backgroundColor: "white", color: "rgb(36, 36, 112)" }}
              icon={<WechatWorkOutlined />}
              size={40}
            />
            <h2 className="logo-text">Chatbot</h2>
          </div>
           <DownOutlined
           onClick={()=>setShow(!show)}
            style={{ color: "white", fontSize: "1.2rem", cursor: "pointer" }}
          />
        </div>
        {/* chatbot body */}
        <div className="chat-body" ref={chatBodyRef}>
          <div className="message bot-message">
            <Avatar
              icon={<WechatWorkOutlined />}
              size={40}
              style={{ color: "white", backgroundColor: "rgb(36, 36, 112)" }}
            />
            <p className="message-text">Hey there,how can i help u?</p>
          </div>
          
          {chatHistory.map((item,i)=>
          <Message key={i} chat={item}/>
          )}
         
        </div>
        <div className="chat-footer">
            <Form setChatHistory={setChatHistory} botResponse={botResponse} chatHistory={chatHistory}/>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
