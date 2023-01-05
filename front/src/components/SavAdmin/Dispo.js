import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Dispo() {
  const [dispo, setDispo] = useState(false);

  // Recupere la connexion socket depuis le context de Outlet
  const [socket] = useOutletContext();

  function activDispo() {
    socket.emit("sav:admin:new", dispo);
    setDispo(!dispo);
  }

  return (
    <div
      className="Dispo"
      style={{ border: "solid", margin: "10px", padding: "10px" }}
    >
      {dispo ? (
        <button data-testid="desactivate" style={{ color: "red" }} onClick={activDispo}>
          Désactiver ma disponibilité
        </button>
      ) : (
        <button data-testid="activate" style={{ color: "green" }} onClick={activDispo}>
          Activer ma disponibilité
        </button>
      )}

      <p>
        Statut: 
        {dispo ? <strong> Disponible</strong> : <strong> Indisponible</strong>}
      </p>
    </div>
  );
}

export default Dispo;
