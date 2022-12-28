import NavUser from "../../components/Nav/NavUser";
import { Outlet } from "react-router-dom";

function UserApp() {
  return (
    <div className="UserApp">
      <NavUser />
      <Outlet />
    </div>
  );
}

export default UserApp;
