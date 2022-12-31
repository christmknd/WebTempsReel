import { useEffect, useState } from "react";
import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);
const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);

  const updateMessages = (newMessage) => {
    setMessages((messages) => [...messages, newMessage]);
  };

  const joinRoom = (roomName) => {
    socket.emit("join-room", {
      token: localStorage.getItem("token"),
      room: roomName,
    });
  };

  const leaveRoom = () => {
    socket.emit("leave-room", {
      token: localStorage.getItem("token"),
      room: activeRoom,
    });
    setActiveRoom(null);
  };

  const sendMessage = () => {
    socket.emit("message", {
      token: localStorage.getItem("token"),
      content: message,
      room: activeRoom,
    });
    setMessage("");
  };

  socket.on("joined-room", (data) => {
    setActiveRoom(data);
  });

  useEffect(() => {
    socket.emit("get-rooms");

    socket.on("rooms", (data) => {
      setRooms(data);
    });

    socket.on("new-message", (data) => {
      data ? updateMessages(data) : console.log("no data");
    });

    socket.on("room-event", (data) => {
      setMessages((messages) => [
        ...messages,
        { action: data.action, username: data.username },
      ]);
    });

    socket.on("error-message", (data) => {
      setErrorMessage(data);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    });

    socket.on("room-transfer", (data) => {
      setMessages((messages) => [
        ...messages,
        { action: data.action, newRoom: data.newRoom },
      ]);
      setActiveRoom(data.newRoom);
    });

    socket.on("room-delete", () => {
      setMessages((messages) => [...messages, { action: "delete" }]);
      setInputDisabled(true);
      setTimeout(() => {
        setMessages([]);
        setActiveRoom(null);
        setInputDisabled(false);
      }, 5000);
    });
  }, []);

  return (
    <>
      <div
        style={{
          padding: "50px",
        }}
      >
        {/* {JSON.stringify(messages, null, 2)} */}
        <h1> Chatroom </h1>
        {!activeRoom && (
          <div>
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Available rooms
            </p>
            <div>
              {rooms?.map((room) => (
                <>
                  <button onClick={() => joinRoom(room.name)}>
                    {room.name} ({room.usersNumber}/{room.maxUsers})
                  </button>
                </>
              ))}
            </div>
            <div>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* chat space */}

        {activeRoom && (
          <>
            <button onClick={() => leaveRoom()}>Leave Room</button>
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
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "40px",
                  }}
                >
                  {activeRoom}
                </span>
              </div>
              {/* chat conversation */}
              <div
                style={{
                  height: "calc(62vh - 150px)",
                  width: "100%",
                  position: "relative",
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
                  {messages?.map((message) => (
                    <>
                      {message.action ? (
                        message.action == "transfer" ||
                        message.action == "delete" ? (
                          message.action == "transfer" ? (
                            <div>
                              <p style={{ fontStyle: "italic", color: "gray" }}>
                                Your current room has been transfered to "
                                {message.newRoom}"
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p style={{ fontStyle: "italic", color: "gray" }}>
                                Your current room will has been deleted. You will get redirected in 5 seconds...
                              </p>
                            </div>
                          )
                        ) : (
                          <div>
                            <p style={{ fontStyle: "italic", color: "gray" }}>
                              {message.username} has {message.action}
                            </p>
                          </div>
                        )
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            width: "90%",
                            justifyContent:
                              message.sender ===
                              localStorage.getItem("username")
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
                              {message.sender ===
                              localStorage.getItem("username")
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
                      )}
                    </>
                  ))}
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
                    disabled={inputDisabled}
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
          </>
        )}
      </div>
    </>
  );
};

export default ChatRoom;
