import { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat/Chat";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function Sav() {
  const [dispo, setDispo] = useState(true);
  const [demandeSend, setDemandeSend] = useState(false);
  const [nbrClientAttente, setNbrClientAttente] = useState(0);
  const [chat, setChat] = useState(false);
  const [idSAV, setIdSAV] = useState("");

  useEffect(() => {
    socket.emit("sav:admin:count");
  }, []);

  socket.on("sav:admin:count", (admins_online) => {
    if (admins_online > 0) {
      console.log("Conseiller de vente disponible");
      setDispo(true);
    } else {
      console.log("Conseiller de vente indisponible");
      setDispo(false);
    }
  });

  function demandeConseiller() {
    socket.emit("sav:demand");
    setDemandeSend(true);
  }

  socket.on("sav:demand", (client_wait) => {
    setNbrClientAttente(client_wait);
  });

  // TODO
  // socket.on("sav:accept", (idSAV) => {
  //   console.log("Conseiller de vente accepte la communication");
  //   setDemandeSend(false);
  //   setIdSAV(idSAV);
  //   setChat(true);
  // });

  return (
    <div className="Sav">
      {!dispo && <p>Conseiller de vente indisponible pour le moment.</p>}
      {!demandeSend && !chat && (
        <button disabled={dispo ? false : true} onClick={demandeConseiller}>
          Demande de communication avec un conseiller de vente
        </button>
      )}
      {demandeSend && (
        <>
          <p>
            Demande de communication envoyé ! Veuillez patienter sur cette page.
          </p>
          <p>Il y a {nbrClientAttente} demande(s) en attente</p>
        </>
      )}
      {chat && <Chat id={idSAV} />}
    </div>
  );
}

export default Sav;
