import NavAdmin from "../../components/Nav/NavAdmin";
import { Outlet } from "react-router-dom";

import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function AdminApp() {
  return (
    <div className="AdminApp">
      <NavAdmin />
      <Outlet context={[socket]} />
    </div>
  );
}

export default AdminApp;
