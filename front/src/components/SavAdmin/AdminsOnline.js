import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function AdminsOnline() {
  const [numberAdmin, setNumberAdmin] = useState(0);

  // Recupere la connexion socket depuis le context de Outlet
  const [socket] = useOutletContext();

  // Ping le nombre d'admin à mon arrivé
  useEffect(() => {
    socket.emit("sav:admin:count");
  }, [numberAdmin]);

  // Ecoute le nombre d'admin actif
  socket.on("sav:admin:count", (admins_online) => {
    setNumberAdmin(admins_online);
  });

  return (
    <div
      className="AdminsOnline"
      style={{ border: "solid", margin: "10px", padding: "10px" }}
    >
      <p>Il y a {numberAdmin} admin(s) en disponible(s)</p>
    </div>
  );
}

export default AdminsOnline;
