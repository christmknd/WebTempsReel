import { useState } from "react";
import Nav from "../components/Nav";

import io from "socket.io-client";
import Chat from "../components/Chat/Chat";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function ServiceClient() {
  const [dispo, setDispo] = useState(false);
  const [chat, setChat] = useState(false);

  socket.on("SAV-dispo", () => {
    console.log("Conseiller de vente disponible");
    setDispo(true);
  });

  socket.on("SAV-non-dispo", () => {
    console.log("Conseiller de vente indisponible");
    setDispo(false);
  });

  function openChat() {
    setChat(true);
  }

  return (
    <div className="ServiceClient">
      <Nav />
      <h1>Service Client</h1>
      {!dispo && <p>Conseiller de vente indisponible pour le moment.</p>}
      <button disabled={dispo ? false : true} onClick={openChat}>
        Communiquer avec un conseiller de vente
      </button>
      {chat && <Chat id={3} />}
    </div>
  );
}

export default ServiceClient;
