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

  socket.on("init_chatbot", (questions) => {
    setQuestions(questions);
  });

  function responseChatbot(el) {
    if (el.id === 0) {
      closeChatbot();
    }
    socket.emit("response_chatbot", el.id);
    setMessages([...messages, el]);
  }

  socket.on("response_chatbot", (questions) => {
    setQuestions(questions);
  });

  function closeChatbot() {
    socket.emit("close_chatbot");
    setQuestions([]);
    socket.on("close_chatbot", (msg) => {
      setMessages([...messages, msg]);
    });
    setTimeout(() => {
      setActiveChat(false);
      setMessages([]);
    }, 3000);
  }

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
