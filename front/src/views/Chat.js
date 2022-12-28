import { useState } from "react";
import io from "socket.io-client";
import Nav from "../components/Nav";

const Chat = (props) => {
  const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
  const socket = io(urlWS);
  const [message, setMessage] = useState("");
  socket.on("connect", () => {
    socket.on("disconnect", () => {});

    socket.emit("private-chat", {
      token: localStorage.getItem("token"),
      receiver: "user7",
    });
  });

  socket.on("new message", (data) => {
    console.log("new message", data);
  });

  const sendMessage = () =>
    socket.emit("message", {
      token: localStorage.getItem("token"),
      content: message,
      receiver: "user7",
    });

  return (
    <div>
      <Nav />
      <h1> Chatroom </h1>;
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>send message</button>
    </div>
  );
};

export default Chat;
