import { useState } from "react";
import Chat from "../../components/Chat/Chat";
import ListUsers from "../../components/Chat/ListUsers";

function ChatRoom() {
  const [idUserSelected, setIdUserSelected] = useState("");

  function selectUser(id) {
    setIdUserSelected(id);
  }

  return (
    <div className="ChatRoom">
      <h1>ChatRoom</h1>
      <ListUsers selectUser={selectUser} />
      <Chat id={idUserSelected} />
    </div>
  );
}

export default ChatRoom;
