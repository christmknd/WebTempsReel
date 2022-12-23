import React, { useState, useEffect } from "react";

function Chat(props) {
  const [message, setMessage] = useState("");
  const messagesStatic = [
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
  const [messages, setMessages] = useState(messagesStatic);

  //   useEffect(() => {
  //     const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/messages/${props.id}`;
  //     fetch(urlHttp)
  //       .then((response) => response.json())
  //       .then((data) => setMessages(data.message))
  //       .catch((error) => console.error(error));
  //   }, []);

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  function handleSubmitMessage(e) {
    e.preventDefault();
    const obj = {
      id: messages.slice(-1)[0].id + 1,
      name: "toto",
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, obj]);
    setMessage("");
    // sendMessage(obj)
  }

  function sendMessage(data) {
    const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/messages/`;
        fetch(urlHttp, {
          method: 'POST',
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .catch((error) => console.error(error));
  }

  return (
    <div style={{ border: "solid", overflow: "scroll", height: "300px" }}>
      {props.id ? (
        <>
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
        </>
      ) : (
        <p> No user setected</p>
      )}
      <form onSubmit={handleSubmitMessage}>
        <input
          disabled={props.id ? false : true}
          type="text"
          placeholder="Write a message"
          style={{ width: "100%" }}
          value={message}
          onChange={handleChangeMessage}
        />
        <input
          disabled={props.id && message ? false : true}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
export default Chat;
