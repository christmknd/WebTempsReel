import NavUser from "../../components/Nav/NavUser";
import { Outlet } from "react-router-dom";

import io from "socket.io-client";

const urlWS = `${process.env.REACT_APP_WS_BACK}:${process.env.REACT_APP_PORT_BACKEND}`;
const socket = io(urlWS);

function UserApp() {
  return (
    <div className="UserApp">
      <NavUser />
      <Outlet context={[socket]} />
    </div>
  );
}

export default UserApp;
