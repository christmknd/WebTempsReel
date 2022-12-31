import NavUser from "../../components/Nav/NavUser";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import io from "socket.io-client";
import AnnoncePop from "../../components/AnnoncePop";

const urlHttp = `${process.env.REACT_APP_API_BACK}:${process.env.REACT_APP_PORT_BACKEND}/sse`;
const eventSource = new EventSource(urlHttp);

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function UserApp() {
  const [annonce, setAnnonce] = useState("");

  eventSource.addEventListener("open", () => {
    console.log("Event source connected with the server");
  });

  eventSource.addEventListener("error", (error) => {
    console.error("Error with the server");
    console.error(error);
  });

  eventSource.addEventListener("offrecommerciale", (event) => {
    setAnnonce(event.data);
  });

  return (
    <div className="UserApp">
      <NavUser />
      <Outlet context={[socket]} />
      {annonce && <AnnoncePop text={annonce} />}
    </div>
  );
}

export default UserApp;
