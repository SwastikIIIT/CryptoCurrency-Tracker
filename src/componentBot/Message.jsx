import React from 'react'
import { Avatar } from "antd";
import { WechatWorkOutlined } from "@ant-design/icons";


const UserMessage = ({chat}) => {
  return (
      !chat.hideinChat &&
    <div className={`message ${chat.role==='model'?'bot':'user'}-message`}>
    {chat.role==='model' &&  <Avatar
              icon={<WechatWorkOutlined />}
              size={40}
              style={{ color: "white", backgroundColor: "rgb(36, 36, 112)" }}
            />}
    <p className="message-text">{chat.text}</p>
  </div>
  )
}

export default UserMessage