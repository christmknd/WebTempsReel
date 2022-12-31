import { useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import { useOutletContext } from "react-router-dom";

function Sav() {
  const [dispo, setDispo] = useState(false);
  const [demandeSend, setDemandeSend] = useState(false);
  const [declineDemand, setDeclineDemand] = useState(false);
  const [nbrClientAttente, setNbrClientAttente] = useState(0);
  const [chat, setChat] = useState(false);
  const [idSAV, setIdSAV] = useState("");

  // Recupere la connexion socket depuis le context de Outlet
  const [socket] = useOutletContext();

  // Ping le nombre d'admin à mon arrivé
  useEffect(() => {
    socket.emit("sav:admin:count");
  }, []);

  // Ecoute le nombre d'admin actif
  socket.on("sav:admin:count", (admins_online) => {
    if (admins_online > 0) {
      setDispo(true);
    } else {
      setDispo(false);
      setDemandeSend(false);
      setChat(false);
      setDeclineDemand(false);
    }
  });

  // Demande de communication à Admin
  function demandeConseiller() {
    socket.emit("sav:demand", true, localStorage.getItem("username"));
    setDemandeSend(true);
  }

  // Ecoute le nombre de demande de communication
  socket.on("sav:demand:count", (client_wait) => {
    setNbrClientAttente(client_wait);
  });

  // Ecoute la reponse de la demande
  // Si idAdmin exits = demande accepter
  // Sinon = demande decliner
  socket.on("sav:reponse", (idAdmin) => {
    if (idAdmin) {
      setIdSAV(idAdmin);
      setChat(true);
    } else setDeclineDemand(true);
    setDemandeSend(false);
    socket.emit("sav:demand", false, localStorage.getItem("username"));
  });

  return (
    <div
      className="Sav"
      style={{ border: "solid", margin: "10px", padding: "10px" }}
    >
      {!dispo ? (
        <p>Conseiller de vente indisponible pour le moment.</p>
      ) : (
        <p>Conseiller de vente disponible !</p>
      )}
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
      {declineDemand && (
        <p>Votre demande a été rejetté par un de nos conseillers.</p>
      )}
      {chat && <Chat id={idSAV} socket={socket} />}
    </div>
  );
}

export default Sav;
