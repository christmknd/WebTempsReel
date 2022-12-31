import { useState } from "react";
import Chat from "../../components/Chat/Chat";
import { useOutletContext } from "react-router-dom";
import Dispo from "../../components/SavAdmin/Dispo";
import Demands from "../../components/SavAdmin/Demands";
import AdminsOnline from "../../components/SavAdmin/AdminsOnline";

function SavAdmin() {
  const [chat, setChat] = useState(false);
  const [idClient, setIdClient] = useState("");

  // Recupere la connexion socket depuis le context de Outlet
  const [socket] = useOutletContext();

  function acceptDemand(user) {
    socket.emit("sav:admin:accept", user.id);
    setChat(true);
    setIdClient(user.id);
  }

  return (
    <div className="savAdmin">
      <h1>Service Client</h1>
      <AdminsOnline />
      <Dispo />
      <Demands acceptDemand={acceptDemand} />
      {chat && <Chat id={idClient} socket={socket} />}
    </div>
  );
}

export default SavAdmin;
