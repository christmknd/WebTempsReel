import { useState } from "react";
import Nav from "../components/Nav";

import io from "socket.io-client";
import Chat from "../components/Chat/Chat";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function ServiceClient() {
  const [dispo, setDispo] = useState(false);
  const [chat, setChat] = useState(false);
  const [demandeSend, setDemandeSend] = useState(false);
  const [idSAV, setIdSAV] = useState("");

  socket.on("SAV-dispo", () => {
    console.log("Conseiller de vente disponible");
    setDispo(true);
  });

  socket.on("SAV-non-dispo", () => {
    console.log("Conseiller de vente indisponible");
    setDispo(false);
  });

  socket.on("SAV-accept", (idSAV) => {
    console.log("Conseiller de vente accepte la communication");
    setDemandeSend(false);
    setIdSAV(idSAV);
    setChat(true);
  });

  function demandeConseiller() {
    // const data = {
    //   id: "myIdClient",
    // };
    // const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/demandeConseiller???`;
    // fetch(urlHttp, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then(() => setDemandeSend(true))
    //   .catch((error) => console.error(error));
    setDemandeSend(true);
  }

  return (
    <div className="ServiceClient">
      <Nav />
      <h1>Service Client</h1>
      {!dispo && <p>Conseiller de vente indisponible pour le moment.</p>}
      {!demandeSend && !chat && (
        <button disabled={dispo ? false : true} onClick={demandeConseiller}>
          Demande de communication avec un conseiller de vente
        </button>
      )}
      {demandeSend && (
        <p>
          Demande de communication envoyé ! Veuillez patienter sur cette page.
        </p>
      )}
      {chat && <Chat id={idSAV} />}
    </div>
  );
}

export default ServiceClient;
