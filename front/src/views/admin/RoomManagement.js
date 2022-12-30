import { useState, useEffect } from "react";
import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [roomNameInput, setRoomNameInput] = useState("");
  const [newRoomNameInput, setNewRoomNameInput] = useState("");
  const [roomMaxUsersInput, setRoomMaxUsersInput] = useState(2);
  const [newRoomMaxUsersInput, setNewRoomMaxUsersInput] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const addRoom = () => {
    socket.emit("add-room", {
      name: roomNameInput,
      maxUsers: roomMaxUsersInput,
    });
    setRoomNameInput("");
    setRoomMaxUsersInput(2);
  };

  const updateRoom = () => {
    socket.emit("update-room", {
      name: selectedRoom.name,
      newName: newRoomNameInput,
      maxUsers: newRoomMaxUsersInput,
    });
    setNewRoomNameInput("");
    setNewRoomMaxUsersInput(2);
    setSelectedRoom(null);
  }

  const deleteRoom = (roomName) => {
    socket.emit("delete-room", selectedRoom.name);
    setSelectedRoom(null);
  }

  const toggleSelectedRoom = (roomName) => {
    const room = rooms.find((room) => room.name === roomName);
    if (room === selectedRoom) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom(room);
    }
  };
  socket.on("rooms", (data) => {
    setRooms(data);
  });

  useEffect(() => {
    socket.emit("get-rooms");
  }, []);

  return (
    <div className="roomManagement">
      <h1>Room Management</h1>
      <div>
        <div>
          <h2>Rooms</h2>
          {rooms?.map((room) => (
            <>
              <button
                id={room.name}
                onClick={() => toggleSelectedRoom(room.name)}
                style={
                  room === selectedRoom
                    ? { backgroundColor: "skyblue", color: "white" }
                    : {}
                }
              >
                {room.name} ({room.usersNumber}/{room.maxUsers})
              </button>
            </>
          ))}
        </div>
        {selectedRoom && (
          <div id="selectedRoomOptions">
            <h2>Room options</h2>
            <div id="updateName">
              <input
                type="text"
                placeholder="New room name"
                value={newRoomNameInput}
                onChange={(e) => setNewRoomNameInput(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max users"
                value={newRoomMaxUsersInput}
                onChange={(e) => setNewRoomMaxUsersInput(e.target.value)}
                style={{ width: "50px" }}
              />
              <button onClick={() => updateRoom()}>Update</button>
            </div>
            <div id="deleteRoom" style={{ marginTop: "3px" }}>
              <button
                onClick={() => deleteRoom()}
                style={{ backgroundColor: "firebrick", color: "white" }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-white">Create Room</h2>
        <input
          type="text"
          placeholder="Room name"
          value={roomNameInput}
          onChange={(e) => setRoomNameInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max users"
          value={roomMaxUsersInput}
          onChange={(e) => setRoomMaxUsersInput(e.target.value)}
          style={{ width: "50px" }}
        />
        <button onClick={() => addRoom()}>Create</button>
      </div>
    </div>
  );
}

export default RoomManagement;
