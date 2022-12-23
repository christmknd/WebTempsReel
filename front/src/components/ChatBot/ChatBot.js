import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeChat, setActiveChat] = useState(false);
  const [inputDate, setInputDate] = useState(false);
  const [dateEntretien, setDateEntretien] = useState("");

  function activeChatbot() {
    socket.emit("init_chatbot");
    setActiveChat(true);
  }

  socket.on("init_question", (questions) => {
    if (questions[0].id === 11 || questions[0].id === 13) {
      setInputDate(true);
      setMessages([...messages, questions[0]]);
      setQuestions([]);
    } else setQuestions(questions);
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

  function handleChangeDate(e) {
    setDateEntretien(e.target.value);
  }

  function handleSubmitDate(e) {
    e.preventDefault();
    let obj;
    // Calcul date
    const dateNow1yearAgo = 1000 * 60 * 60 * 24 * 365 * 1;
    if (
      new Date(dateEntretien).getTime() <
      new Date().getTime() - dateNow1yearAgo
    ) {
      obj = { id: 12, question: `${dateEntretien} - date du dernier entretien est supérieur à un an` };
    } else {
      obj = { id: 13, question: `${dateEntretien} - date du dernier entretien est inférieur à un an` };
    }
    setMessages([...messages, obj]);
    setInputDate(false)
    setDateEntretien("");
    responseChatbot(obj);
  }

  return (
    <div className="ChatBot" style={{ border: "solid" }}>
      {activeChat ? (
        <ul>
          {messages.map((el, i) => (
            <li key={el.id}>{el.question}</li>
          ))}
          {questions.map((el) => (
            <button onClick={() => responseChatbot(el)} key={el.id}>
              {el.question}
            </button>
          ))}
          {inputDate && (
            <form onSubmit={handleSubmitDate}>
              <input
                type="date"
                value={dateEntretien}
                onChange={handleChangeDate}
              />
              <input type="submit" value="Submit" />
            </form>
          )}
        </ul>
      ) : (
        <button onClick={activeChatbot}>Chatbot</button>
      )}
    </div>
  );
}

export default ChatBot;
