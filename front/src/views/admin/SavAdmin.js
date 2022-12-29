import { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "../../components/Chat/Chat";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function SavAdmin() {
  const [dispo, setDispo] = useState(false);
  const [numberWait, setNumberWait] = useState(0);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(false);
  const [idClient, setIdClient] = useState("");

  function activDispo() {
    socket.emit("sav:admin:new", dispo);
    setDispo(!dispo);
  }

  function acceptDemand(idUser) {
    socket.emit("sav:admin:accept", idUser);
    setChat(true);
    setIdClient(idUser);
  }

  socket.on("sav:admin:demand", ({ user, number_wait }) => {
    setNumberWait(number_wait);
    setUsers([...users, user]);
  });

  return (
    <div className="savAdmin">
      <h1>savAdmin</h1>
      {dispo ? (
        <button style={{ color: "red" }} onClick={activDispo}>
          Désactiver ma disponibilité
        </button>
      ) : (
        <button style={{ color: "green" }} onClick={activDispo}>
          Activer ma disponibilité
        </button>
      )}

      {dispo ? <p>Je suis dispo</p> : <p>Je suis absent</p>}

      <p>Il y a actuellement {numberWait} demande(s) en attente</p>
      <ul>
        {users.map((el) => (
          <li>
            <button onClick={() => acceptDemand(el.id)}>{el.username}</button>
          </li>
        ))}
      </ul>
      {chat && <Chat id={idClient} socket={socket} />}
    </div>
  );
}

export default SavAdmin;
