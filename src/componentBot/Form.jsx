import React, { useRef } from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const Form = ({ setChatHistory, botResponse, chatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = inputRef.current.value.trim();

    if (message) inputRef.current.value = "";

    setChatHistory((history) => [...history, { role: "user", text: message }]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      botResponse([
        ...chatHistory,
        {
          role: "user",
          text: `using the details provided above,please address the query ${message}.Keep your answer short and precise`,
        },
      ]);
    }, 600);
  };

  return (
    <>
      <form action="/" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="message-input"
          placeholder="Enter the prompt..."
          required
        ></input>
        <Button className="btn" icon={<SendOutlined />} shape="circle" />
      </form>
    </>
  );
};

export default Form;
