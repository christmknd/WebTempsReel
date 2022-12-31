import { useEffect, useState } from "react";
import io from "socket.io-client";
// geting username from query params
import { useSearchParams, useOutletContext } from "react-router-dom";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);
const PrivateChat = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [queryParameters] = useSearchParams();
  const [currentUser, setCurrentUser] = useState("");
  const receiver = queryParameters.get("user");
  const [notmoving, setNotmoving] = useState(false);

  const [socket] = useOutletContext();

  socket.emit("private-chat", {
    token: localStorage.getItem("token"),
    receiver: receiver,
  });

  const loadUserList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    setUsers(
      data.filter(
        (user) =>
          user.role?.toLowerCase() === "user" &&
          user.username !== localStorage.getItem("username")
      )
    );
  };

  useEffect(() => {
    setCurrentUser(localStorage.getItem("username"));
    loadUserList();
  }, []);

  useEffect(() => {
    socket.on("new-private-message", (data) => {
      if (data) {
        setMessages((messages) => [...messages, data]);
      }
    });
  }, [notmoving]);

  const sendMessage = () => {
    socket.emit("private-message", {
      token: localStorage.getItem("token"),
      content: message,
      receiver: receiver,
    });
    setMessage("");
  };
  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      {/* {JSON.stringify(messages, null, 2)} */}
      <h1> Private chat </h1>
      Welcome to your private chat{" "}
      <strong
        style={{
          fontWeight: "bold",
          color: "#007bff",
        }}
      >
        {currentUser}
      </strong>
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Available users
      </p>
      <div
        style={{
          display: "flex",
        }}
      >
        {users.map((user) => (
          <p
            style={{
              fontWeight: "bold",
              margin: "10px",
              borderRadius: "5px",
              color: "#555",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#F9F9F9",
              boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#F2F2F2",
                boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)",
              },
              paddingRight: "35px",
            }}
            key={user.id}
            onClick={() => {
              window.location.href = `/private-chat?user=${user.username}`;
            }}
          >
            <img
              src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              alt="avatar"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                padding: "10px",
                margin: "10px",
              }}
            />
            <span>{user?.username}</span>
          </p>
        ))}
      </div>
      {/* chat space */}
      {receiver && (
        <div
          style={{
            height: "62vh",
            marginTop: "20px",
            // backgroundColor: "red",
            borderRadius: "40px",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              height: "150px",
              backgroundColor: "#1474E5",
              borderRadius: "40px 40px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
              alt="avatar"
              style={{
                width: "82px",
                height: "82px",
                borderRadius: "50%",
                padding: "10px",
              }}
            />
            <span style={{ color: "white", fontWeight: "bold" }}>
              {receiver}
            </span>
          </div>
          {/* chat conversation */}
          <div
            style={{
              height: "calc(62vh - 150px)",
              width: "100%",
              position: "relative",
              // backgroundColor: "red",
            }}
          >
            {/* messages container */}

            <div
              style={{
                height: "70%",
                width: "97%",
                overflowY: "scroll",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingLeft: "100px",
              }}
            >
              {messages?.map(
                (message, index) =>
                  index % 2 === 0 && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          width: "90%",
                          justifyContent:
                            message.sender === localStorage.getItem("username")
                              ? "flex-start"
                              : "flex-end",
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#000",
                              marginBottom: "10px",
                            }}
                          >
                            {message.sender === localStorage.getItem("username")
                              ? "you"
                              : message.sender}
                          </span>
                          <div
                            style={{
                              backgroundColor:
                                message.sender ===
                                localStorage.getItem("username")
                                  ? "#1474E5"
                                  : "#999",
                              borderRadius: "40px",
                              padding: "10px",
                              width: "fit-content",
                              maxWidth: "60%",
                              marginBottom: "10px",
                              marginTop: "7px",
                              color: "white",
                            }}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </>
                  )
              )}
            </div>

            <div
              style={{
                position: "absolute",
                width: "90%",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgrounColor: "red",
              }}
            >
              <input
                value={message}
                placeholder="Type a message"
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  borderRadius: "40px",
                  border: "none",
                  outline: "none",
                  padding: "10px",
                  fontSize: "20px",
                  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)",
                  width: "95%",
                  height: "40px",

                  // position: "absolute",

                  paddingLeft: "50px",
                  // change text color
                  color: "#555",
                }}
              />

              <img
                src="https://cdn-icons-png.flaticon.com/512/3682/3682321.png"
                alt="send"
                style={{
                  width: "30px",
                  height: "30px",
                  position: "absolute",
                  bottom: "15.5px",
                  right: "2.7%",
                  cursor: "pointer",
                }}
                onClick={sendMessage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateChat;
