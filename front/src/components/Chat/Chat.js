import React, { useState, useEffect } from "react";

function Chat(props) {
  //   const [messages, setMessages] = useState("");

  //   useEffect(() => {
  //     const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/messages/${props.id}`;
  //     fetch(urlHttp)
  //       .then((response) => response.json())
  //       .then((data) => setMessages(data.message))
  //       .catch((error) => console.error(error));
  //   }, []);

  const messages = props.id && [
    {
      id: 1,
      name: "toto",
      text: "Hello",
      time: "10:50",
    },
    {
      id: 2,
      name: "tata",
      text: "Hey",
      time: "10:52",
    },
    {
      id: 3,
      name: "toto",
      text: "Good ?",
      time: "11:00",
    },
    {
      id: 4,
      name: "toto",
      text: "Fine",
      time: "11:01",
    },
  ];

  return (
    <div style={{ border: "solid", overflow: "scroll", height: "300px" }}>
      {props.id ? (
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
      ) : (
        <p> No user setected</p>
      )}
    </div>
  );
}
export default Chat;
