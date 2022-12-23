import { useState } from "react";
import Chat from "../components/Chat/Chat";
import ListUsers from "../components/Chat/ListUsers";
import Nav from "../components/Nav";

function ChatRoom() {
  const [idUserSelected, setIdUserSelected] = useState('')

  function selectUser(id) {
    setIdUserSelected(id)
  }

  return (
    <div className="ChatRoom">
      <Nav />
      <h1>ChatRoom page</h1>
      <ListUsers selectUser={selectUser}/>
      <Chat id={idUserSelected}/>
    </div>
  );
}

export default ChatRoom;
