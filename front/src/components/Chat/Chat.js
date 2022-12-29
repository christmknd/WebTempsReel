import React, { useState } from "react";

function Chat(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = props.socket;
  const idUserToSend = props.id;

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  function handleSubmitMessage(e) {
    e.preventDefault();
    const obj = {
      id: messages.length + 1,
      name: localStorage.getItem("username"),
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, obj]);
    setMessage("");
    sendMessage(obj);
  }

  function sendMessage(data) {
    socket.emit("send:message", idUserToSend, data);
  }

  socket.on("send:message", (idSender, message) => {
    setMessages([...messages, message]);
  });

  return (
    <div style={{ border: "solid", overflow: "scroll", height: "300px" }}>
      <ul
        style={{
          listStyle: "none",
        }}
      >
        {messages.map((el) => (
          <li style={{ background: "grey" }} key={el.id}>
            <p>{el.name}</p>
            <p>{el.text}</p>
            <p>{el.time}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitMessage}>
        <input
          disabled={props.id ? false : true}
          type="text"
          placeholder="Write a message"
          style={{ width: "100%" }}
          value={message}
          onChange={handleChangeMessage}
        />
        <input disabled={message ? false : true} type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default Chat;
