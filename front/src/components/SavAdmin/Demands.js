import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Demands(props) {
  const [numberWait, setNumberWait] = useState(0);
  const [users, setUsers] = useState([]);

  // Recupere la connexion socket depuis le context de Outlet
  const [socket] = useOutletContext();

  // Ecoute le nombre de demande de communication
  socket.on("sav:demand:count", (number_wait) => {
    setNumberWait(number_wait);
  });

  // Ecoute le nouvel user qui fait la demande
  socket.on("sav:admin:demand:user", (user) => {
    const users_whitout_user = users.filter((el) => el.id !== user.id);
    // Retirer User de la liste d'attente
    if (users_whitout_user.length < users.length) {
      setUsers(users_whitout_user);
    } // Ajoute User à la liste d'attente
    else {
      setUsers([...users, user]);
    }
  });

  function declineDemand(user) {
    socket.emit("sav:admin:decline", user.id);
  }

  return (
    <div
      className="Demands"
      style={{ border: "solid", margin: "10px", padding: "10px" }}
    >
      <p>Il y a actuellement {numberWait} demande(s) en attente</p>
      <ul>
        {users.map((el) => (
          <li key={el.id}>
            {el.username} -
            <button data-testid="accept" onClick={() => props.acceptDemand(el)}>Accept</button>
            <button data-testid="decline"  onClick={() => declineDemand(el)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Demands;
