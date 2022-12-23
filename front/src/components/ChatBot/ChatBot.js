import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeChat, setActiveChat] = useState(false);

  function activeChatbot() {
    socket.emit("init_chatbot");
    setActiveChat(true);
  }

  socket.on("init_question", (questions) => {
    setQuestions(questions);
  });

  function responseChatbot(el) {
    socket.emit("response_chatbot", el.id);
    setMessages([...messages, el]);
  }

  socket.on("close_chatbot", (msg) => {
    setMessages([...messages, msg]);
    setQuestions([]);
    setTimeout(() => {
      setActiveChat(false);
      setMessages([]);
    }, 3000);
  });

  socket.on("resp_contact", (el) => {
    setMessages([...messages, el.resp]);
    setQuestions(el.question);
  });

  return (
    <div className="ChatBot" style={{ border: "solid" }}>
      {activeChat ? (
        <ul>
          {messages.map((el, i) => (
            <li key={i}>{el.question}</li>
          ))}
          {questions.map((el) => (
            <button onClick={() => responseChatbot(el)} key={el.id}>
              {el.question}
            </button>
          ))}
        </ul>
      ) : (
        <button onClick={activeChatbot}>Chatbot</button>
      )}
    </div>
  );
}

export default ChatBot;
