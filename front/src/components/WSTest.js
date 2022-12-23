import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";

import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function WSTest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/message`;
    fetch(urlHttp)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error(error));
  }, []);

  socket.on("connect", () => {
    console.log("Connected to the socket");
    var inputName = document.getElementById("MyIDSocket");
    inputName.innerText = `My ID socket ${socket.id}`;
  });

  return (
    <div className="WSTest">
      <Nav />
      <p id="MyIDSocket"></p>
      {`You receive ${message} message`}
      <script src="/socket.io/socket.io.js"></script>
    </div>
  );
}

export default WSTest;
