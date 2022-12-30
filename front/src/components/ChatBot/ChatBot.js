import React, { useState } from "react";
import FormDateEntretien from "./FormDateEntretien";
import FormNbrKlm from "./FormNbrKlm";
import { useOutletContext } from "react-router-dom";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeChat, setActiveChat] = useState(false);
  const [input, setInput] = useState("");
  const [upChatBot, setUpChatBot] = useState(false);

  // Recupere la connexion socket depuis le context de Outlet
  const [socket] = useOutletContext();

  // connect WS
  socket.on("connect", () => {
    setUpChatBot(true);

    socket.on("disconnect", () => {
      setUpChatBot(false);
      setMessages([]);
      setQuestions([]);
      setActiveChat(false);
      setInput("");
    });
  });

  // Init principal question
  // Certains cas Form
  socket.on("chatbot:questions", (arr_questions) => {
    // Custom for Form
    if (arr_questions[0].id === 11 || arr_questions[0].id === 130) {
      if (arr_questions[0].id === 11) {
        setInput(<FormDateEntretien returnFormObj={returnFormObj} />);
      } else if (arr_questions[0].id === 130) {
        setInput(<FormNbrKlm returnFormObj={returnFormObj} />);
      }
      setMessages([...messages, arr_questions[0]]);
      setQuestions([]);
    } else {
      setQuestions(arr_questions);
    }
  });

  // Retour custom contact
  socket.on("chatbot:reponses:contact", (el) => {
    setMessages([...messages, el.resp]);
    setQuestions(el.text);
  });

  // Close chatbot
  socket.on("chatbot:close", (msg) => {
    setMessages([...messages, msg]);
    setQuestions([]);
    setTimeout(() => {
      setActiveChat(false);
      setMessages([]);
    }, 3000);
  });

  function activeChatbot() {
    socket.emit("chatbot:questions");
    setActiveChat(true);
  }

  function responseChatbot(el) {
    setMessages([...messages, el]);
    socket.emit("chatbot:reponses", el.id);
    setQuestions([]);
  }

  function returnFormObj(obj) {
    responseChatbot(obj);
    setInput("");
  }

  return (
    <div
      className="ChatBot"
      style={{ border: "solid", margin: "10px", padding: "10px" }}
    >
      {activeChat ? (
        <ul>
          {messages.map((el, i) => (
            <li key={i}>{el.text}</li>
          ))}
          {questions.map((el, i) => (
            <button onClick={() => responseChatbot(el)} key={i}>
              {el.text}
            </button>
          ))}
          {input}
        </ul>
      ) : (
        <div>
          <button disabled={!upChatBot} onClick={activeChatbot}>
            Chatbot
          </button>
        </div>
      )}
      {upChatBot ? <p>Online</p> : <p>Offline</p>}
    </div>
  );
}

export default ChatBot;
